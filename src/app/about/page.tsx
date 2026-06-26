import React from "react";
import GlassHeader from "@/components/GlassHeader";
import styles from "./about.module.css";

export const metadata = {
  title: "About | Okolie Amauche Anthony",
  description: "Software Engineer from Imo State, Nigeria.",
};

export default function AboutPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Background Ambience & Geometrics */}
      <div className="grid-overlay" />
      <div className="glow-ambient-1" />
      
      <div className={styles.geometricShapes}>
        <div className={`${styles.shape} ${styles.hexagon}`}></div>
        <div className={`${styles.shape} ${styles.circle}`}></div>
        <div className={`${styles.shape} ${styles.triangle}`}></div>
      </div>

      <GlassHeader />

      <main className={styles.main}>
        <section className={styles.aboutSection}>
          <div className={styles.contentCard}>
            <div className={styles.headerArea}>
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                ABOUT THE ENGINEER
              </div>
              <h1 className={styles.title}>
                Hi, I'm Okolie Amauche <span className={styles.highlight}>Anthony</span>
              </h1>
            </div>

            <div className={styles.biography}>
              <p>
                I'm a software engineer from Imo State, Nigeria. I recently graduated from the Federal University of Technology Owerri (FUTO), where I honed my foundational skills in computer science and engineering. 
              </p>
              
              <p>
                I build digital solutions that actually work. My focus is mainly on writing clean, maintainable code and solving complex problems without overengineering them. I enjoy the process of taking an idea from a rough sketch to a fully deployed production application. It's a challenging space, but that's exactly why I love doing it.
              </p>

              <p>
                When I'm not writing code or debugging servers, I usually spend my downtime gaming. It helps me unwind and sometimes gives me fresh perspectives on UI/UX design. I also really enjoy cooking. There's something satisfying about stepping away from the screen to prepare a good meal—it's a different kind of building process.
              </p>

              <p>
                I'm always open to talking about tech, gaming setups, or new recipes. If you want to collaborate on a project or just say hi, feel free to reach out.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
