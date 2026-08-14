import { AnimatePresence, motion } from 'framer-motion';
import { WizardProvider, useWizard } from '@/context/WizardContext';
import StepIndicator from '@/components/wizard/StepIndicator';
import WelcomeStep from '@/components/wizard/WelcomeStep';
import AboutStep from '@/components/wizard/AboutStep';
import ServicesStep from '@/components/wizard/ServicesStep';
import TeamStep from '@/components/wizard/TeamStep';
import OperationsStep from '@/components/wizard/OperationsStep';
import ComplianceStep from '@/components/wizard/ComplianceStep';
import AuditReadinessStep from '@/components/wizard/AuditReadinessStep';
import ProcessingStep from '@/components/wizard/ProcessingStep';
import ResultsPreview from '@/components/wizard/ResultsPreview';

// ───────────────────────────────────────────
// Step Router
// ───────────────────────────────────────────

function WizardContent() {
  const { state } = useWizard();
  const { currentStep, direction } = state;

  const slideVariants = {
    enter: (dir: string) => ({
      x: dir === 'forward' ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: string) => ({
      x: dir === 'forward' ? -60 : 60,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeStep />;
      case 'about':
        return <AboutStep />;
      case 'services':
        return <ServicesStep />;
      case 'team':
        return <TeamStep />;
      case 'operations':
        return <OperationsStep />;
      case 'compliance':
        return <ComplianceStep />;
      case 'audit-readiness':
        return <AuditReadinessStep />;
      case 'processing':
        return <ProcessingStep />;
      case 'results':
        return <ResultsPreview />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50">
      {/* Top bar - only show after welcome step */}
      {currentStep !== 'welcome' && currentStep !== 'processing' && currentStep !== 'results' && (
        <div className="bg-white border-b border-slate-100 sticky top-0 z-30">
          <StepIndicator />
        </div>
      )}

      {/* Wizard content with animated transitions */}
      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────
// Page Export
// ───────────────────────────────────────────

export default function Wizard() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
