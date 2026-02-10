import { cn } from "@/lib/utils";
import React from "react";

interface LightRaysProps {
    className?: string;
    speed?: number;
    color?: string;
}

const LightRays: React.FC<LightRaysProps> = ({
    className,
    speed = 15,
    color = "rgba(255, 255, 255, 0.4)"
}) => {
    return (
        <div className={cn("relative w-full h-full overflow-hidden pointer-events-none", className)}>
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-30 dark:opacity-20 pointer-events-none"
                style={{
                    background: `conic-gradient(from 0deg at 50% 50%, 
            ${color} 0deg, transparent 60deg, 
            ${color} 120deg, transparent 180deg, 
            ${color} 240deg, transparent 300deg, 
            ${color} 360deg
          )`,
                    animation: `spin ${speed}s linear infinite`,
                    maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                }}
            />
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-20 dark:opacity-10 pointer-events-none"
                style={{
                    background: `conic-gradient(from 45deg at 50% 50%, 
            ${color} 0deg, transparent 60deg, 
            ${color} 120deg, transparent 180deg, 
            ${color} 240deg, transparent 300deg, 
            ${color} 360deg
          )`,
                    animation: `spin ${speed * 1.5}s linear infinite reverse`,
                    maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                }}
            />
        </div>
    );
};

export default LightRays;
