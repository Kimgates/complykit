import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, FileText, Shield, BookOpen, LayoutDashboard } from 'lucide-react';
import { useWizard, getElicitationProgress } from '@/context/WizardContext';

const steps = [
  { label: 'Analysing your practice profile', icon: FileText },
  { label: 'Generating draft policies', icon: Shield },
  { label: 'Mapping to Practice Standards', icon: BookOpen },
  { label: 'Preparing your documents', icon: FileText },
  { label: 'Setting up your document library', icon: LayoutDashboard },
];

const funFacts = [
  'Did you know? Over 250,000 NDIS providers are preparing for the new registration requirements.',
  'Regularly reviewing your policies helps you stay prepared for changes in requirements.',
  'The NDIS Quality and Safeguards Commission sets the standards all registered providers must meet.',
  'Worker screening checks must be renewed every 5 years in most states.',
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ProcessingStep() {
  const { state, dispatch } = useWizard();
  const [activeStep, setActiveStep] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  const handleComplete = useCallback(() => {
    // Save result
    const progress = getElicitationProgress(state.formData);
    const result = {
      formData: state.formData,
      completedAt: new Date().toISOString(),
      elicitationProgress: progress,
    };
    localStorage.setItem('complykit_wizard_result', JSON.stringify(result));
    dispatch({ type: 'NEXT_STEP' }); // Go to results
  }, [state.formData, dispatch]);

  // Progress through steps
  useEffect(() => {
    if (activeStep < steps.length) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      // All done, pause then go to results
      const timer = setTimeout(() => {
        handleComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeStep, handleComplete]);

  // Rotate fun facts
  useEffect(() => {
    const timer = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[560px] mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center">
      {/* Animated orbiting icon */}
      <div className="relative w-32 h-32 mb-10">
        {/* Central document */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <div className="w-16 h-16 bg-leaf-500 rounded-2xl flex items-center justify-center shadow-button-primary">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Orbiting dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-leaf-300 rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [
                Math.cos((i * Math.PI * 2) / 8) * 56 - 6,
                Math.cos((i * Math.PI * 2) / 8) * 56 - 6,
              ],
              y: [
                Math.sin((i * Math.PI * 2) / 8) * 56 - 6,
                Math.sin((i * Math.PI * 2) / 8) * 56 - 6,
              ],
              opacity: [0.4, 1, 0.4],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.h2
        className="text-display-sm md:text-display-md font-heading font-semibold text-slate-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: easeOutExpo }}
      >
        Building your compliance kit...
      </motion.h2>

      <motion.p
        className="text-body-lg text-slate-500 mt-4 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        This takes about 30 seconds. We&apos;re customising everything to match how you work.
      </motion.p>

      {/* Progress checklist */}
      <div className="mt-10 w-full max-w-sm text-left space-y-3">
        {steps.map((step, idx) => {
          const isComplete = idx < activeStep;
          const isActive = idx === activeStep;

          return (
            <motion.div
              key={step.label}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
                isActive ? 'bg-slate-50' : ''
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1, duration: 0.4 }}
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                {isComplete ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                    }}
                  >
                    <div className="w-6 h-6 bg-leaf-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                ) : isActive ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-leaf-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <div className="w-5 h-5 border-2 border-slate-200 rounded-full" />
                )}
              </div>

              <span
                className={`text-sm transition-colors duration-200 ${
                  isActive ? 'font-semibold text-slate-900' : isComplete ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Fun fact ticker */}
      <div className="mt-12 max-w-sm">
        <AnimatePresence mode="wait">
          <motion.p
            key={factIndex}
            className="text-body-sm text-slate-400 italic text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {funFacts[factIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
