export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Category =
  | 'NDIS Fundamentals'
  | 'Governance'
  | 'Service Delivery'
  | 'Workforce'
  | 'Rights'
  | 'Audit Prep';

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: Category;
  duration: number; // minutes
  difficulty: Difficulty;
  progress: number; // 0-100
  rating: number;
  ratingCount: number;
  pathId?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  moduleCount: number;
  durationEstimate: string;
  accentColor: 'green' | 'amber' | 'teal';
  iconName: string;
  forAudience: string;
  modules: string[]; // module ids
  progress: number;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  iconName: string;
}

export interface ReferenceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  iconColor: string;
  linkColor: string;
  linkText: string;
}

export interface ContinueLearning {
  moduleId: string;
  lastAccessed: string;
  timeRemaining: number; // minutes
}

// ── Learning Modules ──────────────────────────────────────────────

export const learningModules: LearningModule[] = [
  {
    id: 'mod-1',
    title: 'Understanding NDIS Practice Standards',
    description: 'Learn the 8 core modules and what auditors look for in each. Essential foundation for every provider.',
    category: 'NDIS Fundamentals',
    duration: 15,
    difficulty: 'Beginner',
    progress: 60,
    rating: 4.8,
    ratingCount: 124,
    pathId: 'path-1',
  },
  {
    id: 'mod-2',
    title: 'The NDIS Code of Conduct Explained',
    description: 'A comprehensive walkthrough of the NDIS Code of Conduct and what it means for your daily practice.',
    category: 'NDIS Fundamentals',
    duration: 10,
    difficulty: 'Beginner',
    progress: 0,
    rating: 4.6,
    ratingCount: 89,
    pathId: 'path-1',
  },
  {
    id: 'mod-3',
    title: 'Incident Reporting Requirements',
    description: 'Master the incident reporting process: what to report, when, and how to document properly.',
    category: 'Governance',
    duration: 12,
    difficulty: 'Intermediate',
    progress: 0,
    rating: 4.7,
    ratingCount: 67,
  },
  {
    id: 'mod-4',
    title: 'Managing Participant Complaints',
    description: 'Build an effective complaints management system that satisfies NDIS requirements.',
    category: 'Rights',
    duration: 10,
    difficulty: 'Intermediate',
    progress: 100,
    rating: 4.5,
    ratingCount: 53,
  },
  {
    id: 'mod-5',
    title: 'Worker Screening: What You Need to Know',
    description: 'Understand NDIS Worker Screening Check requirements and the renewal process.',
    category: 'Workforce',
    duration: 15,
    difficulty: 'Beginner',
    progress: 30,
    rating: 4.9,
    ratingCount: 142,
    pathId: 'path-3',
  },
  {
    id: 'mod-6',
    title: 'Safe Medication Administration',
    description: 'Best practices for medication management, documentation, and staff training requirements.',
    category: 'Service Delivery',
    duration: 20,
    difficulty: 'Advanced',
    progress: 0,
    rating: 4.8,
    ratingCount: 78,
  },
  {
    id: 'mod-7',
    title: 'Preparing for Your First Audit',
    description: 'Step-by-step preparation guide for NDIS audits: documents, evidence, and mindset.',
    category: 'Audit Prep',
    duration: 25,
    difficulty: 'Intermediate',
    progress: 0,
    rating: 4.9,
    ratingCount: 201,
    pathId: 'path-2',
  },
  {
    id: 'mod-8',
    title: 'Documentation & Record Keeping',
    description: 'Establish robust record-keeping systems that stand up to auditor scrutiny.',
    category: 'Governance',
    duration: 12,
    difficulty: 'Intermediate',
    progress: 0,
    rating: 4.4,
    ratingCount: 45,
  },
  {
    id: 'mod-9',
    title: 'Restrictive Practices: Guidelines & Requirements',
    description: 'Navigate the complex rules around restrictive practices, authorisations, and reporting.',
    category: 'Service Delivery',
    duration: 18,
    difficulty: 'Advanced',
    progress: 0,
    rating: 4.7,
    ratingCount: 62,
  },
  {
    id: 'mod-10',
    title: 'Supporting Participant Choice & Control',
    description: 'Practical strategies for embedding participant choice and control in your services.',
    category: 'Rights',
    duration: 10,
    difficulty: 'Beginner',
    progress: 0,
    rating: 4.6,
    ratingCount: 38,
  },
  {
    id: 'mod-11',
    title: 'Financial Management for NDIS Providers',
    description: 'NDIS pricing arrangements, invoicing rules, and financial compliance essentials.',
    category: 'Governance',
    duration: 15,
    difficulty: 'Intermediate',
    progress: 0,
    rating: 4.5,
    ratingCount: 71,
  },
  {
    id: 'mod-12',
    title: 'SIL Registration Preparation Guide',
    description: 'Specific guidance for Specialist Disability Accommodation providers seeking registration.',
    category: 'NDIS Fundamentals',
    duration: 30,
    difficulty: 'Advanced',
    progress: 0,
    rating: 4.8,
    ratingCount: 95,
    pathId: 'path-1',
  },
  {
    id: 'mod-13',
    title: 'Emergency Planning & Response',
    description: 'Create comprehensive emergency management plans that protect participants and staff.',
    category: 'Service Delivery',
    duration: 14,
    difficulty: 'Intermediate',
    progress: 0,
    rating: 4.3,
    ratingCount: 41,
  },
  {
    id: 'mod-14',
    title: 'Quality Improvement Systems',
    description: 'Build a continuous quality improvement framework that drives better outcomes.',
    category: 'Governance',
    duration: 16,
    difficulty: 'Intermediate',
    progress: 0,
    rating: 4.6,
    ratingCount: 56,
  },
  {
    id: 'mod-15',
    title: 'Behaviour Support Essentials',
    description: 'Understand positive behaviour support and NDIS requirements for behaviour support providers.',
    category: 'Service Delivery',
    duration: 22,
    difficulty: 'Advanced',
    progress: 0,
    rating: 4.7,
    ratingCount: 83,
  },
];

