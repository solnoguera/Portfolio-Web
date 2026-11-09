import type { Metric, Profile } from "./types";

export const profile: Profile = {
  name: "Sol Noguera",
  role: "Senior Full Stack Engineer",
  stack: "Node.js · React · TypeScript",
  tagline:
    "I build secure systems where money and compliance are on the line: payments, government platforms and on-chain transactions that can't be undone.",
  location: "Buenos Aires, Argentina",
  availability: "Open to remote roles (US / EU time zones) · Available now",
  email: "noguerasol22@gmail.com",
  siteUrl: "https://portfolio-soln.netlify.app",
  resumeHref: "/Sol_Noguera_CV.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/solnoguera", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/solnoguera", icon: "linkedin" },
    { label: "Email", href: "mailto:noguerasol22@gmail.com", icon: "mail" },
  ],
};

export const metrics: Metric[] = [
  { value: "USD 1B+", label: "processed per year by the payments platform I owned incidents for" },
  { value: "1–2/day → 1–2/week", label: "production payment incidents after I took ownership" },
  { value: "2,000+", label: "public agencies using the government platform I built for" },
  { value: "20 → 0", label: "accessibility issues on my screens, measured with axe" },
];
