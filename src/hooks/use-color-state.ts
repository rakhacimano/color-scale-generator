import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { generatePalette, Palette } from '@/lib/color-logic';

const STORAGE_KEY = 'ds-gen-state';

export interface GeneratorState {
    baseColor: string;
}

const DEFAULT_STATE: GeneratorState = {
    baseColor: '#8b5cf6', // Purple 500
};

export function useColorState() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [state, setState] = useState<GeneratorState>(DEFAULT_STATE);
    const [palette, setPalette] = useState<Palette | null>(null);
    const [mounted, setMounted] = useState(false);

    // Keep track of state for side effects without dependency cycles if needed, 
    // but strictly we should react to changes.

    // Initialization
    useEffect(() => {
        setMounted(true);
        const urlColor = searchParams.get('color');

        let initialState = DEFAULT_STATE;

        // 1. Try URL
        if (urlColor && /^#[0-9A-F]{6}$/i.test(urlColor)) {
            initialState = { baseColor: urlColor };
        }
        // 2. Try LocalStorage if URL not present (or maybe priority?)
        // Usually URL wins if present.
        else {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    if (parsed.baseColor) {
                        initialState = parsed;
                    }
                } catch (e) {
                    console.error('Failed to parse saved state', e);
                }
            }
        }

        setState(initialState);
        generateAndSet(initialState.baseColor);
    }, []); // Run once on mount

    const generateAndSet = (color: string) => {
        try {
            const newPalette = generatePalette(color);
            setPalette(newPalette);
        } catch (e) {
            console.error(e);
        }
    };

    const updateState = useCallback((updates: Partial<GeneratorState>, syncUrl = true) => {
        setState(prev => {
            const next = { ...prev, ...updates };

            // Side effects need to happen outside the pure reducer relative to React 18+ strictness,
            // but traditionally simple sync logic was okay. However calling router.replace IS dangerous here.
            // We will perform side effects using the 'next' value calculated here? NO.
            // We must perform side effects AFTER state update or independently.
            return next;
        });
    }, []);

    // Effect to handle side effects when state changes
    useEffect(() => {
        if (!mounted) return;

        // 1. Generate Palette
        generateAndSet(state.baseColor);

        // 2. Persist
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

        // 3. Sync URL (debounce this if typing fast? or just replace)
        // We need to avoid infinite loops if URL change triggers this.
        // But we read URL only on mount.
        const params = new URLSearchParams(window.location.search);
        const currentUrlColor = params.get('color');

        if (currentUrlColor !== state.baseColor) {
            params.set('color', state.baseColor);
            router.replace(`?${params.toString()}`, { scroll: false });
        }

    }, [state.baseColor, mounted, router]);

    return {
        state,
        palette,
        updateState,
        mounted
    };
}
