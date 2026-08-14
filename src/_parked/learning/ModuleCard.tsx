import { motion } from 'framer-motion';
import { Star, Bookmark, Check } from 'lucide-react';
import type { LearningModule } from '@/data/learning';

interface ModuleCardProps {
  module: LearningModule;
  index: number;
  onClick: (module: LearningModule) => void;
}

const difficultyColor: Record<string, string> = {
  Beginner: 'bg-leaf-50 text-leaf-700 border-leaf-200',
  Intermediate: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  Advanced: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
};

export default function ModuleCard({ module, index, onClick }: ModuleCardProps) {
  const isCompleted = module.progress === 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      onClick={() => onClick(module)}
      className={`bg-white border rounded-xl overflow-hidden cursor-pointer transition-all duration-250 group ${
        isCompleted ? 'border-l-[3px] border-l-[#22C55E] border-slate-100' : 'border-slate-100'
      }`}
    >
      {/* Thumbnail area */}
      <div className="relative h-[140px] bg-gradient-to-br from-leaf-50 to-white flex items-center justify-center overflow-hidden">
        {/* Placeholder icon using gradient circle */}
        <div className="w-14 h-14 rounded-full bg-leaf-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-250">
          <svg className="w-7 h-7 text-leaf-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-slate-600 shadow-sm">
          {module.duration} min
        </div>

        {/* Completed checkmark */}
        {isCompleted && (
          <div className="absolute top-2 right-2 w-7 h-7 bg-[#22C55E] rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        )}

        {/* Hover overlay play */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-250 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-250">
            <svg className="w-5 h-5 text-leaf-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="p-4">
        {/* Category badge */}
        <span className="inline-block text-[11px] font-semibold text-leaf-600 bg-leaf-50 px-2 py-0.5 rounded-full mb-2">
          {module.category}
        </span>

        {/* Title */}
        <h4 className="font-heading font-semibold text-[15px] text-slate-800 leading-snug line-clamp-2 mb-1">
          {module.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {module.description}
        </p>

        {/* Difficulty badge */}
        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-3 ${difficultyColor[module.difficulty]}`}>
          {module.difficulty}
        </span>

        {/* Footer: progress + rating + bookmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mini progress bar */}
            <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-leaf-500 rounded-full"
                style={{ width: `${module.progress}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {module.progress}%
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
              <span className="text-[11px] font-semibold text-slate-600">
                {module.rating}
              </span>
            </div>
            <Bookmark className="w-3.5 h-3.5 text-slate-300 hover:text-leaf-500 transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
