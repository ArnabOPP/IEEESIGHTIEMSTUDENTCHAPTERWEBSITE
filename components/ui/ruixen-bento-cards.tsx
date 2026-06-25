"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import dynamic from "next/dynamic"
const Antigravity = dynamic(() => import("@/components/ui/antigravity"), { ssr: false })

const cardContents = [
  {
    title: "Who We Are",
    description:
      "IEEE SIGHT (Special Interest Group on Humanitarian Technology) at IEM is a student-led chapter dedicated to leveraging technology for the betterment of underserved communities. We operate under the IEEE umbrella and are rooted at the Institute of Engineering and Management, Kolkata.",
    hoverBgImage: "/IEM Student Branch Chapter 2.png",
  },
  {
    title: "Our Mission",
    description:
      "We believe technology should serve humanity. Our mission is to empower students to design, build, and deploy solutions that create measurable social impact — locally and globally.",
    bgImage: "/abg.png",
  },
  {
    title: "Initiatives & Projects",
    description:
      "From rural electrification awareness drives to assistive-tech workshops, SIGHT IEM runs 12+ active projects every year. Our members collaborate with NGOs, government bodies, and IEEE global chapters to tackle real humanitarian challenges using engineering innovation. Every project is an opportunity to turn classroom knowledge into community change.",
    bgImage: "/mechanicalengineering.png",
  },
  {
    title: "Conferences & Events",
    description:
      "We host and participate in national and international IEEE-recognized conferences, hackathons, and seminars throughout the year — keeping members at the frontier of emerging technology.",
    hoverBgImage: "/technical-specifications-for-engineering-design-project.jpg",
  },
  {
    title: "Join the Community",
    description:
      "Open to all IEM students. Grow your network, build impactful projects, and represent your chapter on a global IEEE stage.",
    hoverBgImage: "/IMG_20210902_113528-scaled.jpg",
  },
]

const PlusCard: React.FC<{
  className?: string
  title: string
  description: string
  bgImage?: string
  hoverBgImage?: string
}> = ({ className = "", title, description, bgImage, hoverBgImage }) => {
  const hasBg = !!bgImage
  const hasHoverBg = !!hoverBgImage

  return (
    <div
      className={cn(
        "group relative border border-dashed border-zinc-400 dark:border-zinc-700 rounded-lg p-6 min-h-[200px]",
        "flex flex-col justify-between",
        hasBg ? "" : "bg-white dark:bg-zinc-950",
        className
      )}
    >
      {/* Static bg image */}
      {hasBg && (
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <Image src={bgImage!} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

      {/* Hover bg image — fades in on hover */}
      {hasHoverBg && (
        <div className="absolute inset-0 rounded-lg overflow-hidden z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <Image src={hoverBgImage!} alt="" fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <CornerPlusIcons />
      <div className="relative z-10 space-y-2">
        <h3 className={cn(
          "text-xl font-bold transition-colors duration-300",
          hasBg ? "text-white" : hasHoverBg ? "text-gray-900 dark:text-gray-100 group-hover:text-white" : "text-gray-900 dark:text-gray-100"
        )}>
          {title}
        </h3>
        <p className={cn(
          "leading-relaxed transition-colors duration-300",
          hasBg ? "text-white/80" : hasHoverBg ? "text-gray-700 dark:text-gray-300 group-hover:text-white/80" : "text-gray-700 dark:text-gray-300"
        )}>
          {description}
        </p>
      </div>
    </div>
  )
}

const CornerPlusIcons = () => (
  <>
    <PlusIcon className="absolute -top-3 -left-3" />
    <PlusIcon className="absolute -top-3 -right-3" />
    <PlusIcon className="absolute -bottom-3 -left-3" />
    <PlusIcon className="absolute -bottom-3 -right-3" />
  </>
)

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    strokeWidth="1"
    stroke="currentColor"
    className={`dark:text-white text-black size-6 ${className}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
  </svg>
)

export default function IemSightBentoCards() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '200px 0px 200px 0px' });

  return (
    <section
      ref={sectionRef}
      className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #00000055 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="absolute inset-0 z-0">
        {isInView && <Antigravity
          count={150}
          magnetRadius={6}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={1}
          particleSize={1.5}
          lerpSpeed={0.05}
          color="#000000"
          autoAnimate={true}
          particleVariance={1}
        />}
      </div>
      <div className="relative z-10 mx-auto container border border-gray-200 dark:border-gray-800 py-12 border-t-0 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 auto-rows-auto gap-4">
          <PlusCard {...cardContents[0]} className="lg:col-span-3 lg:row-span-2" />
          <PlusCard {...cardContents[1]} className="lg:col-span-2 lg:row-span-2" />
          <PlusCard {...cardContents[2]} className="lg:col-span-4 lg:row-span-1" />
          <PlusCard {...cardContents[3]} className="lg:col-span-2 lg:row-span-1" />
          <PlusCard {...cardContents[4]} className="lg:col-span-2 lg:row-span-1" />
        </div>

        <div className="max-w-2xl ml-auto text-right px-4 mt-6 lg:-mt-20">
          <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-4">
            Engineering for humanity. Rooted at IEM.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            IEEE SIGHT IEM Student Branch Chapter bridges the gap between technical education and humanitarian impact — one project, one event, one student at a time.
          </p>
        </div>
      </div>
    </section>
  )
}
