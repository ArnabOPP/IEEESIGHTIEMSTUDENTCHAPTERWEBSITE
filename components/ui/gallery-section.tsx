'use client';

import React from 'react';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import dynamic from 'next/dynamic';
const ParticleText = dynamic(() => import('@/components/ui/particle-text-canvas'), { ssr: false });
const GridAnimation = dynamic(
  () => import('@/components/ui/mouse-following-line').then(m => ({ default: m.GridAnimation })),
  { ssr: false }
);

const GALLERY_IMAGES = [
  { src: '/IMG_20210902_113528-scaled.jpg',                              alt: 'IEEE SIGHT IEM Community Outreach' },
  { src: '/mechanicalengineering.png',                                   alt: 'Engineering Workshop' },
  { src: '/technical-specifications-for-engineering-design-project.jpg', alt: 'Technical Conference' },
  { src: '/Why-is-Innovation-Important-in-Engineering-Education.png',    alt: 'Innovation in Education' },
  { src: '/abg.png',                                                     alt: 'IEEE Student Congress' },
  { src: '/istockphoto-535555239-612x612.jpg',                           alt: 'Humanitarian Technology' },
  { src: '/IEM Student Branch Chapter 2.png',                            alt: 'IEEE SIGHT IEM' },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="relative bg-white" style={{ overflow: 'clip' }}>
      {/* Full-section grid background — sticky so it stays in viewport while scrolling */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 h-screen w-full opacity-[0.25]" style={{ pointerEvents: 'auto' }}>
          <GridAnimation spacing={28} strokeLength={8} strokeWidth={1.8} lineColor="#000000" />
        </div>
      </div>

      {/* Header */}
      <div className="relative flex flex-col items-center gap-2 pt-16">
        <span className="relative z-10 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-blue-500 font-medium mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Moments from the Field
        </span>
        <div className="relative z-10 w-full">
        <ParticleText
          text="Our Gallery"
          fontSize={110}
          particleColor="#111111"
          mouseRadius={130}
          height={180}
          particleGap={4}
        />
        </div>
        <p className="relative z-10 text-gray-500 text-lg max-w-xl text-center leading-relaxed -mt-2 px-6">
          A glimpse into the events, workshops, and community drives that define IEEE SIGHT IEM.
        </p>
        <p className="relative z-10 text-gray-400 text-sm animate-bounce mt-1 mb-6">Scroll to explore ↓</p>
      </div>{/* end header */}

      <ZoomParallax images={GALLERY_IMAGES} />

      {/* Footer tagline */}
      <div className="flex items-center justify-center py-6 px-6 text-center">
        <p className="text-2xl md:text-4xl font-black text-gray-900 max-w-2xl leading-tight">
          Every photo tells a story of{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
            technology meeting humanity.
          </span>
        </p>
      </div>
    </section>
  );
}
