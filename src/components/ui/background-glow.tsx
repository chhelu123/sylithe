import { cn } from "../../lib/utils";
import { ReactNode } from "react";

interface BackgroundGlowProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    glowOpacity?: number;
    glowPosition?: string;
}

export const BackgroundGlow = ({
    children,
    className,
    glowColor = "#84cc16",
    glowOpacity = 0.06,
    glowPosition = "center",
}: BackgroundGlowProps) => {
    return (
        <div className={cn("relative w-full", className)}>
            {/* Radial Glow Layer */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(ellipse at ${glowPosition}, ${glowColor} 0%, transparent 65%)`,
                    opacity: glowOpacity,
                    mixBlendMode: "screen",
                }}
            />
            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
