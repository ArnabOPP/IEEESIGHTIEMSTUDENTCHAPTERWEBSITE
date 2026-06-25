"use client";

import dynamic from "next/dynamic";

const ScrollStack = dynamic(() => import("@/components/ui/ScrollStack"), { ssr: false });
const ScrollStackItem = dynamic(
  () => import("@/components/ui/ScrollStack").then((m) => ({ default: m.ScrollStackItem })),
  { ssr: false }
);


// ── Icons ──────────────────────────────────────────────────────────────────────

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Cards ──────────────────────────────────────────────────────────────────────

function JoinUsCard() {
  return (
    <div className="relative w-full h-full flex flex-col gap-6 p-8 md:p-12 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0d1f4a 50%, #0a1628 100%)" }}
    >
      {/* Grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-blue-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          IEEE SIGHT IEM
        </span>

        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
          Ready to make<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-400">
            an impact?
          </span>
        </h2>

        <p className="text-white/50 text-lg max-w-xl leading-relaxed">
          Join IEEE SIGHT IEM and be part of a community that uses technology to solve real humanitarian problems. Open to all IEM students.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-4 items-center">
        <a
          href="#"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all duration-300 hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98]"
        >
          Join Us Now
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/8">
            <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>
        <span className="text-white/30 text-sm">Free to join · No experience needed</span>
      </div>

      {/* Decorative large number */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[18rem] font-black text-white/[0.03] leading-none select-none pointer-events-none">
        ∞
      </div>
    </div>
  );
}

function InstagramCard() {
  return (
    <div className="relative w-full h-full flex flex-col gap-6 p-8 md:p-12 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #2d0a3e 40%, #1a0e2a 100%)" }}
    >
      {/* Instagram gradient glow */}
      <div className="absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(214,41,118,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(253,140,0,0.3) 0%, transparent 60%)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex flex-col gap-6">
        <div>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)" }}
            >
              <InstagramIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">Instagram</p>
              <p className="text-white/40 text-sm">@ieee.sight.iem</p>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            Follow our<br />
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #f09433, #e6683c, #dc2743, #cc2366)" }}
            >
              journey.
            </span>
          </h2>

          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Behind-the-scenes, event highlights, tech talks and community moments — all on our Instagram.
          </p>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-4 items-center">
        <a
          href="https://instagram.com/ieee.sight.iem"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #f09433, #dc2743, #bc1888)" }}
        >
          <InstagramIcon className="w-4 h-4" />
          Follow @ieee.sight.iem
          <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Decorative */}
      <div className="absolute right-10 bottom-10 opacity-5 select-none pointer-events-none">
        <InstagramIcon className="w-64 h-64 text-white" />
      </div>
    </div>
  );
}

function LinkedInCard() {
  return (
    <div className="relative w-full h-full flex flex-col gap-6 p-8 md:p-12 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #051020 0%, #062040 50%, #051828 100%)" }}
    >
      {/* LinkedIn blue glow */}
      <div className="absolute inset-0 opacity-25"
        style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(10,102,194,0.6) 0%, transparent 60%)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#0a66c2]">
            <LinkedInIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-lg">LinkedIn</p>
            <p className="text-white/40 text-sm">IEEE SIGHT IEM SBC</p>
          </div>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
          Connect &<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a66c2] to-[#70b5f9]">
            grow together.
          </span>
        </h2>

        <p className="text-white/50 text-lg max-w-xl leading-relaxed">
          Stay updated on our latest projects, research, events, and opportunities. Network with IEEE professionals worldwide.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-4 items-center">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-[#0a66c2] hover:bg-[#0856a0]"
        >
          <LinkedInIcon className="w-4 h-4" />
          Follow on LinkedIn
          <ArrowIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      {/* Decorative */}
      <div className="absolute right-10 bottom-10 opacity-5 select-none pointer-events-none">
        <LinkedInIcon className="w-64 h-64 text-white" />
      </div>
    </div>
  );
}

// ── Social Section ─────────────────────────────────────────────────────────────

export default function SocialSection() {
  return (
    <section id="social" className="relative bg-black px-4 md:px-12 py-8 md:py-12 pb-10 md:pb-[80vh]">

      {/* Mobile: plain vertical cards */}
      <div className="flex flex-col gap-5 md:hidden">
        <div className="rounded-3xl overflow-hidden h-[70vh]"><JoinUsCard /></div>
        <div className="rounded-3xl overflow-hidden h-[70vh]"><InstagramCard /></div>
        <div className="rounded-3xl overflow-hidden h-[70vh]"><LinkedInCard /></div>
      </div>

      {/* Desktop: stacking ScrollStack */}
      <div className="hidden md:block">
        <ScrollStack
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="25%"
          scaleEndPosition="12%"
          baseScale={0.88}
          rotationAmount={0}
          blurAmount={1}
        >
          <ScrollStackItem itemClassName="h-[70vh]">
            <JoinUsCard />
          </ScrollStackItem>
          <ScrollStackItem itemClassName="h-[70vh]">
            <InstagramCard />
          </ScrollStackItem>
          <ScrollStackItem itemClassName="h-[70vh]">
            <LinkedInCard />
          </ScrollStackItem>
        </ScrollStack>
      </div>

    </section>
  );
}
