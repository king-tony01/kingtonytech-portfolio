import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kingtonytech-portfolio.vercel.app"),
  title:
    "Okolie Amauche Anthony | Founder & Core Systems Architect | KingTony Technologies",
  description:
    "Explore the interactive 3D engineering portfolio of Okolie Amauche Anthony, Founder of KingTony Technologies. Specializing in low-latency systems engineering, high-throughput backend APIs, WebGL visualizations, and robust cloud networks.",
  keywords: [
    "Okolie Amauche Anthony",
    "KingTony Technologies",
    "Systems Architect",
    "Full Stack Engineer",
    "Rust",
    "Go",
    "TypeScript",
    "Next.js",
    "WebGL",
    "3D Canvas",
    "Low Latency",
    "Distributed Systems",
  ],
  authors: [
    { name: "Okolie Amauche Anthony", url: "https://github.com/king-tony01" },
  ],
  creator: "Okolie Amauche Anthony",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title:
      "Okolie Amauche Anthony | Founder & Core Systems Architect | KingTony Technologies",
    description:
      "Explore the interactive 3D engineering portfolio of Okolie Amauche Anthony, Founder of KingTony Technologies. Low-latency systems and WebGL visualizations.",
    url: "https://kingtonytech-portfolio.vercel.app",
    siteName: "KingTony Technologies",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Okolie Amauche Anthony | Founder & Core Systems Architect | KingTony Technologies",
    description:
      "Explore the interactive 3D engineering portfolio of Okolie Amauche Anthony, Founder of KingTony Technologies. Low-latency systems and WebGL visualizations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