// ── Learning Paths ────────────────────────────────────────────────

export const learningPaths: LearningPath[] = [
  {
    id: 'path-1',
    title: 'NDIS Fundamentals',
    description: 'Everything you need to know as a new NDIS provider. From registration basics to your first audit.',
    moduleCount: 8,
    durationEstimate: '~2 hours',
    accentColor: 'green',
    iconName: 'Sprout',
    forAudience: 'New providers, unregistered workers',
    modules: ['mod-1', 'mod-2', 'mod-7', 'mod-8', 'mod-10', 'mod-3', 'mod-11', 'mod-12'],
    progress: 0,
    status: 'Not Started',
  },
  {
    id: 'path-2',
    title: 'Audit Preparation',
    description: 'Prepare thoroughly for any NDIS audit. Understand what auditors look for and how to demonstrate compliance.',
    moduleCount: 6,
    durationEstimate: '~3 hours',
    accentColor: 'amber',
    iconName: 'ShieldCheck',
    forAudience: 'Providers expecting audit',
    modules: ['mod-7', 'mod-3', 'mod-8', 'mod-14', 'mod-6', 'mod-9'],
    progress: 0,
    status: 'Not Started',
  },
  {
    id: 'path-3',
    title: 'Advanced Compliance',
    description: 'Master worker screening, training requirements, and workforce management under NDIS standards.',
    moduleCount: 10,
    durationEstimate: '~1.5 hours',
    accentColor: 'teal',
    iconName: 'Users',
    forAudience: 'Providers with staff',
    modules: ['mod-5', 'mod-15', 'mod-9', 'mod-13', 'mod-6', 'mod-4', 'mod-11', 'mod-3', 'mod-14', 'mod-8'],
    progress: 0,
    status: 'Not Started',
  },
];

// ── Achievement Badges ────────────────────────────────────────────

export const achievementBadges: AchievementBadge[] = [
  {
    id: 'badge-1',
    name: 'First Steps',
    description: 'Completed your first learning module',
    earned: true,
    iconName: 'Footprints',
  },
  {
    id: 'badge-2',
    name: 'Policy Pro',
    description: 'Generated 5 policies using ComplyKit',
    earned: true,
    iconName: 'FileCheck',
  },
  {
    id: 'badge-3',
    name: 'Audit Ready',
    description: 'Complete the Audit Preparation learning path',
    earned: false,
    iconName: 'ShieldCheck',
  },
  {
    id: 'badge-4',
    name: 'Compliance Champion',
    description: 'Review all your draft documents within 30 days',
    earned: false,
    iconName: 'Trophy',
  },
  {
    id: 'badge-5',
    name: 'Team Leader',
    description: 'Add 5 workers to the screening tracker',
    earned: false,
    iconName: 'Users',
  },
  {
    id: 'badge-6',
    name: 'Invoice Master',
    description: 'Check 10 invoices for compliance',
    earned: true,
    iconName: 'Receipt',
  },
  {
    id: 'badge-7',
    name: 'Mock Audit Pass',
    description: 'Pass a mock audit with 85% or higher',
    earned: false,
    iconName: 'ClipboardCheck',
  },
  {
    id: 'badge-8',
    name: 'Learning Legend',
    description: 'Complete all learning modules',
    earned: false,
    iconName: 'GraduationCap',
  },
];

// ── Quick Reference Cards ─────────────────────────────────────────

export const referenceCards: ReferenceItem[] = [
  {
    id: 'ref-1',
    title: 'NDIS Practice Standards Quick Reference',
    description: 'Downloadable PDF covering all 8 modules',
    iconName: 'BookOpen',
    iconColor: 'text-teal-500',
    linkColor: 'text-teal-600 hover:text-teal-700',
    linkText: 'Download \u2192',
  },
  {
    id: 'ref-2',
    title: 'Audit Checklist',
    description: 'Pre-audit checklist with 50+ items',
    iconName: 'ClipboardCheck',
    iconColor: 'text-leaf-500',
    linkColor: 'text-leaf-600 hover:text-leaf-700',
    linkText: 'Get Checklist \u2192',
  },
  {
    id: 'ref-3',
    title: 'Common Audit Findings',
    description: 'Top 20 reasons providers fail audits',
    iconName: 'AlertCircle',
    iconColor: 'text-coral-500',
    linkColor: 'text-coral-600 hover:text-coral-700',
    linkText: 'Learn More \u2192',
  },
];

// ── Continue Learning State ───────────────────────────────────────

export const continueLearningState: ContinueLearning = {
  moduleId: 'mod-1',
  lastAccessed: 'Yesterday',
  timeRemaining: 12,
};

// ── Helpers ───────────────────────────────────────────────────────

export function getModuleById(id: string): LearningModule | undefined {
  return learningModules.find((m) => m.id === id);
}

export function getModulesByPath(pathId: string): LearningModule[] {
  const path = learningPaths.find((p) => p.id === pathId);
  if (!path) return [];
  return path.modules
    .map((id) => learningModules.find((m) => m.id === id))
    .filter(Boolean) as LearningModule[];
}

export function getOverallProgress(): number {
  const totalProgress = learningModules.reduce((sum, m) => sum + m.progress, 0);
  return Math.round(totalProgress / learningModules.length);
}

export function getCompletedCount(): number {
  return learningModules.filter((m) => m.progress === 100).length;
}
