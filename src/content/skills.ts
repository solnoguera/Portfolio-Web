import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  { category: "Languages", items: ["TypeScript", "JavaScript", "SQL", "Solidity"] },
  {
    category: "Backend",
    items: ["Node.js", "NestJS", "Express", "REST API design", "WebSockets", "Socket.IO", "Webhooks"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "React Native", "Tailwind CSS", "Redux", "Material UI", "Accessibility (WCAG)"],
  },
  {
    category: "Data & messaging",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Sequelize", "Mongoose", "Kafka", "Redis"],
  },
  {
    category: "Payments & security",
    items: ["Stripe Connect", "Cash App Pay", "Webhook-driven flows", "Secure SDLC", "Incident response"],
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda, ECS, Secrets Manager)", "Docker", "GitHub Actions", "CI/CD"],
  },
  { category: "Blockchain", items: ["EVM", "ERC-20 / ERC-721", "Ethers.js", "Web3.js", "MetaMask"] },
  { category: "AI", items: ["OpenAI API", "Claude Code", "Cursor", "Codex"] },
];
