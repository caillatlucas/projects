"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function MusicCard() {
  const [tick, setTick] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [8, -8]), {
    stiffness: 200,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-8, 8]), {
    stiffness: 200,
    damping: 30,
  });

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 120);
    return () => clearInterval(interval);
  }, []);

  function handleMouse(e: React.MouseEvent) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Animated bar heights cycle
  const bars = [0.4, 0.9, 0.6, 1.0, 0.5, 0.75, 0.35, 0.85, 0.6, 0.45];
  const animatedBars = bars.map((b, i) => {
    const wave = Math.sin((tick + i * 3) * 0.4) * 0.3 + b;
    return Math.max(0.15, Math.min(1, wave));
  });

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 80 }}
      className="music-card"
    >
      {/* Glow */}
      <div className="music-card-glow" />

      {/* Album art */}
      <div className="music-art">
        <div className="music-art-inner">
          <span className="music-art-icon">✦</span>
        </div>
        <div className="music-art-ring" />
      </div>

      {/* Info */}
      <div className="music-info">
        <p className="music-track">Creative Developer</p>
        <p className="music-artist">Lucas Caillat</p>

        {/* Waveform */}
        <div className="music-wave">
          {animatedBars.map((h, i) => (
            <span
              key={i}
              className="music-bar"
              style={{ height: `${h * 28}px` }}
            />
          ))}
        </div>

        {/* Progress */}
        <div className="music-progress-track">
          <div className="music-progress-fill" />
        </div>

        {/* Controls */}
        <div className="music-controls">
          <button className="music-btn" aria-label="Previous">⏮</button>
          <button className="music-btn music-btn-play" aria-label="Play">▶</button>
          <button className="music-btn" aria-label="Next">⏭</button>
        </div>
      </div>

      {/* Status dot */}
      <div className="music-status">
        <span className="music-dot" />
        <span className="music-status-text">Available for work</span>
      </div>
    </motion.div>
  );
}
