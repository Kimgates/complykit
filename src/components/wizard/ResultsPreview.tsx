import { motion } from 'framer-motion';
import { ArrowRight, FileText, Shield, BookOpen } from 'lucide-react';
import { useWizard } from '@/context/WizardContext';
import DraftBanner from '@/components/DraftBanner';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ResultsPreview() {
  const { state } = useWizard();
  const completedSections = state.currentStep === 'results' ? 7 : 6;
  const totalSections = 7;
  const completionPercent = Math.round((completedSections / totalSections) * 100);

  // Summary of what was captured
  const summaryItems = [
    { label: 'Your operating profile', desc: 'How you work day-to-day', icon: FileText },
    { label: 'Services provided', desc: state.formData.services?.join(', ') || 'Not specified', icon: Shield },
    { label: 'Draft documents ready', desc: '8 policy templates customised', icon: BookOpen },
  ];

  const handleGoToDocuments = () => {
    window.location.hash = '#/documents';
  };

  return (
    <div className="max-w-[640px] mx-auto px-4 py-8 md:py-12">
      <DraftBanner />

      {/* Header */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo }}
      >
        <div className="w-16 h-16 bg-leaf-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-button-primary">
          <span className="text-3xl" role="img" aria-label="completed">&#9989;</span>
        </div>
        <h1 className="text-display-sm md:text-display-md font-heading font-semibold text-slate-900">
          Your draft documents are ready
        </h1>
        <p className="text-body-lg text-slate-500 mt-3 max-w-md mx-auto">
          We&apos;ve prepared draft policies and procedures based on your responses. Review and edit them before use.
        </p>
      </motion.div>

      {/* Elicitation Progress */}
      <motion.div
        className="mt-10 bg-white rounded-2xl border border-slate-100 shadow-card p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: easeOutExpo }}
      >
        <h2 className="text-heading-md font-heading text-slate-700 mb-2 text-center">
          Elicitation Complete
        </h2>
        <p className="text-sm text-slate-500 text-center mb-6">
          You&apos;ve completed {completedSections} of {totalSections} sections
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
          <motion.div
            className="bg-leaf-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 1.5, ease: easeOutExpo, delay: 0.3 }}
          />
        </div>
        <p className="text-center text-sm text-slate-500">{completionPercent}% complete</p>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="mt-6 bg-white rounded-2xl border border-slate-100 shadow-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: easeOutExpo }}
      >
        <h3 className="font-heading font-semibold text-slate-900 mb-4">What we&apos;ve prepared</h3>
        <div className="space-y-3">
          {summaryItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
              >
                <div className="w-9 h-9 bg-leaf-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-leaf-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, ease: easeOutExpo }}
      >
        <button
          onClick={handleGoToDocuments}
          className="inline-flex items-center gap-2 px-8 py-4 bg-leaf-500 text-white font-semibold rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all duration-200"
        >
          View Your Documents
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-sm text-slate-400 mt-3">
          Your responses have been saved. You can return anytime to edit.
        </p>
      </motion.div>
    </div>
  );
}
