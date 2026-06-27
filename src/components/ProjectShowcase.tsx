import React from "react";
import styles from "./ProjectShowcase.module.css";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string;
  imageUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
}

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.titleArea}>
        <h2 className={styles.title}>
          <span className={styles.titleBar} />
          Production Deployments
        </h2>
        <p className={styles.subtitle}>
          Explore real-world software engineering projects and live systems.
        </p>
      </div>

      <div className={styles.grid}>
        {projects.length === 0 && (
          <p style={{ color: "var(--text-secondary)", textAlign: "center", padding: "40px 0" }}>
            Our project portfolio is currently being updated with recent deployments. Check back soon for new case studies and open-source releases.
          </p>
        )}

        {projects.map((p) => (
          <div key={p.id} className={styles.card}>
            {/* Standard Visual Image Box */}
            <div className={styles.visualBox}>
              {p.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl} alt={p.title} className={styles.projectImage} />
              ) : (
                <div className={styles.placeholderBox}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className={styles.placeholderIcon}>
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className={styles.placeholderText}>NO IMAGE ASSET</span>
                </div>
              )}
            </div>

            {/* Bottom text details */}
            <div className={styles.cardDetails}>
              <div className={styles.textGroup}>
                <span className={styles.cardCategory}>{p.category}</span>
                <h4 className={styles.cardTitle}>{p.title}</h4>
                <p className={styles.cardDesc}>{p.description}</p>
              </div>

              <div className={styles.textGroup}>
                {/* Tech stack badges */}
                <div className={styles.tags}>
                  {p.tags.split(",").map((tag, i) => (
                    <span key={i} className={styles.tag}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                {/* Actions links */}
                <div className={styles.cardActions}>
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.gitLink}>
                      <svg className={styles.gitIcon} viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      Source Code
                    </a>
                  )}

                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.liveLink}>
                      View Deployment
                      <svg className={styles.arrowIcon} viewBox="0 0 24 24" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
