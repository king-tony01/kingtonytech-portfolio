"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "./TechGrid.module.css";

interface BentoCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  glowColor: "emerald" | "amber";
  children?: React.ReactNode;
}

function BentoCard({ title, subtitle, description, tags, glowColor = "emerald", children }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
  };

  const glowStyle = isHovered
    ? {
        background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${
          glowColor === "amber" ? "rgba(245, 158, 11, 0.12)" : "rgba(16, 185, 129, 0.15)"
        }, transparent 60%)`,
        borderImage: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, ${
          glowColor === "amber" ? "#fbbf24" : "#34d399"
        }, transparent 70%) 1`,
      }
    : {};

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={styles.card}
      style={glowStyle}
    >
      {/* Background soft mesh */}
      <div className={styles.cardMesh} />

      {/* Top Graphic Showcase */}
      <div className={styles.cardGraphic}>
        {children}
      </div>

      {/* Bottom details */}
      <div className={styles.cardDetails}>
        <span className={`${styles.cardSubtitle} ${glowColor === "amber" ? styles.subtitleAmber : styles.subtitleEmerald}`}>
          {subtitle}
        </span>
        <h4 className={styles.cardTitle}>
          {title}
        </h4>
        <p className={styles.cardDesc}>
          {description}
        </p>

        {/* Technical Tags */}
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span
              key={tag}
              className={styles.tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TechGrid() {
  const [liveReqs, setLiveReqs] = useState<number[]>(Array(15).fill(25));
  const [cpuLoad, setCpuLoad] = useState(24);
  const [activeAddress, setActiveAddress] = useState("0x7FFE0A4F0080");

  // Dynamic Tickers inside Bento elements
  useEffect(() => {
    // Populate with actual random data on client mount to prevent server hydration mismatches
    setLiveReqs(Array(15).fill(0).map(() => Math.floor(Math.random() * 40) + 10));

    const reqsInterval = setInterval(() => {
      setLiveReqs((prev) => {
        const next = [...prev.slice(1)];
        next.push(Math.floor(Math.random() * 40) + 15);
        return next;
      });
    }, 1200);

    const cpuInterval = setInterval(() => {
      setCpuLoad(Math.floor(Math.random() * 20) + 15);
      setActiveAddress(() => {
        const hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        let addr = "0x";
        for (let i = 0; i < 10; i++) {
          addr += hex[Math.floor(Math.random() * 16)];
        }
        return addr;
      });
    }, 1500);

    return () => {
      clearInterval(reqsInterval);
      clearInterval(cpuInterval);
    };
  }, []);

  return (
    <section id="capabilities" className={styles.section}>
      <div className={styles.titleArea}>
        <h2 className={styles.title}>
          <span className={styles.titleBar} />
          Engineering Pillars
        </h2>
        <p className={styles.subtitle}>
          The technical core competencies driving high-performance software at KingTony Technologies.
        </p>
      </div>

      <div className={styles.grid}>
        
        {/* Card 1: Core Systems Engineering */}
        <BentoCard
          title="Systems Engineering"
          subtitle="Low-level Core"
          description="Developing compile-time safe, thread-safe memory models. Optimized data structures and algorithms designed for minimal CPU instructions."
          tags={["Rust", "C++", "Assembly", "Memory Management", "SIMD"]}
          glowColor="emerald"
        >
          {/* Custom interactive UI: Active memory address debugger */}
          <div className={styles.memoryLayout}>
            <div className={styles.memoryHeader}>
              <span>BUFFER PTR</span>
              <span>INSTRUCTION</span>
              <span>LOAD</span>
            </div>
            <div className={styles.memoryRow}>
              <span className={styles.memoryAddress}>{activeAddress}</span>
              <span style={{ color: "#f3f4f6" }}>MOV EAX, [EBX]</span>
              <span style={{ color: "#34d399" }}>{cpuLoad}%</span>
            </div>
            <div className={`${styles.memoryRow} ${styles.memoryRowSecondary}`} style={{ opacity: 0.7 }}>
              <span>0x3F8B2E01AA10</span>
              <span>ADD ESP, 8</span>
              <span>12%</span>
            </div>
            <div className={`${styles.memoryRow} ${styles.memoryRowSecondary}`} style={{ opacity: 0.4 }}>
              <span>0x0A99CFD1E040</span>
              <span>XOR EAX, EAX</span>
              <span>0%</span>
            </div>
            <div className={styles.memoryStatusRow}>
              <span className={styles.pingDot} />
              <span>REAL-TIME SYSTEM INSTRUCTIONS RUNNING</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: Full-Stack Web Architecture */}
        <BentoCard
          title="Full Stack Architecture"
          subtitle="Hyper-Scalable Web"
          description="High-fidelity client models combined with edge rendering, low-latency API gateways, web socket tunnels, and concurrent backend structures."
          tags={["React 19", "Next.js", "TypeScript", "gRPC", "PostgreSQL"]}
          glowColor="amber"
        >
          {/* Custom interactive UI: Request performance tracker */}
          <div className={styles.reqGraphLayout}>
            <div className={styles.reqTitleRow}>
              <span>API Request Rate</span>
              <span className={styles.reqRate}>14,240 reqs/sec</span>
            </div>
            
            {/* Pulsating bar charts */}
            <div className={styles.reqChart}>
              {liveReqs.map((val, idx) => (
                <div
                  key={idx}
                  className={styles.reqBar}
                  style={{ height: `${val}%` }}
                />
              ))}
            </div>

            <div className={styles.reqFooterRow}>
              <span>0 ms latency</span>
              <span>99.98% Edge SLA uptime</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 3: 3D Visualization & Graphics */}
        <BentoCard
          title="3D Graphics & Canvas"
          subtitle="GPU-Accelerated VIS"
          description="Creating advanced WebGL engines, mathematical projections, coordinate mesh grids, matrix spaces, and 3D wireframe visuals on raw HTML5 canvas."
          tags={["WebGL", "HTML5 Canvas", "Linear Algebra", "Matrix Math", "CSS 3D"]}
          glowColor="emerald"
        >
          {/* Custom interactive UI: Mini canvas revolving structure */}
          <div className={styles.canvasLayout}>
            {/* Spinning vector rings */}
            <div className={styles.spinRing1} />
            <div className={styles.spinRing2} />
            {/* Revolving core indicator */}
            <div className={styles.glowingCore} />
            <div className={styles.canvasFps}>
              FPS: 60.0
            </div>
            <div className={styles.canvasTheta}>
              θ = 4.28 rad
            </div>
          </div>
        </BentoCard>

        {/* Card 4: DevOps & Cloud Nodes */}
        <BentoCard
          title="Distributed Networks"
          subtitle="Cloud & Scalability"
          description="Configuring automated build paths, container grids, server clusters, reverse proxy systems, and secure TLS handshake pipelines."
          tags={["Docker", "AWS Cloud", "Edge Workers", "Redis Cache", "CI/CD"]}
          glowColor="amber"
        >
          {/* Custom interactive UI: Cloud Node Grid state */}
          <div className={styles.cloudLayout}>
            <div className={styles.cloudGrid}>
              {["NYC-NODE-1", "LON-NODE-2", "TYO-NODE-3"].map((node, i) => (
                <div key={node} className={styles.cloudNode}>
                  <span className={styles.nodeName}>{node}</span>
                  <span className={styles.pingDot} />
                  <span className={styles.nodePing}>{i === 1 ? "14ms" : "26ms"}</span>
                </div>
              ))}
            </div>

            <div className={styles.cloudFooter}>
              <span>CLUSTER CAPACITY</span>
              <span className={styles.cloudCap}>32.8%</span>
            </div>
          </div>
        </BentoCard>

      </div>
    </section>
  );
}
