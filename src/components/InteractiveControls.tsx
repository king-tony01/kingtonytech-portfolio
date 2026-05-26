"use client";

import React from "react";
import { ShapeType, ColorTheme } from "./ThreeDCanvas";
import styles from "./InteractiveControls.module.css";

interface InteractiveControlsProps {
  shape: ShapeType;
  setShape: (shape: ShapeType) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  particleCount: number;
  setParticleCount: (count: number) => void;
  glowColor: ColorTheme;
  setGlowColor: (color: ColorTheme) => void;
  mouseDistort: boolean;
  setMouseDistort: (distort: boolean) => void;
}

export default function InteractiveControls({
  shape,
  setShape,
  speed,
  setSpeed,
  particleCount,
  setParticleCount,
  glowColor,
  setGlowColor,
  mouseDistort,
  setMouseDistort,
}: InteractiveControlsProps) {
  const shapes: { id: ShapeType; label: string }[] = [
    { id: "icosahedron", label: "Icosahedron" },
    { id: "torus", label: "Torus" },
    { id: "sphere", label: "Sphere" },
    { id: "hyperboloid", label: "Hyperboloid" },
    { id: "particles", label: "Constellation" },
  ];

  return (
    <div className={styles.panel}>
      {/* Absolute faint glows inside panel */}
      <div className={styles.panelGlow} />
      
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.indicator} />
          Quantum Physics Engine
        </h3>
        <p className={styles.subtitle}>
          Adjust the digital constants of KingTony's WebGL space environment.
        </p>
      </div>

      {/* Shape Selector */}
      <div className={styles.controlGroup}>
        <label className={styles.label}>
          Geometric Geometry
        </label>
        <div className={styles.buttonGrid}>
          {shapes.map((s) => {
            const isActive = shape === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setShape(s.id)}
                className={`${styles.button} ${isActive ? styles.buttonActive : ""}`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Profile */}
      <div className={styles.controlGroup}>
        <label className={styles.label}>
          Color Spectrum Matrix
        </label>
        <div className={styles.grid3Cols}>
          <button
            onClick={() => setGlowColor("emerald")}
            className={`${styles.button} ${glowColor === "emerald" ? styles.buttonColorActiveEmerald : ""}`}
          >
            Emerald Green
          </button>
          <button
            onClick={() => setGlowColor("amber")}
            className={`${styles.button} ${glowColor === "amber" ? styles.buttonColorActiveAmber : ""}`}
          >
            Amber Gold
          </button>
          <button
            onClick={() => setGlowColor("hybrid")}
            className={`${styles.button} ${glowColor === "hybrid" ? styles.buttonColorActiveHybrid : ""}`}
          >
            Hybrid Nebula
          </button>
        </div>
      </div>

      {/* Speed Slider */}
      <div className={styles.controlGroup}>
        <div className={styles.sliderRow}>
          <span>Orbital Gravity Speed</span>
          <span className={styles.sliderValueEmerald}>{speed.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="3.0"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className={styles.slider}
        />
      </div>

      {/* Stars Count Slider */}
      <div className={styles.controlGroup}>
        <div className={styles.sliderRow}>
          <span>Background Constellations</span>
          <span className={styles.sliderValueAmber}>{particleCount} stars</span>
        </div>
        <input
          type="range"
          min="20"
          max="200"
          step="10"
          value={particleCount}
          onChange={(e) => setParticleCount(parseInt(e.target.value))}
          className={`${styles.slider} ${styles.sliderAmber}`}
        />
      </div>

      {/* Mouse Attraction Toggle */}
      <div className={styles.toggleRow}>
        <div className={styles.toggleLabelGroup}>
          <span className={styles.toggleLabel}>
            Mouse Gravitational Distort
          </span>
          <span className={styles.toggleDesc}>
            Vertices attract/repel cursor hover
          </span>
        </div>
        <button
          onClick={() => setMouseDistort(!mouseDistort)}
          className={`${styles.toggleSwitch} ${mouseDistort ? styles.toggleSwitchActive : ""}`}
        >
          <span
            className={`${styles.toggleBall} ${mouseDistort ? styles.toggleBallActive : ""}`}
          />
        </button>
      </div>

      <div className={styles.tip}>
        💡 Tip: Click inside the 3D Canvas space to launch gravitational kinetic shockwaves!
      </div>
    </div>
  );
}
