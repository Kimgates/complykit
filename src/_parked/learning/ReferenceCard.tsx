import { motion } from 'framer-motion';
import { BookOpen, ClipboardCheck, AlertCircle } from 'lucide-react';
import type { ReferenceItem } from '@/data/learning';

const iconMap: Record<string, React.ElementType> = {
  BookOpen,
  ClipboardCheck,
  AlertCircle,
};

interface ReferenceCardProps {
  reference: ReferenceItem;
  index: number;
}

export default function ReferenceCard({ reference, index }: ReferenceCardProps) {
  const Icon = iconMap[reference.iconName] || BookOpen;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      className="bg-white border border-slate-100 rounded-2xl p-6 transition-shadow duration-250"
    >
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${reference.iconColor}`} />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-[15px] text-slate-800 mb-1">
            {reference.title}
          </h4>
          <p className="text-sm text-slate-500 mb-3 leading-relaxed">
            {reference.description}
          </p>
          <button className={`text-sm font-semibold ${reference.linkColor} transition-colors duration-200`}>
            {reference.linkText}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
