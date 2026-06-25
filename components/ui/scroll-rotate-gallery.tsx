"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ScrollRotateGalleryItem {
  src: string;
  alt?: string;
}

export interface ScrollRotateGalleryTextItem {
  title: string;
  description: string;
}

export interface ScrollRotateGalleryProps {
  items?: ScrollRotateGalleryItem[];
  textItems?: ScrollRotateGalleryTextItem[];
  cardCount?: number;
  radius?: number;
  mobileBreakpoint?: number;
  rotations?: number;
  tiltX?: number;
  cardAspectRatio?: number;
  cardWidth?: number;
  className?: string;
  cardClassName?: string;
  textPanelClassName?: string;
  scrub?: number;
  highlightRadius?: number;
  onTextChange?: (index: number) => void;
  onProgressChange?: (progress: number) => void;
  scroller?: string | HTMLElement | React.RefObject<HTMLElement> | null;
}

function fibonacciSphereCard(
  index: number,
  total: number,
  radius: number,
  cardW: number,
  cardH: number
): { x: number; y: number; z: number; rotX: number; rotY: number } {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / total);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  const x = radius * Math.cos(theta) * Math.sin(phi);
  const y = radius * Math.sin(theta) * Math.sin(phi);
  const z = radius * Math.cos(phi);
  const rotY = Math.atan2(x, z) * (180 / Math.PI);
  const rotX = Math.asin(-y / radius) * (180 / Math.PI);
  return { x, y, z, rotX, rotY };
}

