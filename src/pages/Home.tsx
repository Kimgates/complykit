import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCT_NAME } from '@/config/product';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Leaf,
  ArrowRight,
  PlayCircle,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
} from 'lucide-react';

/* ───────────────────── Animation Helpers ───────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSoft = [0.4, 0, 0.2, 1] as [number, number, number, number];

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ───────────────────── Section 2: How It Works ───────────────────── */

const steps = [
  {
    num: '01',
    title: 'Answer friendly questions',
    body: 'Our smart wizard learns about how you work \u2014 your services, team size, and current procedures. No jargon, no trick questions.',
    badge: 'Takes 5-10 minutes',
    image: '/how-it-works-step1.png',
  },
  {
    num: '02',
    title: 'AI generates your policies',
    body: 'Receive fully customised NDIS policies and procedures that match how you actually operate \u2014 not generic templates that miss the mark.',
    badge: '100% tailored to you',
    image: '/how-it-works-step2.png',
  },
  {
    num: '03',
    title: 'Know your gaps, ace audits',
    body: 'See exactly where you stand with compliance scoring, get actionable fixes, learn what auditors look for, and track worker screening \u2014 all in one place.',
    badge: 'Audit-ready always',
    image: '/how-it-works-step3.png',
  },
];

function HowItWorks() {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <section id="how-it-works" className="bg-white py-20 md:py-24 lg:py-32">
      <div ref={ref} className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <p className="text-xs font-semibold tracking-[0.1em] text-leaf-600 uppercase mb-3">How It Works</p>
          <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-slate-900 leading-tight max-w-[640px]">
            From overwhelmed to prepared in three steps
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-[560px]">
            Just answer a few questions about how you work and let {PRODUCT_NAME} prepare your draft documents.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
          {/* Connecting line - desktop */}
          <div className="hidden lg:block absolute top-[60px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-leaf-200" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.2, duration: 0.6, ease: easeOutExpo }}
            >
              <div className="flex flex-col items-start">
                <span className="font-mono text-[28px] font-semibold text-leaf-200 mb-4">{step.num}</span>
                <motion.img
                  src={step.image}
                  alt={step.title}
                  className="w-full max-w-[280px] rounded-2xl mb-6 object-cover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.2, duration: 0.5, ease: easeOutExpo }}
                />
                <h3 className="font-heading text-[22px] font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed mb-4">{step.body}</p>
                <span className="inline-block px-3 py-1 bg-leaf-50 text-leaf-700 text-xs font-semibold rounded-full">
                  {step.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Section 3: Features Grid ───────────────────── */

const features = [
  {
    title: 'Smart Policy Generator',
    body: 'Answer questions about your practice and get fully customised NDIS policies. No more generic templates \u2014 every policy matches how you actually work.',
    link: '/get-started',
    linkText: 'See how it works',
    accent: 'border-t-leaf-400',
    image: '/feature-policy-ai.png',
  },
  {
    title: 'Compliance Scoring',
    body: 'See your compliance health at a glance with traffic-light scoring. Know exactly which standards you meet and where you need to improve.',
    link: '/compliance',
    linkText: 'Check your score',
    accent: 'border-t-teal-500',
    image: '/feature-compliance.png',
  },
  {
    title: 'Learning Hub',
    body: 'Bite-sized microlearning modules teach you what auditors look for. Learn at your own pace and build real confidence in your compliance knowledge.',
    link: '/learn',
    linkText: 'Start learning',
    accent: 'border-t-coral-400',
    image: '/feature-learning.png',
  },
  {
    title: 'Mock Audit Practice',
    body: 'Practice with realistic audit scenarios before the real thing. Get feedback on your answers and understand what auditors expect from you.',
    link: '/mock-audit',
    linkText: 'Try a mock audit',
    accent: 'border-t-leaf-400',
    image: '/feature-mock-audit.png',
  },
  {
    title: 'Worker Screening Tracker',
    body: 'Never miss a worker screening expiry again. Automatic alerts, renewal reminders, and a clear view of your entire team\'s compliance status.',
    link: '/screening',
    linkText: 'Track screenings',
    accent: 'border-t-teal-500',
    image: '/feature-screening.png',
  },
  {
    title: 'Invoice Compliance Checker',
    body: 'Validate your invoices against current NDIS pricing arrangements before submission. Catch errors that cost providers $1.68 billion every year.',
    link: '/invoice-checker',
    linkText: 'Check invoices',
    accent: 'border-t-coral-400',
    image: '/feature-invoice.png',
  },
];

function FeaturesGrid() {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <section id="features" className="bg-slate-50 py-20 md:py-24 lg:py-32">
      <div ref={ref} className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <p className="text-xs font-semibold tracking-[0.1em] text-leaf-600 uppercase mb-3">Features</p>
          <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-slate-900 leading-tight">
            Everything you need to stay compliant
          </h2>
          <p className="text-lg text-slate-500 mt-4">
            Powerful tools, designed for people who care \u2014 not compliance officers.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border-t-[3px] ${feature.accent}`}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: easeOutExpo }}
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden mb-4">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{feature.body}</p>
              <Link
                to={feature.link}
                className="inline-flex items-center text-leaf-600 font-medium text-sm hover:underline"
              >
                {feature.linkText}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Section 4: Pricing Preview ───────────────────── */

const plans = [
  {
    name: 'Seedling',
    price: 0,
    description: 'Get started with the basics',
    image: '/pricing-free.png',
    features: [
      'Basic compliance self-assessment',
      '3 policy templates (generic)',
      'Worker screening tracker (up to 3 workers)',
      'Community learning access',
      'Email support',
    ],
    cta: 'Get Started Free',
    ctaStyle: 'secondary' as const,
    badge: 'No credit card required',
    featured: false,
  },
  {
    name: 'Growth',
    price: 39,
    description: 'Everything you need to stay compliant',
    image: '/pricing-essential.png',
    features: [
      'Full AI policy generator (unlimited)',
      'Compliance dashboard with gap analysis',
      'Learning Hub access (all modules)',
      'Mock audit tool (unlimited)',
      'Worker screening tracker (unlimited)',
      'Invoice compliance checker',
      'Priority email support',
      'Quarterly compliance reports',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'primary' as const,
    badge: '14-day free trial',
    featured: true,
    tag: 'Most Popular',
  },
  {
    name: 'Flourish',
    price: 59,
    description: 'For growing providers who want total peace of mind',
    image: '/pricing-pro.png',
    features: [
      'Everything in Growth',
      'Multi-location management',
      'Team collaboration (up to 10)',
      'Advanced audit preparation',
      'NDIS commission submission support',
      'Custom policy reviews',
      'Phone support',
      'Monthly compliance reports',
    ],
    cta: 'Start Free Trial',
    ctaStyle: 'secondary' as const,
    badge: '14-day free trial',
    featured: false,
  },
];

function PricingPreview() {
  const { ref, inView } = useScrollReveal(0.15);

  return (
    <section id="pricing" className="hero-gradient py-20 md:py-24 lg:py-32">
      <div ref={ref} className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <p className="text-xs font-semibold tracking-[0.1em] text-leaf-600 uppercase mb-3">Pricing</p>
          <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-slate-900 leading-tight">
            Affordable for every provider
          </h2>
          <p className="text-lg text-slate-500 mt-4 max-w-[600px] mx-auto">
            Most NDIS providers operate at losses. We built {PRODUCT_NAME} to be accessible to everyone who needs it.
          </p>
          <div className="mt-4 inline-flex items-center px-3 py-1.5 bg-coral-50 text-coral-600 text-xs font-semibold rounded-full">
            55.7% of providers operate at a loss &mdash; that&apos;s why we keep pricing fair
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1100px] mx-auto items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`bg-white rounded-2xl p-6 border ${
                plan.featured
                  ? 'border-2 border-leaf-500 shadow-[0_0_20px_rgba(34,197,94,0.1)] lg:scale-[1.02]'
                  : 'border-slate-100 shadow-card'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: plan.featured ? 0.25 : 0.15 + i * 0.15, duration: 0.6, ease: easeOutExpo }}
            >
              {plan.tag && (
                <div className="flex justify-center mb-4">
                  <span className="px-3 py-1 bg-coral-500 text-white text-xs font-semibold rounded-full">
                    {plan.tag}
                  </span>
                </div>
              )}
              <div className="flex justify-center mb-4">
                <img src={plan.image} alt={plan.name} className="w-20 h-20 object-contain" />
              </div>
              <h3 className="font-heading text-[28px] font-semibold text-slate-900 text-center">{plan.name}</h3>
              <div className="text-center mt-2 mb-3">
                <span className="font-mono text-[48px] font-bold text-slate-900">
                  ${inView ? <CountUp start={0} end={plan.price} duration={0.8} delay={0.3} /> : '0'}
                </span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>
              <p className="text-slate-500 text-sm text-center mb-6">{plan.description}</p>
              <ul className="space-y-2.5 mb-6">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-leaf-500 flex-shrink-0 mt-0.5" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                to="/get-started"
                className={`block text-center w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  plan.ctaStyle === 'primary'
                    ? 'bg-leaf-500 text-white hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary'
                    : 'border-2 border-slate-200 text-slate-700 hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50'
                }`}
              >
                {plan.cta}
              </Link>
              <p className="text-center text-xs text-slate-400 mt-3">{plan.badge}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Section 5: FAQ ───────────────────── */

const faqItems = [
  {
    q: `Who is {PRODUCT_NAME} for?`,
    a: `{PRODUCT_NAME} is designed for independent NDIS support workers, sole traders, small unregistered providers, and medium-sized providers. If you find NDIS policy preparation overwhelming, {PRODUCT_NAME} is built for you. We're not for large registered providers who already have dedicated compliance teams.`,
  },
  {
    q: 'Are the generated policies compliant with NDIS Quality and Safeguards Commission standards?',
    a: 'Yes. All policies are generated based on the current NDIS Practice Standards and Quality Indicators. We reference the official NDIS legislation and update our system when regulations change. However, policies are tailored to YOUR specific practice, which is what auditors actually want to see.',
  },
  {
    q: 'How long does the assessment take?',
    a: 'Most providers complete the initial assessment in 5-10 minutes. The wizard only asks questions relevant to your provider type and services \u2014 no unnecessary questions, no compliance jargon.',
  },
  {
    q: 'Can I edit the generated policies?',
    a: 'Absolutely. Your policies are living documents. You can edit them anytime in our policy editor, download them as PDFs, and regenerate them if your practice changes.',
  },
  {
    q: 'What happens when NDIS regulations change?',
    a: 'We monitor NDIS regulatory updates continuously. When standards change, you\'ll receive a notification and we\'ll highlight which of your policies need updating. Pro plan users get automatic policy review recommendations.',
  },
  {
    q: 'Is my data secure?',
    a: 'We take data security seriously. All data is encrypted in transit and at rest using AES-256. We store data in Australian servers and comply with Australian privacy laws. We never share your information with third parties.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes, no lock-in contracts. You can cancel anytime from your account settings. If you cancel, you keep access until the end of your billing period. Your policies remain downloadable even after cancellation.',
  },
  {
    q: `Are {PRODUCT_NAME} documents guaranteed to pass an audit?`,
    a: `No. {PRODUCT_NAME} prepares draft documents based on your responses, but passing an audit depends on how you actually operate. You must review, edit, and approve all documents before use. This tool does not provide compliance advice.`,
  },
];

function FAQItem({ item, isOpen, onClick }: { item: typeof faqItems[0]; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-slate-100">
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={onClick}
      >
        <span className={`font-heading text-base font-semibold transition-colors duration-150 pr-4 ${
          isOpen ? 'text-leaf-700' : 'text-slate-800 group-hover:text-leaf-700'
        }`}>
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: easeSoft }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: isOpen ? 0.3 : 0.25, ease: easeSoft }}
        className="overflow-hidden"
      >
        <p className="text-slate-600 text-sm leading-relaxed pb-5 max-w-[640px]">{item.a}</p>
      </motion.div>
    </div>
  );
}

