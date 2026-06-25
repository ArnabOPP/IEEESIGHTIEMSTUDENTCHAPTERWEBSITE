"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";

const ParticleText = dynamic(() => import("@/components/ui/particle-text-canvas"), { ssr: false });
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Member {
  name: string;
  role: string;
  initials: string;
  gradient: string;
  glowColor?: string;
  linkedin: string;
  photo?: string;
}

interface Domain {
  label: string;
  members: Member[];
  cols: 1 | 2 | 3 | 4;
}

// ─── Team Data ────────────────────────────────────────────────────────────────

const DOMAINS: Domain[] = [
  {
    label: "Faculty Advisor",
    cols: 1,
    members: [
      { name: "Prof. Samit Karmakar", role: "Faculty Advisor", initials: "SK", gradient: "135deg, #3b82f6, #6366f1, #8b5cf6", linkedin: "#", photo: "/12.png" },
    ],
  },
  {
    label: "Executive Committee",
    cols: 3,
    members: [
      { name: "Meesha Sinha",    role: "Chairperson",       initials: "MS", gradient: "135deg, #8b5cf6, #7c3aed", linkedin: "#", photo: "/211.png" },
      { name: "Sarbatriki Jana", role: "Vice Chairperson",  initials: "SJ", gradient: "135deg, #3b82f6, #06b6d4", linkedin: "#", photo: "/322.png" },
      { name: "Sneha Shaw",      role: "Secretary",         initials: "SS", gradient: "135deg, #6366f1, #3b82f6", linkedin: "#", photo: "/141.png" },
    ],
  },
  {
    label: "Office Bearers",
    cols: 4,
    members: [
      { name: "Abhishek Kumar",    role: "Project Co-ordinator", initials: "AK", gradient: "135deg, #10b981, #0d9488", linkedin: "#", photo: "/Untitled design (7).png" },
      { name: "Prachi Sil",        role: "Treasurer",            initials: "PS", gradient: "135deg, #f43f5e, #db2777", linkedin: "#", photo: "/Untitled design (6).png" },
      { name: "Soham Khan",        role: "Operational Lead",     initials: "SK", gradient: "135deg, #f59e0b, #ea580c", linkedin: "#", photo: "/Untitled design (5).png" },
      { name: "Arnab Chatterjee",  role: "Webmaster",            initials: "AC", gradient: "135deg, #60a5fa, #7c3aed", glowColor: "rgba(96,165,250,0.3)", linkedin: "#", photo: "/ArnabChatterjee.png" },
    ],
  },
  {
    label: "Core Committee",
    cols: 4,
    members: [
      { name: "Bipasha Maity",    role: "PR Lead",           initials: "BM", gradient: "135deg, #ec4899, #be185d", linkedin: "#", photo: "/1.png" },
      { name: "Ayushi Banerjee",  role: "Social Media Lead", initials: "AB", gradient: "135deg, #a855f7, #7c3aed", linkedin: "#", photo: "/2.png" },
      { name: "Mriganka Mandal",  role: "Graphics Lead",     initials: "MM", gradient: "135deg, #22d3ee, #3b82f6", linkedin: "#", photo: "/3.png" },
      { name: "Aditya Adhikary",  role: "Content Lead",      initials: "AA", gradient: "135deg, #22c55e, #059669", linkedin: "#", photo: "/4.png" },
    ],
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Member Card ───────────────────────────────────────────────────────────────

function MemberCard({ member, featured = false }: { member: Member; featured?: boolean }) {
  const cardH = featured ? 340 : 280;
  const imgH  = featured ? 420 : 340;

  return (
    <motion.div
      variants={itemVariants}
      className="group relative"
      style={{ height: imgH }}
    >
      {/* ── Glow behind the image ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 pointer-events-none z-20"
        style={{
          height: imgH * 0.6,
          background: `radial-gradient(ellipse at 50% 80%, ${member.glowColor ?? "rgba(96,165,250,0.25)"}, transparent 70%)`,
          filter: "blur(18px)",
        }}
      />

      {/* ── Image — outside card, not clipped, overflows above freely ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none z-30"
        style={{ height: imgH }}
      >
        {member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-contain object-bottom drop-shadow-2xl"
          />
        ) : (
          <div className="w-full h-full flex items-end justify-center pb-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-black text-white ring-4 ring-white/10 shadow-xl"
              style={{ background: `linear-gradient(${member.gradient})` }}
            >
              {member.initials}
            </div>
          </div>
        )}
      </div>

      {/* 1. Card background shell — z-10, no overflow clip needed */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-2xl z-10"
        style={{
          height: cardH,
          background: "rgba(255,255,255,0.04)",
          boxShadow: "inset 1px 0 0 rgba(255,255,255,0.1), inset -1px 0 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.1)",
        }}
      />

      {/* 2. Gradient for text readability — z-40, above image, skipped for Arnab */}
      {member.name !== "Arnab Chatterjee" && (
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-2xl pointer-events-none z-40"
          style={{ height: cardH, background: "linear-gradient(to top, rgba(0,0,0,0.95) 40%, rgba(0,0,0,0.5) 70%, transparent 100%)" }}
        />
      )}

      {/* 3. Text — z-50, on top of everything */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 z-50">
        <p className={`font-bold text-white leading-tight ${featured ? "text-xl" : "text-base"}`}>
          {member.name}
        </p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-blue-300/80 font-medium">
          {member.role}
        </p>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-white/35 hover:text-blue-400 transition-colors duration-200"
        >
          <LinkedInIcon className="w-3 h-3" />
          Connect on LinkedIn
        </a>
      </div>

      {/* 4. LinkedIn hover badge — z-50 */}
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-50 flex items-center justify-center w-7 h-7 rounded-full bg-white/10 border border-white/15 text-white/40 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-500/80 hover:text-white"
      >
        <LinkedInIcon className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

// ─── Domain Group ──────────────────────────────────────────────────────────────

const colsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

function DomainGroup({ domain }: { domain: Domain }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-6">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.28em] text-blue-400 font-semibold whitespace-nowrap">
          {domain.label}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-blue-400/30 to-transparent" />
      </motion.div>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`grid gap-5 ${colsMap[domain.cols]} ${domain.members.length === 1 ? "max-w-sm mx-auto w-full" : ""}`}
      >
        {domain.members.map((m) => (
          <MemberCard key={m.name} member={m} featured={domain.members.length === 1} />
        ))}
      </motion.div>
    </div>
  );
}

// ─── Team Section ──────────────────────────────────────────────────────────────

export default function TeamSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="team"
      className="relative bg-black py-28 overflow-hidden rounded-t-[2.5rem] -mt-10 z-10"
      style={{
        backgroundImage: "radial-gradient(circle, #ffffff18 1.5px, transparent 1.5px)",
        backgroundSize: "24px 24px",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      {/* ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center gap-4 mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-blue-400 font-medium"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            The People Behind the Mission
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <ParticleText
              text="Meet The Team"
              fontSize={90}
              particleColor="#ffffff"
              mouseRadius={130}
              height={160}
              particleGap={4}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/45 text-base max-w-xl leading-relaxed"
          >
            A dedicated group of students and faculty working together to build technology that serves humanity.
          </motion.p>
        </div>

        {/* Domain groups */}
        <div className="flex flex-col gap-16">
          {DOMAINS.map((d) => (
            <DomainGroup key={d.label} domain={d} />
          ))}
        </div>

      </div>
    </section>
  );
}