export function ScrollRotateGallery({
  items,
  textItems = [],
  cardCount = 24,
  radius = 380,
  mobileBreakpoint = 768,
  rotations = 2,
  tiltX = 45,
  cardAspectRatio = 1.375,
  cardWidth = 160,
  className,
  cardClassName,
  textPanelClassName,
  scrub = 1,
  highlightRadius = 2,
  onTextChange,
  onProgressChange,
  scroller,
}: ScrollRotateGalleryProps) {
  const cardHeight = cardWidth * cardAspectRatio;

  const galleryImages = useMemo<ScrollRotateGalleryItem[]>(() => {
    const src = items && items.length > 0 ? items : [];
    const result: ScrollRotateGalleryItem[] = [];
    while (result.length < cardCount) result.push(...src);
    return result.slice(0, cardCount);
  }, [items, cardCount]);

  const containerRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [titleText, setTitleText] = useState(textItems[0]?.title ?? "");
  const [descText, setDescText] = useState(textItems[0]?.description ?? "");
  const [textVisible, setTextVisible] = useState(true);
  const [effectiveRadius, setEffectiveRadius] = useState(radius);
  const [viewportHeight, setViewportHeight] = useState("100vh");

  useEffect(() => {
    const update = () =>
      setEffectiveRadius(window.innerWidth < mobileBreakpoint ? radius / 2 : radius);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [radius, mobileBreakpoint]);

  const transitionText = useCallback(
    (newIndex: number) => {
      if (newIndex === textIndex) return;
      setTextVisible(false);
      setTimeout(() => {
        setTextIndex(newIndex);
        setTitleText(textItems[newIndex]?.title ?? "");
        setDescText(textItems[newIndex]?.description ?? "");
        setTextVisible(true);
        onTextChange?.(newIndex);
      }, 400);
    },
    [textIndex, textItems, onTextChange]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    let trigger: any;
    let resizeListener: (() => void) | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (!sphereRef.current || !containerRef.current) return;

      let resolvedScroller: any = window;
      if (scroller) {
        if (typeof scroller === "string") resolvedScroller = document.querySelector(scroller) || window;
        else if (scroller instanceof HTMLElement) resolvedScroller = scroller;
        else if (scroller && "current" in scroller) resolvedScroller = scroller.current || window;
      } else {
        let parent = containerRef.current.parentElement;
        while (parent) {
          const oy = window.getComputedStyle(parent).overflowY;
          if (oy === "auto" || oy === "scroll") { resolvedScroller = parent; break; }
          parent = parent.parentElement;
        }
      }

      if (resolvedScroller !== window) {
        setViewportHeight(`${resolvedScroller.clientHeight}px`);
        resizeListener = () => setViewportHeight(`${resolvedScroller.clientHeight}px`);
        window.addEventListener("resize", resizeListener);
      } else {
        setViewportHeight("100vh");
      }

      trigger = gsap.to(sphereRef.current, {
        rotateY: 360 * rotations,
        rotateX: tiltX,
        scale: 6,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub,
          scroller: resolvedScroller,
          onUpdate: (self: any) => {
            onProgressChange?.(self.progress);
            setActiveCardIndex(Math.floor(self.progress * cardCount));
            if (textItems.length > 0) {
              transitionText(Math.floor(self.progress * textItems.length) % textItems.length);
            }
          },
        },
      });
    };

    init();
    return () => {
      trigger?.scrollTrigger?.kill();
      trigger?.kill();
      if (resizeListener) window.removeEventListener("resize", resizeListener);
    };
  }, [rotations, tiltX, scrub, cardCount, textItems.length, scroller, transitionText, onProgressChange]);

  const cardPositions = useMemo(
    () => galleryImages.map((_, i) => fibonacciSphereCard(i, cardCount, effectiveRadius, cardWidth, cardHeight)),
    [galleryImages, cardCount, effectiveRadius, cardWidth, cardHeight]
  );

  const isActive = (i: number) => Math.abs(i - activeCardIndex) < highlightRadius;

  return (
    <section
      ref={containerRef}
      className={cn("relative w-full h-[300vh]", className)}
    >
      <div
        className="sticky top-0 w-full overflow-hidden flex items-center justify-center"
        style={{ height: viewportHeight }}
      >
        {/* Side text panel — alternates left/right based on textIndex */}
        {textItems.length > 0 && (
          <div
            className={cn(
              "absolute left-[8%] top-1/2 z-10 -translate-y-1/2 w-[260px] lg:w-[300px] hidden md:block",
              textPanelClassName
            )}
          >
            <AnimatePresence mode="wait">
              {textVisible && (
                <motion.div
                  key={textIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" as const }}
                >
                  <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight leading-tight mb-3 text-foreground">
                    {titleText}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {descText}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* 3-D Sphere */}
        <div className="relative" style={{ perspective: "1200px", width: 0, height: 0 }}>
          <div ref={sphereRef} style={{ transformStyle: "preserve-3d", position: "relative" }}>
            {galleryImages.map((item, i) => {
              const pos = cardPositions[i];
              if (!pos) return null;
              const active = isActive(i);
              return (
                <div
                  key={i}
                  className={cn(
                    "absolute rounded-2xl p-[6px] border overflow-hidden transition-[filter,box-shadow] duration-500",
                    "border-black/[0.06] bg-white dark:border-white/[0.03] dark:bg-[#18181b]",
                    active
                      ? "drop-shadow-[0_0_18px_rgba(0,0,0,0.18)]"
                      : "drop-shadow-none",
                    cardClassName
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    left: -cardWidth / 2,
                    top: -cardHeight / 2,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "visible",
                    transform: `translate3d(${pos.x}px,${pos.y}px,${pos.z}px) rotateY(${pos.rotY}deg) rotateX(${pos.rotX}deg)`,
                    boxShadow: active
                      ? "8px 8px 20px rgba(0,0,0,0.25), inset 2px 2px 5px rgba(255,255,255,0.4)"
                      : "6px 6px 14px rgba(0,0,0,0.15), inset 2px 2px 4px rgba(255,255,255,0.3)",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.alt ?? `Image ${i + 1}`}
                    loading="lazy"
                    draggable={false}
                    className={cn(
                      "w-full h-full object-cover rounded-xl select-none transition-[filter] duration-500",
                      active ? "grayscale-0 brightness-100" : "grayscale-[80%] brightness-[0.65]"
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile text */}
        {textItems.length > 0 && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center md:hidden px-6 z-10">
            <AnimatePresence mode="wait">
              {textVisible && (
                <motion.div
                  key={`m-${textIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center max-w-xs"
                >
                  <h2 className="text-xl font-semibold tracking-tight text-foreground mb-2">{titleText}</h2>
                  <p className="text-xs leading-relaxed text-muted-foreground">{descText}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

export default ScrollRotateGallery;
