import React from "react";
import HomeClient from "./HomeClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const recentProjects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return <HomeClient recentProjects={recentProjects} />;
}
