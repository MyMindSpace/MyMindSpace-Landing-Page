'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import JournalScroller from '@/components/JournalScroller';
import Image from 'next/image';

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Section 1: Intro (0-10%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Section 2: AI Journaling (10-30%)
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.15, 0.35], [-50, 0]);

  // Section 3: Therapy (40-60%)
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);

  // Section 4: Meditation (65-85%)
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.75, 0.85], [0, 1, 0]);
  const scale4 = useTransform(scrollYProgress, [0.65, 0.75], [0.9, 1]);

  // Section 5: CTA (85-100%)
  const opacity5 = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
  const y5 = useTransform(scrollYProgress, [0.85, 1], [50, 0]);

  return (
    <main className="relative h-[600vh] w-full">
      {/* Logo - Fixed */}
      <div className="fixed top-8 left-8 z-50 w-32 md:w-40">
        <Image
          src="/images/mymindspacelogo-new.png"
          alt="MyMindSpace Logo"
          width={200}
          height={60}
          className="object-contain"
        />
      </div>

      {/* Background Scroller */}
      <JournalScroller />

      {/* Text Overlays - Fixed Container to center content */}
      <div className="fixed inset-0 pointer-events-none z-10 flex items-center justify-center">

        {/* 1. Intro */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute top-1/2 -translate-y-1/2 right-4 md:right-24 text-right max-w-2xl px-8"
        >
          <h1 className="font-serif text-5xl md:text-7xl mb-6 text-[#1A1A1A] leading-tight">
            Your Mind,<br />
            Unfolded
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-600 max-w-lg ml-auto leading-relaxed">
            Journal, Therapist, Meditation Guru<br />
            For you, with you,<br />
            Always.
          </p>
          <button className="mt-8 px-8 py-3 bg-[#1A1A1A] text-white rounded-full font-sans font-medium hover:bg-gray-800 transition-colors pointer-events-auto">
            Try Now
          </button>
        </motion.div>

        {/* 2. Journaling (Left Aligned-ish) */}
        <motion.div
          style={{ opacity: opacity2, x: x2 }}
          className="absolute right-4 md:right-24 top-1/3 md:top-1/2 -translate-y-1/2 max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-lg"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#1A1A1A]">
            An AI that understands.
          </h2>
          <ul className="space-y-4 font-sans text-lg text-gray-700">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Smart Journaling
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Entity Recognition
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              Mood Analysis
            </li>
          </ul>
        </motion.div>

        {/* 3. Therapy (Right Aligned-ish) */}
        <motion.div
          style={{ opacity: opacity3, x: x3 }}
          className="absolute right-4 md:right-24 top-1/3 md:top-1/2 -translate-y-1/2 max-w-md p-8 rounded-2xl backdrop-blur-md bg-white/40 border border-white/20 shadow-lg text-right"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#1A1A1A]">
            Professional support, in your pocket.
          </h2>
          <p className="font-sans text-lg text-gray-700 mb-6">
            Meet your AI Therapist that feels human, private, and always available.
          </p>
        </motion.div>

        {/* 4. Meditation (Center) */}
        <motion.div
          style={{ opacity: opacity4, scale: scale4 }}
          className="absolute text-center max-w-2xl p-10 rounded-full backdrop-blur-sm bg-white/20 border border-white/10 shadow-2xl"
        >
          <h2 className="font-serif text-5xl md:text-6xl mb-6 text-[#1A1A1A]">
            Find your calm.
          </h2>
          <p className="font-sans text-xl text-gray-600">
            Guided meditations tailored to your current state of mind.
          </p>
        </motion.div>

        {/* 5. Closing & CTA */}
        <motion.div
          style={{ opacity: opacity5, y: y5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center w-full max-w-4xl px-4 pointer-events-auto"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-[#1A1A1A] text-shadow-sm">
            Discover Yourself.
          </h2>

          <div className="flex flex-col items-center gap-4">
            <button className="group relative px-8 py-4 bg-[#1A1A1A] text-[#FDFBF7] font-sans text-lg tracking-wide rounded-full overflow-hidden transition-all hover:scale-105 shadow-xl hover:shadow-2xl">
              <span className="relative z-10 flex items-center gap-2">
                Write Your First Journal !
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <p className="font-sans text-sm text-gray-600 max-w-md mx-auto font-medium">
              Join thousands of others finding clarity and peace.
            </p>
          </div>

          <footer className="mt-8 text-xs text-gray-500 font-sans">
            © 2026 MyMindSpace. All rights reserved.
          </footer>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: opacity1 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 text-black animate-bounce cursor-pointer z-20"
      >
        <div className="text-xs uppercase tracking-widest mb-2 font-sans">    Open your mind. <br /> Pause. Breathe. Scroll.</div>
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </main>
  );
}
