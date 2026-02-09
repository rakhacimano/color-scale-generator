"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "react-iconly";
import { useState, useEffect } from "react";

export default function OklchPage() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const stagger = {
        show: { transition: { staggerChildren: 0.1 } },
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Header */}
            <header className="border-b border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                        <ArrowLeft set="bold" size={20} primaryColor="currentColor" />
                        <span className="text-sm font-medium">Back to Generator</span>
                    </Link>
                    <Image
                        src={isDark ? "/logocolorwhite.png" : "/logocolorblack.png"}
                        alt="Colowr"
                        width={100}
                        height={28}
                        className="h-6 w-auto"
                    />
                </div>
            </header>

            {/* Content */}
            <main className="container mx-auto px-6 py-16 max-w-3xl">
                <motion.div
                    className="space-y-12"
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                >
                    {/* Title */}
                    <motion.div className="space-y-4" variants={fadeIn}>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            What is OKLCH?
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400">
                            A perceptual color space designed for digital design
                        </p>
                    </motion.div>

                    {/* Introduction */}
                    <motion.section className="space-y-4" variants={fadeIn}>
                        <h2 className="text-2xl font-semibold">The Problem with RGB & HSL</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Traditional color spaces like RGB and HSL don't account for how humans perceive color.
                            Two colors with the same "lightness" value in HSL can appear vastly different to our eyes.
                            Yellow at 50% lightness looks much brighter than blue at 50% lightness.
                        </p>
                    </motion.section>

                    {/* What is OKLCH */}
                    <motion.section className="space-y-4" variants={fadeIn}>
                        <h2 className="text-2xl font-semibold">Enter OKLCH</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            OKLCH (Oklachroma) is a modern color space that's perceptually uniform.
                            It has three components:
                        </p>
                        <div className="grid gap-4 mt-6">
                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-400 dark:from-zinc-700 dark:to-zinc-500 flex items-center justify-center font-bold text-lg">L</div>
                                    <div>
                                        <h3 className="font-semibold">Lightness (L)</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">0% = black, 100% = white. Perceptually accurate.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center font-bold text-lg text-white">C</div>
                                    <div>
                                        <h3 className="font-semibold">Chroma (C)</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Color saturation. 0 = gray, higher = more vivid.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 via-green-500 to-blue-500 flex items-center justify-center font-bold text-lg text-white">H</div>
                                    <div>
                                        <h3 className="font-semibold">Hue (H)</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Color angle: 0° = red, 120° = green, 240° = blue.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Why OKLCH */}
                    <motion.section className="space-y-4" variants={fadeIn}>
                        <h2 className="text-2xl font-semibold">Why Use OKLCH?</h2>
                        <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span><strong className="text-zinc-900 dark:text-zinc-100">Consistent lightness</strong> — Colors at the same L value look equally bright</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span><strong className="text-zinc-900 dark:text-zinc-100">Better gradients</strong> — Smooth transitions without muddy middle tones</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span><strong className="text-zinc-900 dark:text-zinc-100">Accessibility</strong> — Reliable contrast ratios for readable text</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500 mt-1">✓</span>
                                <span><strong className="text-zinc-900 dark:text-zinc-100">CSS native</strong> — Supported in modern browsers with <code className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-sm font-mono">oklch()</code></span>
                            </li>
                        </ul>
                    </motion.section>

                    {/* How Colowr Uses It */}
                    <motion.section className="space-y-4" variants={fadeIn}>
                        <h2 className="text-2xl font-semibold">How Colowr Uses OKLCH</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Colowr generates color scales by keeping the hue constant while varying
                            lightness in perceptually even steps. This creates palettes that look
                            naturally balanced, with automatic text color selection based on
                            WCAG contrast requirements.
                        </p>
                    </motion.section>

                    {/* CTA */}
                    <motion.div variants={fadeIn}>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity"
                        >
                            <ArrowLeft set="bold" size={18} primaryColor="currentColor" />
                            Back to Generator
                        </Link>
                    </motion.div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-200/50 dark:border-zinc-800/50 py-6">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                        © 2026 Colowr • Made with ❤️ by Cimano
                    </p>
                </div>
            </footer>
        </div>
    );
}
