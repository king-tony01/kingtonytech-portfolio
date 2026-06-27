"use client";

import React from "react";
import Image from "next/image";
import styles from "./ServicesSection.module.css";

export default function ServicesSection() {
  const services = [
    {
      title: "Software Engineering",
      description: "Full-stack web applications, native mobile apps, and Web3 smart contracts. We architect and build scalable, secure, and performant software systems tailored to your enterprise needs.",
      image: "/3d_software.png"
    },
    {
      title: "Cloud & Networking",
      description: "Enterprise-grade cloud infrastructure and secure network deployments. We configure high-availability servers, DNS routing, and CI/CD pipelines to ensure maximum uptime.",
      image: "/3d_networking.png"
    },
    {
      title: "Product Design (UI/UX)",
      description: "End-to-end user experience and interface design. We create intuitive, highly converting product prototypes that bridge the gap between user psychology and stunning visual aesthetics.",
      image: "/3d_design.png"
    },
    {
      title: "Corporate Branding",
      description: "Developing robust corporate identities. From logos to typography systems, we construct a cohesive brand presence that positions your company as a modern industry leader.",
      image: "/3d_brand_v2.png"
    },
    {
      title: "Graphics & Visuals",
      description: "High-fidelity digital assets, marketing materials, and 3D graphics designed to capture attention and communicate complex technical or business concepts instantly.",
      image: "/3d_graphics.png"
    },
    {
      title: "Business Registration",
      description: "Full-service corporate registration and legal naming structures. We handle the bureaucracy of registering your company so you can focus on building your product. Fully registered entity (RC NO: 8932710).",
      image: "/3d_business_v2.png"
    }
  ];

  return (
    <section id="services" className={styles.section}>
      <div className={styles.titleArea}>
        <h2 className={styles.title}>
          <span className={styles.titleBar} />
          Digital Agency Services
        </h2>
        <p className={styles.subtitle}>
          Beyond writing high-performance code, KingTony Technologies operates as a full-service digital agency, offering premium design and corporate structuring for modern startups.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((svc, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.iconWrapper}>
              <Image 
                src={svc.image}
                alt={svc.title}
                width={500}
                height={240}
                className={styles.imageAsset}
              />
            </div>
            <h3 className={styles.cardTitle}>{svc.title}</h3>
            <p className={styles.cardDesc}>{svc.description}</p>
            <a href="mailto:contact@kingtony.tech" className={styles.ctaButton}>
              Consult Us
              <svg className={styles.ctaIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <polyline points="14 6 20 12 14 18"></polyline>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
