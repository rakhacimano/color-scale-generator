'use client';

import * as React from 'react';
import { Palette, ColorToken } from '@/lib/color-logic';
import { Swatch } from './swatch';
import { motion } from 'framer-motion';

interface PaletteDisplayProps {
    palette: Palette | null;
}

export function PaletteDisplay({ palette }: PaletteDisplayProps) {
    if (!palette) return null;

    const [selection, setSelection] = React.useState<{ step: number; mode: 'light' | 'dark' }>({ step: 500, mode: 'light' });

    const selectedToken = selection.mode === 'light'
        ? palette.light.find(t => t.step === selection.step)
        : palette.dark.find(t => t.step === selection.step);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.02 }
        }
    };

    return (
        <div className="space-y-12">
            {/* Light Palette */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-zinc-300 dark:from-zinc-700 to-transparent" />
                    <h2 className="text-xl font-semibold tracking-tight">Light Mode</h2>
                    <div className="flex-1 h-px bg-gradient-to-l from-zinc-300 dark:from-zinc-700 to-transparent" />
                </div>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {palette.light.map((token) => (
                        <Swatch
                            key={`light-${token.step}`}
                            token={token}
                            isSelected={selection.step === token.step && selection.mode === 'light'}
                            onSelect={() => setSelection({ step: token.step, mode: 'light' })}
                        />
                    ))}
                </motion.div>
            </section>

            {/* Dark Palette */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-zinc-300 dark:from-zinc-700 to-transparent" />
                    <h2 className="text-xl font-semibold tracking-tight">Dark Mode</h2>
                    <div className="flex-1 h-px bg-gradient-to-l from-zinc-300 dark:from-zinc-700 to-transparent" />
                </div>

                <motion.div
                    className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-3"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {palette.dark.map((token) => (
                        <Swatch
                            key={`dark-${token.step}`}
                            token={token}
                            isSelected={selection.step === token.step && selection.mode === 'dark'}
                            onSelect={() => setSelection({ step: token.step, mode: 'dark' })}
                        />
                    ))}
                </motion.div>
            </section>

            {/* Contrast Summary for Selected Color */}
            {selectedToken && (
                <section className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-zinc-300 dark:from-zinc-700 to-transparent" />
                        <h2 className="text-xl font-semibold tracking-tight">Accessibility Report ({selection.mode === 'light' ? 'Light' : 'Dark'} Step-{selectedToken.step})</h2>
                        <div className="flex-1 h-px bg-gradient-to-l from-zinc-300 dark:from-zinc-700 to-transparent" />
                    </div>

                    {/* Contrast Stats Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['#ffffff', '#000000'].map(bg => {
                            const isWhite = bg === '#ffffff';
                            const contrast = isWhite ? selectedToken.contrastWhite : selectedToken.contrastBlack;
                            const label = isWhite ? 'White Text' : 'Black Text';

                            const smallTextPass = contrast >= 4.5;
                            const largeTextPass = contrast >= 3.0;

                            return (
                                <div key={bg} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center justify-center font-bold text-xs" style={{ backgroundColor: bg, color: isWhite ? 'black' : 'white' }}>
                                                {isWhite ? 'Aa' : 'Aa'}
                                            </div>
                                            <div>
                                                <span className="font-medium block">{label}</span>
                                                <span className="text-xs text-zinc-500 tabular-nums">Ratio: {contrast.toFixed(2)}:1</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 text-xs">
                                        <div className="flex flex-col items-end">
                                            <span className="text-zinc-500">Small Text</span>
                                            <span className={smallTextPass ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                {smallTextPass ? "PASS" : "FAIL"}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-zinc-500">Large Text</span>
                                            <span className={largeTextPass ? "text-emerald-500 font-bold" : "text-red-500 font-bold"}>
                                                {largeTextPass ? "PASS" : "FAIL"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                </section>
            )}
        </div>
    );
}
