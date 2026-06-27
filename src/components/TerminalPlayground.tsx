"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./TerminalPlayground.module.css";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "warning";
}

export default function TerminalPlayground() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "SSH CONNECTION ESTABLISHED TO GATEWAY.KINGTONYTECH.COM:22", type: "success" },
    { text: "SECURITY PROTOCOL ACTIVE. VERIFIED ENTITY: KINGTONY TECHNOLOGIES (ROOT)", type: "success" },
    { text: "Type 'help' to explore available commands and unlock systems.", type: "output" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);
  const [hackActive, setHackActive] = useState(false);
  const [hackProgress, setHackProgress] = useState(0);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  // File structure mockup
  const fileSystem: Record<string, string> = {
    "agency-profile.txt": `===============================================================
KingTony Technologies (Digital Agency)
===============================================================
Role: Full-Spectrum Digital Agency & Systems Architects
Mission: Bridging high-performance machine pipelines with elite UI.
Location: Imo State, Nigeria & Remote Space
Philosophy: "Performance is not a feature; it is the core architecture."
Expertise: Scalable distributed systems, low-latency API design,
           3D UI/UX design, and corporate brand engineering.
===============================================================`,
    "skills.json": `{
  "core_languages": ["Rust", "Go", "TypeScript", "C++", "C"],
  "frontend": ["Next.js", "React 19", "HTML5 WebGL/Canvas", "Vanilla CSS"],
  "backend": ["Node.js", "GraphQL", "gRPC", "REST APIs", "WebSockets"],
  "cloud_devops": ["Docker", "AWS Cloud", "Edge Middleware", "PostgreSQL", "Redis"]
}`,
    "secret.key": `ERROR: ENCRYPTED PORTKEY DETECTED.
Attempting to run 'cat' on this file directly triggers security alarm systems.
Execute command 'hack' to force bypass the biometric security key override.`
  };

  const isInitialMount = useRef(true);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Matrix Rain canvas animation
  useEffect(() => {
    if (!matrixActive) return;

    const canvas = matrixCanvasRef.current;
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

      ctx.fillStyle = "#34d399";
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
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [matrixActive]);

  // Hack sequence animation
  useEffect(() => {
    if (!hackActive) return;

    const interval = setInterval(() => {
      setHackProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setHistory((prevHist) => [
            ...prevHist,
            { text: "BYPASS COMPLETE. SECURE SHELL DECRYPTED.", type: "success" },
            { text: "=========================================================", type: "success" },
            { text: "ACCESS GRANTED: WELCOME KINGTONY TECHNOLOGIES ADMIN", type: "warning" },
            { text: "=========================================================", type: "warning" },
            { text: "SYSTEM STATUS: UNLOCKED. MATRIX SUBSYSTEM NOMINAL.", type: "success" },
          ]);
          setMatrixActive(true);
          setHackActive(false);
          return 100;
        }
        return prev + 4;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [hackActive]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const updatedHistory = [...history, { text: `kingtonytech-terminal:~ admin$ ${cmd}`, type: "input" as const }];
    const lowerCmd = cmd.toLowerCase();

    // Command Parser
    if (lowerCmd === "help") {
      updatedHistory.push({
        text: `Available Core Shell Commands:
  about       - Detailed summary of KingTony Technologies.
  ls          - List file directories in active SSH directory.
  cat [file]  - Display file contents.
  skills      - Dump core technology stack.
  projects    - Print list of high-performance client deployments.
  matrix      - Activate/deactivate the glowing digital binary waterfall overlay.
  hack        - Decrypt secure SSH node ports & bypass firewalls.
  clear       - Wipe CLI shell logs buffer.
  email       - Retrieve agency's secure connection channels.`,
        type: "output",
      });
    } 
    else if (lowerCmd === "about") {
      updatedHistory.push({
        text: "KingTony Technologies is a premier digital agency operating at the intersection of high-fidelity design and uncompromising software architecture. Based in Nigeria, we build scalable distributed systems, highly-converting product designs, and corporate brands from the ground up.",
        type: "output"
      });
    }
    else if (lowerCmd === "ls") {
      updatedHistory.push({
        text: Object.keys(fileSystem).join("    "),
        type: "success",
      });
    } 
    else if (lowerCmd.startsWith("cat ")) {
      const targetFile = cmd.slice(4).trim();
      if (fileSystem[targetFile]) {
        if (targetFile === "secret.key") {
          updatedHistory.push({ text: fileSystem[targetFile], type: "warning" });
        } else {
          updatedHistory.push({ text: fileSystem[targetFile], type: "output" });
        }
      } else {
        updatedHistory.push({ text: `cat: ${targetFile}: No such file in active workspace.`, type: "error" });
      }
    } 
    else if (lowerCmd === "skills") {
      updatedHistory.push({
        text: `CORE SKILLSET DUMP:
  -------------------------------------------------------------
  [+] Systems Programming  : Rust, C++, C, Assembly (x86/ARM)
  [+] Web Applications     : React 19, Next.js, HTML5 WebGL/Canvas
  [+] Service Infrastructure: Go, Node.js, GraphQL, PostgreSQL, Redis
  [+] Containers & DevOps  : Docker, Kubernetes, AWS Node Grids, CI/CD
  -------------------------------------------------------------`,
        type: "output",
      });
    } 
    else if (lowerCmd === "projects") {
      updatedHistory.push({
        text: `ACTIVE SYSTEMS & DEPLOYMENTS:
  -------------------------------------------------------------
  [1] LUMINAR-3D-ENGINE   - Real-time custom coordinate renderer using raw canvas.
  [2] EDGE-ROUTER-v2     - Multi-threaded DNS query routing gateway in Rust (99.9% SLI).
  [3] ENTERPRISE-BRANDING - Complete brand identity and scalable infrastructure setup.
  -------------------------------------------------------------
  For details, view the 'Projects' section via navigation or visit github.com/KingTonyTech`,
        type: "output",
      });
    } 
    else if (lowerCmd === "matrix") {
      setMatrixActive(!matrixActive);
      updatedHistory.push({
        text: matrixActive ? "Matrix overlay offline." : "Matrix binary waterfall sequence online.",
        type: "success",
      });
    } 
    else if (lowerCmd === "hack") {
      if (matrixActive) {
        updatedHistory.push({ text: "Security node already bypassed.", type: "warning" });
      } else {
        setHackActive(true);
        setHackProgress(0);
        updatedHistory.push({ text: "INITIALIZING DECRYPTION ALGORITHMS. BYPASSING SEGMENT BUFFERS...", type: "warning" });
      }
    } 
    else if (lowerCmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } 
    else if (lowerCmd === "email") {
      updatedHistory.push({
        text: `SECURE INCOMING LINK ESTABLISHED:
  Agency: KingTony Technologies
  Direct Mail: kingtony3825@gmail.com
  Direct Line: +234 906 321 3825
  Founder: Okolie Amauche Anthony
  Availability: Recruiting / Strategic Consulting / Project Contracting Active`,
        type: "success",
      });
    } 
    else {
      updatedHistory.push({ text: `command not recognized: '${cmd}'. Type 'help' for directions.`, type: "error" });
    }

    setHistory(updatedHistory);
    setInputVal("");
  };

  const handleTerminalClick = () => {
    // Focus the terminal input hidden text field
    const inputEl = document.getElementById("terminal-cli-input");
    inputEl?.focus();
  };

  return (
    <section id="terminal" className={styles.section}>
      <div className={styles.titleArea}>
        <h2 className={styles.title}>
          <span className={styles.titleBar} />
          Terminal Shell Console
        </h2>
        <p className={styles.subtitle}>
          An interactive, sandboxed terminal simulating a live SSH bypass environment. Try typing <span className={styles.cmdHighlight}>help</span> or <span className={styles.amberCmdHighlight}>hack</span>.
        </p>
      </div>

      {/* Main Terminal Window Frame */}
      <div
        onClick={handleTerminalClick}
        className={styles.terminalWindow}
      >
        {/* Terminal Header */}
        <div className={styles.header}>
          <div className={styles.dotsGroup}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
          </div>
          <span className={styles.titleText}>
            kingtony@founder-node:~ (ssh)
          </span>
        </div>

        {/* Dynamic Canvas Rain */}
        {matrixActive && <canvas ref={matrixCanvasRef} className={styles.matrixCanvas} />}

        {/* Hack Decryption Overlay Screen */}
        {hackActive && (
          <div className={styles.hackOverlay}>
            <div className={styles.hackTitle}>
              🚨 BIO-SECURITY LOCK DETECTED: OVERRIDING INJECTION 🚨
            </div>
            
            {/* ProgressBar */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${hackProgress}%` }}
              />
            </div>
            
            <div className={styles.hackStatus}>
              Decrypting database blocks... {hackProgress}%
            </div>
            <div className={styles.hackLog}>
              0x1F2A -- BYPASSING SSH KEY CHAINS -- INJECTING CORRUPT MEMORY BUFFERS
            </div>
          </div>
        )}

        {/* Terminal Text Logs Container */}
        <div
          ref={terminalBodyRef}
          className={styles.body}
        >
          {history.map((line, idx) => {
            let colorStyle = styles.lineOutput; // default output
            if (line.type === "input") colorStyle = styles.lineInput;
            if (line.type === "error") colorStyle = styles.lineError;
            if (line.type === "success") colorStyle = styles.lineSuccess;
            if (line.type === "warning") colorStyle = styles.lineWarning;

            return (
              <pre
                key={idx}
                className={`${styles.line} ${colorStyle}`}
              >
                {line.text}
              </pre>
            );
          })}
          
          {/* CLI input row */}
          <form onSubmit={handleCommandSubmit} className={styles.inputRow} onClick={() => document.getElementById('terminal-cli-input')?.focus()}>
            <span className={styles.promptLabel}>
              kingtonytech-terminal:~ founder$
            </span>
            <div className={styles.inputWrapper}>
              <span className={styles.inputText}>
                {inputVal ? inputVal : <span className={styles.placeholderText}>type help...</span>}
              </span>
              <span className="cursor-blink" style={{ flexShrink: 0 }} />
              <input
                id="terminal-cli-input"
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className={styles.hiddenInput}
                autoComplete="off"
              />
            </div>
          </form>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </section>
  );
}
