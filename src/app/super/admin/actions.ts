"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import * as cheerio from "cheerio";

// =====================
// UTILS
// =====================

/**
 * Scrapes a URL for its OG Image and Favicon.
 * If no OG Image is found, uses mshots API as a fallback screenshot.
 */
async function fetchUrlMetadata(url: string | null): Promise<{ imageUrl: string | null; logoUrl: string | null }> {
  if (!url) return { imageUrl: null, logoUrl: null };

  let imageUrl: string | null = null;
  let logoUrl: string | null = null;

  try {
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" }});
    const html = await response.text();
    const $ = cheerio.load(html);

    // 1. Try OG Image
    const ogImage = $("meta[property='og:image']").attr("content") || $("meta[name='twitter:image']").attr("content");
    if (ogImage) {
      imageUrl = new URL(ogImage, url).href;
    }

    // 2. Try Favicon
    const icon = $("link[rel='icon']").attr("href") || $("link[rel='shortcut icon']").attr("href") || $("link[rel='apple-touch-icon']").attr("href");
    if (icon) {
      logoUrl = new URL(icon, url).href;
    } else {
      // Fallback Google Favicon API
      logoUrl = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=128`;
    }

  } catch (err) {
    console.error("Failed to fetch metadata for URL:", url, err);
  }

  // Fallback: Screenshot using Thum.io API if no OG image is found
  if (!imageUrl) {
    imageUrl = `https://image.thum.io/get/width/1200/crop/630/${url}`;
  }

  return { imageUrl, logoUrl };
}

// =====================
// CATEGORY ACTIONS
// =====================

export async function getCategories() {
  return await prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await prisma.category.create({
    data: { name, description: description || null },
  });

  revalidatePath("/super/admin");
}

export async function deleteCategory(id: string) {
  const projectsCount = await prisma.project.count({ where: { categoryId: id } });
  if (projectsCount > 0) {
    throw new Error("Cannot delete a category that still contains projects.");
  }

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/super/admin");
}

// =====================
// PROJECT ACTIONS
// =====================

export async function getProjects() {
  return await prisma.project.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string;
  const categoryId = formData.get("categoryId") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;
  
  // Resolve Automated Metadata
  const targetUrl = liveUrl || githubUrl || null;
  const { imageUrl, logoUrl } = await fetchUrlMetadata(targetUrl);

  await prisma.project.create({
    data: {
      title,
      categoryId,
      description,
      tags,
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      imageUrl,
      logoUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/super/admin");
}

export async function updateProject(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const categoryId = formData.get("categoryId") as string;
  const description = formData.get("description") as string;
  const tags = formData.get("tags") as string;
  const githubUrl = formData.get("githubUrl") as string;
  const liveUrl = formData.get("liveUrl") as string;

  const targetUrl = liveUrl || githubUrl || null;
  const { imageUrl, logoUrl } = await fetchUrlMetadata(targetUrl);

  await prisma.project.update({
    where: { id },
    data: {
      title,
      categoryId,
      description,
      tags,
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      imageUrl,
      logoUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/super/admin");
}

export async function deleteProject(id: string) {
  await prisma.project.delete({
    where: { id },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/super/admin");
}
