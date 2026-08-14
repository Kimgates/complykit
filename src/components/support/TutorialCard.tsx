import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import type { Tutorial } from '@/data/support';

interface TutorialCardProps {
  tutorial: Tutorial;
  index: number;
}

export default function TutorialCard({ tutorial, index }: TutorialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}
      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-250 group"
    >
      {/* Thumbnail */}
      <div className="relative h-[100px] bg-gradient-to-br from-leaf-50 to-white flex items-center justify-center overflow-hidden">
        <div className="w-10 h-10 rounded-full bg-white/80 shadow-sm flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-250">
          <Play className="w-4 h-4 text-leaf-600 ml-0.5" fill="#22C55E" />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-leaf-500/0 group-hover:bg-leaf-500/5 transition-colors duration-250" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-heading font-semibold text-sm text-slate-800 mb-1.5 leading-snug">
          {tutorial.title}
        </h4>
        <p className="text-[11px] text-slate-400 font-medium mb-3">
          {tutorial.stepCount} steps &bull; {tutorial.duration}
        </p>
        <button className="text-xs font-semibold text-leaf-600 hover:text-leaf-700 transition-colors duration-200">
          Start Tutorial &rarr;
        </button>
      </div>
    </motion.div>
  );
}
