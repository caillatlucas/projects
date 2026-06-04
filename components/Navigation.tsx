"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className={`nav${scrolled ? " scrolled" : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a className="nav-logo" href="#home">
        LC<span>.</span>
      </a>

      <ul className="nav-links">
        {[
          { label: "Projects", id: "projects" },
          { label: "GitHub", id: "github" },
          { label: "Contact", id: "contact" },
        ].map((item) => (
          <li key={item.id}>
            <button
              className="nav-link"
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-dot" aria-label="Available for work" />
    </motion.nav>
  );
}
