import Image from "next/image"
import { NavBarDemo } from "@/components/ui/demo"
import { IeeeLogo3D } from "@/components/ui/ieee-logo-3d"
import IemSightBentoCards from "@/components/ui/ruixen-bento-cards"
import IemSightFeaturesBento from "@/components/ui/bento-product-features"
import InitiativesScrollSection from "@/components/ui/hero-scroll-animation"
import ConferencesBentoCards from "@/components/ui/conferences-bento"
import BenefitsSection from "@/components/ui/benefits-section"
import GallerySection from "@/components/ui/gallery-section"
import SphereGallerySection from "@/components/ui/sphere-gallery-section"
import TeamSection from "@/components/ui/team-section"
import SocialSection from "@/components/ui/social-section"
import { CinematicFooter } from "@/components/ui/cinematic-footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground [overflow-x:clip]">
      {/* Global Header & Navigation Links */}
      <NavBarDemo />

      {/* Hero Section */}
      <section id="home" className="relative w-full min-h-screen flex items-center px-5 md:px-16 lg:px-24 z-10">
        
        {/* Background Video Layer */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
          <video
            src="/bgp.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        </div>

        {/* Responsive Grid System splitting Content and 3D Canvas */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mt-20 pb-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-white">

            {/* Eyebrow pill */}
            <div className="animate-fade-up animation-delay-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] font-medium text-white/70">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                Special Interest Group on Humanitarian Technology
              </span>
            </div>

            {/* Logo + Brand identity */}
            <div className="animate-fade-up animation-delay-200 flex items-center gap-4 md:gap-6">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-blue-400/25 blur-2xl rounded-full scale-110" />
                <Image
                  src="/IEM Student Branch Chapter.png"
                  alt="IEM SIGHT Emblem"
                  width={210}
                  height={210}
                  className="relative object-contain invert brightness-200 drop-shadow-[0_0_24px_rgba(96,165,250,0.5)] w-[120px] md:w-[160px] lg:w-[210px] h-auto"
                />
              </div>
              <div className="flex flex-col border-l border-white/15 pl-4 md:pl-6">
                <span className="text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-white/50 font-medium mb-1">IEM Student Branch Chapter</span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight">
                  IEEE<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">SIGHT</span>
                </h1>
              </div>
            </div>

            {/* Divider */}
            <div className="animate-fade-up animation-delay-350 w-16 h-px bg-gradient-to-r from-blue-400/60 to-transparent" />

            {/* Description — double-bezel card */}
            <div className="animate-fade-up animation-delay-350 max-w-lg rounded-2xl border border-white/8 bg-white/4 p-1">
              <div className="rounded-[calc(1rem-2px)] bg-white/3 px-5 py-4">
                <p className="text-sm md:text-base leading-relaxed text-white/70 font-light">
                  Empowering students to harness engineering for humanitarian impact — through global initiatives, cutting-edge conferences, and a mission-driven volunteer community.
                </p>
              </div>
            </div>

            {/* Stats row */}
            <div className="animate-fade-up animation-delay-500 flex gap-8">
              {[["12+", "Active Projects"], ["300+", "Members"], ["6", "Annual Events"]].map(([num, label]) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-2xl font-black tracking-tight text-white">{num}</span>
                  <span className="text-[11px] text-white/45 uppercase tracking-widest font-medium">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="animate-fade-up animation-delay-650 flex flex-wrap gap-3 items-center">
              <a
                href="#about"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-blue-50 active:scale-[0.98]"
              >
                Explore More
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/8 text-xs transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="#initiatives"
                className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-white/15 active:scale-[0.98]"
              >
                Our Initiatives
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-xs transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  →
                </span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D STL Object Canvas Wrapper (Occupies 5 columns) */}
          <div className="hidden lg:flex lg:col-span-5 w-full items-center justify-center">
            <div className="w-full max-w-md bg-transparent">
              <IeeeLogo3D />
            </div>
          </div>

        </div>

      </section>

      {/* About Section */}
      <div id="about">
        <IemSightBentoCards />
        <IemSightFeaturesBento />
      </div>

      {/* Initiatives Scroll Section */}
      <div id="initiatives">
        <InitiativesScrollSection />
      </div>

      {/* Conferences Section */}
      <ConferencesBentoCards />

      {/* Benefits Section */}
      <BenefitsSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Sphere Gallery Section */}
      <SphereGallerySection />

      {/* Team Section */}
      <TeamSection />

      {/* Social Section */}
      <SocialSection />

      {/* Footer */}
      <CinematicFooter />

    </div>
  )
}