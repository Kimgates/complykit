import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Can I really use the free plan forever?',
    answer:
      'Yes! The Seedling free plan is free forever with no credit card required. It\'s designed to help small providers and independent workers get started with compliance. You can upgrade anytime when you need more features.',
  },
  {
    question: 'What happens after my 14-day trial?',
    answer:
      'After your trial, you\'ll be charged the monthly or yearly rate you selected. We\'ll send you a reminder 3 days before the trial ends. You can cancel anytime during the trial and pay nothing.',
  },
  {
    question: 'Can I switch between plans?',
    answer:
      'Absolutely. Upgrade or downgrade anytime from your account settings. When upgrading, you\'ll get immediate access to new features. When downgrading, your current plan stays active until the end of the billing period.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'If you\'re not satisfied, contact us within 30 days of your first paid charge for a full refund \u2014 no questions asked. After 30 days, you can cancel and your access continues until the end of your billing period.',
  },
  {
    question: 'Is there a discount for medium or large providers?',
    answer:
      'Our Flourish plan at $59/month is designed to scale. For organisations with more than 10 users or multiple locations, contact us for custom enterprise pricing.',
  },
  {
    question: 'Can I pay with NDIS funding?',
    answer:
      'Yes \u2014 many providers claim ComplyKit as a business expense under their NDIS registration. We provide tax invoices with your ABN for easy claiming. Speak with your plan manager or accountant about categorising this under compliance costs.',
  },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

function AccordionItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: easeOutExpo }}
      className="border-b border-slate-200 last:border-b-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 px-2 text-left group"
      >
        <span
          className={cn(
            'text-base font-medium transition-colors duration-200 pr-4',
            open ? 'text-leaf-700' : 'text-slate-700 group-hover:text-slate-900'
          )}
        >
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              'w-5 h-5 transition-colors duration-200',
              open ? 'text-leaf-500' : 'text-slate-400'
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
            className="overflow-hidden"
          >
            <p className="px-2 pb-5 text-sm text-slate-500 leading-relaxed max-w-xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function PricingFAQ() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="font-heading text-[32px] font-semibold text-slate-900">
          Pricing Questions
        </h2>
      </div>

      {/* Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200 px-5">
        {faqs.map((faq, i) => (
          <AccordionItem key={faq.question} item={faq} index={i} />
        ))}
      </div>
    </div>
  );
}
