import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Info } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import { cn } from '@/lib/utils';
import type { RegistrationGroup } from '@/types/wizard';

const registrationGroups: { value: RegistrationGroup; label: string }[] = [
  { value: 'assistance-daily-life', label: 'Assistance with Daily Life' },
  { value: 'social-community', label: 'Assistance with Social & Community Participation' },
  { value: 'daily-tasks', label: 'Assistance with Daily Tasks' },
  { value: 'finding-keeping-job', label: 'Finding & Keeping a Job' },
  { value: 'improved-living', label: 'Improved Living Arrangements' },
  { value: 'support-coordination', label: 'Support Coordination' },
  { value: 'specialist-accommodation', label: 'Specialist Disability Accommodation' },
  { value: 'sil', label: 'Supported Independent Living (SIL)' },
  { value: 'plan-management', label: 'Plan Management' },
  { value: 'therapeutic', label: 'Therapeutic Supports' },
  { value: 'early-childhood', label: 'Early Childhood Supports' },
  { value: 'behaviour-support', label: 'Behaviour Support' },
  { value: 'home-modifications', label: 'Home Modifications' },
  { value: 'assistive-tech', label: 'Assistive Technology' },
  { value: 'custom', label: 'Custom (type your own)' },
];

const stepVariants = {
  enter: (dir: string) => ({
    x: dir === 'forward' ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: string) => ({
    x: dir === 'forward' ? -40 : 40,
    opacity: 0,
  }),
};

export default function AboutStep() {
  const { state, updateField, goNext, goBack } = useWizard();
  const { formData, direction } = state;
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.ndisRegistered === null) {
      newErrors.ndisRegistered = 'Please select an option';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    setTouched({ firstName: true, email: true, ndisRegistered: true });
    if (validate()) {
      goNext();
    }
  };

  const showSilWarning = formData.registrationGroup === 'sil';

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
        Step 1 of 7
      </span>
      <h2 className="text-heading-lg font-heading text-slate-900 mt-2">
        About You
      </h2>
      <p className="text-body-md text-slate-500 mt-2">
        We&apos;ll personalise your compliance kit based on your answers.
      </p>

      <div className="mt-8 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-2">
            What should we call you? <span className="text-coral-400">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, firstName: true }))}
            placeholder="Your first name"
            className={cn(
              'w-full px-4 py-3.5 bg-white border-[1.5px] rounded-xl text-body-md placeholder:text-slate-400 transition-all duration-200 outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15',
              touched.firstName && errors.firstName ? 'border-status-red' : 'border-slate-200'
            )}
          />
          {touched.firstName && errors.firstName && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.firstName}
            </p>
          )}
          <p className="mt-2 text-body-sm text-slate-400">
            We&apos;ll personalise your experience
          </p>
        </div>

        {/* Email */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-2">
            What&apos;s your email address? <span className="text-coral-400">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
            placeholder="you@example.com"
            className={cn(
              'w-full px-4 py-3.5 bg-white border-[1.5px] rounded-xl text-body-md placeholder:text-slate-400 transition-all duration-200 outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15',
              touched.email && errors.email ? 'border-status-red' : 'border-slate-200'
            )}
          />
          {touched.email && errors.email && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.email}
            </p>
          )}
          <p className="mt-2 text-body-sm text-slate-400">
            We&apos;ll send your compliance kit here
          </p>
        </div>

        {/* NDIS Registered */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Are you currently registered with the NDIS?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="flex gap-3">
            {[
              { label: "Yes, I'm registered", value: true },
              { label: "No, I'm unregistered", value: false },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => updateField('ndisRegistered', option.value)}
                className={cn(
                  'flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border-2 cursor-pointer',
                  formData.ndisRegistered === option.value
                    ? 'bg-leaf-500 border-leaf-500 text-white'
                    : 'bg-slate-100 border-transparent text-slate-600 hover:bg-slate-200'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {touched.ndisRegistered && errors.ndisRegistered && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.ndisRegistered}
            </p>
          )}
        </div>

        {/* Registration Group */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-2">
            What NDIS registration group best describes your services?
          </label>
          <select
            value={formData.registrationGroup || ''}
            onChange={(e) =>
              updateField('registrationGroup', (e.target.value as RegistrationGroup) || null)
            }
            className="w-full px-4 py-3.5 bg-white border-[1.5px] border-slate-200 rounded-xl text-body-md transition-all duration-200 outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 appearance-none cursor-pointer"
          >
            <option value="">Select a registration group</option>
            {registrationGroups.map((group) => (
              <option key={group.value} value={group.value}>
                {group.label}
              </option>
            ))}
          </select>

          {/* SIL Warning */}
          <AnimatePresence>
            {showSilWarning && (
              <motion.div
                className="mt-3 flex items-start gap-3 p-4 bg-coral-50 rounded-xl border border-coral-100"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Info className="w-5 h-5 text-coral-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-coral-700">
                  SIL registration will be mandatory from 1 July 2026. We can help you prepare.
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
