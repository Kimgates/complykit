import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Eye, Pencil, Download, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import type { ComplianceStatus } from '@/data/policies';

interface PolicyCardProps {
  id: string;
  title: string;
  category: string;
  status: ComplianceStatus;
  lastUpdated: string;
  index: number;
}

const statusConfig = {
  compliant: {
    icon: CheckCircle,
    label: 'Compliant',
    bgColor: 'bg-[#F0FDF4]',
    textColor: 'text-[#15803D]',
    borderColor: 'border-leaf-500',
  },
  'needs-review': {
    icon: AlertCircle,
    label: 'Needs Review',
    bgColor: 'bg-[#FFFBEB]',
    textColor: 'text-[#B45309]',
    borderColor: 'border-[#F59E0B]',
  },
  'non-compliant': {
    icon: XCircle,
    label: 'Non-Compliant',
    bgColor: 'bg-[#FEF2F2]',
    textColor: 'text-[#DC2626]',
    borderColor: 'border-[#EF4444]',
  },
};

export default function PolicyCard({ id, title, category, status, lastUpdated, index }: PolicyCardProps) {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <motion.div
      className={`flex items-center gap-4 px-5 py-3.5 border-b border-slate-50 last:border-b-0 hover:bg-slate-50 transition-colors duration-150 cursor-pointer border-l-[4px] ${config.borderColor}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <div className="flex-1 min-w-0">
        <Link
          to={`/policies/${id}`}
          className="font-heading text-[15px] font-semibold text-slate-800 hover:text-leaf-700 transition-colors truncate block"
        >
          {title}
        </Link>
        <span className="text-xs text-slate-400 mt-0.5">{category}</span>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          {config.label}
        </span>
      </div>

      <div className="hidden md:block text-xs text-slate-400 w-24 text-right">
        {formatDate(lastUpdated)}
      </div>

      <div className="flex items-center gap-1">
        <Link
          to={`/policies/${id}`}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all duration-150"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </Link>
        <Link
          to={`/policies/${id}?edit=true`}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all duration-150"
          title="Edit"
        >
          <Pencil className="w-4 h-4" />
        </Link>
        <button
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-all duration-150"
          title="Export PDF"
          onClick={(e) => e.stopPropagation()}
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
