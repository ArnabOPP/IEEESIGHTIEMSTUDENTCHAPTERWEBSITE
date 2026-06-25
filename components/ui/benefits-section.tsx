"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { Globe2, Cpu, Users, Award } from "lucide-react";
import Image from "next/image";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });
const ImageTrail = dynamic(() => import("@/components/ui/image-trail"), { ssr: false });

const TRAIL_IMAGES = [
  "/IMG_20210902_113528-scaled.jpg",
  "/mechanicalengineering.png",
  "/technical-specifications-for-engineering-design-project.jpg",
  "/Why-is-Innovation-Important-in-Engineering-Education.png",
  "/abg.png",
  "/istockphoto-535555239-612x612.jpg",
  "/IEM Student Branch Chapter 2.png",
  "/IMG_20210902_113528-scaled.jpg",
  "/mechanicalengineering.png",
  "/technical-specifications-for-engineering-design-project.jpg",
  "/Why-is-Innovation-Important-in-Engineering-Education.png",
  "/abg.png",
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function parseMetricValue(raw: string) {
  const value = (raw ?? "").toString().trim();
  const m = value.match(
    /^([^\d\-+]*?)\s*([\-+]?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*([^\d\s]*)$/
  );
  if (!m) return { prefix: "", end: 0, suffix: value, decimals: 0 };
  const [, prefix, num, suffix] = m;
  const normalized = num.replace(/,/g, "");
  const end = parseFloat(normalized);
  const decimals = normalized.split(".")[1]?.length ?? 0;
  return { prefix: prefix ?? "", end: isNaN(end) ? 0 : end, suffix: suffix ?? "", decimals };
}

function MetricStat({
  value,
  label,
  sub,
  duration = 1.6,
}: {
  value: string;
  label: string;
  sub?: string;
  duration?: number;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const { prefix, end, suffix, decimals } = parseMetricValue(value);

  return (
    <div className="flex flex-col gap-2 text-left p-6 border border-dashed border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-sm">
      <p
        className="text-3xl font-black text-white sm:text-4xl tracking-tight"
        aria-label={`${label} ${value}`}
      >
        {prefix}
        {reduceMotion ? (
          <span>
            {end.toLocaleString(undefined, {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })}
          </span>
        ) : (
          <CountUp
            end={end}
            decimals={decimals}
            duration={duration}
            separator=","
            enableScrollSpy
            scrollSpyOnce
          />
        )}
        {suffix}
      </p>
      <p className="font-semibold text-white text-sm uppercase tracking-widest">
        {label}
      </p>
      {sub && (
        <p className="text-gray-400 text-sm">{sub}</p>
      )}
    </div>
  );
}

const CYCLING_WORDS = [
  "a member",
  "a leader",
  "an innovator",
  "a changemaker",
  "an engineer",
  "a visionary",
  "a volunteer",
  "a builder",
];

function CyclingWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = CYCLING_WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      // typing
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      // pause then start deleting
      timeout = setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && displayed.length > 0) {
      // deleting
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      // move to next word
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % CYCLING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, wordIndex]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300 inline-block">
      {displayed}
      <span className="animate-pulse text-blue-400 not-italic">|</span>
    </span>
  );
}

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const clipStart = useTransform(scrollYProgress, [0, 0.18], [20, 0]);
  const clipEnd   = useTransform(scrollYProgress, [0, 0.18], [80, 100]);
  const clipPath  = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;

  const benefits = [
    {
      id: 1,
      icon: Globe2,
      headline: "Global IEEE Network",
      tagline: "Connect beyond the classroom",
      quote:
        "Being part of IEEE SIGHT IEM opened doors I never expected. I collaborated with engineers from 12 countries on a clean-water IoT project and walked away with contacts that turned into a research internship abroad.",
      name: "Priya Dutta",
      role: "Final Year ECE, IEM · SIGHT Core Team",
      image: "/IMG_20210902_113528-scaled.jpg",
      metrics: [
        { value: "400+", label: "IEEE Chapters Worldwide", sub: "Access to global IEEE network" },
        { value: "12+", label: "Countries Collaborated", sub: "Cross-border project experience" },
      ],
    },
    {
      id: 2,
      icon: Cpu,
      headline: "Hands-On Technical Skills",
      tagline: "Build things that matter",
      quote:
        "The workshops and hackathons gave me practical exposure to IoT, embedded systems, and AI for social good — skills no syllabus covered. I shipped my first real hardware prototype here.",
      name: "Rohan Bose",
      role: "3rd Year EE, IEM · SIGHT Technical Lead",
      image: "/mechanicalengineering.png",
      metrics: [
        { value: "20+", label: "Workshops Per Year", sub: "IoT, AI, embedded systems & more" },
        { value: "48h", label: "Hackathon Sprints", sub: "Build real solutions under pressure" },
      ],
    },
    {
      id: 3,
      icon: Award,
      headline: "Recognition & Career Edge",
      tagline: "Your work gets seen",
      quote:
        "Representing IEM at the IEEE Student Congress and placing in the top 3 changed everything on my résumé. Recruiters specifically asked about SIGHT projects during campus placements.",
      name: "Ananya Sen",
      role: "Alumna, IEM 2024 · Now at Tata Consultancy Services",
      image: "/technical-specifications-for-engineering-design-project.jpg",
      metrics: [
        { value: "6", label: "Annual Events", sub: "Conferences, congresses & summits" },
        { value: "85%", label: "Placement Edge", sub: "Members report stronger placement outcomes" },
      ],
    },
    {
      id: 4,
      icon: Users,
      headline: "Community & Leadership",
      tagline: "Grow as a person, not just an engineer",
      quote:
        "Managing a 30-member team for the Rural Tech Hackathon taught me more about leadership and execution than any course. SIGHT is where I learned that engineering is fundamentally about people.",
      name: "Arjun Ghosh",
      role: "2nd Year CSE, IEM · SIGHT Chapter President",
      image: "/abg.png",
      metrics: [
        { value: "300+", label: "Active Members", sub: "A driven, mission-aligned community" },
        { value: "4", label: "Leadership Tracks", sub: "Technical, events, outreach & media" },
      ],
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="benefits"
      className="relative py-32 bg-black overflow-hidden"
      aria-labelledby="benefits-heading"
      style={{
        clipPath,
        backgroundImage: "radial-gradient(circle, #ffffff18 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* ImageTrail covers the full section */}
      <div className="absolute inset-0 z-0">
        <ImageTrail items={TRAIL_IMAGES} variant={2} />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-blue-300 font-medium w-fit mx-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Why Join IEEE SIGHT IEM
          </span>
          <h2
            id="benefits-heading"
            className="text-4xl font-black md:text-6xl tracking-tight text-white"
          >
            What you gain<br />
            as <CyclingWord />
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Real skills, real connections, real impact — hear it from the people
            who lived it.
          </p>
          </div>
        </div>

        {/* Benefit cards */}

        <div className="flex flex-col gap-16">
          {benefits.map((benefit, idx) => {
            const reversed = idx % 2 === 1;
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.id}
                className="grid gap-10 lg:grid-cols-3 xl:gap-20 items-center border-b border-gray-800 pb-16 last:border-0"
              >
                {/* Quote + image block */}
                <div
                  className={[
                    "flex flex-col sm:flex-row gap-8 lg:col-span-2 text-left",
                    reversed
                      ? "lg:order-2 lg:border-l border-gray-800 lg:pl-12 xl:pl-16"
                      : "lg:border-r border-gray-800 lg:pr-12 xl:pr-16",
                  ].join(" ")}
                >
                  <div className="relative flex-shrink-0 w-full max-w-[200px]">
                    <Image
                      src={benefit.image}
                      alt={benefit.name}
                      width={240}
                      height={300}
                      className="aspect-[4/5] h-auto w-full rounded-2xl object-cover ring-1 ring-white/10 hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    {/* Icon badge */}
                    <div className="absolute -bottom-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 shadow-lg">
                      <Icon size={18} className="text-white" strokeWidth={2} />
                    </div>
                  </div>

                  <figure className="flex flex-col justify-between gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-[0.22em] text-blue-500 dark:text-blue-400 font-semibold">
                        {benefit.tagline}
                      </p>
                      <h3 className="text-xl font-black text-white leading-tight">
                        {benefit.headline}
                      </h3>
                    </div>
                    <blockquote className="text-gray-300 text-base leading-relaxed italic border-l-2 border-blue-400 pl-4">
                      &ldquo;{benefit.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex flex-col gap-0.5">
                      <span className="font-semibold text-white text-sm">
                        {benefit.name}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {benefit.role}
                      </span>
                    </figcaption>
                  </figure>
                </div>

                {/* Metrics */}
                <div
                  className={[
                    "grid grid-cols-1 gap-4 self-center",
                    reversed ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  {benefit.metrics.map((metric, i) => (
                    <MetricStat
                      key={`${benefit.id}-${i}`}
                      value={metric.value}
                      label={metric.label}
                      sub={metric.sub}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <p className="text-gray-400 text-lg max-w-lg">
            Open to all IEM students. No prerequisites — just curiosity and a
            drive to make technology count.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-600 active:scale-[0.98] shadow-lg shadow-blue-500/25"
          >
            Join IEEE SIGHT IEM
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
