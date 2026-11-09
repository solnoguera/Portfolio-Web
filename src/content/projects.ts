import type { CaseStudy, Project } from "./types";

export const featuredProject: CaseStudy = {
  title: "Decentralized P2P Trading Marketplace",
  period: "2024 – present · solo project",
  summary:
    "A peer-to-peer trading marketplace I designed and built end to end, owning the architecture, the implementation and every technical decision.",
  problem:
    "Users trade with each other and withdraw real funds on-chain, where a transaction can't be rolled back. The backend has to be the single source of truth without ever holding a balance it can't prove.",
  decisions: [
    {
      title: "No soft balance",
      body: "Withdrawals are authorized with signed EIP-712 vouchers that carry an expiry and a unique ID, and are validated against on-chain transactions before funds move.",
    },
    {
      title: "Idempotency enforced by the database",
      body: "Unique constraints guarantee one voucher per transaction and unique voucher IDs, so a retried or duplicated event can't pay out twice.",
    },
    {
      title: "Schemas designed for the read path",
      body: "MongoDB collections split by data type, compound indexes matching the main queries, pagination and projections that load only the fields each view needs.",
    },
    {
      title: "On-chain and off-chain kept in sync",
      body: "Solidity contracts integrated with a React and Node.js stack via Ethers.js and MetaMask, with blockchain and WebSocket events reconciling both sides.",
    },
  ],
  stack: ["React", "Node.js", "TypeScript", "MongoDB", "Solidity", "Ethers.js", "EIP-712", "WebSockets"],
  links: [
    { label: "Live app", href: "https://p2ptrade.pages.dev/market" },
    { label: "GitHub", href: "https://github.com/solnoguera" },
  ],
};

export const projects: Project[] = [
  {
    title: "RPS League: Web3 Rock Paper Scissors",
    year: "2023",
    role: "Full Stack & Web3 Developer",
    summary:
      "The classic game on the blockchain: players trade RPS tokens, collect NFT hands to build rare teams, bet against the machine or other players and compete in a weekly league.",
    highlights: [
      "Token exchange, NFT team building and player-vs-player bets",
      "Containerized with Docker and deployed on AWS with Kubernetes",
    ],
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB", "Solidity", "Docker", "AWS"],
    image: {
      src: "/images/project-rps-league.webp",
      alt: "RPS League match screen: two teams face off in an arena with a round timer and NFT hand cards.",
      width: 1200,
      height: 628,
    },
    links: [],
    note: "The live game has been retired.",
  },
  {
    title: "Galeno: Health Insurance Web & Mobile",
    year: "2022",
    role: "Full Stack Developer · Epidata",
    summary:
      "A clinical records web app for doctors and nurses to follow patients and hospital stays, plus the member mobile app (Galeno Móvil) for appointments, procedures and a virtual credential.",
    highlights: [
      "Responsive Material UI interfaces built from high-fidelity Figma designs",
      "Migrated the mobile app from React Navigation 3 to 6",
    ],
    stack: ["React", "React Native", "TypeScript", "Redux", "Node.js", "Express", "Material UI"],
    image: {
      src: "/images/project-galeno.webp",
      alt: "Hands holding a phone with the Galeno Móvil app open on its side menu.",
      width: 1200,
      height: 624,
    },
    links: [{ label: "Galeno", href: "https://www.galeno.com.ar/" }],
    note: "Internal tools: the clinical app isn't public.",
  },
  {
    title: "Interactive Room Simulator",
    year: "2022",
    role: "Frontend Developer",
    summary:
      "A 2D room simulator where shoppers pick or upload a photo of their space and place products from the store's catalogue to see how they would look before buying.",
    highlights: [
      "Canvas editor with drag, rotate, flip, duplicate and export to image",
      "Admin-managed catalogue served by a Node.js / Express API",
    ],
    stack: ["React", "Konva", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Cloudinary"],
    image: {
      src: "/images/project-room-simulator.webp",
      alt: "Room simulator editor: a living room photo with a chandelier selected, a product carousel and editing tools.",
      width: 800,
      height: 500,
    },
    links: [],
    note: "New live demo coming soon.",
  },
];
