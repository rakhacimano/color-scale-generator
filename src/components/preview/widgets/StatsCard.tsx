import React from 'react';
import { ArrowUp } from 'react-iconly';

import { Palette } from '@/lib/color-logic';

interface PreviewWidgetProps {
    palette: Palette;
}

export default function StatsCard({ palette }: PreviewWidgetProps) {
    const c = (step: number) => palette.light.find(t => t.step === step)?.hex || '#fff';
    const onC = (step: number) => palette.light.find(t => t.step === step)?.onColor || '#000';
    return (
        <div className="relative border border-white/10 rounded-2xl bg-[#0F0F0F] p-6 flex flex-col gap-6 hover:border-white/20 transition-colors h-full">
            <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-white/60 mb-1">Monthly Revenue</h3>
                <span
                    className="text-xs font-bold px-2 py-1 rounded-full"
                    style={{ backgroundColor: c(100), color: c(800) }}
                >
                    +12.5%
                </span>
            </div>

            <div>
                <div className="text-4xl font-bold tracking-tight mb-2 text-white">$32,504</div>
                <div className="flex items-center gap-2 text-sm" style={{ color: c(500) }}>
                    <ArrowUp set="bold" primaryColor="currentColor" size={16} />
                    <span className="font-medium">+$4,200</span>
                    <span className="text-white/40">vs last month</span>
                </div>
            </div>

            {/* Simple Bar Chart Visualization */}
            <div className="flex items-end justify-between gap-2 h-32 mt-auto pt-4 border-t border-white/5">
                {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                    <div key={i} className="w-full bg-white/5 rounded-t-sm relative group overflow-hidden">
                        <div
                            className="absolute bottom-0 left-0 w-full transition-all duration-500 ease-out group-hover:opacity-80"
                            style={{ height: `${h}%`, backgroundColor: i === 3 ? c(500) : (i === 7 ? c(300) : 'white') }}
                        />
                        {/* Hover tooltip */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pb-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            <span className="bg-zinc-900 border border-white/10 text-xs px-2 py-1 rounded text-white shadow-xl">
                                ${h}k
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between text-[10px] text-white/20 uppercase font-medium tracking-wider">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
                <span>Total</span>
            </div>
        </div>
    );
}
