import React from "react";
import GlassHeader from "@/components/GlassHeader";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact | KingTony Technologies",
  description: "Initialize secure communications with KingTony Technologies.",
};

export default function ContactPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Background Ambience */}
      <div className="grid-overlay" />
      <div className="glow-ambient-1" />
      <div className="glow-ambient-2" style={{ top: '60%', right: '10%' }} />
      
      <div className={styles.geometricShapes}>
        <div className={`${styles.shape} ${styles.circle1}`}></div>
        <div className={`${styles.shape} ${styles.circle2}`}></div>
      </div>

      <GlassHeader />

      <main className={styles.main}>
        <section className={styles.contactSection}>
          
          <div className={styles.headerArea}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              COMM-LINK ACTIVE
            </div>
            <h1 className={styles.title}>
              Initialize <span className={styles.highlight}>Connection</span>
            </h1>
            <p className={styles.desc}>
              Ready to elevate your digital presence? Send us a secure transmission regarding your project, architecture needs, or corporate branding.
            </p>
          </div>

          <div className={styles.grid}>
            
            {/* Left Column: Form */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Secure Message
              </h2>
              
              <div className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Identifier (Name)</label>
                  <input type="text" className={styles.input} placeholder="John Doe" />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Return Address (Email)</label>
                  <input type="email" className={styles.input} placeholder="john@company.com" />
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Transmission Data (Message)</label>
                  <textarea className={styles.input} placeholder="Describe your project requirements..."></textarea>
                </div>
                
                <button type="button" className={`btn-primary ${styles.submitBtn}`}>
                  Transmit Data
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Column: Info */}
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Direct Channels
              </h2>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Primary Email</span>
                    <a href="mailto:kingtony3825@gmail.com" className={styles.infoValue}>kingtony3825@gmail.com</a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Direct Line</span>
                    <a href="tel:+2349063213825" className={styles.infoValue}>+234 906 321 3825</a>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Operating Hours</span>
                    <span className={styles.infoValue}>Mon - Fri, 09:00 - 17:00 (WAT)</span>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className={styles.infoContent}>
                    <span className={styles.infoLabel}>Base Location</span>
                    <span className={styles.infoValue}>Imo State, Nigeria & Remote</span>
                  </div>
                </div>
              </div>

              <div className={styles.socialsArea}>
                <h3 className={styles.socialTitle}>Network Nodes</h3>
                <div className={styles.socialGrid}>
                  <a href="https://github.com/king-tony01" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/kingtony-technologies" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="https://x.com/AmucheOkolie" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="X (Twitter)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
