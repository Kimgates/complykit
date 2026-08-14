import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface DeadlineItemProps {
  title: string;
  date: string;
  daysRemaining: number;
  urgency: 'critical' | 'warning' | 'info';
  index: number;
}

const urgencyConfig = {
  critical: {
    bg: 'bg-[#FEF2F2]',
    text: 'text-[#DC2626]',
    border: 'border-[#FECACA]',
  },
  warning: {
    bg: 'bg-[#FFFBEB]',
    text: 'text-[#B45309]',
    border: 'border-[#FDE68A]',
  },
  info: {
    bg: 'bg-[#EFF6FF]',
    text: 'text-[#1D4ED8]',
    border: 'border-[#BFDBFE]',
  },
};

export default function DeadlineItem({ title, date, daysRemaining, urgency, index }: DeadlineItemProps) {
  const config = urgencyConfig[urgency];

  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 last:border-b-0"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-700 truncate">{title}</p>
        <p className="text-xs text-slate-400">{date}</p>
      </div>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.bg} ${config.text} ${config.border}`}>
        {daysRemaining} days
      </span>
    </motion.div>
  );
}
