import type {
  EducationItem,
  ExperienceItem,
  NpmPackage,
  WorkItem,
  WritingItem,
} from "@/types";

export const workItems: WorkItem[] = [
  { title: "ScheduleMate AI", note: "AI scheduling assistant", description: "Plans and manages calendar events through natural language.", href: "https://schedulemateai.vercel.app/", image: "/schedulemate-preview.webp", logo: "/schedulemate-logo.ico" },
  { title: "SimplePatro", note: "Minimal Nepali calendar", description: "An ad-free Nepali Patro (Bikram Sambat) with tithi, events, and a clean everyday interface — on web, iOS, and Android.", href: "https://www.simplepatro.com/", logo: "/simplepatro-logo.ico" },
  { title: "DodgeVPN", note: "Secure VPN service", description: "A secure and reliable VPN service with online privacy, data encryption, and unrestricted internet access.", href: "https://dodgevpn.com/", image: "/dodgevpn-preview.webp", logo: "/dodgevpn-logo.ico" },
  { title: "CaseoPro", note: "iGaming & digital marketing platform", description: "A powerful and scalable iGaming and digital marketing platform offering smart strategies, engaging user experiences, and tools that help gaming brands grow.", href: "https://caseopro.vercel.app/", image: "/caseopro-preview.webp", logo: "/caseopro-logo.svg" },
  { title: "Jiban Multi Agro", note: "Agriculture website", description: "An ecommerce and services website for fruit saplings, field visits, soil testing, and agricultural support.", href: "https://www.jibanmultiagro.com.np/", image: "/jibanmultiagro-preview.webp", logo: "/jibanmultiagro-logo.ico" },
];

export const npmPackages: NpmPackage[] = [
  { name: "miti-pariwartan", href: "https://www.npmjs.com/package/miti-pariwartan", description: "Lightweight offline Nepali Bikram Sambat ↔ AD date converter." },
  { name: "ai-response-parser", href: "https://www.npmjs.com/package/ai-response-parser", description: "React component to render AI responses with markdown + code highlight." },
];

export const techStack: string[] = ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "Docker","Git"];

export const education: EducationItem[] = [
  { period: "2021 — 2025", degree: "Bachelor of Computer Application (BCA)", institution: "Butwal Kalika Campus", href: "https://btlkalikacampus.edu.np/" },
  { period: "2018 — 2020", degree: "Secondary Level Education", institution: "Kanti Secondary School (+2 Science)", href: "https://kanti.edu.np/" },
];

export const writingItems: WritingItem[] = [
  { title: "Frontend Monorepos Explained: When One Repository Makes Sense", meta: "Medium", href: "https://medium.com/@manojbelbase/frontend-monorepos-explained-when-one-repository-makes-sense-c69686f81f35" },
  { title: "Nepal's Digital ID Revolution: What You Need to Know", meta: "Medium", href: "https://medium.com/@manojbelbase/nepals-digital-id-revolution-what-you-need-to-know-about-the-national-identity-card-8fb6b0ff6229" },
];

export const experience: ExperienceItem[] = [
  {
    period: "Sep 2026 — Present",
    role: "Frontend Developer",
    company: "Route2Uni International Group",
    href: "https://route2unigroup.com",
    logo: "/route2uni-logo.webp",
    description: "Leading frontend development, driving technical decisions and feature delivery,",
    projectsPrefix: "Currently working on",
    projects: [
      { name: "Dreams Care Homes CRM", logo: "/dreams-care-homes-logo.ico" , href: "https://www.dreamscarehomes.co.uk/"},
    ],
    continuation: "Collaborating with design and backend teams to ship maintainable, high-quality experiences.",
  },
  {
    period: "Jan 2026  — Aug 2026",
    role: "Frontend Developer",
    company: "BlackTech",
    href: "https://blacktech.com.np",
    logo: "/blacktech-logo.ico",
    description: "Contributed responsive interfaces and performance improvements across BlackTech products including",
    projectsPrefix: "",
    projects: [
      { name: "RestroX", logo: "/restrox-logo.ico" },
      { name: "SimplePatro", logo: "/simplepatro-logo.ico" },
    ],
    continuation: "Worked closely with the team to deliver polished, high-quality user experiences.",
  },
  {
    period: "DEC 2024 — Dec 2025",
    role: "Frontend Developer",
    company: "Web Studio Nepal",
    href: "https://webstudionepal.com/",
    logo: "/webstudionepal-logo.png",
    description: "Built ecommerce platforms and SEO-friendly websites for businesses across different industries, focusing on clean structure, responsive design, and performance.",
  },
];
