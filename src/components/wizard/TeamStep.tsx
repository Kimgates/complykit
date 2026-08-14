import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Check, Info } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import { cn } from '@/lib/utils';
import type { ScreeningStatus, PolicyStatus, TrainingType } from '@/types/wizard';

const screeningOptions: { value: ScreeningStatus; label: string }[] = [
  { value: 'all-current', label: 'Yes, all current' },
  { value: 'some-renewal', label: 'Some need renewal' },
  { value: 'not-sure', label: "I'm not sure" },
  { value: 'none', label: "No, we don't have them yet" },
];

const trainingOptions: { value: TrainingType; label: string }[] = [
  { value: 'ndis-orientation', label: 'NDIS Orientation' },
  { value: 'first-aid', label: 'First Aid / CPR' },
  { value: 'manual-handling', label: 'Manual Handling' },
  { value: 'medication-admin', label: 'Medication Administration' },
  { value: 'mental-health', label: 'Mental Health First Aid' },
  { value: 'safeguarding', label: 'Safeguarding / Child Safety' },
  { value: 'cultural-awareness', label: 'Cultural Awareness' },
  { value: 'behaviour-support-rp', label: 'Behaviour Support (Restrictive Practices)' },
  { value: 'fire-safety', label: 'Fire Safety' },
  { value: 'food-safety', label: 'Food Safety' },
  { value: 'infection-control', label: 'Infection Control' },
  { value: 'none', label: 'None of the above yet' },
];

const policyOptions: { value: PolicyStatus; label: string }[] = [
  { value: 'comprehensive', label: 'Yes, comprehensive' },
  { value: 'basic', label: 'Yes, but basic / informal' },
  { value: 'none', label: 'No, nothing written' },
  { value: 'templates', label: 'I use templates from the internet' },
];

const stepVariants = {
  enter: (dir: string) => ({ x: dir === 'forward' ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: string) => ({ x: dir === 'forward' ? -40 : 40, opacity: 0 }),
};

export default function TeamStep() {
  const { state, updateField, toggleArrayItem, goNext, goBack } = useWizard();
  const { formData, direction } = state;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (formData.screeningStatus === null) newErrors.screening = 'Please select an option';
    if (formData.policyStatus === null) newErrors.policies = 'Please select an option';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      goNext();
    }
  };

  const showScreeningTip =
    formData.screeningStatus === 'some-renewal' || formData.screeningStatus === 'none';
  const showTemplateWarning = formData.policyStatus === 'templates';

  return (
    <motion.div
      className="max-w-content mx-auto px-4 py-8"
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <span className="text-caption text-leaf-600 font-semibold uppercase tracking-wider">
        Step 3 of 7
      </span>
      <h2 className="text-heading-lg font-heading text-slate-900 mt-2">Your Team</h2>
      <p className="text-body-md text-slate-500 mt-2">
        A few questions about your workforce and current setup.
      </p>

      <div className="mt-8 space-y-8">
        {/* Screening Status */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Do all your workers have current NDIS Worker Screening Checks?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="space-y-2">
            {screeningOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('screeningStatus', option.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                  formData.screeningStatus === option.value
                    ? 'bg-leaf-50 border-leaf-500'
                    : 'bg-white border-slate-200 hover:border-leaf-300'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    formData.screeningStatus === option.value
                      ? 'border-leaf-500'
                      : 'border-slate-300'
                  )}
                >
                  {formData.screeningStatus === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-leaf-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.screening && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.screening}
            </p>
          )}

          <AnimatePresence>
            {showScreeningTip && (
              <motion.div
                className="mt-3 flex items-start gap-3 p-4 bg-leaf-50 rounded-xl border border-leaf-100"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Info className="w-5 h-5 text-leaf-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-leaf-700">
                  Don&apos;t worry — we&apos;ll set up tracking for you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Training */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            What training do your workers currently have?
          </label>
          <div className="flex flex-wrap gap-2">
            {trainingOptions.map((option) => {
              const isChecked = formData.training.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => toggleArrayItem('training', option.value)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium border-2 transition-all duration-200 cursor-pointer',
                    isChecked
                      ? 'bg-leaf-50 border-leaf-500 text-leaf-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-leaf-300'
                  )}
                >
                  {isChecked && <Check className="w-3 h-3 inline mr-1 -mt-0.5" />}
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Policy Status */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Do you have written policies and procedures currently?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="space-y-2">
            {policyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('policyStatus', option.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                  formData.policyStatus === option.value
                    ? 'bg-leaf-50 border-leaf-500'
                    : 'bg-white border-slate-200 hover:border-leaf-300'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    formData.policyStatus === option.value ? 'border-leaf-500' : 'border-slate-300'
                  )}
                >
                  {formData.policyStatus === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-leaf-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.policies && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.policies}
            </p>
          )}

          <AnimatePresence>
            {showTemplateWarning && (
              <motion.div
                className="mt-3 flex items-start gap-3 p-4 bg-coral-50 rounded-xl border border-coral-100"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="w-5 h-5 text-coral-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-coral-700">
                  Generic templates are the #1 cause of audit failures. We&apos;ll fix that.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100">
        <button
          onClick={goBack}
          className="px-5 py-3 text-slate-600 font-medium text-sm rounded-[10px] hover:bg-slate-100 transition-all duration-200"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="px-8 py-3.5 bg-leaf-500 text-white font-semibold rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all duration-200"
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
}
