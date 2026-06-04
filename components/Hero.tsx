"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" ref={heroRef} id="home">
      {/* Artistic silhouette background */}
      <div className="hero-bg">
        <Image
          src="/hero-silhouette.png"
          alt=""
          fill
          loading="eager"
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        />
      </div>

      {/* Gradient vignette */}
      <div className="hero-vignette" />

      {/* Parallax name layer */}
      <motion.div
        style={{
          x: mousePos.x * -15,
          y: mousePos.y * -10,
          transition: "all 0.1s linear",
        }}
        className="hero-content"
      >
        {/* Left: Typography */}
        <motion.div
          ref={textRef}
          className="hero-text"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p
            className="hero-pretitle"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
            }}
          >
            Portfolio ✦ 2025
          </motion.p>

          <motion.h1
            className="hero-name-first"
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            Lucas
          </motion.h1>

          <motion.div
            className="hero-name-last"
            variants={{
              hidden: { opacity: 0, x: -60 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            CAILLAT.
          </motion.div>

          <motion.div
            className="hero-subtitle"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            <div className="hero-subtitle-line" />
            <span className="hero-subtitle-text">Freelance Informatique</span>
          </motion.div>

          <motion.p
            className="hero-desc"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
            }}
          >
            Développeur créatif passionné par les interfaces qui transcendent le code — 
            où la technique rencontre l&apos;esthétique.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        onClick={scrollToProjects}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className="hero-scroll-text">Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>

      {/* Corner index */}
      <div className="hero-index">01 / INTRO</div>
    </section>
  );
}
