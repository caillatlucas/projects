"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitHubRepo, LANGUAGE_COLORS, timeAgo } from "@/lib/github";

interface Props {
  repo: GitHubRepo;
  index: number;
}

const FLOAT_CLASSES = [
  "card-float-1", "card-float-2", "card-float-3",
  "card-float-4", "card-float-5", "card-float-6",
];

export default function ProjectCard({ repo, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [6, -6]), {
    stiffness: 300, damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-6, 6]), {
    stiffness: 300, damping: 30,
  });

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

  const langColor = repo.language ? (LANGUAGE_COLORS[repo.language] ?? "#888888") : null;
  const floatClass = FLOAT_CLASSES[index % FLOAT_CLASSES.length];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`project-card ${floatClass}`}
    >
      {/* Card number */}
      <div className="project-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Title */}
      <h3 className="project-title">
        {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
      </h3>

      {/* Description */}
      <p className="project-desc">
        {repo.description || "No description available."}
      </p>

      {/* Meta: language + topics */}
      <div className="project-meta">
        {langColor && repo.language && (
          <span className="lang-badge">
            <span className="lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        {repo.topics?.slice(0, 3).map((topic) => (
          <span key={topic} className="lang-badge">
            {topic}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="project-stats">
        <span className="project-stat">
          <span>★</span>
          <span>{repo.stargazers_count}</span>
        </span>
        <span className="project-stat">
          <span>⑂</span>
          <span>{repo.forks_count}</span>
        </span>
        <span className="project-stat">
          <span>↻</span>
          <span>{timeAgo(repo.updated_at)}</span>
        </span>
      </div>

      {/* Actions */}
      <div className="project-actions">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          aria-label={`View ${repo.name} on GitHub`}
        >
          GitHub →
        </a>
        <a
          href={`https://caillatlucas.github.io/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost btn-crimson"
          aria-label={`View ${repo.name} on GitHub Pages`}
        >
          Pages ↗
        </a>
        {repo.homepage && repo.homepage !== `https://caillatlucas.github.io/${repo.name}` && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost btn-crimson"
            aria-label={`View live demo of ${repo.name}`}
          >
            Demo ↗
          </a>
        )}
      </div>
    </motion.div>
  );
}