function FAQ() {
  const { ref, inView } = useScrollReveal(0.15);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-24 lg:py-32">
      <div ref={ref} className="max-w-3xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          <p className="text-xs font-semibold tracking-[0.1em] text-leaf-600 uppercase mb-3">FAQ</p>
          <h2 className="font-heading text-[28px] md:text-[40px] font-semibold text-slate-900 leading-tight">
            Questions? We&apos;ve got answers.
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {faqItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: easeOutExpo }}
            >
              <FAQItem
                item={item}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── Section 6: Final CTA ───────────────────── */

function FinalCTA() {
  const { ref, inView } = useScrollReveal(0.2);

  return (
    <section ref={ref} className="bg-leaf-600 py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Subtle leaf pattern bg */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 Q35 25 30 40 Q25 25 30 10' fill='white'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="max-w-[640px] mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="font-heading text-[28px] md:text-[40px] font-semibold text-white leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
        >
          Ready to take the stress out of compliance?
        </motion.h2>
        <motion.p
          className="text-lg text-white/80 mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Join 2,400+ NDIS providers who&apos;ve made compliance simple, affordable, and human.
        </motion.p>
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.4, ease: easeOutExpo }}
        >
          <Link
            to="/get-started"
            className="inline-flex items-center px-8 py-4 bg-white text-leaf-700 font-bold text-lg rounded-xl shadow-cta hover:-translate-y-[1px] hover:shadow-lg transition-all duration-200"
          >
            Start Your Free Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <p className="text-white/60 text-sm mt-3">Takes 5 minutes. No credit card required.</p>
          <Link
            to="/pricing"
            className="inline-block mt-2 text-white/80 text-sm hover:text-white hover:underline transition-colors duration-150"
          >
            Or view pricing &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── Section 1: Hero ───────────────────── */

