"use client"

import React, { useRef } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useInView } from "framer-motion"
import dynamic from "next/dynamic"
const Antigravity = dynamic(() => import("@/components/ui/antigravity"), { ssr: false })

const cardContents = [
  {
    title: "IEEE SIGHT Summit",
    description:
      "Our flagship annual conference uniting engineers, researchers, NGOs, and IEEE global chapters to tackle the world's most pressing humanitarian challenges through technology and innovation.",
    hoverBgImage: "/technical-specifications-for-engineering-design-project.jpg",
  },
  {
    title: "Rural Tech Hackathon",
    description:
      "A 48-hour sprint where SIGHT IEM members engineer practical solutions for rural communities — from clean energy to affordable healthcare tech.",
    bgImage: "/mechanicalengineering.png",
  },
  {
    title: "IEEE Student Congress",
    description:
      "We represent IEM at the national IEEE Student Congress, presenting research, humanitarian projects, and initiatives that have real-world impact. Our members have consistently placed among the top delegations.",
    bgImage: "/abg.png",
  },
  {
    title: "Technical Workshops",
    description:
      "Year-round hands-on workshops on emerging technologies — from IoT and embedded systems to AI for social good — keeping our members industry-ready.",
    hoverBgImage: "/Why-is-Innovation-Important-in-Engineering-Education.png",
  },
  {
    title: "Community Outreach Events",
    description:
      "On-ground drives, seminars, and health camps in partnership with local NGOs — bringing engineering expertise directly to underserved communities.",
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
      {hasBg && (
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          <Image src={bgImage!} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

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

export default function ConferencesBentoCards() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { margin: '200px 0px 200px 0px' })

  return (
    <section
      id="conferences"
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
            Where ideas meet global impact.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            IEEE SIGHT IEM hosts and attends events that connect students with the world's most important conversations in humanitarian technology.
          </p>
        </div>
      </div>
    </section>
  )
}
