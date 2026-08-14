import { motion } from 'framer-motion';
import { useWizard } from '@/context/WizardContext';
import type { AuditReadinessScores } from '@/types/wizard';

const categories: {
  key: keyof AuditReadinessScores;
  label: string;
  description: string;
}[] = [
  {
    key: 'rightsAndGovernance',
    label: 'Rights & Governance',
    description: 'Respecting participant rights and organisational governance',
  },
  {
    key: 'participantPartnership',
    label: 'Participant Partnership',
    description: 'Engaging participants in decisions about their supports',
  },
  {
    key: 'supportsDelivery',
    label: 'Supports Delivery',
    description: 'Quality of support delivery and care planning',
  },
  {
    key: 'supportsEnvironment',
    label: 'Supports Environment',
    description: 'Safe, accessible, and well-maintained environments',
  },
  {
    key: 'feedbackComplaints',
    label: 'Feedback & Complaints',
    description: 'Handling complaints and using feedback to improve',
  },
  {
    key: 'workforce',
    label: 'Workforce',
    description: 'Worker screening, training, and qualifications',
  },
  {
    key: 'riskManagement',
    label: 'Risk Management',
    description: 'Identifying and managing organisational risks',
  },
  {
    key: 'restrictivePractices',
    label: 'Restrictive Practices',
    description: 'Authorisation, monitoring, and minimisation',
  },
];

const stepVariants = {
  enter: (dir: string) => ({ x: dir === 'forward' ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: string) => ({ x: dir === 'forward' ? -40 : 40, opacity: 0 }),
};

export default function AuditReadinessStep() {
  const { state, updateAuditReadiness, goNext, goBack } = useWizard();
  const { formData, direction } = state;

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
        Step 6 of 7
      </span>
      <h2 className="text-heading-lg font-heading text-slate-900 mt-2">
        Audit Readiness
      </h2>
      <p className="text-body-md text-slate-500 mt-2">
        Rate your confidence across each NDIS Practice Standard area. This helps us identify gaps
        and prioritise your compliance plan.
      </p>

      <div className="mt-8 space-y-6">
        {categories.map((cat) => {
          const value = formData.auditReadiness[cat.key];
          return (
            <div
              key={cat.key}
              className="bg-white border border-slate-100 rounded-2xl p-5 md:p-6 shadow-card"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-heading font-semibold text-slate-900 text-base">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">{cat.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-leaf-600 font-mono w-8 text-center">
                    {value}
                  </span>
                  <span className="text-sm text-slate-400">/ 5</span>
                </div>
              </div>

              {/* Custom slider */}
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => updateAuditReadiness(cat.key, n)}
                    className={`flex-1 h-3 rounded-full transition-all duration-200 ${
                      n <= value ? 'bg-leaf-500' : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                    aria-label={`Set ${cat.label} to ${n}`}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-[11px] text-slate-400 font-medium">Needs work</span>
                <span className="text-[11px] text-slate-400 font-medium">Excellent</span>
              </div>
            </div>
          );
        })}
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
          onClick={goNext}
          className="px-8 py-3.5 bg-leaf-500 text-white font-semibold rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all duration-200"
        >
          Generate My Compliance Kit →
        </button>
      </div>
    </motion.div>
  );
}
