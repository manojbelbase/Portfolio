export interface WorkItem {
  title: string;
  note: string;
  description: string;
  href?: string;
  image?: string;
  logo?: string;
}

export interface NpmPackage {
  name: string;
  href: string;
  description: string;
}

export interface ExperienceProject {
  name: string;
  logo: string;
  href?: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  href?: string;
  logo?: string;
  description: string;
  projectsPrefix?: string;
  projects?: ExperienceProject[];
  continuation?: string;
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  href?: string;
}

export interface WritingItem {
  title: string;
  meta: string;
  href: string;
}
