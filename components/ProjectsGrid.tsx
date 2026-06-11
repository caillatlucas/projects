"use client";

import { useState, useEffect } from "react";
import { fetchRepos } from "@/lib/github";
import type { GitHubRepo } from "@/lib/github";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const [repos, setRepos] = useState<GitHubRepo[] | null>(null);

  useEffect(() => {
    fetchRepos()
      .then((data) => setRepos(data))
      .catch(() => setRepos([]));
  }, []);

  if (repos === null) {
    return (
      <section className="section" id="projects">
        <div className="section-header">
          <div>
            <p className="section-title-label">✦ GitHub Projects</p>
            <h2 className="section-title">Work &amp;<br />Experiments</h2>
          </div>
        </div>
        <div className="projects-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="shimmer" style={{ height: 240, marginBottom: "1.5rem", breakInside: "avoid" }} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="section" id="projects">
      <div className="section-header">
        <div>
          <p className="section-title-label">✦ GitHub Projects</p>
          <h2 className="section-title">Work &amp;<br />Experiments</h2>
        </div>
        <div className="section-count">{String(repos.length).padStart(2, "0")}</div>
      </div>

      {repos.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.3)" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem" }}>
            Unable to load repositories.
          </p>
          <p style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
            Check back soon — GitHub may be rate-limiting.
          </p>
        </div>
      ) : (
        <div className="projects-grid">
          {repos.map((repo, i) => (
            <ProjectCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
