"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ThreeDCanvas.module.css";

export type ShapeType = "icosahedron" | "torus" | "sphere" | "hyperboloid" | "particles";
export type ColorTheme = "emerald" | "amber" | "hybrid";

interface ThreeDCanvasProps {
  shape: ShapeType;
  speed: number;
  particleCount: number;
  glowColor: ColorTheme;
  mouseDistort: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number; // original X
  oy: number; // original Y
  oz: number; // original Z
}

interface Edge {
  u: number;
  v: number;
}

export default function ThreeDCanvas({
  shape = "icosahedron",
  speed = 1.0,
  particleCount = 80,
  glowColor = "hybrid",
  mouseDistort = true,
}: ThreeDCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, targetX: 0, targetY: 0 });
  const shockwavesRef = useRef<{ x: number; y: number; radius: number; maxRadius: number; opacity: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Coordinate rotation variables
    let angleX = 0.005 * speed;
    let angleY = 0.008 * speed;
    let angleZ = 0.003 * speed;

    // Track active vertices, edges and stars
    let vertices: Point3D[] = [];
    let edges: Edge[] = [];
    let stars: { x: number; y: number; z: number; size: number; alpha: number }[] = [];

    // Helper: Initialize background starfield
    const initStars = (count: number) => {
      stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: (Math.random() - 0.5) * 800,
          y: (Math.random() - 0.5) * 800,
          z: (Math.random() - 0.5) * 800,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.7 + 0.3,
        });
      }
    };

    // Helper: Generate Shape Geometry
    const generateGeometry = (currentShape: ShapeType) => {
      vertices = [];
      edges = [];

      if (currentShape === "icosahedron") {
        // Golden ratio
        const t = (1 + Math.sqrt(5)) / 2;
        const scale = 140;

        // 12 vertices
        const rawVerts = [
          [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
          [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
          [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
        ];

        rawVerts.forEach(([x, y, z]) => {
          // Normalize and scale
          const length = Math.sqrt(x * x + y * y + z * z);
          vertices.push({
            x: (x / length) * scale,
            y: (y / length) * scale,
            z: (z / length) * scale,
            ox: (x / length) * scale,
            oy: (y / length) * scale,
            oz: (z / length) * scale,
          });
        });

        // 30 Edges
        for (let i = 0; i < 12; i++) {
          for (let j = i + 1; j < 12; j++) {
            const dx = vertices[i].x - vertices[j].x;
            const dy = vertices[i].y - vertices[j].y;
            const dz = vertices[i].z - vertices[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            // Icosahedron edge lengths are uniform
            if (dist < scale * 1.2) {
              edges.push({ u: i, v: j });
            }
          }
        }
      } 
      else if (currentShape === "torus") {
        const R = 130; // Outer radius
        const r = 50;  // Inner tube radius
        const rings = 18;
        const sides = 18;

        for (let i = 0; i < rings; i++) {
          const u = (i / rings) * Math.PI * 2;
          const cosU = Math.cos(u);
          const sinU = Math.sin(u);

          for (let j = 0; j < sides; j++) {
            const v = (j / sides) * Math.PI * 2;
            const cosV = Math.cos(v);
            const sinV = Math.sin(v);

            const x = (R + r * cosV) * cosU;
            const y = (R + r * cosV) * sinU;
            const z = r * sinV;

            vertices.push({ x, y, z, ox: x, oy: y, oz: z });

            // Connect in grid
            const currentIdx = i * sides + j;
            const nextRingIdx = ((i + 1) % rings) * sides + j;
            const nextSideIdx = i * sides + ((j + 1) % sides);

            edges.push({ u: currentIdx, v: nextRingIdx });
            edges.push({ u: currentIdx, v: nextSideIdx });
          }
        }
      } 
      else if (currentShape === "sphere") {
        const R = 150;
        const rings = 12;
        const sectors = 16;

        for (let i = 0; i <= rings; i++) {
          const phi = (i / rings) * Math.PI;
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);

          for (let j = 0; j < sectors; j++) {
            const theta = (j / sectors) * Math.PI * 2;
            const sinTheta = Math.sin(theta);
            const cosTheta = Math.cos(theta);

            const x = R * cosTheta * sinPhi;
            const y = R * sinTheta * sinPhi;
            const z = R * cosPhi;

            vertices.push({ x, y, z, ox: x, oy: y, oz: z });

            const curr = i * sectors + j;
            
            // Connect to next ring
            if (i < rings) {
              const nextRing = (i + 1) * sectors + j;
              edges.push({ u: curr, v: nextRing });
            }
            // Connect to next sector
            const nextSec = i * sectors + ((j + 1) % sectors);
            edges.push({ u: curr, v: nextSec });
          }
        }
      }
      else if (currentShape === "hyperboloid") {
        const a = 60, b = 60, c = 80;
        const uSteps = 12;
        const vSteps = 16;

        for (let i = 0; i < uSteps; i++) {
          const u = ((i / (uSteps - 1)) - 0.5) * 2.2; // sinh range
          const coshU = Math.cosh(u);
          const sinhU = Math.sinh(u);

          for (let j = 0; j < vSteps; j++) {
            const v = (j / vSteps) * Math.PI * 2;
            const cosV = Math.cos(v);
            const sinV = Math.sin(v);

            const x = a * coshU * cosV;
            const y = b * coshU * sinV;
            const z = c * sinhU;

            vertices.push({ x, y, z, ox: x, oy: y, oz: z });

            const curr = i * vSteps + j;
            if (i < uSteps - 1) {
              const nextU = (i + 1) * vSteps + j;
              edges.push({ u: curr, v: nextU });
            }
            const nextV = i * vSteps + ((j + 1) % vSteps);
            edges.push({ u: curr, v: nextV });
          }
        }
      }
      else if (currentShape === "particles") {
        // High count of standalone floating vertices with nearby connectors
        const count = 70;
        for (let i = 0; i < count; i++) {
          const r = Math.random() * 100 + 80;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          
          const x = r * Math.sin(phi) * Math.cos(theta);
          const y = r * Math.sin(phi) * Math.sin(theta);
          const z = r * Math.cos(phi);
          
          vertices.push({ x, y, z, ox: x, oy: y, oz: z });
        }

        // Connect nodes based on mathematical proximity
        for (let i = 0; i < count; i++) {
          for (let j = i + 1; j < count; j++) {
            const dx = vertices[i].x - vertices[j].x;
            const dy = vertices[i].y - vertices[j].y;
            const dz = vertices[i].z - vertices[j].z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 75) {
              edges.push({ u: i, v: j });
            }
          }
        }
      }
    };

    // Initialize shapes and stars
    generateGeometry(shape);
    initStars(particleCount);

    // Mouse Tracking listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const rawX = e.clientX - rect.left;
      const rawY = e.clientY - rect.top;

      mouseRef.current.targetX = rawX - width / 2;
      mouseRef.current.targetY = rawY - height / 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleMouseClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Add a shockwave at mouse coordinate
      shockwavesRef.current.push({
        x: clickX,
        y: clickY,
        radius: 0,
        maxRadius: Math.max(width, height) * 0.4,
        opacity: 1.0,
      });

      // Give coordinates a minor jolt
      vertices.forEach((v) => {
        const dx = v.x - (clickX - width / 2);
        const dy = v.y - (clickY - height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) * 0.35;
          const angle = Math.atan2(dy, dx);
          v.x += Math.cos(angle) * force;
          v.y += Math.sin(angle) * force;
          v.z += (Math.random() - 0.5) * force;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleMouseClick);

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Math rotations helpers
    const rotateX = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y = point.y * cos - point.z * sin;
      const z = point.y * sin + point.z * cos;
      point.y = y;
      point.z = z;
    };

    const rotateY = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point.x * cos + point.z * sin;
      const z = -point.x * sin + point.z * cos;
      point.x = x;
      point.z = z;
    };

    const rotateZ = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = point.x * cos - point.y * sin;
      const y = point.x * sin + point.y * cos;
      point.x = x;
      point.y = y;
    };

    // Color mapper based on settings
    const getGlowStyle = (zDepth: number, theme: ColorTheme, ratio: number = 0.5) => {
      // Calculate opacity based on Z depth
      const minZ = -200;
      const maxZ = 200;
      const alpha = Math.max(0.12, Math.min(0.85, (zDepth - minZ) / (maxZ - minZ)));

      if (theme === "emerald") {
        return `rgba(16, 185, 129, ${alpha})`;
      } else if (theme === "amber") {
        return `rgba(245, 158, 11, ${alpha})`;
      } else {
        // Hybrid: Blend Emerald Green and Amber Gold based on coordinate ratio
        const r = Math.floor(16 * (1 - ratio) + 245 * ratio);
        const g = Math.floor(185 * (1 - ratio) + 158 * ratio);
        const b = Math.floor(129 * (1 - ratio) + 11 * ratio);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
    };

    // 3D to 2D projection
    const project = (point: Point3D) => {
      const cameraDistance = 350;
      // Z-clipping: clip points that are behind or extremely close to the camera plane
      if (point.z <= -cameraDistance + 20) {
        return { x: 0, y: 0, scale: 0 };
      }
      const scale = cameraDistance / (point.z + cameraDistance);
      return {
        x: point.x * scale + width / 2,
        y: point.y * scale + height / 2,
        scale,
      };
    };

    // Main animation loop
    const animate = () => {
      // Background clear
      ctx.fillStyle = "rgba(2, 6, 4, 0.25)"; // Trails
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse coordinates dampening
      const mouse = mouseRef.current;
      const ease = 0.08;
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;

      // Adjust rotation speed depending on mouse activity
      const currentSpeedMultiplier = speed * (mouse.active ? 1.8 : 1.0);
      angleX = 0.004 * currentSpeedMultiplier;
      angleY = 0.006 * currentSpeedMultiplier;
      angleZ = 0.002 * currentSpeedMultiplier;

      // 1. Draw Starfield in background
      stars.forEach((star) => {
        // Rotate star
        rotateX(star as any, angleX * 0.2);
        rotateY(star as any, angleY * 0.2);

        // Project
        const proj = project(star as any);
        if (proj.scale > 0 && proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
          ctx.beginPath();
          const radius = Math.max(0.1, star.size * proj.scale);
          ctx.arc(proj.x, proj.y, radius, 0, Math.PI * 2);
          
          // Draw faint gold or emerald stars
          if (glowColor === "amber") {
            ctx.fillStyle = `rgba(251, 191, 36, ${star.alpha * proj.scale * 0.4})`;
          } else {
            ctx.fillStyle = `rgba(52, 211, 153, ${star.alpha * proj.scale * 0.4})`;
          }
          ctx.fill();
        }
      });

      // 2. Process shockwaves
      const shockwaves = shockwavesRef.current;
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 8;
        sw.opacity = 1.0 - sw.radius / sw.maxRadius;

        if (sw.opacity <= 0) {
          shockwaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = glowColor === "amber" 
          ? `rgba(245, 158, 11, ${sw.opacity * 0.25})`
          : `rgba(16, 185, 129, ${sw.opacity * 0.25})`;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // 3. Coordinate updates & transformations
      vertices.forEach((v, index) => {
        // Core rotation
        rotateX(v, angleX);
        rotateY(v, angleY);
        rotateZ(v, angleZ);

        // Recover original shape slowly (elasticity)
        const spring = 0.05;
        v.x += (v.ox - v.x) * spring;
        v.y += (v.oy - v.y) * spring;
        v.z += (v.oz - v.z) * spring;

        // Apply mouse distortion / magnetic gravity
        if (mouseDistort && mouse.active) {
          const dx = v.x - mouse.x;
          const dy = v.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const pull = (180 - dist) * 0.08;
            const angle = Math.atan2(dy, dx);
            // Vertices pull slightly toward mouse
            v.x -= Math.cos(angle) * pull;
            v.y -= Math.sin(angle) * pull;
            v.z += (Math.random() - 0.5) * pull * 0.5;
          }
        }
      });

      // Project vertices to screenspace coordinates
      const projPoints = vertices.map((v) => project(v));

      // 4. Draw wireframe edges
      ctx.shadowBlur = 6;
      edges.forEach((edge) => {
        const p1 = projPoints[edge.u];
        const p2 = projPoints[edge.v];

        // Offscreen clipping or camera plane clipping
        if (
          p1.scale <= 0 || p2.scale <= 0 ||
          p1.x < -100 || p1.x > width + 100 ||
          p1.y < -100 || p1.y > height + 100 ||
          p2.x < -100 || p2.x > width + 100 ||
          p2.y < -100 || p2.y > height + 100
        ) {
          return;
        }

        // Draw Line
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Blend colors
        const depth = (vertices[edge.u].z + vertices[edge.v].z) / 2;
        const verticalRatio = (p1.y + p2.y) / (height * 2); // ratio based on screen pos
        ctx.strokeStyle = getGlowStyle(depth, glowColor, verticalRatio);
        ctx.lineWidth = Math.max(0.6, (p1.scale + p2.scale) * 0.7);

        ctx.shadowColor = glowColor === "amber" ? "rgba(245, 158, 11, 0.4)" : "rgba(16, 185, 129, 0.4)";
        ctx.stroke();
      });

      // 5. Draw glowing vertex nodes
      projPoints.forEach((p, i) => {
        if (p.scale <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) return;

        const size = Math.max(0.1, p.scale * 3.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

        const zVal = vertices[i].z;
        ctx.fillStyle = getGlowStyle(zVal, glowColor, p.y / height);
        ctx.shadowBlur = 10;
        ctx.shadowColor = glowColor === "amber" ? "#fbbf24" : "#34d399";
        ctx.fill();
      });

      ctx.shadowBlur = 0; // Reset

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [shape, speed, particleCount, glowColor, mouseDistort]);

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
      />
      <div className={styles.mask} />
    </div>
  );
}
