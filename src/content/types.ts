export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export interface Profile {
  name: string;
  role: string;
  stack: string;
  tagline: string;
  location: string;
  availability: string;
  email: string;
  siteUrl: string;
  resumeHref: string;
  socials: SocialLink[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Experience {
  company: string;
  companyContext: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  year: string;
  role: string;
  summary: string;
  highlights: string[];
  stack: string[];
  image: { src: string; alt: string; width: number; height: number };
  links: ProjectLink[];
  note?: string;
}

export interface CaseStudy {
  title: string;
  period: string;
  summary: string;
  problem: string;
  decisions: { title: string; body: string }[];
  stack: string[];
  links: ProjectLink[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}
