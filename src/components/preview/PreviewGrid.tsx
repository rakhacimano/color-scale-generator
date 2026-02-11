import React from 'react';
import LoginWidget from './widgets/LoginWidget';
import ProfileWidget from './widgets/ProfileWidget';
import MusicPlayer from './widgets/MusicPlayer';
import ProductCard from './widgets/ProductCard';
import StatsCard from './widgets/StatsCard';
import PaymentMethod from './widgets/PaymentMethod';
import { Palette, ColorToken } from '@/lib/color-logic';

interface PreviewGridProps {
    palette: Palette;
}

export function PreviewGrid({ palette }: PreviewGridProps) {
    // We pass the "Light" palette tokens primarily, as they usually contain the vibrant brand colors
    // used in these dark-themed widgets.
    // However, we pass the full palette object so widgets can choose.
    // For simplicity in this adaptation, we can also extract a helper.

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

                {/* Column 1 - Login & Profile */}
                <div className="flex flex-col gap-6">
                    <div className="h-[420px]">
                        <LoginWidget palette={palette} />
                    </div>
                    <div className="h-[340px]">
                        <ProfileWidget palette={palette} />
                    </div>
                </div>

                {/* Column 2 - Media & Payment */}
                <div className="flex flex-col gap-6">
                    <div className="h-[280px]">
                        <MusicPlayer palette={palette} />
                    </div>
                    <div className="h-[380px]">
                        <PaymentMethod palette={palette} />
                    </div>
                </div>

                {/* Column 3 - Stats & Product */}
                <div className="flex flex-col gap-6">
                    <div className="h-[340px]">
                        <StatsCard palette={palette} />
                    </div>
                    <div className="h-[380px]">
                        <ProductCard palette={palette} />
                    </div>
                </div>
            </div>
        </div>
    );
}
