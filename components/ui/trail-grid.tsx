"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface TrailGridProps {
  cellSize?: number;
  duration?: number;
  cellColor?: string;
  position?: "fixed" | "absolute";
  revealImage?: string;
}

export default function TrailGrid({
  cellSize = 40,
  duration = 150,
  cellColor = "#e5e5e5",
  position = "fixed",
  revealImage,
}: TrailGridProps) {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());
  const lastHoveredRef = useRef<number>(-1);

  const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0 });

  const calculateGrid = useCallback(() => {
    if (typeof window === "undefined") return;
    const cols = Math.ceil(document.documentElement.clientWidth / cellSize);
    const rows = Math.ceil(document.documentElement.clientHeight / cellSize);
    setGridDimensions({ cols, rows });
  }, [cellSize]);

  useEffect(() => {
    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, [calculateGrid]);

  useEffect(() => {
    const { cols: columns, rows } = gridDimensions;
    if (columns === 0 || rows === 0) return;

    cellsRef.current = cellsRef.current.slice(0, columns * rows);
    cellsRef.current.forEach((cell) => {
      if (cell) {
        cell.classList.remove("active");
        cell.style.borderRadius = "4px";
        cell.style.backgroundImage = "";
        cell.style.backgroundPosition = "";
      }
    });

    const activateCell = (index: number) => {
      const cell = cellsRef.current[index];
      if (!cell) return;
      cell.classList.add("active");

      if (revealImage) {
        const col = index % columns;
        const row = Math.floor(index / columns);
        const rect = gridContainerRef.current?.getBoundingClientRect();
        const w = rect ? rect.width  : columns * cellSize;
        const h = rect ? rect.height : rows    * cellSize;
        cell.style.backgroundImage = `url("${revealImage}")`;
        cell.style.backgroundSize = `${w}px ${h}px`;
        cell.style.backgroundPosition = `-${col * cellSize}px -${row * cellSize}px`;
        cell.style.backgroundColor = "transparent";
      }
    };

    const deactivateCell = (index: number) => {
      const cell = cellsRef.current[index];
      if (!cell) return;
      cell.classList.remove("active");
      if (revealImage) {
        cell.style.backgroundImage = "";
        cell.style.backgroundPosition = "";
        cell.style.backgroundSize = "";
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const rect = gridContainerRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Only activate when cursor is within this component's bounds
      if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;

      const originX = rect.left;
      const originY = rect.top;

      const col = Math.floor((e.clientX - originX) / cellSize);
      const row = Math.floor((e.clientY - originY) / cellSize);

      if (col >= 0 && col < columns && row >= 0 && row < rows) {
        const index = row * columns + col;
        if (index !== lastHoveredRef.current) {
          lastHoveredRef.current = index;

          activateCell(index);
          updateNeighborRadii(index);

          if (timeoutsRef.current.has(index)) clearTimeout(timeoutsRef.current.get(index)!);

          const timeout = setTimeout(() => {
            deactivateCell(index);
            updateNeighborRadii(index);
          }, duration);

          timeoutsRef.current.set(index, timeout);
        }
      }
    };

    const handleMouseLeave = () => { lastHoveredRef.current = -1; };

    const updateNeighborRadii = (index: number) => {
      if (!cellsRef.current[index]) return;
      const row = Math.floor(index / columns);
      const col = index % columns;

      const updateRadii = (i: number, r: number, c: number) => {
        if (i < 0 || i >= columns * rows || !cellsRef.current[i]) return;
        const topActive    = r > 0           && cellsRef.current[i - columns]?.classList.contains("active");
        const bottomActive = r < rows - 1    && cellsRef.current[i + columns]?.classList.contains("active");
        const leftActive   = c > 0           && cellsRef.current[i - 1]?.classList.contains("active");
        const rightActive  = c < columns - 1 && cellsRef.current[i + 1]?.classList.contains("active");
        const tl = topActive    || leftActive  ? "0" : "4px";
        const tr = topActive    || rightActive ? "0" : "4px";
        const br = bottomActive || rightActive ? "0" : "4px";
        const bl = bottomActive || leftActive  ? "0" : "4px";
        cellsRef.current[i]!.style.borderRadius = `${tl} ${tr} ${br} ${bl}`;
      };

      updateRadii(index, row, col);
      if (row > 0)           updateRadii(index - columns, row - 1, col);
      if (row < rows - 1)    updateRadii(index + columns, row + 1, col);
      if (col > 0)           updateRadii(index - 1, row, col - 1);
      if (col < columns - 1) updateRadii(index + 1, row, col + 1);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current.clear();
      lastHoveredRef.current = -1;
    };
  }, [gridDimensions, duration, cellSize, cellColor, revealImage]);

  if (gridDimensions.cols === 0) return null;

  return (
    <div
      ref={gridContainerRef}
      className="bg-grid-wrapper"
      style={{
        position,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        gridTemplateColumns: `repeat(${gridDimensions.cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${gridDimensions.rows}, ${cellSize}px)`,
        gap: 0,
        padding: 0,
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    >
      <style suppressHydrationWarning>{`
        .bg-grid-wrapper { display: none; }
        @media (hover: hover) and (pointer: fine) {
          .bg-grid-wrapper { display: grid; }
        }
        .tg-cell {
          background-color: transparent;
          border-radius: 4px;
          transition: opacity 0.15s ease;
        }
        .tg-cell.active {
          background-color: ${revealImage ? "transparent" : cellColor};
        }
      `}</style>
      {Array.from({ length: gridDimensions.cols * gridDimensions.rows }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { cellsRef.current[i] = el; }}
          className="tg-cell"
        />
      ))}
    </div>
  );
}
