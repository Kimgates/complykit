import { motion } from 'framer-motion';
import { User, Briefcase, Users, Building, ArrowRight } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import type { ProviderType } from '@/types/wizard';

const providerTypes: {
  id: ProviderType;
  label: string;
  description: string;
  icon: typeof User;
}[] = [
  {
    id: 'independent-worker',
    label: 'Independent Support Worker',
    description: 'I work alone providing direct support',
    icon: User,
  },
  {
    id: 'sole-trader',
    label: 'Sole Trader',
    description: 'I run my own small practice',
    icon: Briefcase,
  },
  {
    id: 'small-provider',
    label: 'Small Provider',
    description: '2-20 workers in my organisation',
    icon: Users,
  },
  {
    id: 'medium-provider',
    label: 'Medium Provider',
    description: '21-100 workers, multiple services',
    icon: Building,
  },
  {
    id: 'new-to-ndis',
    label: 'New to NDIS',
    description: "I'm just getting started",
    icon: ArrowRight,
  },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function WelcomeStep() {
  const { state, updateField, goNext, canProceed } = useWizard();
  const selected = state.formData.providerType;

  return (
    <div className="max-w-[560px] mx-auto pt-12 md:pt-[10vh] pb-16 px-4">
      {/* Illustration placeholder */}
      <motion.div
        className="w-60 h-40 mx-auto mb-8 bg-leaf-50 rounded-2xl flex items-center justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOutExpo }}
      >
        <span className="text-6xl" role="img" aria-label="welcome">👋</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-display-sm md:text-display-md font-heading font-semibold text-slate-900 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
      >
        Let&apos;s prepare your draft documents
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-body-lg text-slate-500 text-center mt-4 max-w-[480px] mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        A few friendly questions about your practice, and we&apos;ll build your
        personalised compliance kit. Takes about 5-10 minutes.
      </motion.p>

      {/* Provider Type Cards */}
      <motion.div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {providerTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;

          return (
            <motion.button
              key={type.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
              }}
              onClick={() => updateField('providerType', type.id)}
              className={`relative flex flex-col items-start p-6 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'border-leaf-500 bg-leaf-50'
                  : 'border-slate-200 bg-white hover:border-leaf-300 hover:bg-leaf-50/50'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <motion.div
                  className="absolute top-3 right-3 w-6 h-6 bg-leaf-500 rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.15,
                    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                  }}
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-leaf-500' : 'bg-leaf-50'
                }`}
              >
                <Icon
                  className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-leaf-600'}`}
                />
              </div>

              <span className="font-heading font-semibold text-slate-900 text-base">
                {type.label}
              </span>
              <span className="text-sm text-slate-500 mt-1">{type.description}</span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Get Started Button */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <button
          onClick={goNext}
          disabled={!canProceed()}
          className={`w-full py-4 px-8 rounded-xl font-semibold text-body-md transition-all duration-200 flex items-center justify-center gap-2 ${
            canProceed()
              ? 'bg-leaf-500 text-white hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 cursor-pointer'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-center text-sm text-slate-500 mt-4">
          Already know what you need?{' '}
          <a href="#/dashboard" className="text-leaf-600 font-medium hover:underline">
            Skip to dashboard →
          </a>
        </p>
      </motion.div>
    </div>
  );
}
