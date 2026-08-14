import { motion } from 'framer-motion';
import { AlertOctagon, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import type { ComplianceAlert } from '@/data/compliance';

const severityConfig = {
  critical: {
    icon: AlertOctagon,
    border: 'border-[#EF4444]',
    bg: 'bg-[#FEF2F2]',
    iconColor: 'text-[#EF4444]',
    titleColor: 'text-[#DC2626]',
  },
  warning: {
    icon: AlertTriangle,
    border: 'border-[#F59E0B]',
    bg: 'bg-[#FFFBEB]',
    iconColor: 'text-[#F59E0B]',
    titleColor: 'text-[#B45309]',
  },
  info: {
    icon: Info,
    border: 'border-[#3B82F6]',
    bg: 'bg-[#EFF6FF]',
    iconColor: 'text-[#3B82F6]',
    titleColor: 'text-[#1D4ED8]',
  },
};

export default function AlertCard({
  alert,
  index,
}: {
  alert: ComplianceAlert;
  index: number;
}) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;

  return (
    <motion.div
      className={`${config.bg} border ${config.border} rounded-xl p-4 lg:p-5`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.3 + index * 0.1,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      }}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-semibold ${config.titleColor}`}>{alert.title}</h4>
          <p className="text-sm text-slate-600 mt-1">{alert.description}</p>
          {alert.dueDate && (
            <p className="text-xs text-slate-500 mt-2">
              Due: {new Date(alert.dueDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </div>
        <button className={`flex items-center gap-1 text-xs font-medium ${config.titleColor} hover:underline flex-shrink-0`}>
          Fix Now
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

export function AlertsSection({ alerts }: { alerts: ComplianceAlert[] }) {
  if (alerts.length === 0) return null;

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
    >
      {criticalCount > 0 && (
        <motion.div
          className="bg-[#FEF2F2] border border-[#EF4444] rounded-xl px-5 py-4 flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
        >
          <AlertOctagon className="w-5 h-5 text-[#EF4444] flex-shrink-0" />
          <span className="text-sm font-semibold text-[#DC2626]">
            {criticalCount} critical compliance {criticalCount === 1 ? 'issue' : 'issues'} require immediate action
          </span>
          <ChevronRight className="w-4 h-4 text-[#DC2626] ml-auto flex-shrink-0" />
        </motion.div>
      )}

      {alerts.map((alert, i) => (
        <AlertCard key={alert.id} alert={alert} index={i} />
      ))}
    </motion.div>
  );
}
