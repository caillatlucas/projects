"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchProfile, fetchEvents, timeAgo } from "@/lib/github";
import type { GitHubEvent, GitHubProfile } from "@/lib/github";

function eventDescription(event: GitHubEvent): string {
  const repo = event.repo.name.split("/")[1] || event.repo.name;
  switch (event.type) {
    case "PushEvent":
      return `Pushed to ${repo}`;
    case "CreateEvent":
      return `Created branch in ${repo}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    case "ForkEvent":
      return `Forked ${repo}`;
    case "IssuesEvent":
      return `Issue activity in ${repo}`;
    case "PullRequestEvent":
      return `PR activity in ${repo}`;
    case "DeleteEvent":
      return `Deleted branch in ${repo}`;
    case "ReleaseEvent":
      return `Released in ${repo}`;
    default:
      return `Activity in ${repo}`;
  }
}

function eventIcon(type: string): string {
  switch (type) {
    case "PushEvent": return "⬆";
    case "CreateEvent": return "✦";
    case "WatchEvent": return "★";
    case "ForkEvent": return "⑂";
    case "PullRequestEvent": return "⤴";
    case "ReleaseEvent": return "◆";
    default: return "●";
  }
}

export default function GitHubWidget() {
  const [data, setData] = useState<{ profile: GitHubProfile | null; events: GitHubEvent[] } | null>(null);

  useEffect(() => {
    Promise.all([
      fetchProfile().catch(() => null),
      fetchEvents().catch(() => []),
    ]).then(([profile, events]) => {
      setData({ profile, events });
    });
  }, []);

  if (!data) {
    return (
      <section className="github-widget" id="github">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="shimmer" style={{ height: 400, borderRadius: 24 }} />
        </div>
      </section>
    );
  }

  const { profile, events } = data;

  if (!profile) {
    return (
      <section className="github-widget" id="github">
        <div className="github-panel" style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", color: "rgba(255,255,255,0.4)" }}>
            GitHub profile unavailable
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="github-widget" id="github">
      <div style={{ maxWidth: "900px", margin: "0 auto", marginBottom: "3rem" }}>
        <p className="section-title-label">✦ Developer Profile</p>
        <h2 className="section-title">GitHub</h2>
      </div>

      <div className="github-panel">
        {/* Profile header */}
        <div className="github-profile">
          <Image
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            width={80}
            height={80}
            className="github-avatar"
          />
          <div>
            <h3 className="github-name">{profile.name || profile.login}</h3>
            {profile.bio && <p className="github-bio">{profile.bio}</p>}
            {profile.location && (
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", marginTop: "0.25rem" }}>
                📍 {profile.location}
              </p>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div className="github-stats-grid">
          <div className="github-stat-cell">
            <div className="github-stat-value">{profile.public_repos}</div>
            <div className="github-stat-label">Repositories</div>
          </div>
          <div className="github-stat-cell">
            <div className="github-stat-value">{profile.followers}</div>
            <div className="github-stat-label">Followers</div>
          </div>
          <div className="github-stat-cell">
            <div className="github-stat-value">{profile.following}</div>
            <div className="github-stat-label">Following</div>
          </div>
        </div>

        {/* Recent activity */}
        {events.length > 0 && (
          <div>
            <p className="github-activity-title">Recent Activity</p>
            <ul className="github-activity-list">
              {events.slice(0, 6).map((event) => (
                <li key={event.id} className="github-activity-item">
                  <span className="activity-icon">{eventIcon(event.type)}</span>
                  <div>
                    <span>{eventDescription(event)}</span>
                    <div className="activity-time">{timeAgo(event.created_at)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
