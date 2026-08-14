import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, PiggyBank, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import PricingCard from '@/components/pricing/PricingCard';
import ComparisonTable from '@/components/pricing/ComparisonTable';
import PricingFAQ from '@/components/pricing/PricingFAQ';

import type { PricingTier } from '@/components/pricing/PricingCard';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const pricingTiers: PricingTier[] = [
  {
    name: 'Seedling',
    description: 'Get started with the basics',
    priceMonthly: 0,
    priceYearly: 0,
    ctaText: 'Get Started Free',
    ctaPrimary: false,
    image: '/pricing-free.png',
    features: [
      { text: 'Basic compliance self-assessment', included: true },
      { text: '1 policy template', included: true },
      { text: 'Gap detection preview', included: true },
      { text: 'Community access', included: true },
      { text: 'Worker screening tracker (3 workers)', included: true },
      { text: 'Invoice checker (5 checks/month)', included: true },
      { text: 'AI policy generator', included: false },
      { text: 'Mock audit tool', included: false },
      { text: 'Full gap analysis', included: false },
    ],
  },
  {
    name: 'Growth',
    description: 'Everything you need to stay compliant',
    priceMonthly: 39,
    priceYearly: 399,
    ctaText: 'Start Free Trial',
    ctaPrimary: true,
    image: '/pricing-essential.png',
    featured: true,
    badge: 'Most Popular',
    features: [
      { text: 'Everything in Seedling, plus:', included: true },
      { text: 'Unlimited policy generation', included: true, highlighted: true },
      { text: 'Full gap detection & analysis', included: true, highlighted: true },
      { text: 'Worker screening alerts', included: true, highlighted: true },
      { text: 'Invoice checking (unlimited)', included: true, highlighted: true },
      { text: 'Learning hub access', included: true, highlighted: true },
      { text: 'Mock audit tool', included: true, highlighted: true },
      { text: 'Priority email support', included: true },
      { text: 'Quarterly compliance reports', included: true },
    ],
  },
  {
    name: 'Flourish',
    description: 'Total peace of mind for growing providers',
    priceMonthly: 59,
    priceYearly: 599,
    ctaText: 'Start Free Trial',
    ctaPrimary: false,
    image: '/pricing-pro.png',
    features: [
      { text: 'Everything in Growth, plus:', included: true },
      { text: 'Mock audit tool (advanced)', included: true, highlighted: true },
      { text: 'Service agreement automation', included: true, highlighted: true },
      { text: 'Priority support', included: true, highlighted: true },
      { text: 'Team collaboration (up to 10)', included: true, highlighted: true },
      { text: 'Monthly compliance reports', included: true, highlighted: true },
      { text: 'Phone support', included: true, highlighted: true },
      { text: 'Dedicated account manager', included: true, highlighted: true },
      { text: 'API access', included: true, highlighted: true },
    ],
  },
];

const differentiators = [
  {
    icon: Heart,
    iconColor: 'text-coral-500',
    iconBg: 'bg-coral-50',
    title: 'No compliance expertise needed',
    description:
      'We speak your language. No jargon, no overwhelming forms. Just friendly guidance that respects your time and expertise as a care provider.',
  },
  {
    icon: Sparkles,
    iconColor: 'text-leaf-500',
    iconBg: 'bg-leaf-50',
    title: 'Always prepared for review',
    description:
      'Unlike generic templates, every policy is tailored to YOUR specific practice. Stay continuously prepared with traffic-light compliance scoring.',
  },
  {
    icon: PiggyBank,
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-50',
    title: 'Save $1000s on consultants',
    description:
      "Starting at $0 and capped at $59/month. No hidden fees, no lock-in contracts. Because 55.7% of providers can't afford expensive consultants.",
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-leaf-600',
    iconBg: 'bg-leaf-50',
    title: 'Built for NDIS specifically',
    description:
      'Every feature, template, and alert is designed around NDIS Practice Standards and the NDIS Act. Not adapted \u2014 built from the ground up.',
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="bg-white">
      {/* ========== Section 1: Hero ========== */}
      <section
        className="relative w-full py-20 lg:py-24"
        style={{
          background:
            'linear-gradient(135deg, #F0FDF4 0%, #FFF5F2 50%, #F0FDFA 100%)',
        }}
      >
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-xs font-semibold tracking-[0.1em] text-leaf-600 uppercase mb-4"
            >
              Simple, Fair Pricing
            </motion.span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: easeOutExpo }}
              className="font-heading text-[40px] font-semibold text-slate-900 leading-[1.15] tracking-tight"
            >
              Simple pricing for every provider
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-5 text-lg text-slate-500 leading-relaxed max-w-xl mx-auto"
            >
              55.7% of NDIS providers operate at a loss. We believe every
              provider deserves access to quality compliance tools. That&apos;s
              why we have a generous free plan and affordable paid options.
            </motion.p>

            {/* Context badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-leaf-50 rounded-full"
            >
              <span className="text-sm text-leaf-700 font-medium">
                14-day free trial on all paid plans. Cancel anytime.
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== Section 2: Pricing Cards ========== */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          {/* Monthly / Yearly Toggle */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center bg-slate-100 rounded-full p-1">
              <button
                onClick={() => setIsYearly(false)}
                className={cn(
                  'relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200',
                  !isYearly
                    ? 'bg-leaf-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={cn(
                  'relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5',
                  isYearly
                    ? 'bg-leaf-500 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                )}
              >
                Yearly
                {!isYearly && (
                  <span className="text-[10px] bg-leaf-100 text-leaf-700 px-1.5 py-0.5 rounded-full font-semibold">
                    Save 15%
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
            {pricingTiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} isYearly={isYearly} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 3: Comparison Table ========== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
          <ComparisonTable />
        </div>
      </section>

      {/* ========== Section 4: Differentiators ========== */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="font-heading text-[32px] font-semibold text-slate-900 text-center mb-12"
          >
            Why providers choose ComplyKit
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.15,
                  ease: easeOutExpo,
                }}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className={cn(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                    item.iconBg
                  )}
                >
                  <item.icon className={cn('w-6 h-6', item.iconColor)} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== Section 5: FAQ ========== */}
      <section className="py-16 lg:py-20 bg-slate-50">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16">
          <PricingFAQ />
        </div>
      </section>

      {/* ========== Section 6: Final CTA ========== */}
      <section className="py-16 lg:py-20 bg-leaf-600">
        <div className="max-w-container mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <h2 className="font-heading text-[32px] font-semibold text-white leading-tight">
              Start for free, upgrade when you&apos;re ready
            </h2>
            <button className="mt-8 inline-flex items-center px-8 py-4 bg-white text-leaf-700 font-semibold text-lg rounded-xl hover:bg-slate-50 hover:-translate-y-[1px] hover:shadow-lg active:translate-y-0 transition-all duration-200">
              Get Started Free
            </button>
            <p className="mt-4 text-sm text-white/60">
              No credit card &bull; 14-day trial on paid plans &bull; Cancel
              anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
