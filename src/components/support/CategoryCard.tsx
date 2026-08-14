import { motion } from 'framer-motion';
import {
  Rocket,
  FileText,
  ShieldCheck,
  UserCheck,
  Calculator,
  CreditCard,
} from 'lucide-react';
import type { SupportCategory } from '@/data/support';

const iconMap: Record<string, React.ElementType> = {
  Rocket,
  FileText,
  ShieldCheck,
  UserCheck,
  Calculator,
  CreditCard,
};

interface CategoryCardProps {
  category: SupportCategory;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  const Icon = iconMap[category.iconName] || FileText;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      className="bg-white border border-slate-100 rounded-2xl p-6 transition-all duration-250"
    >
      {/* Icon */}
      <div className="w-11 h-11 bg-leaf-50 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-leaf-600" />
      </div>

      {/* Title */}
      <h3 className="font-heading font-semibold text-lg text-slate-800 mb-1">
        {category.title}
      </h3>

      {/* Article count */}
      <p className="text-xs text-slate-400 font-medium mb-4">
        {category.articleCount} articles
      </p>

      {/* Top articles */}
      <ul className="space-y-2.5">
        {category.topArticles.map((article) => (
          <li key={article}>
            <button className="text-sm text-slate-500 hover:text-leaf-600 transition-colors duration-200 text-left leading-snug">
              {article}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
