import React from 'react';
import { Star, Heart } from 'react-iconly';

import { Palette } from '@/lib/color-logic';

interface PreviewWidgetProps {
    palette: Palette;
}

export default function ProductCard({ palette }: PreviewWidgetProps) {
    const c = (step: number) => palette.light.find(t => t.step === step)?.hex || '#fff';
    const onC = (step: number) => palette.light.find(t => t.step === step)?.onColor || '#000';
    return (
        <div className="group relative border border-white/10 rounded-2xl bg-[#0F0F0F] overflow-hidden hover:border-white/20 transition-colors p-6 flex flex-col items-center justify-between h-full">

            <div className="w-full bg-white/5 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <div className="h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 relative group/image">
                    <button className="absolute top-3 right-3 p-2 bg-black/20 backdrop-blur-md rounded-full text-white/60 hover:bg-black/40 transition-all">
                        <Heart set="light" primaryColor="currentColor" size={18} />
                    </button>

                    <img
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000"
                        alt="Minimalist Chair"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg leading-tight text-white">Minimalist Chair</h3>
                        <span
                            className="font-mono text-sm px-2 py-1 rounded font-bold"
                            style={{ backgroundColor: c(100), color: c(900) }}
                        >
                            $450.00
                        </span>
                    </div>

                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                        Ergonomic design meets premium materials. Perfect for your modern home office workspace.
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs font-bold" style={{ color: c(500) }}>
                            <Star set="bold" primaryColor="currentColor" size={14} />
                            <span>4.8</span>
                            <span className="text-white/20 font-normal ml-1">(128 reviews)</span>
                        </div>
                        <button
                            className="text-sm font-bold transition-colors hover:underline"
                            style={{ color: c(600) }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-6 text-[10px] text-white/20 uppercase tracking-widest pointer-events-none">
                E-Commerce Card
            </div>
        </div>
    );
}
