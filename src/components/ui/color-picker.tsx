'use client';

import { HexColorPicker } from 'react-colorful';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'react-iconly';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
}

type ColorMode = 'hex' | 'rgb' | 'hsl';

export function ColorPicker({ color, onChange }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState<ColorMode>('hex');
    const [hexInput, setHexInput] = useState(color);
    const [rgbInput, setRgbInput] = useState({ r: 0, g: 0, b: 0 });
    const [hslInput, setHslInput] = useState({ h: 0, s: 0, l: 0 });
    const pickerRef = useRef<HTMLDivElement>(null);

    // Convert HEX to RGB
    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 0, b: 0 };
    };

    // Convert RGB to HEX
    const rgbToHex = (r: number, g: number, b: number) => {
        return '#' + [r, g, b].map(x => {
            const hex = Math.max(0, Math.min(255, x)).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    // Convert RGB to HSL
    const rgbToHsl = (r: number, g: number, b: number) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
    };

    // Convert HSL to RGB
    const hslToRgb = (h: number, s: number, l: number) => {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
    };

    // Sync inputs with external color changes
    useEffect(() => {
        setHexInput(color);
        const rgb = hexToRgb(color);
        setRgbInput(rgb);
        setHslInput(rgbToHsl(rgb.r, rgb.g, rgb.b));
    }, [color]);

    // Close picker when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleHexChange = (val: string) => {
        if (!val.startsWith('#')) val = '#' + val;
        setHexInput(val);
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            onChange(val);
        }
    };

    const handleRgbChange = (key: 'r' | 'g' | 'b', value: number) => {
        const newRgb = { ...rgbInput, [key]: value };
        setRgbInput(newRgb);
        const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setHexInput(hex);
        onChange(hex);
    };

    const handleHslChange = (key: 'h' | 's' | 'l', value: number) => {
        const newHsl = { ...hslInput, [key]: value };
        setHslInput(newHsl);
        const rgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
        setRgbInput(rgb);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setHexInput(hex);
        onChange(hex);
    };

    const handlePickerChange = (newColor: string) => {
        setHexInput(newColor);
        const rgb = hexToRgb(newColor);
        setRgbInput(rgb);
        setHslInput(rgbToHsl(rgb.r, rgb.g, rgb.b));
        onChange(newColor);
    };

    const inputClass = "w-full h-10 px-2 rounded-lg text-center text-sm font-mono bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 transition-all";

    return (
        <div className="relative" ref={pickerRef}>
            {/* Main Display - Click to Open */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center gap-4 p-3 rounded-2xl cursor-pointer",
                    "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700",
                    "hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200",
                    isOpen && "ring-2"
                )}
                style={{
                    // @ts-ignore
                    '--tw-ring-color': color
                }}
                whileTap={{ scale: 0.99 }}
            >
                {/* Color Swatch */}
                <div
                    className="w-12 h-12 rounded-xl shadow-lg ring-2 ring-white dark:ring-zinc-700 shrink-0"
                    style={{ backgroundColor: color }}
                />

                {/* HEX Display */}
                <div className="flex-1 text-left">
                    <p className="text-lg font-mono font-semibold uppercase">{color}</p>
                    <p className="text-xs text-zinc-500">
                        RGB({rgbInput.r}, {rgbInput.g}, {rgbInput.b})
                    </p>
                </div>

                <span
                    className={cn(
                        "text-zinc-400 transition-transform duration-200 inline-flex",
                        isOpen && "rotate-180"
                    )}
                >
                    <ChevronDown set="bold" size={20} primaryColor="currentColor" />
                </span>
            </motion.button>

            {/* Color Picker Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 z-50"
                    >
                        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-4">
                            {/* Color Picker */}
                            <style jsx global>{`
                .react-colorful {
                  width: 100% !important;
                  height: auto !important;
                }
                .react-colorful__saturation {
                  border-radius: 12px !important;
                  height: 140px !important;
                }
                .react-colorful__hue {
                  height: 14px !important;
                  border-radius: 7px !important;
                  margin-top: 12px !important;
                }
                .react-colorful__saturation-pointer,
                .react-colorful__hue-pointer {
                  width: 18px !important;
                  height: 18px !important;
                  border-width: 3px !important;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
                }
              `}</style>
                            <HexColorPicker color={color} onChange={handlePickerChange} />

                            {/* Mode Tabs */}
                            <div className="flex gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                {(['hex', 'rgb', 'hsl'] as ColorMode[]).map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => setMode(m)}
                                        className={cn(
                                            "flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold uppercase transition-all",
                                            mode === m
                                                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                                        )}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>

                            {/* Inputs based on mode */}
                            {mode === 'hex' && (
                                <input
                                    type="text"
                                    value={hexInput}
                                    onChange={(e) => handleHexChange(e.target.value)}
                                    className={cn(inputClass, "uppercase")}
                                    style={{
                                        // @ts-ignore
                                        '--tw-ring-color': color
                                    }}
                                    placeholder="#000000"
                                    maxLength={7}
                                />
                            )}

                            {mode === 'rgb' && (
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={rgbInput.r}
                                            onChange={(e) => handleRgbChange('r', parseInt(e.target.value) || 0)}
                                            className={inputClass}
                                            min={0}
                                            max={255}
                                        />
                                        <p className="text-[10px] text-center text-zinc-400 mt-1">R</p>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={rgbInput.g}
                                            onChange={(e) => handleRgbChange('g', parseInt(e.target.value) || 0)}
                                            className={inputClass}
                                            min={0}
                                            max={255}
                                        />
                                        <p className="text-[10px] text-center text-zinc-400 mt-1">G</p>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={rgbInput.b}
                                            onChange={(e) => handleRgbChange('b', parseInt(e.target.value) || 0)}
                                            className={inputClass}
                                            min={0}
                                            max={255}
                                        />
                                        <p className="text-[10px] text-center text-zinc-400 mt-1">B</p>
                                    </div>
                                </div>
                            )}

                            {mode === 'hsl' && (
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={hslInput.h}
                                            onChange={(e) => handleHslChange('h', parseInt(e.target.value) || 0)}
                                            className={inputClass}
                                            min={0}
                                            max={360}
                                        />
                                        <p className="text-[10px] text-center text-zinc-400 mt-1">H°</p>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={hslInput.s}
                                            onChange={(e) => handleHslChange('s', parseInt(e.target.value) || 0)}
                                            className={inputClass}
                                            min={0}
                                            max={100}
                                        />
                                        <p className="text-[10px] text-center text-zinc-400 mt-1">S%</p>
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="number"
                                            value={hslInput.l}
                                            onChange={(e) => handleHslChange('l', parseInt(e.target.value) || 0)}
                                            className={inputClass}
                                            min={0}
                                            max={100}
                                        />
                                        <p className="text-[10px] text-center text-zinc-400 mt-1">L%</p>
                                    </div>
                                </div>
                            )}

                            {/* Quick Colors */}
                            <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex gap-1.5 flex-wrap">
                                    {['#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#171717'].map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => handlePickerChange(c)}
                                            className={cn(
                                                "w-7 h-7 rounded-lg shadow-sm transition-transform hover:scale-110",
                                                "ring-1 ring-black/10",
                                                color.toLowerCase() === c.toLowerCase() && "ring-2 ring-offset-2 ring-zinc-900 dark:ring-white"
                                            )}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
