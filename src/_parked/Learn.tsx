import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronRight,
  Play,
  GraduationCap,
  SlidersHorizontal,
} from 'lucide-react';
import {
  learningModules,
  learningPaths,
  achievementBadges,
  referenceCards,
  continueLearningState,
  getModuleById,
  getOverallProgress,
  getCompletedCount,
} from '@/data/learning';
import type { LearningModule, Category } from '@/data/learning';
import LearningPathCard from './learning/LearningPathCard';
import ModuleCard from './learning/ModuleCard';
import ModulePlayer from './learning/ModulePlayer';
import ReferenceCard from './learning/ReferenceCard';
import BadgeDisplay from './learning/BadgeDisplay';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const categories: ('All' | Category)[] = [
  'All',
  'NDIS Fundamentals',
  'Governance',
  'Service Delivery',
  'Workforce',
  'Rights',
  'Audit Prep',
];

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  const [modules, setModules] = useState(learningModules);
  const [paths, setPaths] = useState(learningPaths);
  const [playerKey, setPlayerKey] = useState(0);

  const continueModule = getModuleById(continueLearningState.moduleId);
  const overallProgress = getOverallProgress();
  const completedCount = getCompletedCount();
  const totalModules = modules.length;

  // Filter modules
  const filteredModules = useMemo(() => {
    let filtered = modules;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((m) => m.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      );
    }
    return filtered;
  }, [modules, selectedCategory, searchQuery]);

  const handleModuleClick = (module: LearningModule) => {
    setSelectedModule(module);
    setPlayerKey((k) => k + 1);
  };

  const handleClosePlayer = () => {
    setSelectedModule(null);
  };

  const handleCompleteModule = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, progress: 100 } : m))
    );
    // Also update paths
    setPaths((prev) =>
      prev.map((p) => {
        const pathModules = p.modules.map((id) =>
          id === moduleId ? { ...getModuleById(id)!, progress: 100 } : getModuleById(id)!
        );
        const totalProgress = pathModules.reduce((s, m) => s + (m?.progress || 0), 0);
        const avgProgress = Math.round(totalProgress / pathModules.length);
        return {
          ...p,
          progress: avgProgress,
          status: avgProgress === 100 ? 'Completed' as const : avgProgress > 0 ? 'In Progress' as const : 'Not Started' as const,
        };
      })
    );
  };

  const handleNavigateModule = (module: LearningModule) => {
    setSelectedModule(module);
    setPlayerKey((k) => k + 1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Top Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="font-heading font-semibold text-2xl text-slate-800">Learning Hub</h1>
          <p className="text-sm text-slate-400 mt-0.5">Build confidence, one module at a time</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Mini progress ring */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="16" fill="none" stroke="#F1F5F9" strokeWidth="3" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 16}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 16 * (1 - overallProgress / 100) }}
                  transition={{ duration: 1.2, ease: easeOutExpo }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-leaf-600">
                {overallProgress}%
              </span>
            </div>
            <div>
              <p className="text-xs text-leaf-600 font-semibold">Your Progress</p>
              <p className="text-[11px] text-slate-400">
                {completedCount} of {totalModules} completed
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Section 1: Continue Learning */}
      {continueModule && continueModule.progress > 0 && continueModule.progress < 100 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-6 border border-slate-100"
        >
          <h2 className="font-heading font-semibold text-xl text-slate-800 mb-5">
            Continue Where You Left Off
          </h2>

          <div className="flex flex-col sm:flex-row gap-5">
            {/* Thumbnail with play */}
            <div
              className="relative w-full sm:w-[180px] h-[130px] bg-gradient-to-br from-leaf-50 to-white rounded-xl flex items-center justify-center flex-shrink-0 cursor-pointer group overflow-hidden"
              onClick={() => handleModuleClick(continueModule)}
            >
              <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Play className="w-6 h-6 text-leaf-600 ml-0.5" fill="#22C55E" />
              </div>
              {/* Pulse animation on play button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-14 h-14 rounded-full border-2 border-leaf-300"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-lg text-slate-800 mb-1">
                {continueModule.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4 max-w-lg leading-relaxed">
                {continueModule.description}
              </p>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-leaf-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${continueModule.progress}%` }}
                    transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{continueModule.progress}% complete &bull; {continueLearningState.timeRemaining} min remaining</span>
                  <span>Last studied: {continueLearningState.lastAccessed}</span>
                </div>
              </div>

              <button
                onClick={() => handleModuleClick(continueModule)}
                className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-leaf-500 text-white font-semibold text-sm rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)] active:translate-y-0 transition-all duration-200"
              >
                Continue Learning
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.section>
      )}

      {/* Section 2: Learning Paths */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
        className="bg-white rounded-2xl p-6 mb-6 border border-slate-100"
      >
        <div className="mb-5">
          <h2 className="font-heading font-semibold text-xl text-slate-800">Learning Paths</h2>
          <p className="text-sm text-slate-500 mt-0.5">Curated journeys based on your role and needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {paths.map((path, i) => (
            <LearningPathCard key={path.id} path={path} index={i} />
          ))}
        </div>
      </motion.section>

      {/* Section 3: All Modules */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
        className="bg-white rounded-2xl p-6 mb-6 border border-slate-100"
      >
        {/* Header with search + filter */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h2 className="font-heading font-semibold text-xl text-slate-800">All Modules</h2>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
              />
            </div>

            {/* Category filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as 'All' | Category)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Module Grid */}
        {filteredModules.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredModules.map((module, i) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={i}
                onClick={handleModuleClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <GraduationCap className="w-12 h-12 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No modules found matching your search</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-sm text-leaf-600 font-semibold hover:text-leaf-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </motion.section>

      {/* Section 4: Quick Reference Cards */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.4 }}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {referenceCards.map((ref, i) => (
            <ReferenceCard key={ref.id} reference={ref} index={i} />
          ))}
        </div>
      </motion.section>

      {/* Section 5: Achievements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.5 }}
        className="bg-white rounded-2xl p-6 mb-6 border border-slate-100"
      >
        <h2 className="font-heading font-semibold text-xl text-slate-800 mb-6">
          Your Achievements
        </h2>
        <BadgeDisplay badges={achievementBadges} />
      </motion.section>

      {/* Module Player Modal */}
      <AnimatePresence>
        {selectedModule && (
          <ModulePlayer
            key={playerKey}
            module={selectedModule}
            onClose={handleClosePlayer}
            onComplete={handleCompleteModule}
            onNavigate={handleNavigateModule}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
