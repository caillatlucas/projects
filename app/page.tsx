import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/ProjectsGrid";
import GitHubWidget from "@/components/GitHubWidget";

function ProjectsSkeleton() {
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

function GitHubSkeleton() {
  return (
    <section className="github-widget" id="github">
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="shimmer" style={{ height: 400, borderRadius: 24 }} />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />

      <Suspense fallback={<ProjectsSkeleton />}>
        <ProjectsGrid />
      </Suspense>

      <Suspense fallback={<GitHubSkeleton />}>
        <GitHubWidget />
      </Suspense>

      {/* Footer */}
      <footer className="footer" id="contact">
        <span className="footer-logo">Lucas Caillat</span>
        <a
          href="https://www.instagram.com/lc.20ytb"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-ig"
          aria-label="Instagram lc.20ytb"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          <span>@lc.20ytb</span>
        </a>
        <span className="footer-copy">
          © {new Date().getFullYear()} — Built with passion &amp; code
        </span>
      </footer>
    </>
  );
}
