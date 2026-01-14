'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    // 1. Mouse Position Motion Values (lighter than State)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Smooth Springs for the Aura (Ring)
    const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
    const auraX = useSpring(mouseX, springConfig);
    const auraY = useSpring(mouseY, springConfig);

    // 3. Hover State
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const moveMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Only show cursor after first movement to prevent initial jump
            if (!isVisible) setIsVisible(true);

            // Simple hover detection logic
            const target = e.target as HTMLElement;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovered(!!isClickable);
        };

        window.addEventListener('mousemove', moveMouse);
        return () => window.removeEventListener('mousemove', moveMouse);
    }, [mouseX, mouseY, isVisible]);

    // Hide default cursor
    useEffect(() => {
        document.body.style.cursor = 'none';
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    // 4. Render purely if visible
    if (!isVisible) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-difference">
            {/* The Dot (Sharp Focus) */}
            <motion.div
                className="absolute h-2 w-2 rounded-full bg-white"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />

            {/* The Aura (Lagging Ring) */}
            <motion.div
                className="absolute border border-white rounded-full bg-white"
                style={{
                    x: auraX,
                    y: auraY,
                    translateX: '-50%',
                    translateY: '-50%',
                    height: 48,
                    width: 48,
                }}
                animate={{
                    scale: isHovered ? 1.5 : 0.5,
                    opacity: isHovered ? 0.8 : 0, // Only visible when hovered? Or always? 
                    // Let's make it always visible but expanding, per "Aura" concept.
                    // Refining: The logic said "Ring follows dot".
                }}
            // We override the animate prop for a better default state
            // Let's re-define the aura visual:
            // Default: A faint larger ring. Hover: Solid smaller ring? 
            // User asked for "Unqiue".
            // Let's do: Default = Invisible/Tiny. Hover = Expands and becomes the "Different Color" backing.
            // Wait, user wants "When hovered over text".
            // Let's stick to the "Aura" concept: Always there, trailing.
            />

            {/* Re-implementing correctly for the specific "Mindful Aura" design */}
            <motion.div
                className="absolute rounded-full border border-white"
                style={{
                    x: auraX,
                    y: auraY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    height: isHovered ? 64 : 32,
                    width: isHovered ? 64 : 32,
                    opacity: isHovered ? 1 : 0.5,
                    borderWidth: isHovered ? 2 : 1,
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
        </div>
    );
}

// NOTE: mix-blend-difference with WHITE elements:
// - On White BG: Becomes Black.
// - On Black Text: Becomes White.
// This handles the "Different Color" requirement automatically.
