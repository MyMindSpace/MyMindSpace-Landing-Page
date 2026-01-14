import { useState, useEffect } from 'react';

/**
 * Hook to preload a sequence of images.
 * @param frameCount Total number of frames (160)
 * @returns Object containing:
 * - images: Array of HTMLImageElement (or null if not loaded)
 * - isLoading: boolean
 * - progress: number (0-100)
 */
export const useImagePreloader = (frameCount: number) => {
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        const loadImages = async () => {
            // Helper to determine path based on logic
            // 0-39: first_frames
            // 40-79: second_frames
            // 80-119: third_frames
            // 120-159: fourth_frames

            const imagePromises = Array.from({ length: frameCount }, (_, i) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();

                    let folder = '';
                    let frameIndex = 0;

                    if (i < 40) {
                        folder = 'first_frames';
                        frameIndex = i + 1; // 1-based naming likely? ezgif-frame-001.jpg
                    } else if (i < 80) {
                        folder = 'second_frames';
                        frameIndex = (i - 40) + 1;
                    } else if (i < 120) {
                        folder = 'third_frames';
                        frameIndex = (i - 80) + 1;
                    } else {
                        folder = 'fourth_frames';
                        frameIndex = (i - 120) + 1;
                    }

                    // Pad with zeros to 3 digits (001, 010, 100)
                    const paddedIndex = frameIndex.toString().padStart(3, '0');
                    const src = `/images/${folder}/ezgif-frame-${paddedIndex}.jpg`;

                    img.src = src;
                    img.onload = () => {
                        if (isMounted) {
                            loadedImages[i] = img;
                            loadedCount++;
                            setProgress(Math.round((loadedCount / frameCount) * 100));
                            resolve();
                        }
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load image: ${src}`, e);
                        // We resolve anyway to avoid hanging, but image will be missing
                        if (isMounted) {
                            loadedCount++; // Count it as processed
                            resolve();
                        }
                    };
                });
            });

            await Promise.all(imagePromises);

            if (isMounted) {
                setImages(loadedImages);
                setIsLoading(false);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [frameCount]);

    return { images, isLoading, progress };
};