function Hero() {
  return (
    <section className="hero-gradient min-h-[100dvh] flex items-center relative overflow-hidden leaf-glow">
      <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-4 items-center">
          {/* Left Column - Text */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-leaf-50 text-leaf-700 text-xs font-semibold rounded-full mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Leaf className="w-3.5 h-3.5" />
              Built for NDIS Providers
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-heading text-[40px] md:text-[56px] lg:text-[72px] font-bold text-slate-900 leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: easeOutExpo }}
            >
              Compliance that
              <br />
              cares about you.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg text-slate-600 mt-6 max-w-[520px] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: easeOutExpo }}
            >
              Generate customised NDIS policies, pass audits with confidence, and stay compliant &mdash; all without the compliance headache. Built for support workers, sole traders, and small providers.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 mt-10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease: easeOutExpo }}
            >
              <Link
                to="/get-started"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-leaf-500 text-white font-semibold text-lg rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all duration-200"
              >
                Start Your Free Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50 transition-all duration-200"
              >
                <PlayCircle className="w-5 h-5" />
                See How It Works
              </a>
            </motion.div>

            {/* Trust Bar */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <p className="text-sm text-slate-500 mb-3">Trusted by 2,400+ NDIS providers</p>
              <div className="flex items-center">
                {/* Avatar placeholders */}
                {[
                  'bg-leaf-200 text-leaf-700',
                  'bg-coral-200 text-coral-700',
                  'bg-teal-200 text-teal-700',
                  'bg-amber-200 text-amber-700',
                  'bg-slate-200 text-slate-700',
                ].map((style, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full ${style} flex items-center justify-center text-xs font-bold border-2 border-white -ml-2 first:ml-0`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-leaf-500 flex items-center justify-center text-xs font-bold text-white border-2 border-white -ml-2">
                  +
                </div>
              </div>
            </motion.div>

            {/* Urgency Pill */}
            <motion.div
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 bg-coral-50 text-coral-600 text-xs font-semibold rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              SIL registration mandatory from 1 July 2026
            </motion.div>
          </motion.div>

          {/* Right Column - Illustration */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: easeOutExpo }}
          >
            <div className="relative">
              <motion.img
                src="/hero-illustration.png"
                alt="Support worker at laptop with compliance documents"
                className="w-full max-w-[400px] lg:max-w-[500px] object-contain"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Floating leaf decorations */}
              <motion.div
                className="absolute top-[10%] right-[5%] opacity-15"
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Leaf className="w-5 h-5 text-leaf-600" />
              </motion.div>
              <motion.div
                className="absolute bottom-[20%] left-[0%] opacity-15"
                animate={{ y: [0, -10, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Leaf className="w-4 h-4 text-leaf-500" />
              </motion.div>
              <motion.div
                className="absolute top-[40%] left-[5%] opacity-15"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Leaf className="w-3 h-3 text-leaf-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Home Page ───────────────────── */

export default function Home() {
  return (
    <div className="font-body">
      <Hero />
      <HowItWorks />
      <FeaturesGrid />
      <PricingPreview />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
