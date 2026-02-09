'use client';

import { motion } from 'framer-motion';
import { TickSquare, Paper } from 'react-iconly';
import { toast } from 'sonner';
import { ColorToken } from '@/lib/color-logic';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SwatchProps {
    token: ColorToken;
}

export function Swatch({ token }: SwatchProps) {
    const [copied, setCopied] = useState(false);
    const isMain = token.step === 500;

    const handleCopy = () => {
        navigator.clipboard.writeText(token.hex);
        setCopied(true);
        toast.success(`Copied ${token.hex}`);
        setTimeout(() => setCopied(false), 1500);
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.button
            variants={item}
            onClick={handleCopy}
            className={cn(
                "group relative flex flex-col rounded-xl overflow-hidden transition-all duration-200",
                "hover:scale-105 hover:shadow-xl hover:z-10",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950",
                isMain && "ring-2 ring-zinc-900 dark:ring-white"
            )}
            style={{
                // @ts-ignore
                '--tw-ring-color': token.hex
            }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Color Block */}
            <div
                className="aspect-square w-full flex items-center justify-center transition-all"
                style={{ backgroundColor: token.hex }}
            >
                {/* Copy Icon */}
                <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                    animate={copied ? { scale: [1, 1.2, 1] } : {}}
                >
                    {copied ? (
                        <TickSquare set="bold" size={20} style={{ color: token.onColor }} />
                    ) : (
                        <Paper set="bold" size={16} style={{ color: token.onColor, opacity: 0.7 }} />
                    )}
                </motion.div>
            </div>

            {/* Info Panel */}
            <div
                className="p-2.5 text-left bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800"
            >
                <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    {token.step}
                </div>
                <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase">
                    {token.hex}
                </div>
            </div>
        </motion.button>
    );
}
