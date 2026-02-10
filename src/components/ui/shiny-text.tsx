import { CSSProperties, FC } from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;

    return (
        <div
            className={`relative inline-block ${className}`}
        >
            {/* Base text (visible) */}
            <span className="relative z-10">{text}</span>

            {/* Shine overlay */}
            <span
                className={`absolute inset-0 z-20 pointer-events-none select-none ${disabled ? '' : 'animate-shine'}`}
                style={{
                    backgroundImage: 'linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.8) 50%, transparent 80%)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    animationDuration: animationDuration,
                } as CSSProperties}
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
};

export default ShinyText;
