import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useWizard, STEP_LABELS } from '@/context/WizardContext';
import type { WizardStep } from '@/types/wizard';

const DISPLAY_STEPS: WizardStep[] = [
  'welcome',
  'about',
  'services',
  'operations',
  'compliance',
  'audit-readiness',
  'results',
];

export default function StepIndicator() {
  const { state } = useWizard();
  // Map internal step to display step index
  const getDisplayIndex = (step: WizardStep): number => {
    // team maps to same as services visually
    if (step === 'team') return 2; // Services/Team merged
    return DISPLAY_STEPS.indexOf(step);
  };

  const activeDisplayIdx = getDisplayIndex(state.currentStep);

  return (
    <div className="w-full py-4 px-4 md:px-8">
      {/* Progress bar */}
      <div className="max-w-[200px] mx-auto mb-4">
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-leaf-500 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((activeDisplayIdx) / (DISPLAY_STEPS.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
          />
        </div>
        <p className="text-center text-xs text-slate-400 mt-2 font-medium">
          Step {Math.min(activeDisplayIdx + 1, DISPLAY_STEPS.length)} of {DISPLAY_STEPS.length}
        </p>
      </div>

      {/* Step circles - desktop only */}
      <div className="hidden md:flex items-center justify-center gap-2 max-w-3xl mx-auto">
        {DISPLAY_STEPS.map((stepKey, idx) => {
          const isCompleted = activeDisplayIdx > idx;
          const isActive = activeDisplayIdx === idx;

          return (
            <div key={stepKey} className="flex items-center">
              {/* Connector */}
              {idx > 0 && (
                <div
                  className={`w-8 lg:w-12 h-0.5 mx-1 transition-colors duration-300 ${
                    isCompleted ? 'bg-leaf-500' : 'bg-slate-200'
                  }`}
                />
              )}

              {/* Step circle */}
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-200 ${
                    isCompleted
                      ? 'bg-leaf-500 border-leaf-500'
                      : isActive
                      ? 'bg-leaf-50 border-leaf-500'
                      : 'bg-white border-slate-200'
                  }`}
                  animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <span
                      className={`text-xs font-semibold ${
                        isActive ? 'text-leaf-700' : 'text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  )}
                </motion.div>
                <span
                  className={`text-[10px] font-medium whitespace-nowrap ${
                    isActive ? 'text-leaf-700' : isCompleted ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {STEP_LABELS[stepKey]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
