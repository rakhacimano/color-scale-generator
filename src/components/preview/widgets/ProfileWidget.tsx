import React from 'react';

import { Palette } from '@/lib/color-logic';

interface PreviewWidgetProps {
    palette: Palette;
}

export default function ProfileWidget({ palette }: PreviewWidgetProps) {
    const c = (step: number) => palette.light.find(t => t.step === step)?.hex || '#fff';
    const onC = (step: number) => palette.light.find(t => t.step === step)?.onColor || '#000';
    return (
        <div className="relative border border-white/10 rounded-2xl bg-[#0F0F0F] p-6 flex flex-col gap-6 hover:border-white/20 transition-colors h-full">
            <div>
                <h3 className="text-base font-bold mb-1 text-white">Account</h3>
                <p className="text-white/60 text-sm">
                    Make changes to your account here. Click save when you're done.
                </p>
            </div>

            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Name</label>
                    <input
                        type="text"
                        defaultValue="cimanoui"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        onFocus={(e) => e.target.style.borderColor = c(500)}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Username</label>
                    <input
                        type="text"
                        defaultValue="@cimanoui"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none transition-colors"
                        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                        onFocus={(e) => e.target.style.borderColor = c(500)}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                    />
                </div>
            </div>

            <div className="pt-2 mt-auto">
                <button
                    className="font-bold rounded-lg px-4 py-2 text-sm transition-colors hover:brightness-110"
                    style={{ backgroundColor: c(500), color: onC(500) }}
                >
                    Save changes
                </button>
            </div>
        </div>
    );
}
