"use client"

import type React from "react"
import { useEffect, useRef, useCallback } from "react"
import { motion, useAnimate } from "framer-motion"
import { cn } from "@/lib/utils"

interface GridAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: number
  strokeLength?: number
  strokeWidth?: number
  lineColor?: string
}

export function GridAnimation({
  className,
  spacing = 30,
  strokeLength = 10,
  strokeWidth = 1,
  lineColor = "#111111",
  style,
  ...props
}: GridAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ballRef, animate] = useAnimate()
  const animationFrameRef = useRef<number | null>(null)
  const isMouseOverRef = useRef(false)
  const currentBallPosition = useRef({ x: 0, y: 0 })
  const dimsRef = useRef({ width: 0, height: 0 })

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const { width, height } = dimsRef.current
    const cols = Math.ceil(width / spacing)
    const rows = Math.ceil(height / spacing)
    const ballX = currentBallPosition.current.x
    const ballY = currentBallPosition.current.y

    ctx.clearRect(0, 0, width, height)
    for (let col = 0; col <= cols; col++) {
      for (let row = 0; row <= rows; row++) {
        const px = col * spacing
        const py = row * spacing
        const dx = ballX - px
        const dy = ballY - py
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 15) continue
        const angle = Math.atan2(dy, dx)
        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(px - Math.cos(angle) * strokeLength, py - Math.sin(angle) * strokeLength)
        ctx.strokeStyle = lineColor
        ctx.lineWidth = strokeWidth
        ctx.stroke()
      }
    }

    if (isMouseOverRef.current) {
      animationFrameRef.current = requestAnimationFrame(drawFrame)
    }
  }, [spacing, strokeLength, strokeWidth, lineColor])

  // Sync canvas size to wrapper size via ResizeObserver
  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    const sync = () => {
      const w = wrapper.clientWidth
      const h = wrapper.clientHeight
      if (w === 0 || h === 0) return
      canvas.width = w
      canvas.height = h
      dimsRef.current = { width: w, height: h }
      currentBallPosition.current = { x: w / 2, y: h / 2 }
      requestAnimationFrame(drawFrame)
    }

    const ro = new ResizeObserver(sync)
    ro.observe(wrapper)
    sync()
    return () => ro.disconnect()
  }, [drawFrame])

  // Listen on window so overlapping z-10 elements don't block events
  useEffect(() => {
    const snap = (v: number, step: number) => Math.round(v / step) * step

    const onMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const localX = e.clientX - rect.left
      const localY = e.clientY - rect.top
      const inside = localX >= 0 && localX <= rect.width && localY >= 0 && localY <= rect.height

      if (!inside) {
        if (isMouseOverRef.current) {
          isMouseOverRef.current = false
          if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
          const cx = dimsRef.current.width / 2
          const cy = dimsRef.current.height / 2
          currentBallPosition.current = { x: cx, y: cy }
          animate(ballRef.current, { x: cx, y: cy }, { type: "spring", stiffness: 300, damping: 20 })
          requestAnimationFrame(drawFrame)
        }
        return
      }

      const x = snap(localX, spacing)
      const y = snap(localY, spacing)
      currentBallPosition.current = { x, y }
      animate(ballRef.current, { x, y }, { type: "spring", stiffness: 300, damping: 20 })

      if (!isMouseOverRef.current) {
        isMouseOverRef.current = true
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = requestAnimationFrame(drawFrame)
      }
    }

    window.addEventListener("mousemove", onMove)
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [drawFrame, animate, ballRef, spacing])

  return (
    <div
      ref={wrapperRef}
      className={cn("relative w-full h-full", className)}
      style={style}
      {...props}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <motion.div
        ref={ballRef}
        className="absolute w-[6px] h-[6px] rounded-full bg-foreground"
        style={{ x: 0, y: 0, marginLeft: -3, marginTop: -3 }}
      />
    </div>
  )
}
