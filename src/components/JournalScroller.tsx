'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { useImagePreloader } from '@/hooks/useImagePreloader';

export default function JournalScroller() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { images, isLoading, progress } = useImagePreloader(160);

    // Scroll progress from entire viewport
    const { scrollYProgress } = useScroll();

    // Smooth physics for the scroll value to give "weighted" feel
    const smoothProgress = useSpring(scrollYProgress, {
        mass: 0.2, // Increased from 0.1 for slightly more weight/inertia
        stiffness: 50, // Slightly reduced stiffness for smoother checking
        damping: 20,
        restDelta: 0.001
    });

    // Map 0-1 scroll progress to 0-159 frame index
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, 159]);

    // Render loop
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Force high quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const rawIndex = Math.floor(index);
        // Clamp index to ensure safety
        const safeIndex = Math.max(0, Math.min(rawIndex, 159));

        const img = images[safeIndex];
        if (!img) return;

        // Scaling logic (object-fit: contain)
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Clear canvas with background color to avoid transparency stacking issues
        // and match the container background
        ctx.fillStyle = '#FDFBF7';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Calculate Aspect Ratios
        const imgAspectRatio = img.width / img.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let renderWidth, renderHeight, offsetX, offsetY;

        if (canvasAspectRatio > imgAspectRatio) {
            // Canvas is wider than image (cover by width)
            renderWidth = canvasWidth;
            renderHeight = img.height * (canvasWidth / img.width);
            offsetX = 0;
            offsetY = (canvasHeight - renderHeight) / 2;
        } else {
            // Canvas is taller than image (cover by height)
            renderHeight = canvasHeight;
            renderWidth = img.width * (canvasHeight / img.height);
            offsetX = (canvasWidth - renderWidth) / 2;
            offsetY = 0;
        }

        ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    };

    // React to frame index changes
    useMotionValueEvent(frameIndex, "change", (latest) => {
        renderFrame(latest);
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                // Set canvas size to match window for high DPI
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                // Ensure styles match visual size
                canvasRef.current.style.width = `${window.innerWidth}px`;
                canvasRef.current.style.height = `${window.innerHeight}px`;

                // Initial render of current frame
                renderFrame(frameIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call

        return () => window.removeEventListener('resize', handleResize);
    }, [images]); // Re-run when images load to ensure initial draw works

    return (
        <div className="fixed inset-0 z-0 bg-[#FDFBF7]">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#FDFBF7]">
                    <div className="text-[#1A1A1A] font-serif text-xl animate-pulse">
                        Loading Journal... {progress}%
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    );
}
