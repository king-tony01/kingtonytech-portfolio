"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ProjectShowcase.module.css";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  color: "emerald" | "amber" | "hybrid";
  githubUrl: string;
  liveUrl: string;
}

export default function ProjectShowcase() {
  const projects: Project[] = [
    {
      id: "luminar",
      title: "Luminar 3D Mathematical Renderer",
      category: "Graphics & System Engines",
      description: "A custom 3D vector and wireframe rendering engine developed in pure typescript. Optimizes trigonometric projections and calculates matrix rotations for complex wireframe meshes.",
      tags: ["WebGL", "TypeScript", "Matrix Rotations", "HTML5 Canvas"],
      color: "emerald",
      githubUrl: "https://github.com/KingTonyTech/luminar-3d",
      liveUrl: "#hero",
    },
    {
      id: "nova-dns",
      title: "Nova Edge DNS Gatekeeper",
      category: "Low-Latency Network Gateways",
      description: "A high-performance DNS query cache proxy written in Rust. Features lock-free memory buffers, custom multi-threaded routers, and edge middleware protocols capable of resolving queries under 2ms.",
      tags: ["Rust", "Multi-threading", "DNS Protocols", "gRPC", "Tokio Core"],
      color: "amber",
      githubUrl: "https://github.com/KingTonyTech/nova-dns",
      liveUrl: "#terminal",
    },
    {
      id: "hyperion",
      title: "Hyperion Ledger Distributed Ledger",
      category: "Distributed Consensus Systems",
      description: "A high-throughput decentralized pipeline tracking transactional database blocks. Implements optimistic execution logs, automated cryptography validation, and dynamic transaction streaming.",
      tags: ["Go", "Distributed Systems", "ECDSA Cryptography", "WebSockets"],
      color: "hybrid",
      githubUrl: "https://github.com/KingTonyTech/hyperion-ledger",
      liveUrl: "#capabilities",
    },
  ];

  // 1. Luminar Interactive Widget states (Rotating Cube)
  const cubeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cubeSpeed, setCubeSpeed] = useState(1.0);

  useEffect(() => {
    const canvas = cubeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const size = 30;

    // Cube vertices in 3D
    const vertices = [
      { x: -size, y: -size, z: -size },
      { x: size, y: -size, z: -size },
      { x: size, y: size, z: -size },
      { x: -size, y: size, z: -size },
      { x: -size, y: -size, z: size },
      { x: size, y: -size, z: size },
      { x: size, y: size, z: size },
      { x: -size, y: size, z: size },
    ];

    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // Back face
      [4, 5], [5, 6], [6, 7], [7, 4], // Front face
      [0, 4], [1, 5], [2, 6], [3, 7], // Connectors
    ];

    const rotateX = (v: { x: number; y: number; z: number }, rad: number) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const y = v.y * cos - v.z * sin;
      const z = v.y * sin + v.z * cos;
      return { x: v.x, y, z };
    };

    const rotateY = (v: { x: number; y: number; z: number }, rad: number) => {
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      const x = v.x * cos + v.z * sin;
      const z = -v.x * sin + v.z * cos;
      return { x, y: v.y, z };
    };

    const project = (v: { x: number; y: number; z: number }) => {
      const dist = 120;
      const scale = dist / (v.z + dist);
      return {
        x: v.x * scale + canvas.width / 2,
        y: v.y * scale + canvas.height / 2,
      };
    };

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 4, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      angle += 0.012 * cubeSpeed;

      const rotated = vertices.map((v) => {
        let r = rotateX(v, angle);
        r = rotateY(r, angle * 1.5);
        return r;
      });

      const projected = rotated.map(project);

      // Draw Edges
      ctx.beginPath();
      edges.forEach(([u, v]) => {
        ctx.moveTo(projected[u].x, projected[u].y);
        ctx.lineTo(projected[v].x, projected[v].y);
      });
      ctx.strokeStyle = "rgba(16, 185, 129, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "#34d399";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw Vertices
      projected.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [cubeSpeed]);

  // 2. Nova Edge states (Latency test)
  const [latencyLogs, setLatencyLogs] = useState<string[]>([
    "NOVA-DNS SHELL ACTIVE",
    "Ready for network execution tests...",
  ]);
  const [pinging, setPinging] = useState(false);

  const triggerPing = () => {
    if (pinging) return;
    setPinging(true);
    setLatencyLogs((prev) => [...prev, "PING gateway.kingtonytech.com --port 53"]);

    setTimeout(() => {
      const isCached = Math.random() > 0.5;
      const latency = isCached ? (Math.random() * 0.4 + 0.1).toFixed(3) : (Math.random() * 8 + 3).toFixed(2);
      const log = `  -> 64 bytes from gateway: seq=1 ttl=64 time=${latency}ms ${isCached ? "(cached cache-hit)" : "(network-hop)"}`;
      setLatencyLogs((prev) => [...prev, log]);
      setPinging(false);
    }, 600);
  };

  // 3. Hyperion Ledger Ledger State
  const [ledgerBlocks, setLedgerBlocks] = useState<{ height: number; hash: string; txs: number; value: string }[]>([
    { height: 1420842, hash: "0x8fa9...c2b1", txs: 14, value: "1.24 BTC" },
    { height: 1420841, hash: "0x2db4...f01e", txs: 28, value: "4.80 ETH" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLedgerBlocks((prev) => {
        const nextHeight = prev[0].height + 1;
        const chars = "0123456789abcdef";
        let randHash = "0x";
        for (let i = 0; i < 4; i++) randHash += chars[Math.floor(Math.random() * 16)];
        randHash += "...";
        for (let i = 0; i < 4; i++) randHash += chars[Math.floor(Math.random() * 16)];

        const txsCount = Math.floor(Math.random() * 30) + 5;
        const val = `${(Math.random() * 3 + 0.2).toFixed(2)} ${Math.random() > 0.5 ? "BTC" : "ETH"}`;

        const newBlock = { height: nextHeight, hash: randHash, txs: txsCount, value: val };
        return [newBlock, ...prev.slice(0, 2)];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.titleArea}>
        <h2 className={styles.title}>
          <span className={styles.titleBar} />
          Production Deployments
        </h2>
        <p className={styles.subtitle}>
          Explore production-grade software projects featuring real-time client/server status simulations.
        </p>
      </div>

      <div className={styles.grid}>
        {projects.map((p) => {
          return (
            <div
              key={p.id}
              className={styles.card}
            >
              {/* Card visual playground */}
              <div className={styles.visualBox}>
                
                {/* 1. LUMINAR WIREFRAME GRAPHIC */}
                {p.id === "luminar" && (
                  <div className={styles.cubeBox}>
                    <canvas ref={cubeCanvasRef} width={130} height={120} className={styles.cubeCanvas} />
                    <div className={styles.cubeControls}>
                      <button
                        onClick={() => setCubeSpeed((s) => Math.max(0.2, s - 0.4))}
                        className={styles.cubeBtn}
                      >
                        Speed -
                      </button>
                      <span className={styles.cubeFps}>FPS: 60.0</span>
                      <button
                        onClick={() => setCubeSpeed((s) => Math.min(3.0, s + 0.4))}
                        className={styles.cubeBtn}
                      >
                        Speed +
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. NOVA DNS LATENCY GRAPHIC */}
                {p.id === "nova-dns" && (
                  <div className={styles.dnsBox}>
                    <div className={styles.dnsHeader}>
                      <span>EDGE NETWORK NODE SHELL</span>
                      <span>ACTIVE</span>
                    </div>
                    <div className={styles.dnsLogs}>
                      {latencyLogs.slice(-4).map((log, index) => (
                        <div key={index} className={styles.dnsLogLine}>
                          {log}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={triggerPing}
                      disabled={pinging}
                      className={styles.dnsButton}
                    >
                      {pinging ? "RESOLVING QUERY HOP..." : "EXECUTE PING NODE"}
                    </button>
                  </div>
                )}

                {/* 3. HYPERION BLOCKSTREAM LEDGER */}
                {p.id === "hyperion" && (
                  <div className={styles.ledgerBox}>
                    <div className={styles.ledgerHeader}>
                      <span>LEDGER BLOCK HEIGHT</span>
                      <span>TRANSACTIONS</span>
                      <span>BLOCK VALUE</span>
                    </div>
                    <div className={styles.ledgerStream}>
                      {ledgerBlocks.map((block) => (
                        <div key={block.height} className={styles.ledgerBlockRow}>
                          <span className={styles.blockHeight}>#{block.height}</span>
                          <span className={styles.blockHash}>{block.hash}</span>
                          <span>{block.txs} txs</span>
                          <span className={styles.blockValue}>{block.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.ledgerFooter}>
                      <span>STATUS: ONLINE</span>
                      <span>STREAMING BYPASSED TCP TUNNEL</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom text details */}
              <div className={styles.cardDetails}>
                <div className={styles.textGroup}>
                  <span className={styles.cardCategory}>
                    {p.category}
                  </span>
                  <h4 className={styles.cardTitle}>{p.title}</h4>
                  <p className={styles.cardDesc}>{p.description}</p>
                </div>

                <div className={styles.textGroup}>
                  {/* Tech stack badges */}
                  <div className={styles.tags}>
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className={styles.tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions links */}
                  <div className={styles.cardActions}>
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.gitLink}
                    >
                      <svg className={styles.gitIcon} viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      Source Code
                    </a>

                    <a
                      href={p.liveUrl}
                      className={styles.liveLink}
                    >
                      Initialize Node
                      <svg className={styles.arrowIcon} viewBox="0 0 24 24" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
