import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  AlertOctagon,
  Briefcase,
  UserCheck,
  ClipboardList,
  HeartHandshake,
  Home,
  Pill,
  Lock,
  Brain,
  LogOut,
} from 'lucide-react';
import type { PracticeStandard, PracticeIndicator } from '@/data/compliance';

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  ShieldCheck,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  AlertOctagon,
  Briefcase,
  UserCheck,
  ClipboardList,
  HeartHandshake,
  Home,
  Pill,
  Lock,
  Brain,
  LogOut,
};

const statusConfig = {
  green: { color: '#22C55E', bg: '#F0FDF4', label: 'Compliant' },
  amber: { color: '#F59E0B', bg: '#FFFBEB', label: 'Attention' },
  red: { color: '#EF4444', bg: '#FEF2F2', label: 'At Risk' },
  neutral: { color: '#94A3B8', bg: '#F8FAFC', label: 'N/A' },
};

function IndicatorRow({ indicator }: { indicator: PracticeIndicator }) {
  const statusIcons = {
    met: <CheckCircle className="w-4 h-4 text-[#22C55E]" />,
    partial: <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />,
    'not-met': <AlertOctagon className="w-4 h-4 text-[#EF4444]" />,
    'na': <span className="w-4 h-4 rounded-full bg-slate-200" />,
  };

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors">
      {statusIcons[indicator.status]}
      <span className="text-sm text-slate-700">{indicator.name}</span>
    </div>
  );
}

export default function StandardCard({
  standard,
  index,
  onOpenDetail,
}: {
  standard: PracticeStandard;
  index: number;
  onOpenDetail?: (standard: PracticeStandard) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const config = statusConfig[standard.status];
  const IconComponent = iconMap[standard.icon] || ShieldCheck;

  return (
    <motion.div
      className="bg-white rounded-[10px] border border-slate-100 overflow-hidden cursor-pointer transition-shadow duration-200 hover:shadow-card-hover hover:-translate-y-[2px]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      onClick={() => {
        setExpanded(!expanded);
        onOpenDetail?.(standard);
      }}
    >
      {/* Top accent line */}
      <div className="h-[3px]" style={{ backgroundColor: config.color }} />

      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <IconComponent className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
          <span className="text-xs font-semibold text-slate-700 truncate leading-tight">{standard.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: config.color } as React.CSSProperties}>
            {standard.score !== null ? `${standard.score}%` : 'N/A'}
          </span>
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: config.bg, color: config.color }}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* Expandable detail */}
      <AnimatePresence>
        {expanded && standard.indicators.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-t border-slate-100 px-3 py-2">
              <p className="text-xs text-slate-500 mb-2 px-1">{standard.description}</p>
              <div className="space-y-0.5">
                {standard.indicators.map((ind) => (
                  <IndicatorRow key={ind.id} indicator={ind} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
