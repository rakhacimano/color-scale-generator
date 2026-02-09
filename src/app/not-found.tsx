'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home } from 'react-iconly';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-6">
            <div className="text-center space-y-8 max-w-md mx-auto">
                {/* Animated 404 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative"
                >
                    <h1 className="text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-zinc-400 to-zinc-600 dark:from-zinc-700 dark:to-zinc-500 select-none">
                        404
                    </h1>
                    <motion.div
                        className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0.5, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-4"
                >
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Page not found
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400">
                        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
                    </p>
                </motion.div>

                {/* Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <Link href="/">
                        <Button size="lg" className="gap-2 rounded-xl h-12 px-8 text-base">
                            <Home set="bold" size={20} />
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-0 right-0 text-center"
            >
                <p className="text-xs text-zinc-400 dark:text-zinc-600">
                    Color Scale Generator
                </p>
            </motion.footer>
        </div>
    );
}
