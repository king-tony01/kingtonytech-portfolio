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
          
          {/* AGENCY BIO */}
          <div className={styles.contentCard} style={{ marginBottom: "2rem" }}>
            <div className={styles.headerArea}>
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                THE AGENCY
              </div>
              <h1 className={styles.title}>
                KingTony <span className={styles.highlight}>Technologies</span>
              </h1>
            </div>

            <div className={styles.biography}>
              <p>
                KingTony Technologies is a premier digital agency operating at the intersection of high-fidelity design and uncompromising software architecture. Based in Imo State, Nigeria, our team specializes in building end-to-end digital experiences—from corporate branding and 3D UI/UX design to highly scalable distributed backend systems.
              </p>
              
              <p>
                We believe that a brand's digital presence shouldn't just exist—it should captivate. Whether orchestrating secure cloud infrastructure, developing native mobile applications, or handling enterprise business registrations, our standard remains absolute: we build modern tech companies from the ground up, ensuring that every deployment balances mathematical precision with state-of-the-art visual art.
              </p>
            </div>
          </div>

          {/* FOUNDER BIO */}
          <div className={styles.contentCard}>
            <div className={styles.headerArea}>
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                THE FOUNDER
              </div>
              <h2 className={styles.title} style={{ fontSize: "2rem" }}>
                Okolie Amauche Anthony
              </h2>
            </div>

            <div className={styles.biography}>
              <p>
                I am the lead systems architect and founder behind KingTony Technologies. I recently graduated from the Federal University of Technology Owerri (FUTO), where I honed my foundational skills in computer science and engineering.
              </p>
              
              <p>
                I build digital solutions that actually work. My focus is on writing clean, maintainable code and solving complex problems without overengineering them. I enjoy the process of taking an idea from a rough sketch to a fully deployed production application. It's a challenging space, but that's exactly why I love doing it.
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
