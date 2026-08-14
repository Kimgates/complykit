import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Info } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import { cn } from '@/lib/utils';
import type { RecordSystem, IncidentSystem, ComplaintProcess, InvoiceMethod } from '@/types/wizard';

const recordSystems: { value: RecordSystem; label: string }[] = [
  { value: 'paper', label: 'Paper files' },
  { value: 'computer', label: 'Computer documents (Word/Excel)' },
  { value: 'practice-software', label: 'Practice management software' },
  { value: 'cloud', label: 'Cloud storage (Google Drive/Dropbox)' },
  { value: 'no-system', label: "I don't have a system yet" },
];

const incidentSystems: { value: IncidentSystem; label: string }[] = [
  { value: 'formal', label: 'Yes, formal system' },
  { value: 'informal', label: 'Yes, informal (ad-hoc)' },
  { value: 'no', label: 'No' },
];

const complaintOptions: { value: ComplaintProcess; label: string }[] = [
  { value: 'formal', label: 'Formal complaints process' },
  { value: 'informal', label: 'Informal (deal with as they come)' },
  { value: 'none', label: 'No process yet' },
];

const invoiceOptions: { value: InvoiceMethod; label: string }[] = [
  { value: 'ndis-portal', label: 'NDIS Portal (myPlace)' },
  { value: 'plan-managers', label: 'Plan managers' },
  { value: 'participants', label: 'Participants directly' },
  { value: 'dont-invoice', label: "I don't invoice yet" },
];

const stepVariants = {
  enter: (dir: string) => ({ x: dir === 'forward' ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: string) => ({ x: dir === 'forward' ? -40 : 40, opacity: 0 }),
};

export default function OperationsStep() {
  const { state, updateField, goNext, goBack } = useWizard();
  const { formData, direction } = state;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (formData.recordSystem === null) newErrors.records = 'Please select an option';
    if (formData.incidentSystem === null) newErrors.incidents = 'Please select an option';
    if (formData.complaintProcess === null) newErrors.complaints = 'Please select an option';
    if (formData.invoiceMethod === null) newErrors.invoicing = 'Please select an option';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      goNext();
    }
  };

  const showIncidentTip = formData.incidentSystem === 'no' || formData.incidentSystem === 'informal';

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
        Step 4 of 7
      </span>
      <h2 className="text-heading-lg font-heading text-slate-900 mt-2">
        How You Work
      </h2>
      <p className="text-body-md text-slate-500 mt-2">
        Tell us about your daily operations and systems.
      </p>

      <div className="mt-8 space-y-8">
        {/* Record System */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            How do you currently manage participant records?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="space-y-2">
            {recordSystems.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('recordSystem', option.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                  formData.recordSystem === option.value
                    ? 'bg-leaf-50 border-leaf-500'
                    : 'bg-white border-slate-200 hover:border-leaf-300'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    formData.recordSystem === option.value ? 'border-leaf-500' : 'border-slate-300'
                  )}
                >
                  {formData.recordSystem === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-leaf-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.records && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.records}
            </p>
          )}
        </div>

        {/* Incident System */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Do you have a system for managing incident reports?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="space-y-2">
            {incidentSystems.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('incidentSystem', option.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                  formData.incidentSystem === option.value
                    ? 'bg-leaf-50 border-leaf-500'
                    : 'bg-white border-slate-200 hover:border-leaf-300'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    formData.incidentSystem === option.value
                      ? 'border-leaf-500'
                      : 'border-slate-300'
                  )}
                >
                  {formData.incidentSystem === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-leaf-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.incidents && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.incidents}
            </p>
          )}

          <AnimatePresence>
            {showIncidentTip && (
              <motion.div
                className="mt-3 flex items-start gap-3 p-4 bg-leaf-50 rounded-xl border border-leaf-100"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Info className="w-5 h-5 text-leaf-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-leaf-700">
                  Incident reporting is mandatory for all NDIS providers. We&apos;ll help you set
                  this up.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Complaints */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            How do you currently handle complaints from participants?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="space-y-2">
            {complaintOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('complaintProcess', option.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                  formData.complaintProcess === option.value
                    ? 'bg-leaf-50 border-leaf-500'
                    : 'bg-white border-slate-200 hover:border-leaf-300'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    formData.complaintProcess === option.value
                      ? 'border-leaf-500'
                      : 'border-slate-300'
                  )}
                >
                  {formData.complaintProcess === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-leaf-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.complaints && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.complaints}
            </p>
          )}
        </div>

        {/* Invoicing */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Do you invoice participants or plan managers directly?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="space-y-2">
            {invoiceOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('invoiceMethod', option.value)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                  formData.invoiceMethod === option.value
                    ? 'bg-leaf-50 border-leaf-500'
                    : 'bg-white border-slate-200 hover:border-leaf-300'
                )}
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    formData.invoiceMethod === option.value ? 'border-leaf-500' : 'border-slate-300'
                  )}
                >
                  {formData.invoiceMethod === option.value && (
                    <div className="w-2.5 h-2.5 rounded-full bg-leaf-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700">{option.label}</span>
              </button>
            ))}
          </div>
          {errors.invoicing && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.invoicing}
            </p>
          )}
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
