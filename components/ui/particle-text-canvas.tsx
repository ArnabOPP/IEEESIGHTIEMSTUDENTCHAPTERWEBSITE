"use client";

import React, { useRef, useEffect } from "react";

interface ParticleTextProps {
  text: string;
  fontSize?: number;
  particleColor?: string;
  mouseRadius?: number;
  height?: number;
  particleGap?: number;
}

export default function ParticleText({
  text = "Our Gallery",
  fontSize = 120,
  particleColor = "#111111",
  mouseRadius = 120,
  height = 220,
  particleGap = 4,
}: ParticleTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, radius: mouseRadius });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: any[] = [];
    let animId: number;

    const resize = () => {
      canvas.width = container.clientWidth;
      canvas.height = height;
    };
    resize();

    class Particle {
      x: number; y: number; baseX: number; baseY: number;
      density: number; size: number; color: string;

      constructor(x: number, y: number, color: string) {
        this.baseX = x; this.baseY = y;
        this.x = x; this.y = y;
        this.color = color;
        this.size = 1.5;
        this.density = Math.random() * 30 + 5;
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }

      update() {
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, (mouse.current.radius - dist) / mouse.current.radius);
        if (dist < mouse.current.radius) {
          this.x -= (dx / dist) * force * this.density;
          this.y -= (dy / dist) * force * this.density;
        } else {
          this.x -= (this.x - this.baseX) / 10;
          this.y -= (this.y - this.baseY) / 10;
        }
      }
    }

    const init = () => {
      particlesArray = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `900 ${fontSize}px "Arial Black", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = particleColor;
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < data.height; y += particleGap) {
        for (let x = 0; x < data.width; x += particleGap) {
          const alpha = data.data[(y * 4 * data.width) + (x * 4) + 3];
          if (alpha > 128) {
            particlesArray.push(new Particle(x, y, particleColor));
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => { p.draw(); p.update(); });
      animId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    const onResize = () => { resize(); init(); };

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", onResize);

    init();
    animate();

    return () => {
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
    };
  }, [text, fontSize, particleColor, mouseRadius, height, particleGap]);

  return (
    <div ref={containerRef} className="w-full" style={{ height }}>
      <canvas ref={canvasRef} className="w-full" style={{ height }} />
    </div>
  );
}
