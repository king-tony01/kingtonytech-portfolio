import React from "react";
import { getProjects, getCategories } from "./actions";
import AdminClient from "./AdminClient";
import styles from "./admin.module.css";
import GlassHeader from "@/components/GlassHeader";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Super Admin | Portfolio Management",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const projects = await getProjects();
  const categories = await getCategories();

  return (
    <div className={styles.adminWrapper}>
      {/* Background Ambience */}
      <div className="grid-overlay" />
      <div className="glow-ambient-1" />
      
      <GlassHeader />

      <main>
        <header className={styles.header}>
          <h1 className={styles.title}>System Control Panel</h1>
        </header>

        <AdminClient initialProjects={projects} initialCategories={categories} />
      </main>
    </div>
  );
}
