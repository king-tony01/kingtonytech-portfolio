import React from "react";
import HomeClient from "./HomeClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dbProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      category: true,
    }
  });

  const recentProjects = dbProjects.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category.name,
    description: p.description,
    tags: p.tags,
    imageUrl: p.imageUrl,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
  }));

  return <HomeClient recentProjects={recentProjects} />;
}
