import { motion } from 'framer-motion';
import {
  Sprout,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { LearningPath } from '@/data/learning';

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  ShieldCheck,
  Users,
};

const accentMap = {
  green: {
    bar: 'bg-leaf-500',
    iconBg: 'bg-leaf-50',
    iconText: 'text-leaf-600',
    badgeBg: 'bg-leaf-50',
    badgeText: 'text-leaf-700',
    badgeBorder: 'border-leaf-200',
    progressFill: 'bg-leaf-500',
  },
  amber: {
    bar: 'bg-[#F59E0B]',
    iconBg: 'bg-[#FFFBEB]',
    iconText: 'text-[#B45309]',
    badgeBg: 'bg-[#FFFBEB]',
    badgeText: 'text-[#B45309]',
    badgeBorder: 'border-[#FDE68A]',
    progressFill: 'bg-[#F59E0B]',
  },
  teal: {
    bar: 'bg-teal-500',
    iconBg: 'bg-teal-50',
    iconText: 'text-teal-600',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-700',
    badgeBorder: 'border-teal-200',
    progressFill: 'bg-teal-500',
  },
};

interface LearningPathCardProps {
  path: LearningPath;
  index: number;
}

export default function LearningPathCard({ path, index }: LearningPathCardProps) {
  const accent = accentMap[path.accentColor];
  const Icon = iconMap[path.iconName] || Sprout;
  const statusLabel = path.status;
  const isCompleted = path.progress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.15,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      className="bg-white border border-slate-100 rounded-2xl p-5 flex flex-col transition-shadow duration-250"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full rounded-full ${accent.bar} mb-4`} />

      {/* Icon + Title */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${accent.iconBg} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${accent.iconText}`} />
        </div>
        <h3 className="font-heading font-semibold text-lg text-slate-800">{path.title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 mb-3 flex-1 leading-relaxed">{path.description}</p>

      {/* Meta */}
      <p className="text-xs text-slate-400 mb-3">
        {path.moduleCount} modules &bull; {path.durationEstimate}
      </p>

      {/* Audience */}
      <p className="text-xs text-slate-400 mb-4">
        For: {path.forAudience}
      </p>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${accent.progressFill} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${path.progress}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 + index * 0.15 }}
          />
        </div>
      </div>

      {/* Footer: badge + CTA */}
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${accent.badgeBg} ${accent.badgeText} ${accent.badgeBorder}`}>
          {statusLabel}
        </span>
        {isCompleted ? (
          <button className="text-sm font-semibold text-slate-600 border-2 border-slate-200 px-5 py-2 rounded-xl hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50 transition-all duration-200">
            Review
          </button>
        ) : path.progress > 0 ? (
          <button className="text-sm font-semibold text-slate-600 border-2 border-slate-200 px-5 py-2 rounded-xl hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50 transition-all duration-200">
            Continue
          </button>
        ) : (
          <button className="text-sm font-semibold text-white bg-leaf-500 px-5 py-2 rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)] active:translate-y-0 transition-all duration-200">
            Start Path
          </button>
        )}
      </div>
    </motion.div>
  );
}
