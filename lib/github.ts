export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
  private: boolean;
  fork: boolean;
  open_issues_count: number;
}

export interface GitHubProfile {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  blog: string | null;
  location: string | null;
  twitter_username: string | null;
  created_at: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string; url: string };
  created_at: string;
  payload: Record<string, unknown>;
}

const GITHUB_API = "https://api.github.com";
const USERNAME = "caillatlucas";

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

export async function fetchProfile(): Promise<GitHubProfile> {
  const res = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`GitHub profile fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?sort=updated&per_page=30&type=public`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error(`GitHub repos fetch failed: ${res.status}`);
  const repos: GitHubRepo[] = await res.json();
  // Filter out forks for cleaner showcase
  return repos.filter((r) => !r.fork);
}

export async function fetchEvents(): Promise<GitHubEvent[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${USERNAME}/events/public?per_page=10`,
    {
      headers,
      next: { revalidate: 1800 },
    }
  );
  if (!res.ok) return [];
  return res.json();
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)}w ago`;
  return `${Math.floor(seconds / 2592000)}mo ago`;
}
