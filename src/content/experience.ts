import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    company: "Squire",
    companyContext: "US barbershop payments platform · USD 1B+ processed annually",
    role: "Senior Backend Engineer, Payments",
    period: "Nov 2025 – Aug 2026",
    location: "Remote",
    highlights: [
      "Made the architectural call to redesign checkout as fully webhook-driven (Node.js, NestJS, Stripe), removing the frontend as a dependency for payment confirmation.",
      "Led the end-to-end Cash App Pay integration through Stripe: API design, webhook handling, validation and production rollout, with 90% of its transactions succeeding right after launch.",
      "Owned production incident response for the payments service, cutting incidents from 1–2 per day to 1–2 per week and making sure money reached the people it belonged to.",
    ],
    stack: ["Node.js", "NestJS", "TypeScript", "Stripe", "Webhooks"],
  },
  {
    company: "OpenGov",
    companyContext: "U.S. government contract management · 2,000+ public agencies",
    role: "Full Stack Developer",
    period: "Apr 2024 – Nov 2025",
    location: "Remote",
    highlights: [
      "Built secure React and NestJS applications on PostgreSQL under strict regulatory and compliance standards, owning schemas, migrations and queries with Sequelize.",
      "Implemented the backend OpenAI API integration for an AI-powered contract analysis feature, retrieving and processing documents from AWS S3 so users could query contract content conversationally.",
      "Moved .docx report exports to a Kafka background job with WebSocket notifications and retries, fixing request timeouts.",
      "Took the screens I worked on from 20 accessibility issues to 0 (axe DevTools) and designed new components for the internal Material UI library.",
    ],
    stack: ["React", "NestJS", "PostgreSQL", "Sequelize", "OpenAI API", "AWS S3", "Kafka", "WebSockets"],
  },
  {
    company: "Codea IT",
    companyContext: "Software consultancy",
    role: "Full Stack Developer",
    period: "Nov 2022 – Apr 2024",
    location: "Remote",
    highlights: [
      "Sole engineer and owner of a client's blockchain gaming platform with on-chain payments, from discovery and architecture to deployment and maintenance.",
      "Kept on-chain payments and the application database consistent over WebSockets, handling late confirmations, duplicate events and partial writes under concurrent real-time play.",
      "Managed a user funds pool and authorized real-money withdrawals with no rollback, behind strict backend validation.",
    ],
    stack: ["React", "Node.js", "Solidity", "Ethers.js", "Web3.js", "Tailwind CSS"],
  },
  {
    company: "Epidata",
    companyContext: "Software consultancy",
    role: "Full Stack Developer",
    period: "Aug 2020 – Apr 2024",
    location: "Buenos Aires, Argentina",
    highlights: [
      "Delivered web and React Native features for a health insurance provider, from Figma designs to RESTful Node.js/Express APIs in TypeScript.",
      "Migrated the entire React Native app from React Navigation 3 to 6, part by part and with minimal supervision.",
      "Grew from mentee to mentor: onboarded 2 of the team's 4 engineers through code reviews and pairing until both shipped independently.",
    ],
    stack: ["React", "React Native", "TypeScript", "Node.js", "Express", "Material UI"],
  },
];
