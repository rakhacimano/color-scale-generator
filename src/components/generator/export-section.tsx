'use client';

import { Palette } from '@/lib/color-logic';
import { Button } from '../ui/button';
import { Paper, TickSquare, Edit, Document } from 'react-iconly';
import { useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ExportSectionProps {
    palette: Palette | null;
    prefix: string;
}

export function ExportSection({ palette, prefix }: ExportSectionProps) {
    if (!palette) return null;
    const [activeFormat, setActiveFormat] = useState<'tailwind' | 'css' | 'json'>('tailwind');

    const getCssVars = () => {
        let css = `:root {\n`;
        palette.light.forEach(token => {
            css += `  --${prefix}-${token.step}: ${token.hex};\n`;
        });
        css += `}\n\n.dark {\n`;
        palette.dark.forEach(token => {
            css += `  --${prefix}-${token.step}: ${token.hex};\n`;
        });
        css += `}`;
        return css;
    };

    const getTailwindConfig = () => {
        let config = `// tailwind.config.ts\ncolors: {\n  ${prefix}: {\n`;
        palette.light.forEach(token => {
            config += `    ${token.step}: '${token.hex}',\n`;
        });
        config += `  }\n}`;
        return config;
    };

    const getJson = () => {
        const tokens: Record<string, string> = {};
        palette.light.forEach(token => {
            tokens[`${prefix}-${token.step}`] = token.hex;
        });
        return JSON.stringify(tokens, null, 2);
    };

    const formats = {
        tailwind: { label: 'Tailwind', icon: Edit, code: getTailwindConfig() },
        css: { label: 'CSS', icon: Document, code: getCssVars() },
        json: { label: 'JSON', icon: Edit, code: getJson() },
    };

    return (
        <motion.div
            className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Tab Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-4 py-2">
                <div className="flex gap-1">
                    {(Object.keys(formats) as Array<keyof typeof formats>).map((key) => {
                        const fmt = formats[key];
                        const Icon = fmt.icon;
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveFormat(key)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative",
                                    activeFormat === key
                                        ? "text-zinc-900 dark:text-zinc-100"
                                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                                )}
                            >
                                <Icon set="bold" size={16} />
                                {fmt.label}
                                {activeFormat === key && (
                                    <motion.div
                                        layoutId="active-export-tab"
                                        className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-lg shadow-sm -z-10"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
                <CopyButton code={formats[activeFormat].code} />
            </div>

            {/* Code Block */}
            <div className="relative">
                <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed bg-zinc-950 text-zinc-300 min-h-[350px] max-h-[500px]">
                    <code>{formats[activeFormat].code}</code>
                </pre>
            </div>
        </motion.div>
    );
}

function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="h-8 gap-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
            {copied ? <TickSquare set="bold" size={14} /> : <Paper set="bold" size={14} />}
            {copied ? 'Copied!' : 'Copy'}
        </Button>
    );
}
