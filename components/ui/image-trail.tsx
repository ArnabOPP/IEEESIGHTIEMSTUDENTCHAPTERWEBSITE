"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./image-trail.css";

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0, clientY = 0;
  if ("touches" in e && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ("clientX" in e) {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return { x: clientX - rect.left, y: clientY - rect.top };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

class ImageItem {
  DOM: { el: HTMLElement; inner: HTMLElement | null } = { el: null as any, inner: null };
  rect: DOMRect = null as any;

  constructor(el: HTMLElement) {
    this.DOM.el = el;
    this.DOM.inner = el.querySelector(".content__img-inner");
    this.rect = el.getBoundingClientRect();
    window.addEventListener("resize", () => {
      gsap.set(this.DOM.el, { scale: 1, x: 0, y: 0, opacity: 0 });
      this.rect = this.DOM.el.getBoundingClientRect();
    });
  }
}

class ImageTrailVariant2 {
  images: ImageItem[];
  imagesTotal: number;
  imgPosition = 0;
  zIndexVal = 1;
  activeImagesCount = 0;
  isIdle = true;
  threshold = 80;
  mousePos = { x: 0, y: 0 };
  lastMousePos = { x: 0, y: 0 };
  cacheMousePos = { x: 0, y: 0 };

  constructor(private container: HTMLElement) {
    this.images = Array.from(container.querySelectorAll<HTMLElement>(".content__img")).map(
      (el) => new ImageItem(el)
    );
    this.imagesTotal = this.images.length;

    // Listen on the section (nearest positioned ancestor) so pointer-events on
    // the .content div (which is none) don't block the effect.
    const section = container.closest("section") ?? container.parentElement ?? container;

    const onMove = (ev: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    section.addEventListener("mousemove", onMove as EventListener);
    section.addEventListener("touchmove", onMove as EventListener);

    const initRender = (ev: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };
      requestAnimationFrame(() => this.render());
      section.removeEventListener("mousemove", initRender as EventListener);
      section.removeEventListener("touchmove", initRender as EventListener);
    };
    section.addEventListener("mousemove", initRender as EventListener);
    section.addEventListener("touchmove", initRender as EventListener);
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => { this.activeImagesCount++; this.isIdle = false; },
        onComplete: () => { this.activeImagesCount--; if (this.activeImagesCount === 0) this.isIdle = true; },
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1, scale: 0, zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2,
        },
        {
          duration: 0.4, ease: "power1", scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2,
        },
        0
      )
      .fromTo(
        img.DOM.inner,
        { scale: 2.8, filter: "brightness(250%)" },
        { duration: 0.4, ease: "power1", scale: 1, filter: "brightness(100%)" },
        0
      )
      .to(img.DOM.el, { duration: 0.4, ease: "power2", opacity: 0, scale: 0.2 }, 0.45);
  }
}

interface ImageTrailProps {
  items: string[];
  variant?: number;
}

export default function ImageTrail({ items = [], variant = 2 }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    new ImageTrailVariant2(containerRef.current);
  }, [variant, items]);

  return (
    <div className="content" ref={containerRef}>
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}
