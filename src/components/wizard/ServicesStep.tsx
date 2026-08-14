import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Check } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import { cn } from '@/lib/utils';
import type { ServiceType, ParticipantCount, WorkerCount } from '@/types/wizard';

const services: {
  id: ServiceType;
  label: string;
  description: string;
}[] = [
  { id: 'personal-care', label: 'Personal care', description: 'Bathing, dressing, grooming' },
  { id: 'community-access', label: 'Community access', description: 'Social and recreational activities' },
  { id: 'domestic-assistance', label: 'Domestic assistance', description: 'Cleaning, laundry, home help' },
  { id: 'transport', label: 'Transport', description: 'Driving participants to appointments' },
  { id: 'meal-preparation', label: 'Meal preparation', description: 'Cooking and meal planning' },
  { id: 'medication-assistance', label: 'Medication assistance', description: 'Prompting or administering meds' },
  { id: 'social-support', label: 'Social support', description: 'Companionship and social skills' },
  { id: 'respite-care', label: 'Respite care', description: 'Short-term relief for carers' },
  { id: 'behaviour-support', label: 'Behaviour support', description: 'Positive behaviour strategies' },
  { id: 'plan-management', label: 'Plan management', description: 'Managing NDIS participant funds' },
  { id: 'support-coordination', label: 'Support coordination', description: 'Connecting participants to services' },
  { id: 'sil-sda', label: 'SIL / SDA support', description: 'Supported independent living' },
  { id: 'nursing-care', label: 'Nursing care', description: 'Clinical and health care' },
  { id: 'allied-health', label: 'Allied health', description: 'Therapy and rehabilitation' },
];

const participantCounts: { value: ParticipantCount; label: string }[] = [
  { value: '1-5', label: '1-5' },
  { value: '6-15', label: '6-15' },
  { value: '16-30', label: '16-30' },
  { value: '31-50', label: '31-50' },
  { value: '50+', label: '50+' },
];

const workerCounts: { value: WorkerCount; label: string }[] = [
  { value: 'alone', label: 'I work alone' },
  { value: '1-5', label: '1-5 workers' },
  { value: '6-20', label: '6-20 workers' },
  { value: '20+', label: '20+ workers' },
];

const stepVariants = {
  enter: (dir: string) => ({ x: dir === 'forward' ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: string) => ({ x: dir === 'forward' ? -40 : 40, opacity: 0 }),
};

export default function ServicesStep() {
  const { state, updateField, toggleArrayItem, goNext, goBack } = useWizard();
  const { formData, direction } = state;
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (formData.services.length === 0) newErrors.services = 'Please select at least one service';
    if (formData.participantCount === null) newErrors.participants = 'Please select a range';
    if (formData.workerCount === null) newErrors.workers = 'Please select an option';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      goNext();
    }
  };

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
        Step 2 of 7
      </span>
      <h2 className="text-heading-lg font-heading text-slate-900 mt-2">
        Your Services &amp; Participants
      </h2>
      <p className="text-body-md text-slate-500 mt-2">
        Tell us about the services you provide and your practice size.
      </p>

      <div className="mt-8 space-y-8">
        {/* Services Multi-select */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Which services do you provide? <span className="text-coral-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((service) => {
              const isChecked = formData.services.includes(service.id);
              return (
                <motion.button
                  key={service.id}
                  onClick={() => toggleArrayItem('services', service.id)}
                  className={cn(
                    'relative flex flex-col items-start p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer',
                    isChecked
                      ? 'bg-leaf-50 border-leaf-500'
                      : 'bg-white border-slate-200 hover:border-leaf-300'
                  )}
                  whileTap={{ scale: 0.98 }}
                >
                  {isChecked && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-leaf-500 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <span className="font-medium text-slate-900 text-sm">{service.label}</span>
                  <span className="text-xs text-slate-500 mt-0.5">{service.description}</span>
                </motion.button>
              );
            })}
          </div>
          {errors.services && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.services}
            </p>
          )}
        </div>

        {/* Participant Count */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            How many participants do you currently support?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {participantCounts.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('participantCount', option.value)}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-2',
                  formData.participantCount === option.value
                    ? 'bg-leaf-500 border-leaf-500 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-leaf-300'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.participants && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.participants}
            </p>
          )}
        </div>

        {/* Worker Count */}
        <div>
          <label className="block text-heading-sm font-heading text-slate-900 mb-3">
            Do you work alone or do you have workers/staff?{' '}
            <span className="text-coral-400">*</span>
          </label>
          <div className="flex flex-wrap gap-3">
            {workerCounts.map((option) => (
              <button
                key={option.value}
                onClick={() => updateField('workerCount', option.value)}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border-2',
                  formData.workerCount === option.value
                    ? 'bg-leaf-500 border-leaf-500 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-leaf-300'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {errors.workers && (
            <p className="mt-2 text-sm text-status-red flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {errors.workers}
            </p>
          )}
          {formData.workerCount === 'alone' && (
            <p className="mt-3 text-sm text-leaf-600 bg-leaf-50 p-3 rounded-xl">
              We&apos;ll skip the workforce questions since you work alone.
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
