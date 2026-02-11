'use client';

import { motion } from 'framer-motion';
import { TickSquare, Paper } from 'react-iconly';
import { toast } from 'sonner';
import { ColorToken } from '@/lib/color-logic';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SwatchProps {
    token: ColorToken;
    isSelected?: boolean;
    onSelect?: () => void;
}

export function Swatch({ token, isSelected, onSelect }: SwatchProps) {
    const [copied, setCopied] = useState(false);
    const isMain = token.step === 500;

    const handleClick = () => {
        // Copy functionality
        navigator.clipboard.writeText(token.hex);
        setCopied(true);
        toast.success(`Copied ${token.hex}`);
        setTimeout(() => setCopied(false), 1500);

        // Select functionality
        if (onSelect) {
            onSelect();
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.button
            variants={item}
            onClick={handleClick}
            className={cn(
                "group relative flex flex-col rounded-xl overflow-hidden transition-all duration-200",
                "hover:scale-105 hover:shadow-xl hover:z-10",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950",
                isMain && !isSelected && "ring-2 ring-zinc-900 dark:ring-white",
                isSelected && "ring-4 ring-offset-2 ring-blue-500 dark:ring-blue-400 z-20 scale-105 shadow-xl"
            )}
            style={{
                // @ts-ignore
                '--tw-ring-color': isSelected ? undefined : token.hex
            }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Color Block */}
            <div
                className="aspect-square w-full flex items-center justify-center transition-all relative"
                style={{ backgroundColor: token.hex }}
            >
                {/* WCAG Badge */}
                {token.wcagLevel !== 'Fail' && (
                    <div
                        className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider backdrop-blur-sm shadow-sm"
                        style={{
                            color: token.onColor,
                            backgroundColor: token.onColor === '#ffffff' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.3)',
                            pointerEvents: 'none'
                        }}
                        title={`Contrast: ${token.contrastRatio.toFixed(2)}:1`}
                    >
                        {token.wcagLevel}
                    </div>
                )}

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
