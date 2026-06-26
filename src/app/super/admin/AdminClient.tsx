"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import styles from "./admin.module.css";
import { createProject, updateProject, deleteProject, createCategory, deleteCategory } from "./actions";

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface Project {
  id: string;
  title: string;
  categoryId: string;
  category: Category;
  description: string;
  tags: string;
  imageUrl: string | null;
  logoUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
}

export default function AdminClient({ initialProjects, initialCategories }: { initialProjects: Project[], initialCategories: Category[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleProjectSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    startTransition(async () => {
      try {
        if (editingId) {
          await updateProject(editingId, formData);
          setEditingId(null);
        } else {
          await createProject(formData);
        }
        form.reset();
      } catch (err) {
        alert("Error saving project metadata.");
      }
    });
  }

  async function handleProjectDelete(id: string) {
    if (confirm("Are you sure you want to delete this project?")) {
      startTransition(async () => {
        await deleteProject(id);
      });
    }
  }

  function handleEdit(p: Project) {
    setEditingId(p.id);
    setTimeout(() => {
      const form = document.getElementById("projectForm") as HTMLFormElement;
      if (form) {
        (form.elements.namedItem("title") as HTMLInputElement).value = p.title;
        (form.elements.namedItem("categoryId") as HTMLSelectElement).value = p.categoryId;
        (form.elements.namedItem("description") as HTMLTextAreaElement).value = p.description;
        (form.elements.namedItem("tags") as HTMLInputElement).value = p.tags;
        (form.elements.namedItem("githubUrl") as HTMLInputElement).value = p.githubUrl || "";
        (form.elements.namedItem("liveUrl") as HTMLInputElement).value = p.liveUrl || "";
      }
    }, 0);
  }

  function cancelEdit() {
    setEditingId(null);
    (document.getElementById("projectForm") as HTMLFormElement).reset();
  }

  // Categories
  async function handleCategorySubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      await createCategory(formData);
      form.reset();
    });
  }

  async function handleCategoryDelete(id: string) {
    try {
      startTransition(async () => {
        await deleteCategory(id);
      });
    } catch (error: any) {
      alert(error.message || "Cannot delete category");
    }
  }

  return (
    <div className={styles.grid}>
      {/* Category Management */}
      <div className={styles.formCard} style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div>
          <h2 className={styles.formTitle}>Manage Categories</h2>
          <form onSubmit={handleCategorySubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category Name</label>
              <input name="name" required className={styles.input} placeholder="e.g. Frontend Interfaces" />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Description (Optional)</label>
              <textarea name="description" className={styles.textarea} placeholder="Detailed explanation..." rows={2} />
            </div>
            <button type="submit" disabled={isPending} className={styles.submitBtn}>Save Category</button>
          </form>
        </div>

        <div>
          <h2 className={styles.formTitle}>Existing Categories</h2>
          {initialCategories.length === 0 ? (
            <p style={{ color: "var(--text-secondary)" }}>No categories yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {initialCategories.map(cat => (
                <div key={cat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "0.5rem", borderRadius: "4px" }}>
                  <div>
                    <strong>{cat.name}</strong>
                    {cat.description && <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{cat.description}</div>}
                  </div>
                  <button onClick={() => handleCategoryDelete(cat.id)} disabled={isPending} className={styles.deleteBtn}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className={styles.formCard}>
        <h2 className={styles.formTitle}>{editingId ? "Edit Project" : "Add New Project"}</h2>
        <form id="projectForm" onSubmit={handleProjectSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input name="title" required className={styles.input} placeholder="e.g. Enterprise Cloud API" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select name="categoryId" required className={styles.input} style={{ backgroundColor: "#000", color: "#fff" }}>
              <option value="">Select a Category...</option>
              {initialCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea name="description" required className={styles.textarea} placeholder="Detailed explanation..." />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tags (comma separated)</label>
            <input name="tags" required className={styles.input} placeholder="e.g. React, Node.js, AWS" />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>GitHub URL (optional)</label>
            <input name="githubUrl" className={styles.input} placeholder="https://github.com/..." />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Live URL (optional) - Used for auto screenshots</label>
            <input name="liveUrl" className={styles.input} placeholder="https://..." />
          </div>

          <button type="submit" disabled={isPending} className={styles.submitBtn}>
            {isPending ? "Extracting Metadata & Saving..." : (editingId ? "Update Project" : "Save Project")}
          </button>
          
          {editingId && (
            <button type="button" onClick={cancelEdit} disabled={isPending} className={styles.submitBtn} style={{ background: "transparent", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* List Section */}
      <div className={styles.listContainer}>
        <h2 className={styles.formTitle}>Live Database Projects</h2>
        {initialProjects.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>No projects found in database.</p>
        ) : (
          initialProjects.map((p) => (
            <div key={p.id} className={styles.projectCard}>
              <div className={styles.projectInfo}>
                <div className={styles.projectCategory}>{p.category?.name || "Uncategorized"}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", margin: "4px 0" }}>
                  {p.logoUrl && (
                    <Image 
                      src={p.logoUrl} 
                      alt="Logo" 
                      width={16} 
                      height={16} 
                      quality={100}
                      style={{ borderRadius: 4 }} 
                    />
                  )}
                  <h3 style={{ margin: 0 }}>{p.title}</h3>
                </div>
                <div className={styles.projectTags}>
                  {p.tags.split(",").map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag.trim()}</span>
                  ))}
                </div>
              </div>
              <div className={styles.cardActions}>
                <button onClick={() => handleEdit(p)} disabled={isPending} className={styles.editBtn}>Edit</button>
                <button onClick={() => handleProjectDelete(p.id)} disabled={isPending} className={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
