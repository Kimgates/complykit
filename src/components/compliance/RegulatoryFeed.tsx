import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { regulatoryUpdates } from '@/data/compliance';
import type { ImpactLevel } from '@/data/compliance';

const impactBadge = (impact: ImpactLevel) => {
  const config = {
    high: { bg: '#FEF2F2', text: '#DC2626', border: '#FECACA', label: 'High Impact' },
    medium: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A', label: 'Medium Impact' },
    low: { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0', label: 'Low Impact' },
  };
  const c = config[impact];
  return (
    <span
      className="text-[10px] font-semibold px-2.5 py-1 rounded-full border"
      style={{ backgroundColor: c.bg, color: c.text, borderColor: c.border }}
    >
      {c.label}
    </span>
  );
};

const impactDot = (impact: ImpactLevel) => {
  const colors = { high: '#EF4444', medium: '#F59E0B', low: '#22C55E' };
  return <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: colors[impact] }} />;
};

export default function RegulatoryFeed() {
  return (
    <div className="bg-white rounded-16 border border-slate-100 shadow-card p-5 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h3 className="text-xl font-semibold font-heading text-slate-900">Regulatory Updates</h3>
          <p className="text-sm text-slate-500 mt-0.5">Recent NDIS changes that may affect you</p>
        </div>
        <button className="inline-flex items-center gap-1 text-sm font-medium text-[#16A34A] hover:underline self-start">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Update Items */}
      <div className="space-y-0">
        {regulatoryUpdates.map((update, i) => (
          <motion.div
            key={update.id}
            className="flex items-start gap-4 py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded-lg px-3 -mx-3 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0 pt-1">
              {impactDot(update.impact)}
              <span className="text-[10px] text-slate-400 whitespace-nowrap">
                {new Date(update.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-800 leading-snug">{update.title}</h4>
              <p className="text-sm text-slate-500 mt-1 line-clamp-2">{update.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-slate-400">{update.source}</span>
                {impactBadge(update.impact)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
