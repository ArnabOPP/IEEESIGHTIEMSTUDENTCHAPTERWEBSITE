'use client';

import { useScroll, useTransform, motion, MotionValue, useSpring } from 'framer-motion';
import React, { useRef, forwardRef } from 'react';
import TrailGrid from '@/components/ui/trail-grid';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
}

// ── Parallax types ──────────────────────────────────────────────
interface HeroParallaxCard {
  title: string;
  link: string;
  thumbnail: string;
}

const INITIATIVE_PRODUCTS: HeroParallaxCard[] = [
  { title: 'Rural Tech Outreach', link: '#', thumbnail: '/mechanicalengineering.png' },
  { title: 'Assistive Tech Workshops', link: '#', thumbnail: '/Why-is-Innovation-Important-in-Engineering-Education.png' },
  { title: 'IEEE Global Collaboration', link: '#', thumbnail: '/technical-specifications-for-engineering-design-project.jpg' },
  { title: 'Humanitarian Hackathons', link: '#', thumbnail: '/abg.png' },
  { title: 'Student Research Program', link: '#', thumbnail: '/IEM Student Branch Chapter 2.png' },
  { title: 'Community Health Drives', link: '#', thumbnail: '/istockphoto-535555239-612x612.jpg' },
  { title: 'Clean Energy Awareness', link: '#', thumbnail: '/IMG_20210902_113528-scaled.jpg' },
  { title: 'Digital Literacy Camps', link: '#', thumbnail: '/mechanicalengineering.png' },
  { title: 'IEEE Conference 2024', link: '#', thumbnail: '/technical-specifications-for-engineering-design-project.jpg' },
  { title: 'Women in Engineering', link: '#', thumbnail: '/Why-is-Innovation-Important-in-Engineering-Education.png' },
  { title: 'NGO Tech Partnerships', link: '#', thumbnail: '/abg.png' },
  { title: 'Smart Village Project', link: '#', thumbnail: '/IEM Student Branch Chapter 2.png' },
  { title: 'International SIGHT Summit', link: '#', thumbnail: '/istockphoto-535555239-612x612.jpg' },
  { title: 'Engineering Ethics Forum', link: '#', thumbnail: '/IMG_20210902_113528-scaled.jpg' },
  { title: 'Annual Tech for Good Expo', link: '#', thumbnail: '/mechanicalengineering.png' },
];

// ── Parallax product card ────────────────────────────────────────
const ProductCard = ({ product, translate }: { product: HeroParallaxCard; translate: MotionValue<number> }) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -20 }}
    className="group/product h-96 w-[30rem] relative flex-shrink-0"
  >
    <div className="block group-hover/product:shadow-2xl h-full w-full rounded-2xl overflow-hidden cursor-pointer border border-white/10 absolute inset-0">
      <img
        src={product.thumbnail}
        height="600"
        width="600"
        className="object-cover object-left-top absolute h-full w-full opacity-80 group-hover/product:opacity-100 transition-opacity"
        alt={product.title}
        loading="lazy"
      />
    </div>
    <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-100 bg-black/50 pointer-events-none transition-opacity rounded-2xl" />
    <h2 className="absolute bottom-4 left-4 text-white font-bold text-xl pointer-events-none drop-shadow-lg">
      {product.title}
    </h2>
  </motion.div>
);

// ── Parallax layout ──────────────────────────────────────────────
const HeroParallaxLayout = ({ products }: { products: HeroParallaxCard[] }) => {
  const firstRow  = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow  = products.slice(10, 15);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const translateX        = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]),  springConfig);
  const translateXReverse = useSpring(useTransform(scrollYProgress, [0, 1], [0, -1000]), springConfig);
  const rotateX   = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]),    springConfig);
  const opacity   = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),   springConfig);
  const rotateZ   = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]),    springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 200]), springConfig);

  return (
    <div
      ref={ref}
      className="h-[340vh] pt-40 pb-40 relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      {/* Header */}
      <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0">
        <p className="text-[11px] uppercase tracking-[0.22em] text-blue-400 mb-3">IEEE SIGHT IEM</p>
        <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
          All Our <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
            Initiatives
          </span>
        </h1>
        <p className="max-w-2xl text-base md:text-xl mt-6 text-white/50 font-normal leading-relaxed">
          From grassroots community outreach to international IEEE conferences — browse every initiative our chapter runs throughout the year.
        </p>
      </div>

      <motion.div style={{ rotateX, rotateZ, translateY, opacity }}>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((p) => <ProductCard product={p} translate={translateX} key={p.title} />)}
        </motion.div>
        <motion.div className="flex flex-row space-x-20 mb-20">
          {secondRow.map((p) => <ProductCard product={p} translate={translateXReverse} key={p.title} />)}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((p) => <ProductCard product={p} translate={translateX} key={p.title} />)}
        </motion.div>
      </motion.div>
    </div>
  );
};

// ── Section 1: Intro ─────────────────────────────────────────────
const Section1: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale  = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky font-semibold top-0 h-screen overflow-hidden bg-gradient-to-b from-[#0a1628] to-[#0d1f3c] flex flex-col items-center justify-center text-white"
    >
      <TrailGrid cellSize={48} duration={600} cellColor="#ffffff" position="absolute" revealImage="/bf7dc.png" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center" style={{ mixBlendMode: 'difference' }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-5 py-2 text-sm uppercase tracking-[0.22em] text-blue-300">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          IEEE SIGHT IEM · Initiatives
        </span>
        <h1 className="text-6xl md:text-8xl font-black text-center tracking-tight leading-[115%] max-w-5xl">
          Engineering Solutions <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">
            for Real-World Impact
          </span>
        </h1>
        <p className="text-slate-300 text-xl md:text-2xl max-w-2xl leading-relaxed font-normal">
          From rural villages to global forums — our initiatives bridge the gap between technology and humanity.
        </p>
        <p className="text-slate-500 text-base mt-2 animate-bounce">Scroll to explore ↓</p>
      </div>
    </motion.section>
  );
};

// ── Section 2: Parallax grid ─────────────────────────────────────
const Section2: React.FC<SectionProps> = ({ scrollYProgress }) => {
  const scale  = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.2], [5, 0]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className="relative bg-gradient-to-t to-[#050a12] from-[#020408] text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative z-10">
        <HeroParallaxLayout products={INITIATIVE_PRODUCTS} />
      </div>
    </motion.section>
  );
};

// ── Root component ───────────────────────────────────────────────
const InitiativesScrollSection = forwardRef<HTMLElement>((props, ref) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={container} className="relative h-[440vh] bg-white">
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </main>
  );
});

InitiativesScrollSection.displayName = 'InitiativesScrollSection';
export default InitiativesScrollSection;
