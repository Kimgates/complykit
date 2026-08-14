import { motion, AnimatePresence } from 'framer-motion';
import { X, History, RotateCcw } from 'lucide-react';
import type { PolicyVersion } from '@/data/policies';

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  versions: PolicyVersion[];
  onRestore?: (version: PolicyVersion) => void;
}

export default function VersionHistory({ isOpen, onClose, versions, onRestore }: VersionHistoryProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-50 bg-[rgba(15,23,42,0.4)] backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-[16px] shadow-modal w-full max-w-[640px] max-h-[80vh] flex flex-col pointer-events-auto overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <History className="w-5 h-5 text-slate-600" />
                  <h2 className="font-heading text-xl font-semibold text-slate-900">Version History</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-150"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Timeline */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-200" />

                  <div className="space-y-4">
                    {versions.map((version, index) => (
                      <motion.div
                        key={version.id}
                        className={`relative flex items-start gap-4 p-4 rounded-xl ${
                          version.isCurrent ? 'bg-leaf-50 border border-leaf-200' : 'bg-white border border-slate-100 hover:bg-slate-50'
                        } transition-colors duration-150`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.3 }}
                      >
                        {/* Timeline dot */}
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            version.isCurrent ? 'bg-leaf-500' : 'bg-slate-300'
                          }`}
                        >
                          {version.isCurrent ? (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          ) : (
                            <span className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-slate-700">
                              {formatDate(version.date)}
                            </span>
                            {version.isCurrent && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-leaf-100 text-leaf-700">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-slate-400">v{version.version}</span>
                            <span className="text-xs text-slate-300">|</span>
                            <span className="text-xs text-slate-500">{version.author}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-1.5">{version.changeSummary}</p>

                          {!version.isCurrent && onRestore && (
                            <button
                              onClick={() => onRestore(version)}
                              className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-leaf-700 hover:bg-leaf-50 rounded-lg transition-all duration-150"
                            >
                              <RotateCcw className="w-3 h-3" />
                              Restore this version
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
