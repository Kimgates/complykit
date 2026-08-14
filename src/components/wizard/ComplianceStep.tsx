import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import { cn } from '@/lib/utils';
import type { AuditHistory, ConfidenceLevel } from '@/types/wizard';

const auditOptions: { value: AuditHistory; label: string }[] = [
  { value: 'passed', label: 'Yes, and I passed' },
  { value: 'findings', label: 'Yes, and I had findings' },
  { value: 'expecting', label: "No, but I'm expecting one" },
  { value: 'not-applicable', label: 'No, not applicable to me yet' },
];

const confidenceLabels: Record<ConfidenceLevel, { label: string; message: string }> = {
  1: { label: 'Very anxious', message: "That's completely understandable — we're here to help." },
  2: { label: 'Not very confident', message: "You're not alone. Let's build your confidence together." },
  3: { label: 'Somewhat confident', message: "A good starting point. We'll help you get to 'very confident'." },
  4: { label: 'Confident', message: "Great! Let's make sure you stay there." },
  5: { label: 'Very confident', message: "Excellent! Let's make compliance even easier for you." },
};

const stepVariants = {
  enter: (dir: string) => ({ x: dir === 'forward' ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: string) => ({ x: dir === 'forward' ? -40 : 40, opacity: 0 }),
};

export default function ComplianceStep() {
  const { state, updateField, goNext, goBack } = useWizard();
  const { formData, direction } = state;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (formData.auditHistory === null) newErrors.audit = 'Please select an option';
    if (formData.confidenceLevel === null) newErrors.confidence = 'Please select a rating';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      goNext();
    }
  };

  const confidence = formData.confidenceLevel;

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
        Step 5 of 7
      </span>
      <h2 className="text-heading-lg font-heading text-slate-900 mt-2">
        Compliance Awareness
      </h2>
      <p className="text-body-md text-slate-500 mt-2">
        Help us understand your compliance journey so far.
      </p>

      <div className="mt-8 space-y-8">
        {/* Audit History */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Have you ever been through an NDIS audit?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="space-y-2">
            {auditOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('auditHistory', option.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                  formData.auditHistory === option.value
                    ? 'bg-leaf-50 border-leaf-500'
                    : 'bg-white border-slate-200 hover:border-leaf-300'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    formData.auditHistory === option.value ? 'border-leaf-500' : 'border-slate-300'
                  )}
                >
                  {formData.auditHistory === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-leaf-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.audit && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.audit}
            </p>
          )}
        </div>

        {/* Confidence Slider */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-4">
            How confident do you feel about NDIS compliance overall?{' '}
            <span className="text-coral-400">*</span>
          </label>

          {/* Custom slider */}
          <div className="px-2">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => updateField('confidenceLevel', level as ConfidenceLevel)}
                  className={cn(
                    'flex-1 h-10 rounded-lg text-sm font-semibold transition-all duration-200',
                    confidence === level
                      ? 'bg-leaf-500 text-white shadow-button-primary scale-105'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  )}
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-xs text-slate-400 font-medium">Very anxious</span>
              <span className="text-xs text-slate-400 font-medium">Very confident</span>
            </div>

            {/* Selected label + message */}
            {confidence !== null && (
              <motion.div
                className="mt-4 p-4 bg-leaf-50 rounded-xl border border-leaf-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-sm font-semibold text-leaf-700">
                  {confidenceLabels[confidence].label}
                </p>
                <p className="text-sm text-leaf-600 mt-1">
                  {confidenceLabels[confidence].message}
                </p>
              </motion.div>
            )}
          </div>
          {errors.confidence && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.confidence}
            </p>
          )}
        </div>

        {/* Biggest Concern */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-2">
            What&apos;s your biggest compliance concern right now?{' '}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={formData.biggestConcern}
            onChange={(e) => updateField('biggestConcern', e.target.value)}
            placeholder="e.g., I'm worried about my upcoming audit, or I'm not sure if my worker screenings are up to date..."
            rows={4}
            className="w-full px-4 py-3.5 bg-white border-[1.5px] border-slate-200 rounded-xl text-body-md placeholder:text-slate-400 transition-all duration-200 outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 resize-y"
          />
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
