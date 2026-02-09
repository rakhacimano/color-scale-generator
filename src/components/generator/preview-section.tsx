'use client';

import { Palette } from '@/lib/color-logic';
import { Badge } from '../ui/badge';
import { Message, Star, Activity } from 'react-iconly';
import { motion } from 'framer-motion';

interface PreviewSectionProps {
    palette: Palette | null;
}

export function PreviewSection({ palette }: PreviewSectionProps) {
    if (!palette) return null;

    // Light mode uses lighter shades for backgrounds, darker for text
    const getLight = (step: number) => palette.light.find(t => t.step === step)?.hex || '#000';
    const getLightOn = (step: number) => palette.light.find(t => t.step === step)?.onColor || '#fff';

    // Dark mode uses darker shades for backgrounds, lighter for text  
    const getDark = (step: number) => palette.dark.find(t => t.step === step)?.hex || '#fff';
    const getDarkOn = (step: number) => palette.dark.find(t => t.step === step)?.onColor || '#000';

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="grid lg:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {/* Light Mode Preview */}
            <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Light Mode</h3>
                    <Badge variant="outline" className="text-xs">Preview</Badge>
                </div>

                <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-2xl shadow-zinc-200/50 space-y-6">
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:opacity-90 shadow-lg"
                            style={{ backgroundColor: getLight(500), color: getLightOn(500) }}
                        >
                            Primary Button
                        </button>
                        <button
                            className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                            style={{ backgroundColor: getLight(100), color: getLight(800) }}
                        >
                            Secondary
                        </button>
                        <button
                            className="px-4 py-2.5 rounded-xl font-medium text-sm border-2 transition-all hover:opacity-90"
                            style={{ borderColor: getLight(500), color: getLight(600), backgroundColor: 'white' }}
                        >
                            Outline
                        </button>
                    </div>

                    {/* Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700">Email address</label>
                        <div className="relative mt-2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 inline-flex"><Message set="bold" size={16} primaryColor="currentColor" /></span>
                            <input
                                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-zinc-700 bg-white"
                                placeholder="you@example.com"
                                style={{ borderColor: getLight(200) }}
                            />
                        </div>
                    </div>

                    {/* Card */}
                    <div
                        className="p-4 rounded-2xl border"
                        style={{ backgroundColor: getLight(50), borderColor: getLight(100) }}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: getLight(100) }}
                            >
                                <Star set="bold" size={20} style={{ color: getLight(600) }} />
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-sm text-zinc-900">Premium Features</p>
                                <p className="text-xs text-zinc-500">Unlock advanced tools and export options</p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: getLight(100), color: getLight(700) }}
                        >
                            Design
                        </span>
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: getLight(500), color: getLightOn(500) }}
                        >
                            New
                        </span>
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium border"
                            style={{ borderColor: getLight(300), color: getLight(600) }}
                        >
                            Beta
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Dark Mode Preview */}
            <motion.div className="space-y-4" variants={item}>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Dark Mode</h3>
                    <Badge variant="outline" className="text-xs">Preview</Badge>
                </div>

                <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl shadow-black/50 space-y-6">
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:opacity-90 shadow-lg"
                            style={{ backgroundColor: getDark(500), color: getDarkOn(500) }}
                        >
                            Primary Button
                        </button>
                        <button
                            className="px-4 py-2.5 rounded-xl font-medium text-sm transition-all hover:opacity-90"
                            style={{ backgroundColor: getDark(800), color: getDark(100) }}
                        >
                            Secondary
                        </button>
                        <button
                            className="px-4 py-2.5 rounded-xl font-medium text-sm border-2 transition-all hover:opacity-90 bg-transparent"
                            style={{ borderColor: getDark(400), color: getDark(500) }}
                        >
                            Outline
                        </button>
                    </div>

                    {/* Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300">Email address</label>
                        <div className="relative mt-2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 inline-flex"><Message set="bold" size={16} primaryColor="currentColor" /></span>
                            <input
                                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-zinc-100"
                                placeholder="you@example.com"
                                style={{
                                    borderColor: 'rgb(63 63 70)',
                                    backgroundColor: 'rgb(24 24 27)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Card */}
                    <div
                        className="p-4 rounded-2xl"
                        style={{ backgroundColor: 'rgb(24 24 27)', border: '1px solid rgb(39 39 42)' }}
                    >
                        <div className="flex items-start gap-3">
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{ backgroundColor: getDark(900) }}
                            >
                                <Activity set="bold" size={20} style={{ color: getDark(400) }} />
                            </div>
                            <div className="space-y-1">
                                <p className="font-semibold text-sm text-zinc-100">Premium Features</p>
                                <p className="text-xs text-zinc-400">Unlock advanced tools and export options</p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: 'rgb(39 39 42)', color: 'rgb(212 212 216)' }}
                        >
                            Design
                        </span>
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium"
                            style={{ backgroundColor: getDark(500), color: getDarkOn(500) }}
                        >
                            New
                        </span>
                        <span
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-transparent"
                            style={{ border: '1px solid rgb(63 63 70)', color: 'rgb(161 161 170)' }}
                        >
                            Beta
                        </span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
