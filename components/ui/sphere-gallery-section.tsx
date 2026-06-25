"use client";

import dynamic from "next/dynamic";

const ScrollRotateGallery = dynamic(
  () => import("@/components/ui/scroll-rotate-gallery").then(m => m.ScrollRotateGallery),
  { ssr: false }
);

const GridAnimation = dynamic(
  () => import("@/components/ui/mouse-following-line").then(m => ({ default: m.GridAnimation })),
  { ssr: false }
);

const IMAGES = [
  { src: "/IMG_20210902_113528-scaled.jpg",                              alt: "Community Outreach" },
  { src: "/mechanicalengineering.png",                                   alt: "Engineering Workshop" },
  { src: "/technical-specifications-for-engineering-design-project.jpg", alt: "Technical Conference" },
  { src: "/Why-is-Innovation-Important-in-Engineering-Education.png",    alt: "Innovation in Education" },
  { src: "/abg.png",                                                     alt: "IEEE Student Congress" },
  { src: "/istockphoto-535555239-612x612.jpg",                           alt: "Humanitarian Technology" },
  { src: "/IEM Student Branch Chapter 2.png",                            alt: "IEEE SIGHT IEM" },
  { src: "/IMG_20210902_113528-scaled.jpg",                              alt: "Community Drive" },
];

const TEXT_PANELS = [
  {
    title: "Global IEEE Network",
    description:
      "Connect with engineers, researchers, and humanitarians across 400+ IEEE chapters worldwide. Every project you touch at IEM has the potential to echo across continents.",
  },
  {
    title: "Hands-On Engineering",
    description:
      "From IoT prototypes to AI-for-good hackathons — SIGHT IEM gives you the tools, mentors, and hardware to build things that actually solve problems.",
  },
  {
    title: "Community Impact",
    description:
      "We run on-ground drives in rural communities, partnering with NGOs and government bodies to bring clean energy, healthcare tech, and digital literacy to those who need it most.",
  },
  {
    title: "Conferences & Events",
    description:
      "Represent IEM at national IEEE Student Congresses, host your own technical summits, and attend workshops that keep you at the frontier of emerging technology.",
  },
  {
    title: "Leadership Growth",
    description:
      "Take ownership of real teams, budgets, and deliverables. SIGHT IEM's four leadership tracks — technical, events, outreach, and media — give every member a way to lead.",
  },
  {
    title: "Career Edge",
    description:
      "Recruiters notice IEEE experience. Members consistently credit their SIGHT projects as the differentiator that landed internships, placements, and research roles.",
  },
];

export default function SphereGallerySection() {
  return (
    <div className="relative bg-white" style={{ overflow: "clip" }}>
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 h-screen w-full opacity-[0.25]" style={{ pointerEvents: 'auto' }}>
          <GridAnimation spacing={28} strokeLength={8} strokeWidth={1.8} lineColor="#000000" />
        </div>
      </div>
      <ScrollRotateGallery
      items={IMAGES}
      textItems={[]}
      cardCount={24}
      radius={240}
      rotations={2}
      tiltX={45}
      cardWidth={100}
      scrub={1.5}
      highlightRadius={3}
      className="bg-transparent"
      textPanelClassName="text-gray-900 [&_h2]:text-gray-900 [&_p]:text-gray-500"
    />
    </div>
  );
}
