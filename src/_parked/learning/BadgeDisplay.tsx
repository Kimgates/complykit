import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Footprints,
  FileCheck,
  ShieldCheck,
  Trophy,
  Users,
  Receipt,
  ClipboardCheck,
  GraduationCap,
  Lock,
} from 'lucide-react';
import type { AchievementBadge } from '@/data/learning';

const iconMap: Record<string, React.ElementType> = {
  Footprints,
  FileCheck,
  ShieldCheck,
  Trophy,
  Users,
  Receipt,
  ClipboardCheck,
  GraduationCap,
};

interface BadgeDisplayProps {
  badges: AchievementBadge[];
}

export default function BadgeDisplay({ badges }: BadgeDisplayProps) {
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-4 gap-5">
      {badges.map((badge, index) => {
        const Icon = iconMap[badge.iconName] || Footprints;
        const isEarned = badge.earned;

        return (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.08,
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHoveredBadge(badge.id)}
            onMouseLeave={() => setHoveredBadge(null)}
          >
            {/* Badge circle */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                isEarned
                  ? 'bg-gradient-to-br from-leaf-400 to-teal-500 shadow-lg'
                  : 'bg-slate-100'
              }`}
            >
              {isEarned ? (
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(34,197,94,0.4)',
                      '0 0 0 8px rgba(34,197,94,0)',
                      '0 0 0 0 rgba(34,197,94,0)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-full h-full rounded-full flex items-center justify-center"
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                </motion.div>
              ) : (
                <Lock className="w-6 h-6 sm:w-7 sm:h-7 text-slate-300" strokeWidth={1.5} />
              )}
            </motion.div>

            {/* Label */}
            <span className={`text-[11px] font-medium text-center leading-tight ${
              isEarned ? 'text-slate-700' : 'text-slate-400'
            }`}>
              {badge.name}
            </span>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredBadge === badge.id && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50"
                >
                  <div className="bg-slate-800 text-white text-xs rounded-xl py-2 px-3 shadow-lg whitespace-nowrap">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-white/60 text-[11px] mt-0.5">{badge.description}</p>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 -mt-1" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
