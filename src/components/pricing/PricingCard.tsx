import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PricingFeature {
  text: string;
  included: boolean;
  highlighted?: boolean;
}

export interface PricingTier {
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  ctaText: string;
  ctaPrimary: boolean;
  ctaAction?: string;
  features: PricingFeature[];
  image: string;
  featured?: boolean;
  badge?: string;
}

interface PricingCardProps {
  tier: PricingTier;
  isYearly: boolean;
  index: number;
}

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function PricingCard({ tier, isYearly, index }: PricingCardProps) {
  const price = isYearly ? tier.priceYearly : tier.priceMonthly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.15 + (tier.featured ? 0.1 : 0),
        ease: easeOutExpo,
      }}
      className={cn(
        'relative flex flex-col rounded-[20px] bg-white p-8 min-w-[300px] lg:min-w-0',
        tier.featured
          ? 'border-2 border-leaf-500 shadow-[0_8px_32px_rgba(34,197,94,0.12)] lg:-translate-y-2'
          : 'border border-slate-200 shadow-sm'
      )}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-block px-4 py-1 bg-coral-500 text-white text-xs font-semibold rounded-full">
            {tier.badge}
          </span>
        </div>
      )}

      {/* Illustration */}
      <img
        src={tier.image}
        alt={`${tier.name} plan illustration`}
        className="w-20 h-20 object-contain mx-auto mb-5"
        loading="lazy"
      />

      {/* Plan Name */}
      <h3 className="text-center font-heading text-[28px] font-semibold text-slate-900 leading-tight">
        {tier.name}
      </h3>

      {/* Description */}
      <p className="text-center text-sm text-slate-500 mt-1">{tier.description}</p>

      {/* Price */}
      <div className="text-center mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={isYearly ? 'yearly' : 'monthly'}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            style={{ perspective: 400 }}
          >
            <span className="font-mono text-[48px] font-bold text-slate-900 tracking-tight leading-none">
              ${price}
            </span>
            <span className="text-sm text-slate-400 ml-1">
              /{isYearly ? 'year' : 'month'}
            </span>
          </motion.div>
        </AnimatePresence>
        {price > 0 && (
          <p className="text-xs text-leaf-600 mt-1 font-medium">
            or ${isYearly ? tier.priceYearly : tier.priceMonthly * 12}/year
            {isYearly ? '' : ' (save 15%)'}
          </p>
        )}
        {price === 0 && (
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Forever free
          </p>
        )}
      </div>

      {/* CTA Button */}
      <button
        className={cn(
          'w-full mt-6 py-3.5 px-6 rounded-xl font-semibold text-base transition-all duration-200',
          tier.ctaPrimary
            ? 'bg-leaf-500 text-white hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0'
            : 'border-2 border-slate-200 text-slate-700 hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50'
        )}
      >
        {tier.ctaText}
      </button>

      {/* CTA subtext */}
      <p className="text-center text-xs text-slate-400 mt-2">
        {price === 0
          ? 'No credit card required \u2022 Forever free'
          : '14-day free trial \u2022 Cancel anytime'}
      </p>

      {/* Divider */}
      <div className="border-t border-slate-100 my-6" />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {tier.features.map((feature, fi) => (
          <motion.li
            key={feature.text}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.3,
              delay: index * 0.15 + 0.3 + fi * 0.04,
              ease: easeOutExpo,
            }}
            className="flex items-start gap-2.5"
          >
            {feature.included ? (
              <CheckCircle2 className="w-4 h-4 text-leaf-500 mt-0.5 flex-shrink-0" />
            ) : (
              <MinusCircle className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
            )}
            <span
              className={cn(
                'text-sm leading-relaxed',
                feature.included
                  ? feature.highlighted
                    ? 'text-slate-700 font-medium'
                    : 'text-slate-600'
                  : 'text-slate-400 line-through'
              )}
            >
              {feature.text}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
