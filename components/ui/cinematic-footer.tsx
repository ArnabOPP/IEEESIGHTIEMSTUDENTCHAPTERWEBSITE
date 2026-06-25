"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ── Styles ────────────────────────────────────────────────────────────────────

const STYLES = `
@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.9; }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%,100% { transform: scale(1);   filter: drop-shadow(0 0 4px rgba(239,68,68,0.5)); }
  15%,45% { transform: scale(1.25); filter: drop-shadow(0 0 10px rgba(239,68,68,0.9)); }
  30%     { transform: scale(1); }
}
.animate-footer-breathe        { animation: footer-breathe 8s ease-in-out infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 36s linear infinite; }
.animate-footer-heartbeat      { animation: footer-heartbeat 2s cubic-bezier(0.25,1,0.5,1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(59,130,246,0.18) 0%,
    rgba(99,102,241,0.12) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 100%);
  border-color: rgba(255,255,255,0.18);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.15);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.04);
  background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.4) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 24px rgba(96,165,250,0.25));
}
`;

// ── Magnetic Button ───────────────────────────────────────────────────────────

type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { as?: React.ElementType };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const ctx = gsap.context(() => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left - r.width / 2;
          const y = e.clientY - r.top - r.height / 2;
          gsap.to(el, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.15, rotationY: x * 0.15, scale: 1.05, ease: "power2.out", duration: 0.4 });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: "elastic.out(1,0.3)", duration: 1.2 });
        el.addEventListener("mousemove", onMove as any);
        el.addEventListener("mouseleave", onLeave);
        return () => { el.removeEventListener("mousemove", onMove as any); el.removeEventListener("mouseleave", onLeave); };
      }, el);
      return () => ctx.revert();
    }, []);

    const Comp = Component as React.ElementType<any>;
    return (
      <Comp
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        <>{children}</>
      </Comp>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// ── Marquee ───────────────────────────────────────────────────────────────────

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6 text-white/30">
    <span>Humanitarian Technology</span> <span className="text-blue-400/60">✦</span>
    <span>IEEE SIGHT IEM SBC</span>       <span className="text-blue-400/60">✦</span>
    <span>Engineering for Good</span>     <span className="text-blue-400/60">✦</span>
    <span>Global IEEE Network</span>      <span className="text-blue-400/60">✦</span>
    <span>Community Impact</span>         <span className="text-blue-400/60">✦</span>
    <span>IEM Student Branch</span>       <span className="text-blue-400/60">✦</span>
  </div>
);

// ── Icons ─────────────────────────────────────────────────────────────────────

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
  </svg>
);

const ArrowDiagIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Main Component ────────────────────────────────────────────────────────────

export function CinematicFooter() {
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const giantTextRef  = useRef<HTMLDivElement>(null);
  const headingRef    = useRef<HTMLHeadingElement>(null);
  const linksRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        { y: "0vh", scale: 1, opacity: 1, ease: "power1.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1 } }
      );
      gsap.fromTo([headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: wrapperRef.current, start: "top 40%", end: "bottom bottom", scrub: 1 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div ref={wrapperRef} className="relative w-full">
        <footer className="relative flex min-h-screen w-full flex-col justify-between bg-black text-white" style={{ overflow: 'clip' }}>

          {/* Ambient glow */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          {/* Grid */}
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />
          {/* Giant text */}
          <div ref={giantTextRef} className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none">
            SIGHT
          </div>

          {/* Marquee */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-white/8 bg-black/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110">
            <div className="flex w-max animate-footer-scroll-marquee text-xs font-bold tracking-[0.3em] uppercase">
              <MarqueeItem /><MarqueeItem />
            </div>
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] text-blue-400 font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              IEEE SIGHT IEM Student Branch Chapter
            </span>

            <h2 ref={headingRef} className="text-5xl md:text-7xl font-black footer-text-glow tracking-tighter mb-12 text-center">
              Let's build a better<br />world together.
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary CTAs */}
              <div className="flex flex-wrap justify-center gap-4">
                <MagneticButton as="a" href="#"
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-bold text-sm flex items-center gap-3 group border-blue-400/20 bg-blue-500/10 hover:bg-blue-500/20">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  Join IEEE SIGHT IEM
                  <ArrowDiagIcon />
                </MagneticButton>

                <MagneticButton as="a" href="https://instagram.com/ieee.sight.iem" target="_blank" rel="noopener noreferrer"
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-bold text-sm flex items-center gap-3 group">
                  <InstagramIcon />
                  Instagram
                  <ArrowDiagIcon />
                </MagneticButton>

                <MagneticButton as="a" href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-bold text-sm flex items-center gap-3 group">
                  <LinkedInIcon />
                  LinkedIn
                  <ArrowDiagIcon />
                </MagneticButton>
              </div>

              {/* Secondary links */}
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {["About Us", "Our Initiatives", "Conferences", "Contact"].map(label => (
                  <MagneticButton key={label} as="a" href="#"
                    className="footer-glass-pill px-5 py-2.5 rounded-full text-white/40 font-medium text-xs hover:text-white">
                    {label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="text-white/30 text-[10px] font-semibold tracking-widest uppercase order-2 md:order-1">
              © {new Date().getFullYear()} IEEE SIGHT IEM SBC. All rights reserved.
            </div>

            <div className="footer-glass-pill px-6 py-3 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm text-red-400">❤</span>
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">by</span>
              <span className="text-white font-black text-xs ml-1">IEEE SIGHT IEM</span>
            </div>

            <MagneticButton as="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-white/40 hover:text-white group order-3">
              <span className="transform group-hover:-translate-y-1 transition-transform duration-300">
                <ArrowUpIcon />
              </span>
            </MagneticButton>
          </div>

        </footer>
      </div>
    </>
  );
}
