"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import Globe from "@/components/ui/globe";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Users, Command, Plus } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 10 },
  },
};

// --- Shared corner + icons ---
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={cn("size-6 text-white", className)}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
);

const CornerPlus = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
);

const PlusCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "relative border border-dashed border-white/40 bg-black/40 backdrop-blur-sm min-h-[200px] p-6 flex flex-col justify-between",
      className
    )}
  >
    <CornerPlus />
    <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
  </div>
);

// --- Cards ---

const STARS = Array.from({ length: 80 }, (_, i) => {
  const x = (i * 137 + 50) % 420
  const y = (i * 97 + 30) % 520
  const size = i % 5 === 0 ? "1.5px" : "1px"
  const opacity = 0.3 + (i % 7) * 0.1
  return { x, y, size, opacity }
})

const GlobalNetworkCard = () => (
  <div className="relative border border-dashed border-white/40 min-h-[520px] flex flex-col overflow-hidden bg-black">
    <CornerPlus />

    {/* Starry background */}
    <div className="absolute inset-0">
      {STARS.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `twinkling ${2 + (i % 4)}s ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </div>

    {/* Globe — centered, bleeds out at bottom */}
    <div className="flex justify-center items-center pt-8 flex-1">
      <div className="relative">
        {/* Glow ring behind globe */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl scale-110" />
        <Globe />
      </div>
    </div>

    {/* Text + CTA pinned to bottom */}
    <div className="relative z-10 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent space-y-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-blue-300 font-medium">Global Reach</span>
      </div>
      <h3 className="text-2xl font-bold text-white leading-tight">IEEE Global Network</h3>
      <p className="text-white/60 text-sm leading-relaxed">
        IEM students connect with engineers, researchers, and humanitarian technologists worldwide — collaborating on cross-border projects and representing their chapter at international forums.
      </p>
      <div className="pt-2">
        <Button variant="outline" size="sm" className="border-white/30 text-white bg-white/10 hover:bg-white/20">
          <Users className="mr-2 h-4 w-4" />
          Get Involved
        </Button>
      </div>
    </div>
  </div>
);

const MEMBER_AVATARS = [
  { src: "https://i.pravatar.cc/150?img=11", label: "Arjun Sharma" },
  { src: "https://i.pravatar.cc/150?img=47", label: "Priya Das" },
  { src: "https://i.pravatar.cc/150?img=32", label: "Rohan Mehta" },
  { src: "https://i.pravatar.cc/150?img=56", label: "Sneha Roy" },
  { src: "https://i.pravatar.cc/150?img=19", label: "Aditya Sen" },
]

const ActiveMembersCard = () => (
  <PlusCard className="h-full justify-between">
    {/* Top stat */}
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Community</p>
        <h3 className="text-4xl font-black text-white leading-none">300+</h3>
        <p className="text-white/50 text-sm mt-1">Active members at IEM</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1.5 rounded-full border border-green-400/30 bg-green-500/10 px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-green-300 font-medium">Growing</span>
        </div>
        <span className="text-[10px] text-white/30">2024–25</span>
      </div>
    </div>

    {/* Divider */}
    <div className="w-full h-px bg-white/10 my-2" />

    {/* Avatar group + label */}
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-widest text-white/35">Core Team</p>
      <AvatarGroup avatars={MEMBER_AVATARS} maxVisible={5} size={44} overlap={12} />
      <p className="text-white/40 text-xs">Hover to see names · +295 more members</p>
    </div>
  </PlusCard>
);

const ProjectsCard = () => (
  <div className="relative border border-dashed border-white/40 min-h-[200px] h-full flex flex-col items-center justify-center">
    <CornerPlus />
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/Why-is-Innovation-Important-in-Engineering-Education.png"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/55" />
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center gap-1 text-center">
      <span className="text-8xl font-bold text-white">12+</span>
      <span className="text-xs text-white/60 font-medium tracking-widest uppercase">Active Projects</span>
    </div>
  </div>
);

const ImpactCard = () => (
  <div className="relative border border-dashed border-white/40 min-h-[200px] h-full flex flex-col justify-between p-6">
    <CornerPlus />
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/istockphoto-535555239-612x612.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
    <div className="relative z-10 flex items-start justify-between">
      <div>
        <h3 className="text-base font-semibold text-white">Social Impact</h3>
        <p className="text-white/50 text-sm">Communities reached in 2024</p>
      </div>
      <Badge variant="outline" className="border-blue-400/50 text-blue-300 bg-blue-500/10">
        Humanitarian
      </Badge>
    </div>
    <div className="relative z-10">
      <span className="text-6xl font-bold text-white">48+</span>
    </div>
    <div className="relative z-10 flex justify-between text-xs text-white/50">
      <span>Villages & NGOs served</span>
      <span>Annual reach</span>
    </div>
  </div>
);

const MissionCard = () => (
  <PlusCard className="h-full justify-between gap-4">
    {/* Top icon */}
    <div className="flex items-center justify-between">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10">
        <span className="text-lg">💡</span>
      </div>
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium">Vision</span>
    </div>

    {/* Quote mark */}
    <p className="text-5xl font-black text-blue-400/30 leading-none select-none">"</p>

    {/* Vision text */}
    <div className="space-y-3 flex-1">
      <h3 className="text-lg font-bold text-white leading-snug">
        Our Vision at IEM
      </h3>
      <p className="text-white/55 text-sm leading-relaxed italic">
        To build a generation of engineers at IEM who create technology that uplifts lives, bridges gaps, and serves those who need it most.
      </p>
    </div>

    {/* Bottom accent line */}
    <div className="w-10 h-0.5 bg-gradient-to-r from-blue-400 to-transparent" />
  </PlusCard>
);

const JoinCard = () => (
  <div className="relative border border-dashed border-white/40 min-h-[220px] h-full overflow-visible">
    <CornerPlus />

    {/* Background image */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="/IMG_20210902_113528-scaled.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* gradient: dark left, fades right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
    </div>

    {/* Content */}
    <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between gap-6 p-8">

      {/* Left: text */}
      <div className="flex flex-col gap-4 max-w-sm">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">Open Enrollment</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
          Become part of<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">IEEE SIGHT IEM</span>
        </h3>
        <p className="text-white/55 text-sm leading-relaxed">
          Open to all IEM students. Build real projects, collaborate with global IEEE chapters, and engineer solutions that create lasting humanitarian impact.
        </p>
      </div>

      {/* Right: stats + CTA */}
      <div className="flex flex-col items-start md:items-end gap-5 shrink-0">
        <div className="flex gap-6">
          {[["300+", "Members"], ["12+", "Projects"], ["6", "Events/yr"]].map(([num, label]) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-black text-white">{num}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">{label}</span>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-500 hover:bg-blue-50 active:scale-[0.98]"
        >
          Apply Now
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        </a>
      </div>

    </div>
  </div>
);

// --- Section ---

export default function IemSightFeaturesBento() {
  return (
    <section className="relative w-full px-4 py-16 md:px-10 overflow-hidden">
      <Image
        src="/technical-specifications-for-engineering-design-project.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mb-10 text-center">
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/60 mb-3">About IEEE SIGHT IEM</p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Who we are & what we do
        </h2>
        <p className="text-lg text-white/75 max-w-xl mx-auto">
          IEEE SIGHT at IEM empowers students to engineer solutions for the world's most pressing humanitarian challenges.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 grid w-full grid-cols-1 gap-8 md:grid-cols-3 md:grid-rows-3 auto-rows-[minmax(180px,auto)]"
      >
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3">
          <GlobalNetworkCard />
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <ActiveMembersCard />
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <ProjectsCard />
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <ImpactCard />
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
          <MissionCard />
        </motion.div>
        <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
          <JoinCard />
        </motion.div>
      </motion.div>
    </section>
  );
}
