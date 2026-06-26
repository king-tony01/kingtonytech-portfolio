import React, { Suspense } from "react";
import GlassHeader from "@/components/GlassHeader";
import { prisma } from "@/lib/prisma";
import styles from "./projects.module.css";
import ProjectCard from "./ProjectCard";
import Loading from "./loading";

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function ProjectList() {
  const categories = await prisma.category.findMany({
    include: {
      projects: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className={styles.categoryContainer}>
      {categories.length === 0 && (
        <p style={{ color: "var(--text-secondary)" }}>No projects found in the database. Initialize data via the Super Admin Panel.</p>
      )}

      {categories.map((category) => {
        if (category.projects.length === 0) return null;

        return (
          <section key={category.id} className={styles.categorySection}>
            <div className={styles.categoryHeader}>
              <h3 className={styles.categoryTitle}>{category.name}</h3>
              {category.description && <p className={styles.categoryDesc}>{category.description}</p>}
              <div className={styles.categoryLine} />
            </div>

            <div className={styles.grid}>
              {category.projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Background Ambience */}
      <div className="grid-overlay" />
      <div className="glow-ambient-1" />
      <div className="glow-ambient-2" />

      <GlassHeader />

      <main className={styles.main}>
        {/* Projects Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              PRODUCTION DEPLOYMENTS
            </div>
            <h1 className={styles.title}>
              Engineering <span className={styles.highlight}>Portfolio</span>
            </h1>
            <p className={styles.subtitle}>
              Explore a collection of live systems, applications, and architectures I've built.
            </p>
          </div>
        </section>

        {/* Grouped Projects */}
        <Suspense fallback={<Loading />}>
          <ProjectList />
        </Suspense>
      </main>
    </div>
  );
}
