import React from "react";
import styles from "./projects.module.css";

export default function Loading() {
  return (
    <div className={styles.categoryContainer}>
      {/* Skeleton Category Section */}
      <section className={styles.categorySection}>
        <div className={styles.categoryHeader}>
          <div className={`${styles.shimmerBox} ${styles.shimmerLine}`} style={{ width: "200px", height: "32px", marginBottom: "8px" }} />
          <div className={`${styles.shimmerBox} ${styles.shimmerLine}`} style={{ width: "300px", height: "16px" }} />
          <div className={styles.categoryLine} style={{ opacity: 0.3 }} />
        </div>

        <div className={styles.grid}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={styles.shimmerCard}>
              <div className={`${styles.shimmerBox} ${styles.shimmerVisual}`} />
              <div className={styles.shimmerDetails}>
                <div className={`${styles.shimmerBox} ${styles.shimmerLine} ${styles.title}`} />
                <div className={`${styles.shimmerBox} ${styles.shimmerLine} ${styles.desc}`} />
                <div className={`${styles.shimmerBox} ${styles.shimmerLine} ${styles.tags}`} />
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between" }}>
                  <div className={`${styles.shimmerBox} ${styles.shimmerLine}`} style={{ width: "100px" }} />
                  <div className={`${styles.shimmerBox} ${styles.shimmerLine}`} style={{ width: "100px" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
