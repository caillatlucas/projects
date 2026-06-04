import { fetchRepos } from "@/lib/github";
import ProjectCard from "./ProjectCard";

export default async function ProjectsGrid() {
  const repos = await fetchRepos().catch(() => []);

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
