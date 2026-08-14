export interface SupportCategory {
  id: string;
  title: string;
  iconName: string;
  articleCount: number;
  topArticles: string[];
}

export interface PopularArticle {
  id: string;
  number: string;
  title: string;
  category: string;
  readTime: string;
  viewCount: number;
}

export interface Tutorial {
  id: string;
  title: string;
  stepCount: number;
  duration: string; // e.g. "3 min"
}

export interface ContactOption {
  id: string;
  type: 'live-chat' | 'email' | 'phone';
  title: string;
  iconName: string;
  iconColor: string;
  description: string;
  detail: string;
  availability?: string;
  badge?: string;
  buttonText?: string;
  buttonColor?: string;
}

// ── Support Categories ────────────────────────────────────────────

export const supportCategories: SupportCategory[] = [
  {
    id: 'cat-1',
    title: 'Getting Started',
    iconName: 'Rocket',
    articleCount: 12,
    topArticles: [
      'Creating your account',
      'The assessment wizard',
      'Understanding your dashboard',
    ],
  },
  {
    id: 'cat-2',
    title: 'Policies & Documents',
    iconName: 'FileText',
    articleCount: 18,
    topArticles: [
      'How policies are customised',
      'Editing your policies',
      'Exporting to PDF',
    ],
  },
  {
    id: 'cat-3',
    title: 'Account & Billing',
    iconName: 'CreditCard',
    articleCount: 10,
    topArticles: [
      'Changing your plan',
      'Updating payment method',
      'Cancelling subscription',
    ],
  },
  {
    id: 'cat-4',
    title: 'Audit Help',
    iconName: 'ShieldCheck',
    articleCount: 15,
    topArticles: [
      'Understanding your draft documents',
      'Preparing for an audit',
      'What the traffic lights mean',
    ],
  },
  {
    id: 'cat-5',
    title: 'Technical Issues',
    iconName: 'Monitor',
    articleCount: 8,
    topArticles: [
      'Checking invoice compliance',
      'NDIS price limits',
      'Common rejection reasons',
    ],
  },
  {
    id: 'cat-6',
    title: 'NDIS Resources',
    iconName: 'ExternalLink',
    articleCount: 10,
    topArticles: [
      'Adding workers',
      'Setting up expiry alerts',
      'NDIS Worker Screening process',
    ],
  },
];

// ── Popular Articles ──────────────────────────────────────────────

export const popularArticles: PopularArticle[] = [
  {
    id: 'art-1',
    number: '01',
    title: 'How to prepare for your first NDIS audit: A complete guide',
    category: 'Compliance',
    readTime: '8 min read',
    viewCount: 3240,
  },
  {
    id: 'art-2',
    number: '02',
    title: 'Understanding NDIS Practice Standards: A plain-English breakdown',
    category: 'Getting Started',
    readTime: '12 min read',
    viewCount: 2890,
  },
  {
    id: 'art-3',
    number: '03',
    title: 'Why generic policy templates fail audits (and what to do instead)',
    category: 'Policy Generation',
    readTime: '6 min read',
    viewCount: 2450,
  },
  {
    id: 'art-4',
    number: '04',
    title: 'NDIS Worker Screening: Step-by-step renewal guide',
    category: 'Worker Screening',
    readTime: '5 min read',
    viewCount: 2100,
  },
  {
    id: 'art-5',
    number: '05',
    title: 'Common invoice mistakes that cost providers thousands',
    category: 'Invoicing',
    readTime: '7 min read',
    viewCount: 1870,
  },
  {
    id: 'art-6',
    number: '06',
    title: 'How to customise generated policies for your organisation',
    category: 'Policy Generation',
    readTime: '10 min read',
    viewCount: 1650,
  },
  {
    id: 'art-7',
    number: '07',
    title: 'Worker screening requirements explained simply',
    category: 'Worker Screening',
    readTime: '6 min read',
    viewCount: 1520,
  },
  {
    id: 'art-8',
    number: '08',
    title: 'Managing incidents correctly: A step-by-step process',
    category: 'Compliance',
    readTime: '9 min read',
    viewCount: 1430,
  },
  {
    id: 'art-9',
    number: '09',
    title: 'Writing participant service agreements that protect everyone',
    category: 'Getting Started',
    readTime: '11 min read',
    viewCount: 1280,
  },
  {
    id: 'art-10',
    number: '10',
    title: 'Navigating the NDIS Commission portal like a pro',
    category: 'NDIS Resources',
    readTime: '7 min read',
    viewCount: 1150,
  },
];

// ── Contact Options ───────────────────────────────────────────────

export const contactOptions: ContactOption[] = [
  {
    id: 'contact-1',
    type: 'live-chat',
    title: 'Live Chat',
    iconName: 'MessageCircle',
    iconColor: 'text-leaf-500',
    description: 'Chat with our support team',
    detail: 'Usually responds in under 5 minutes',
    availability: 'Available Monday\u2013Friday, 9am\u20135pm AEST',
    buttonText: 'Start Chat \u2192',
    buttonColor: 'bg-leaf-500 hover:bg-leaf-600',
  },
  {
    id: 'contact-2',
    type: 'email',
    title: 'Email Support',
    iconName: 'Mail',
    iconColor: 'text-teal-500',
    description: 'Send us an email',
    detail: 'support@complykit.com.au',
    availability: 'We aim to respond within 24 hours',
    badge: 'Growth & Pro: Priority',
  },
  {
    id: 'contact-3',
    type: 'phone',
    title: 'Phone',
    iconName: 'Phone',
    iconColor: 'text-coral-500',
    description: 'Call us directly',
    detail: '1800 COMPLY (1800 266 759)',
    availability: 'Available Monday\u2013Friday, 9am\u20135pm AEST',
  },
];

// ── Guided Tutorials ──────────────────────────────────────────────

export const guidedTutorials: Tutorial[] = [
  {
    id: 'tut-1',
    title: 'Complete Your First Assessment',
    stepCount: 5,
    duration: '3 min',
  },
  {
    id: 'tut-2',
    title: 'Generate Your First Policy',
    stepCount: 4,
    duration: '2 min',
  },
  {
    id: 'tut-3',
    title: 'Run a Mock Audit',
    stepCount: 5,
    duration: '3 min',
  },
  {
    id: 'tut-4',
    title: 'Check Worker Screening',
    stepCount: 4,
    duration: '2 min',
  },
  {
    id: 'tut-5',
    title: 'Validate an Invoice',
    stepCount: 6,
    duration: '4 min',
  },
  {
    id: 'tut-6',
    title: 'Track Document Progress',
    stepCount: 3,
    duration: '2 min',
  },
];

// ── Search Suggestions ────────────────────────────────────────────

export const searchSuggestions = [
  'Generate policy',
  'Worker screening',
  'Invoice check',
  'Mock audit',
  'Update billing',
];
