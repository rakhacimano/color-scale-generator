'use client';

import { Palette } from '@/lib/color-logic';
import { PreviewGrid } from '../preview/PreviewGrid';
import { motion } from 'framer-motion';

interface PreviewSectionProps {
    palette: Palette | null;
}

export function PreviewSection({ palette }: PreviewSectionProps) {
    if (!palette) return null;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm">
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold">UI Playground</h3>
                    <p className="text-sm text-zinc-500">
                        See how your color scale is applied across different UI components using various steps for hierarchy.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                <PreviewGrid palette={palette} />
            </motion.div>
        </div>
    );
}
