import React from 'react';
import { Lock, Message } from 'react-iconly';
import { cn } from '@/lib/utils';
import { Palette } from '@/lib/color-logic';

interface PreviewWidgetProps {
    palette: Palette;
}

export default function LoginWidget({ palette }: PreviewWidgetProps) {
    // Helper to get color values
    const c = (step: number) => palette.light.find(t => t.step === step)?.hex || '#fff';
    const onC = (step: number) => palette.light.find(t => t.step === step)?.onColor || '#000';
    return (
        <div className="relative border border-white/10 rounded-2xl bg-[#0F0F0F] p-6 flex flex-col gap-6 hover:border-white/20 transition-colors h-full">
            <div>
                <h3 className="text-2xl font-bold mb-2 tracking-tight text-white">Welcome back</h3>
                <p className="text-white/60 text-base">
                    Please enter your details to sign in.
                </p>
            </div>

            <div className="space-y-4">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                        <Message set="light" primaryColor="currentColor" size={20} />
                    </div>
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
                    />
                </div>
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                        <Lock set="light" primaryColor="currentColor" size={20} />
                    </div>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="rounded border-white/20 bg-white/5 checked:bg-white transition-colors cursor-pointer w-4 h-4 appearance-none border checked:border-white relative checked:after:content-['✓'] checked:after:absolute checked:after:text-black checked:after:text-[10px] checked:after:left-[2px] checked:after:top-0" />
                    <span className="text-white/60 group-hover:text-white transition-colors">Keep me logged in</span>
                </label>
                <button className="text-white/60 hover:text-white hover:underline transition-colors">
                    Forgot password?
                </button>
            </div>

            <button
                className="w-full font-bold rounded-xl py-3.5 text-sm transition-all mt-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
                style={{ backgroundColor: c(500), color: onC(500) }}
            >
                Sign in
            </button>

            <p className="text-center text-xs text-white/40">
                Don't have an account? <button className="hover:underline" style={{ color: c(600) }}>Sign up</button>
            </p>
        </div>
    );
}
