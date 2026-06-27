"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./GlassHeader.module.css";

export default function GlassHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    const sections = document.querySelectorAll("section[id], div[id='terminal']");
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [pathname]);

  const navItems = [
    { label: "Home", href: "/", id: "" },
    { label: "About", href: "/about", id: "" },
    { label: "Services", href: "/#services", id: "services" },
    { label: "Projects", href: "/projects", id: "" },
    { label: "CLI Console", href: "/#terminal", id: "terminal" },
    { label: "Contact", href: "/contact", id: "" },
  ];

  const checkIsActive = (item: { href: string; id: string }) => {
    if (pathname !== "/") {
      return pathname === item.href;
    }
    // On the homepage:
    if (item.id) {
      return activeSection === item.id;
    }
    // Home link
    if (item.href === "/") {
      return activeSection === "";
    }
    return false;
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        {/* Brand Logo */}
        <a href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            {/* Hexagon shape logo via SVG */}
            <svg
              className={styles.hexagon}
              viewBox="0 0 336 271"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "38px", height: "30px" }}
            >
              <path d="M177.734 174.23C181.18 170.308 185.003 167.39 188.705 163.908C203.295 150.178 222.78 137.734 243.097 135.581C261.357 133.646 278.943 139.394 293.093 151.218C302.586 159.15 309.716 170.271 313.835 182.023C315.157 185.801 315.851 191.862 316.304 195.932C318.422 214.886 313.223 232.104 300.947 246.786C289.698 260.347 273.46 268.813 255.901 270.274C246.764 270.606 238.342 270.419 229.536 267.492C222.708 265.015 214.485 261.503 208.477 257.333C180.709 238.036 159.212 211.428 134.515 188.619C126.132 180.877 117.4 172.736 107.154 167.375C80.3397 153.339 49.3817 169.81 46.9206 200.231C45.1197 222.489 62.6938 242.335 85.0764 243.237C107.787 244.112 123.963 226.133 139.373 212.264C143.485 215.015 155.502 226.897 158.017 230.822C155.966 234.995 149.402 240.266 145.65 243.452C130.846 256.018 115.29 267.432 95.408 269.779C77.1347 271.936 60.8494 268.252 46.1898 257.008C20.5424 237.478 12.2752 201.912 26.621 173.117C29.1724 167.997 30.8173 164.651 34.5709 160.068C46.3008 146.015 63.1298 137.19 81.362 135.532C119.145 132.405 147.777 162.671 171.956 187.339C184.946 200.59 198.135 214.345 212.442 226.197C221 233.287 230.876 240.302 241.929 242.474C252.093 244.474 263.252 242.374 271.879 236.57C280.482 230.759 286.406 221.753 288.334 211.555C294.001 180.97 268.68 155.4 237.883 164.053C226.959 167.122 216.005 175.865 207.589 183.308C203.528 186.899 200.915 190.45 196.258 193.733C194.243 192.152 179.04 176.285 177.734 174.23Z" fill="#10B981"/>
              <path d="M72.8537 64.9739C76.2228 67.2434 80.3442 70.0128 83.9116 71.7573C88.9908 74.2407 96.5727 73.7758 101.118 70.2868C106.9 65.8477 111.112 58.4941 115.331 52.5591C124.531 39.6154 133.921 26.8476 143.168 13.9424C149.343 5.36811 157.595 -0.019858 168.385 5.50067e-05C182.909 0.0269073 189.511 8.11972 197.179 19.0417L204.394 29.1816C211.014 38.5307 217.65 47.7034 224.367 57.1662C230.484 65.7792 237.856 76.3931 250.213 72.5203C254.57 71.1554 259.736 67.5563 263.641 65.0433L283.771 52.0966C290.042 47.9864 297.655 42.2614 304.55 39.6938C314.342 36.4227 326.017 40.1569 331.699 48.7669C340.843 62.6275 332.511 78.5751 329.774 93.0922C329.065 96.857 327.224 101.859 326.132 105.671C322.979 116.767 320.033 127.921 317.293 139.126C316.129 143.745 314.475 149.272 313.546 153.768C308.383 146.607 297.45 139.269 291.581 133.078C290.181 131.601 302.993 88.4242 303.895 82.8549C304.411 79.6718 306.65 72.9065 307.248 69.6366L307.323 69.216C302.921 70.9044 298.597 74.1704 294.616 76.7962C289.212 80.363 283.768 83.875 278.291 87.3311C268.65 93.4154 260.59 99.0939 248.668 100.152C242.811 100.728 236.896 100.083 231.299 98.2597C215.821 93.2033 209.394 81.8155 200.021 69.502C195.284 63.9572 191.847 57.2121 187.335 51.5867C181.083 43.7926 175.914 34.1106 168.961 27.0946C166.835 24.9498 156.987 40.8029 155.651 42.5706C148.168 52.474 141.603 63.1564 133.896 72.8939C129.64 78.293 125.972 84.0919 120.829 88.7781C116.061 93.1999 110.388 96.533 104.204 98.5457C86.5921 104.196 74.1373 97.2733 59.911 88.2612L44.2368 78.2088C39.3495 75.0104 34.3421 71.5618 29.1679 68.91C29.3064 70.577 29.4494 72.4971 29.9693 74.0932C33.6686 85.6614 36.0808 97.4879 39.4856 109.145C41.7056 116.747 44.3249 125.502 45.5403 133.303C43.3212 135.198 39.9826 137.285 37.5824 139.148C32.7051 142.935 26.6769 148.553 23.2459 153.674C21.3865 148.209 20.3185 143.569 18.8254 138.104L9.98966 104.773L3.46083 80.7296C2.40015 76.7172 1.344 72.8936 0.511752 68.768C-2.20075 55.3231 6.10543 41.6435 19.8408 39.1188C29.4174 37.3583 38.2997 42.303 45.8539 47.8575L48.5954 49.6162C54.976 53.4452 59.8911 56.5571 66.087 60.6576C68.3569 62.0739 70.6125 63.5127 72.8537 64.9739Z" fill="#F59E0B"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.brand}>
              KingTony
            </span>
            <span className={styles.tech}>
              Technologies
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`${styles.navLink} ${checkIsActive(item) ? styles.activeNavLink : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Contact/CTA Button */}
        <div className={styles.rightSide}>
          <a href="/contact" className="btn-secondary">
            Initialize Contact
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={styles.menuBtn}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`${styles.mobileLink} ${checkIsActive(item) ? styles.activeMobileLink : ""}`}
            >
              {item.label}
            </a>
          ))}
          <div className={styles.mobileCta}>
            <a
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-secondary"
              style={{ display: "block", width: "100%" }}
            >
              Initialize Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
