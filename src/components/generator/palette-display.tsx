'use client';

import { Palette, ColorToken } from '@/lib/color-logic';
import { Swatch } from './swatch';
import { motion } from 'framer-motion';

interface PaletteDisplayProps {
    palette: Palette | null;
}

export function PaletteDisplay({ palette }: PaletteDisplayProps) {
    if (!palette) return null;

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
                        <Swatch key={`light-${token.step}`} token={token} />
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
                        <Swatch key={`dark-${token.step}`} token={token} />
                    ))}
                </motion.div>
            </section>
        </div>
    );
}
