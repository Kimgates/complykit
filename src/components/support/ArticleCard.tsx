import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import type { PopularArticle } from '@/data/support';

interface ArticleCardProps {
  article: PopularArticle;
  index: number;
  variant?: 'list' | 'card';
}

const categoryBadgeColors: Record<string, string> = {
  Compliance: 'bg-leaf-50 text-leaf-700 border-leaf-200',
  'Getting Started': 'bg-teal-50 text-teal-700 border-teal-200',
  'Policy Generation': 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
  'Worker Screening': 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  Invoicing: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
  'NDIS Resources': 'bg-[#FDF2F8] text-[#BE185D] border-[#FBCFE8]',
};

export default function ArticleCard({ article, index, variant = 'list' }: ArticleCardProps) {
  if (variant === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.06,
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
        whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
        className="bg-white border border-slate-100 rounded-xl p-5 cursor-pointer transition-all duration-200"
      >
        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-2 ${
          categoryBadgeColors[article.category] || 'bg-slate-50 text-slate-600 border-slate-200'
        }`}>
          {article.category}
        </span>
        <h4 className="font-heading font-semibold text-[15px] text-slate-800 leading-snug mb-2 line-clamp-2">
          {article.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {article.readTime}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {article.viewCount.toLocaleString()}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{
        backgroundColor: 'rgba(255,255,255,1)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        borderRadius: '8px',
        padding: '16px',
        margin: '-8px 0',
      }}
      className="flex items-center gap-4 py-4 border-b border-slate-100 cursor-pointer transition-all duration-200 group"
    >
      {/* Number */}
      <span className="text-[28px] font-bold text-slate-200 font-mono leading-none w-10 flex-shrink-0">
        {article.number}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="font-heading font-semibold text-[15px] text-slate-800 leading-snug group-hover:text-leaf-600 transition-colors duration-200 line-clamp-2">
          {article.title}
        </h4>
      </div>

      {/* Category badge */}
      <span className={`hidden sm:inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${
        categoryBadgeColors[article.category] || 'bg-slate-50 text-slate-600 border-slate-200'
      }`}>
        {article.category}
      </span>

      {/* Read time */}
      <span className="hidden md:flex items-center gap-1 text-xs text-slate-400 flex-shrink-0">
        <Clock className="w-3 h-3" />
        {article.readTime}
      </span>

      {/* View count */}
      <span className="hidden lg:flex items-center gap-1 text-xs text-slate-400 flex-shrink-0 min-w-[70px] justify-end">
        <Eye className="w-3 h-3" />
        {article.viewCount.toLocaleString()}
      </span>
    </motion.div>
  );
}
