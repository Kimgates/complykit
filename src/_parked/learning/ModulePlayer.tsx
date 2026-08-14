import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
  Check,
  Lock,
  ChevronRight,
  FileText,
  PenLine,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import type { LearningModule } from '@/data/learning';
import { learningModules, learningPaths } from '@/data/learning';

interface ModulePlayerProps {
  module: LearningModule;
  onClose: () => void;
  onComplete: (moduleId: string) => void;
  onNavigate: (module: LearningModule) => void;
}

export default function ModulePlayer({ module, onClose, onComplete, onNavigate }: ModulePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(module.progress);
  const [activeTab, setActiveTab] = useState<'modules' | 'resources' | 'notes'>('modules');
  const [notes, setNotes] = useState('');
  const [showCompleteConfetti, setShowCompleteConfetti] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Find path this module belongs to
  const modulePath = learningPaths.find((p) => p.modules.includes(module.id));
  const pathModules = modulePath
    ? modulePath.modules
        .map((id) => learningModules.find((m) => m.id === id))
        .filter(Boolean) as LearningModule[]
    : learningModules;

  const currentIndex = pathModules.findIndex((m) => m.id === module.id);
  const prevModule = currentIndex > 0 ? pathModules[currentIndex - 1] : null;
  const nextModule = currentIndex < pathModules.length - 1 ? pathModules[currentIndex + 1] : null;

  const handleMarkComplete = () => {
    setVideoProgress(100);
    setShowCompleteConfetti(true);
    onComplete(module.id);
    setTimeout(() => setShowCompleteConfetti(false), 3000);
  };

  const handlePrev = () => {
    if (prevModule) onNavigate(prevModule);
  };

  const handleNext = () => {
    if (nextModule) onNavigate(nextModule);
  };

  const isCompleted = videoProgress === 100;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Overlay */}
      <motion.div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        ref={modalRef}
        className="relative bg-white rounded-[20px] shadow-[0_24px_48px_rgba(0,0,0,0.12)] w-full max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <p className="text-xs text-slate-400 font-medium">
              {modulePath ? `${modulePath.title} \u2022 Module ${currentIndex + 1} of ${pathModules.length}` : 'Module'}
            </p>
            <h3 className="font-heading font-semibold text-lg text-slate-800 mt-0.5">
              {module.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area - two column */}
        <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row">
          {/* Left - Video/Content area (~65%) */}
          <div className="flex-1 min-w-0 p-6">
            {/* Video placeholder */}
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video flex items-center justify-center">
              {!isPlaying ? (
                <>
                  {/* Placeholder thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mb-4 mx-auto">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                      <p className="text-white/60 text-sm">Video content</p>
                    </div>
                  </div>
                  {/* Play button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center z-10"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-8 h-8 text-leaf-600 ml-1" fill="#22C55E" />
                    </motion.div>
                  </button>
                </>
              ) : (
                <>
                  {/* Playing state - simulated video */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-leaf-500/20 flex items-center justify-center mb-4 animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-leaf-500 flex items-center justify-center">
                        <Pause className="w-5 h-5 text-white" fill="white" />
                      </div>
                    </div>
                    <p className="text-white/60 text-sm">Now playing...</p>
                  </div>
                  {/* Pause overlay button */}
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="absolute inset-0 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                      <Pause className="w-6 h-6 text-white" fill="white" />
                    </div>
                  </button>
                </>
              )}

              {/* Confetti on complete */}
              <AnimatePresence>
                {showCompleteConfetti && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-24 h-24 rounded-full bg-leaf-500 flex items-center justify-center"
                    >
                      <Check className="w-12 h-12 text-white" strokeWidth={3} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Video controls */}
            <div className="mt-4">
              {/* Progress bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden cursor-pointer">
                <div
                  className="h-full bg-leaf-500 rounded-full transition-all duration-300"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400">
                    {Math.round((videoProgress / 100) * module.duration)} / {module.duration} min
                  </span>
                </div>
              </div>
            </div>

            {/* Title + Description */}
            <div className="mt-6">
              <h2 className="font-heading font-semibold text-xl text-slate-800">
                {module.title}
              </h2>
              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {module.description} This module covers the essential knowledge and practical
                strategies you need to implement in your organisation. Follow along with the
                video content and refer to the resources panel for downloadable materials.
              </p>
            </div>

            {/* Educational content */}
            <div className="mt-6 bg-slate-50 rounded-xl p-5">
              <h4 className="font-heading font-semibold text-sm text-slate-700 mb-3">
                Key Learning Points
              </h4>
              <ul className="space-y-2.5">
                {[
                  'Understand the core requirements and their practical application',
                  'Learn how to document evidence that satisfies auditor expectations',
                  'Identify common pitfalls and how to avoid them in your organisation',
                  'Apply best-practice strategies using real-world case studies',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-leaf-500 mt-0.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation buttons */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={!prevModule}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  prevModule
                    ? 'text-slate-600 hover:bg-slate-100'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
              >
                <SkipBack className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleMarkComplete}
                disabled={isCompleted}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isCompleted
                    ? 'bg-leaf-50 text-leaf-700 border border-leaf-200 cursor-default'
                    : 'bg-leaf-500 text-white hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-[0_4px_12px_rgba(34,197,94,0.3)] active:translate-y-0'
                }`}
              >
                <Check className="w-4 h-4" />
                {isCompleted ? 'Completed' : 'Mark as Complete'}
              </button>

              <button
                onClick={handleNext}
                disabled={!nextModule}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  nextModule
                    ? 'text-slate-600 hover:bg-slate-100'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
              >
                Next
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right - Sidebar (~35%) */}
          <div className="w-full lg:w-[320px] border-l border-slate-100 bg-slate-50/50 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-slate-100">
              {[
                { key: 'modules' as const, label: 'Modules', icon: FileText },
                { key: 'resources' as const, label: 'Resources', icon: FileText },
                { key: 'notes' as const, label: 'Notes', icon: PenLine },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors ${
                    activeTab === tab.key
                      ? 'text-leaf-600 border-b-2 border-leaf-500'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-4">
              <AnimatePresence mode="wait">
                {activeTab === 'modules' && (
                  <motion.div
                    key="modules"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1"
                  >
                    {/* Overall progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-500">Overall Progress</span>
                        <span className="text-xs font-semibold text-leaf-600">
                          {Math.round(
                            pathModules.reduce((s, m) => s + m.progress, 0) / pathModules.length
                          )}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-leaf-500 rounded-full"
                          style={{
                            width: `${Math.round(
                              pathModules.reduce((s, m) => s + m.progress, 0) / pathModules.length
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Module list */}
                    {pathModules.map((m, i) => {
                      const isCurrent = m.id === module.id;
                      const isCompleted = m.progress === 100;
                      const isLocked = i > 0 && pathModules[i - 1].progress < 50 && !isCompleted && !isCurrent;

                      return (
                        <button
                          key={m.id}
                          onClick={() => !isLocked && onNavigate(m)}
                          disabled={isLocked}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                            isCurrent
                              ? 'bg-leaf-50 border border-leaf-200'
                              : isLocked
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:bg-white hover:shadow-sm'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-leaf-500 flex-shrink-0" />
                          ) : isLocked ? (
                            <Lock className="w-4 h-4 text-slate-300 flex-shrink-0" />
                          ) : (
                            <Circle className={`w-4 h-4 flex-shrink-0 ${isCurrent ? 'text-leaf-500' : 'text-slate-300'}`} />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium truncate ${
                              isCurrent ? 'text-leaf-700' : isLocked ? 'text-slate-300' : 'text-slate-600'
                            }`}>
                              {m.title}
                            </p>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${
                            isCurrent ? 'text-leaf-500' : 'text-slate-300'
                          }`} />
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {activeTab === 'resources' && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {[
                      { name: 'Module Summary PDF', size: '245 KB', icon: FileText },
                      { name: 'Checklist Template', size: '128 KB', icon: FileText },
                      { name: 'Reference Guide', size: '512 KB', icon: FileText },
                    ].map((resource) => (
                      <button
                        key={resource.name}
                        className="w-full flex items-center gap-3 px-3 py-3 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-all duration-200 text-left"
                      >
                        <div className="w-9 h-9 bg-leaf-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <resource.icon className="w-4 h-4 text-leaf-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-slate-700 truncate">
                            {resource.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{resource.size}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Write your notes here..."
                      className="w-full h-[300px] p-4 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 resize-none transition-all duration-200"
                    />
                    <p className="text-[11px] text-slate-400 mt-2">
                      Notes are saved automatically to your account.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
