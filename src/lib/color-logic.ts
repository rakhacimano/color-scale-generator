import {
    formatHex,
    converter,
    wcagContrast,
    type Oklch,
    toGamut,
    clampChroma
} from 'culori';

// Define types
export type PaletteStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export const STEPS: PaletteStep[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

export interface ColorToken {
    step: PaletteStep;
    hex: string;
    oklch: string; // CSS string
    onColor: '#ffffff' | '#000000';
    contrastWhite: number;
    contrastBlack: number;
    contrastRatio: number;
    wcagLevel: 'AAA' | 'AA' | 'AA Large' | 'Fail';
}

export interface Palette {
    light: ColorToken[];
    dark: ColorToken[];
}

// Helpers
const toOklch = converter('oklch');
const toRgb = toGamut('rgb', 'oklch');
// toGamut('rgb') uses a default comparison which is usually fine for this use case.
// Re-checking the import list.

import { differenceEuclidean } from 'culori';
// Fixed import above.

// Target Lightness values for Light Mode (Tailwind-like)
// 500 is anchor (dynamic), others are relative/fixed targets
const LIGHTNESS_MAP_LIGHT: Record<PaletteStep, number> = {
    50: 0.97,
    100: 0.93,
    200: 0.86,
    300: 0.78,
    400: 0.70,
    500: 0.50, // Placeholder
    600: 0.56, // Inverted logic relative to 500? No, these are absolute L values typically.
    700: 0.44,
    800: 0.34,
    900: 0.26,
    950: 0.18,
};

// Target Lightness values for Dark Mode (Radix-like)
const LIGHTNESS_MAP_DARK: Record<PaletteStep, number> = {
    50: 0.12,
    100: 0.16,
    200: 0.22,
    300: 0.30,
    400: 0.40,
    500: 0.52,
    600: 0.64,
    700: 0.74,
    800: 0.82,
    900: 0.90,
    950: 0.94,
};

export function getContrastStats(hexColor: string) {
    const white = '#ffffff';
    const black = '#000000';
    const contrastWhite = wcagContrast(hexColor, white);
    const contrastBlack = wcagContrast(hexColor, black);

    const contrastRatio = contrastWhite >= contrastBlack ? contrastWhite : contrastBlack;
    const onColor = (contrastWhite >= contrastBlack ? white : black) as '#ffffff' | '#000000';

    let wcagLevel: 'AAA' | 'AA' | 'AA Large' | 'Fail' = 'Fail';
    if (contrastRatio >= 7) {
        wcagLevel = 'AAA';
    } else if (contrastRatio >= 4.5) {
        wcagLevel = 'AA';
    } else if (contrastRatio >= 3) {
        wcagLevel = 'AA Large';
    }

    return { contrastWhite, contrastBlack, onColor, contrastRatio, wcagLevel };
}

function interpolate(start: number, end: number, factor: number) {
    return start + (end - start) * factor;
}

export function generatePalette(baseColorHex: string): Palette {
    const baseOklch = toOklch(baseColorHex);
    if (!baseOklch) {
        throw new Error('Invalid base color');
    }

    const { l: lBase, c: cBase, h: hBase } = baseOklch;
    const H = hBase || 0; // Handle gray

    // --- Generate Light Palette ---
    const lightTokens = STEPS.map((step) => {
        let targetL: number;
        let targetC: number;

        // Lightness Interpolation
        // We anchor 500 to lBase.
        if (step === 500) {
            targetL = lBase;
            targetC = cBase;
        } else if (step < 500) {
            // Interpolate between 50 (0.97) and 500 (lBase)
            // Steps: 50, 100, 200, 300, 400
            // Positions relative to range [50, 500]:
            // 50 -> 0.0, 500 -> 1.0 (of the localized range)
            // Actually let's use the predefined map but scale it?
            // Or just simple interpolation:
            // Steps count: 5 steps before 500 (50, 100, 200, 300, 400)
            // Let's use linear interpolation factor for simplicity and robustness
            // Range: 50..500.
            const t = (step - 50) / (500 - 50); // 0.0 to 1.0
            // Map t to Lightness: 0.97 -> lBase
            // Exponential/Curve might be better for Tailwind feel, but let's try linear first OR use the predefined constant target L as requested but shifted?
            // User said: "500 = base L".
            // If I force 500=Base, and 50=0.97.
            // 100, 200, 300, 400 should assume values in between.
            targetL = interpolate(0.97, lBase, t);

            // We can also try to "Fit" the curve to the standard tailwind curve.
            // Standard: 50:0.97, 500: L_std~0.6?
            // Let's use the explicit target approach but scaled.
            // If lBase is very light (e.g. 0.9), then 50-400 get compressed.
            // If lBase is very dark (e.g. 0.2), then 50-400 get expanded.
            // This is "Tint" logic.

            // Chroma: slightly reduce as we go lighter
            targetC = interpolate(cBase * 0.2, cBase, t); // 50 starts desaturated
        } else {
            // Step > 500
            // Interpolate between 500 (lBase) and 950 (0.18)
            const t = (step - 500) / (950 - 500);
            targetL = interpolate(lBase, 0.18, t);

            // Chroma: reduce as we go darker
            targetC = interpolate(cBase, cBase * 0.4, t);
        }

        // Compose OKLCH
        const color: Oklch = { mode: 'oklch', l: targetL, c: targetC, h: H };

        // Gamut Map convert to Hex
        // simple `formatHex` might clip simply. `toGamut` is better.
        // We used `toGamut` earlier in imports but need to use it.
        // culori v3 `toGamut` returns a converter function.
        const rgbGamut = toGamut('rgb', 'oklch');
        const inGamutColor = rgbGamut(color);
        const hexVal = formatHex(inGamutColor);

        const stats = getContrastStats(hexVal);

        return {
            step,
            hex: hexVal,
            oklch: `${(targetL * 100).toFixed(2)}% ${targetC.toFixed(3)} ${H?.toFixed(2) || 0}`,
            ...stats
        };
    });

    // --- Generate Dark Palette ---
    const darkTokens = STEPS.map((step) => {
        // For Dark mode, the logic is different.
        // We match the "Pop" color (usually primary) roughly to similar chromas but different lightness.
        // User Guide:
        // 50: 0.12 ... 950: 0.94
        // This is basically inverted logic (low step = dark, high step = light? NO)
        // "dark scales punya target lightness berbeda agar nyaman di background gelap"
        // "50: 0.12" (Dark grey) -> Backgrounds
        // "900: 0.90" (Light) -> Text
        // This defines a palette where 50 is Darkest and 950 is Lightest?
        // User check: "50: 0.12... 950: 0.94". Yes, L increases with Step.
        // BUT typically Tailwind scales are "50 is Lightest, 900 is Darkest".
        // Radix Colors: Step 1 is Background (Light in Light mode, Dark in Dark mode). Step 12 is Text (Dark in Light mode, Light in Dark mode).
        // The user request says: "Generate also dark mode palette... target lightness different for dark surfaces."
        // "50: 0.12" means Step 50 is Dark.
        // In Tailwind, bg-primary-50 is usually light.
        // If we use the SAME class names (primary-50), and we want Dark Mode:
        // Usually in Tailwind Dark Mode, you flip the scale usage (bg-primary-900).
        // OR, you defined a "Theme" variable system where `primary-50` maps to a dark color in dark mode?
        // User guide: "Output result... Grid swatches Light palette + Dark palette".
        // "dark-optimized (mirip Radix)".
        // If I generate a "Dark Palette", does "primary-50" mean the color at step 50 OF THE DARK PALETTE?
        // If so, 50 being 0.12 L implies it is a DARK color.
        // So `primary-50` (Dark Mode) = Dark Color.
        // While `primary-50` (Light Mode) = Light Color.
        // This means the user wants a "Themeable" token system where the meaning of "50" inverts or shifts?
        // OR does the user want a separate "Dark Scale" where 50 is still Light and 900 is Dark?
        // "50: 0.12" -> This is clearly Dark.
        // "950: 0.94" -> This is clearly Light.
        // So the "Dark Palette" scales from Dark (50) to Light (950).
        // This matches Radix/Figma Tokens approach where Step 1 is always Background.
        // OK, I will follow the user's explicit L table.

        const targetL = LIGHTNESS_MAP_DARK[step];

        // Chroma logic:
        // "low steps: ~0.50-0.70 [factor of base?]"
        // "mid steps: ~0.85-1.05 (boost)"
        // "high steps: drop slightly"

        // Let's implement a chroma curve factor based on step index.
        // Steps 50-950 indices 0-10.
        // Mid is index 5 (Step 500).
        // Let's define factors.
        let chromaFactor = 1.0;
        if (step <= 200) chromaFactor = 0.6;
        else if (step <= 400) chromaFactor = 0.8;
        else if (step <= 600) chromaFactor = 1.1; // Boost mid
        else if (step <= 800) chromaFactor = 0.9;
        else chromaFactor = 0.7;

        const targetC = cBase * chromaFactor;

        const color: Oklch = { mode: 'oklch', l: targetL, c: targetC, h: H };
        const rgbGamut = toGamut('rgb', 'oklch');
        const inGamutColor = rgbGamut(color);
        const hexVal = formatHex(inGamutColor);
        const stats = getContrastStats(hexVal);

        return {
            step,
            hex: hexVal,
            oklch: `${(targetL * 100).toFixed(2)}% ${targetC.toFixed(3)} ${H?.toFixed(2) || 0}`,
            ...stats
        };
    });

    return { light: lightTokens, dark: darkTokens };
}
