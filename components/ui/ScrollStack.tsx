"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import "./ScrollStack.css";

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({ children, itemClassName = "" }: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  blurAmount?: number;
  onStackComplete?: () => void;
}

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}: ScrollStackProps) => {
  const wrapperRef      = useRef<HTMLDivElement>(null);
  const cardsRef        = useRef<HTMLElement[]>([]);
  const cardTopsRef     = useRef<number[]>([]);   // cached layout positions (no transform)
  const endTopRef       = useRef<number>(0);
  const lastTransforms  = useRef(new Map());
  const stackCompleted  = useRef(false);
  const rafRef          = useRef<number | null>(null);
  const pendingRef      = useRef(false);

  const parsePercent = (v: string | number, h: number) =>
    typeof v === "string" && v.includes("%") ? (parseFloat(v) / 100) * h : parseFloat(v as string);

  // Cache absolute document positions (unaffected by transforms)
  const cachePositions = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    // Temporarily reset transforms so we get true layout positions
    cardsRef.current.forEach(c => { c.style.transform = "none"; });
    cardTopsRef.current = cardsRef.current.map(c => c.getBoundingClientRect().top + window.scrollY);
    const endEl = wrapper.querySelector<HTMLElement>(".scroll-stack-end");
    endTopRef.current = endEl ? endEl.getBoundingClientRect().top + window.scrollY : 0;
  }, []);

  const updateCards = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;

    const scrollTop = window.scrollY;
    const vh        = window.innerHeight;
    const stackPx   = parsePercent(stackPosition, vh);
    const scaleEndPx = parsePercent(scaleEndPosition, vh);
    const endTop    = endTopRef.current;

    cards.forEach((card, i) => {
      const cardTop  = cardTopsRef.current[i];
      if (cardTop === undefined) return;

      const pinStart    = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd  = cardTop - scaleEndPx;
      const pinEnd      = endTop - vh / 2;

      const scaleProgress =
        scrollTop < pinStart   ? 0
        : scrollTop > triggerEnd ? 1
        : (scrollTop - pinStart) / (triggerEnd - pinStart);

      const targetScale = baseScale + i * itemScale;
      const scale       = 1 - scaleProgress * (1 - targetScale);
      const rotation    = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topIdx = 0;
        cards.forEach((_, j) => {
          const jTop = cardTopsRef.current[j];
          if (scrollTop >= jTop - stackPx - itemStackDistance * j) topIdx = j;
        });
        if (i < topIdx) blur = Math.max(0, (topIdx - i) * blurAmount);
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
      }

      const t = {
        translateY: Math.round(translateY * 100) / 100,
        scale:      Math.round(scale * 1000) / 1000,
        rotation:   Math.round(rotation * 100) / 100,
        blur:       Math.round(blur * 100) / 100,
      };

      const last = lastTransforms.current.get(i);
      if (!last || Math.abs(last.translateY - t.translateY) > 0.1 || Math.abs(last.scale - t.scale) > 0.001) {
        card.style.transform = `translate3d(0,${t.translateY}px,0) scale(${t.scale}) rotate(${t.rotation}deg)`;
        card.style.filter    = t.blur > 0 ? `blur(${t.blur}px)` : "";
        lastTransforms.current.set(i, t);
      }

      if (i === cards.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompleted.current)  { stackCompleted.current = true;  onStackComplete?.(); }
        if (!inView && stackCompleted.current)  { stackCompleted.current = false; }
      }
    });

    pendingRef.current = false;
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, onStackComplete]);

  const onScroll = useCallback(() => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    rafRef.current = requestAnimationFrame(updateCards);
  }, [updateCards]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cards = Array.from(wrapper.querySelectorAll<HTMLElement>(".scroll-stack-card"));
    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange     = "transform, filter";
      card.style.transformOrigin = "top center";
    });

    // Wait one frame for layout to settle, then cache positions
    const init = requestAnimationFrame(() => {
      cachePositions();
      updateCards();
    });

    const onResize = () => { cachePositions(); updateCards(); };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(init);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cardsRef.current = [];
      lastTransforms.current.clear();
    };
  }, [itemDistance, onScroll, updateCards, cachePositions]);

  return (
    <div ref={wrapperRef} className={`scroll-stack-wrapper ${className}`.trim()}>
      {children}
      <div className="scroll-stack-end" />
    </div>
  );
};

export default ScrollStack;
