import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react';

interface GapCardProps {
  id: string;
  severity: 'critical' | 'recommended';
  title: string;
  description: string;
  auditRisk: 'HIGH' | 'MEDIUM' | 'LOW';
  index: number;
  policyId?: string;
}

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    borderColor: 'border-l-status-red',
    badgeBg: 'bg-[#FEF2F2]',
    badgeText: 'text-[#DC2626]',
    badgeBorder: 'border-[#FECACA]',
    label: 'Critical',
  },
  recommended: {
    icon: AlertCircle,
    borderColor: 'border-l-status-amber',
    badgeBg: 'bg-[#FFFBEB]',
    badgeText: 'text-[#B45309]',
    badgeBorder: 'border-[#FDE68A]',
    label: 'Recommended',
  },
};

export default function GapCard({ severity, title, description, auditRisk, index, policyId }: GapCardProps) {
  const config = severityConfig[severity];
  const SeverityIcon = config.icon;

  return (
    <motion.div
      className={`flex flex-col gap-2 px-5 py-4 border-b border-slate-50 last:border-b-0 border-l-[3px] ${config.borderColor} hover:bg-slate-50 transition-colors duration-150`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${config.badgeBg} ${config.badgeText} ${config.badgeBorder}`}>
          <SeverityIcon className="w-3 h-3" />
          {config.label}
        </span>
        {severity === 'critical' && (
          <motion.span
            className="absolute left-0 top-0 bottom-0 w-[3px] bg-status-red"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </div>

      <h4 className="font-heading text-[15px] font-semibold text-slate-800 leading-snug">
        {title}
      </h4>

      <p className="text-sm text-slate-500 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between mt-1">
        <span className={`text-[11px] font-semibold ${auditRisk === 'HIGH' ? 'text-status-red' : auditRisk === 'MEDIUM' ? 'text-status-amber' : 'text-slate-400'}`}>
          Audit Risk: {auditRisk}
        </span>
        {policyId && (
          <Link
            to={`/policies/${policyId}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-leaf-500 text-white text-xs font-semibold rounded-lg hover:bg-leaf-600 hover:shadow-button-primary transition-all duration-200"
          >
            Fix Now
            <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}
