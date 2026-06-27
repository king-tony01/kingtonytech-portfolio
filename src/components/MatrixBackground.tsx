"use client";

import React, { useEffect, useRef } from "react";

interface MatrixBackgroundProps {
  opacity?: number;
  color?: string;
  className?: string;
}

export default function MatrixBackground({ opacity = 0.15, color = "#34d399", className = "" }: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || 800);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || 400);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%+&";
    const fontSize = 11;
    const columns = width / fontSize;

    const rainDrops: number[] = Array(Math.floor(columns)).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(2, 6, 4, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      animId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.offsetWidth || 800;
      height = canvas.height = canvas.parentElement?.offsetHeight || 400;
      const newColumns = width / fontSize;
      if (newColumns > rainDrops.length) {
        // Expand rain drops array if window gets wider
        for (let i = rainDrops.length; i < newColumns; i++) {
          rainDrops.push(Math.random() * height / fontSize);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        opacity: opacity,
      }}
    />
  );
}
