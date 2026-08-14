import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type {
  WizardState,
  WizardAction,
  WizardFormData,
  AuditReadinessScores,
  WizardStep,
} from '@/types/wizard';
import { STEP_ORDER } from '@/types/wizard';

// ───────────────────────────────────────────
// Initial State
// ───────────────────────────────────────────

const defaultAuditReadiness: AuditReadinessScores = {
  rightsAndGovernance: 3,
  participantPartnership: 3,
  supportsDelivery: 3,
  supportsEnvironment: 3,
  feedbackComplaints: 3,
  workforce: 3,
  riskManagement: 3,
  restrictivePractices: 3,
};

const initialFormData: WizardFormData = {
  providerType: null,
  firstName: '',
  email: '',
  ndisRegistered: null,
  registrationGroup: null,
  services: [],
  participantCount: null,
  workerCount: null,
  screeningStatus: null,
  training: [],
  policyStatus: null,
  recordSystem: null,
  incidentSystem: null,
  complaintProcess: null,
  invoiceMethod: null,
  auditHistory: null,
  confidenceLevel: null,
  biggestConcern: '',
  auditReadiness: { ...defaultAuditReadiness },
};

const initialState: WizardState = {
  currentStep: 'welcome',
  formData: { ...initialFormData },
  direction: 'forward',
  isSubmitting: false,
  completedSteps: [],
};

// ───────────────────────────────────────────
// Conditional Logic Helpers
// ───────────────────────────────────────────

function getNextStep(current: WizardStep, data: WizardFormData): WizardStep {
  const idx = STEP_ORDER.indexOf(current);
  if (idx === -1 || idx >= STEP_ORDER.length - 1) return current;

  const next = STEP_ORDER[idx + 1];

  // Skip team step if working alone
  if (next === 'team' && data.workerCount === 'alone') {
    return 'operations';
  }

  return next;
}

function getPrevStep(current: WizardStep, data: WizardFormData): WizardStep {
  const idx = STEP_ORDER.indexOf(current);
  if (idx <= 0) return current;

  const prev = STEP_ORDER[idx - 1];

  // Skip back over team step if working alone
  if (prev === 'team' && data.workerCount === 'alone') {
    return 'services';
  }

  return prev;
}

// ───────────────────────────────────────────
// Reducer
// ───────────────────────────────────────────

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'NEXT_STEP': {
      const next = getNextStep(state.currentStep, state.formData);
      if (next === state.currentStep) return state;
      return {
        ...state,
        currentStep: next,
        direction: 'forward',
        completedSteps: [...state.completedSteps, state.currentStep],
      };
    }

    case 'PREV_STEP': {
      const prev = getPrevStep(state.currentStep, state.formData);
      if (prev === state.currentStep) return state;
      return {
        ...state,
        currentStep: prev,
        direction: 'backward',
        completedSteps: state.completedSteps.filter((s) => s !== state.currentStep),
      };
    }

    case 'GO_TO_STEP': {
      const currentIdx = STEP_ORDER.indexOf(state.currentStep);
      const targetIdx = STEP_ORDER.indexOf(action.step);
      return {
        ...state,
        currentStep: action.step,
        direction: targetIdx > currentIdx ? 'forward' : 'backward',
      };
    }

    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };

    case 'UPDATE_AUDIT_READINESS':
      return {
        ...state,
        formData: {
          ...state.formData,
          auditReadiness: {
            ...state.formData.auditReadiness,
            [action.key]: action.value,
          },
        },
      };

    case 'TOGGLE_ARRAY_ITEM': {
      const current = (state.formData[action.field as keyof WizardFormData] as string[]) || [];
      const exists = current.includes(action.value);
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: exists
            ? current.filter((item) => item !== action.value)
            : [...current, action.value],
        },
      };
    }

    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.value };

    case 'LOAD_STATE':
      return {
        ...state,
        ...action.state,
        formData: { ...initialFormData, ...action.state.formData },
      };

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

// ───────────────────────────────────────────
// Context
// ───────────────────────────────────────────

interface WizardContextValue {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  goNext: () => void;
  goBack: () => void;
  updateField: <K extends keyof WizardFormData>(field: K, value: WizardFormData[K]) => void;
  updateAuditReadiness: (key: keyof AuditReadinessScores, value: number) => void;
  toggleArrayItem: (field: string, value: string) => void;
  canProceed: () => boolean;
  getStepIndex: () => number;
}

const WizardContext = createContext<WizardContextValue | null>(null);

const STORAGE_KEY = 'complykit_wizard_state';

// ───────────────────────────────────────────
// Provider
// ───────────────────────────────────────────

export function WizardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<WizardState>;
        dispatch({ type: 'LOAD_STATE', state: parsed });
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Save to localStorage on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [state]);

  const goNext = useCallback(() => dispatch({ type: 'NEXT_STEP' }), []);
  const goBack = useCallback(() => dispatch({ type: 'PREV_STEP' }), []);

  const updateField = useCallback(
    <K extends keyof WizardFormData>(field: K, value: WizardFormData[K]) => {
      dispatch({ type: 'UPDATE_FIELD', field, value });
    },
    []
  );

  const updateAuditReadiness = useCallback(
    (key: keyof AuditReadinessScores, value: number) => {
      dispatch({ type: 'UPDATE_AUDIT_READINESS', key, value });
    },
    []
  );

  const toggleArrayItem = useCallback((field: string, value: string) => {
    dispatch({ type: 'TOGGLE_ARRAY_ITEM', field, value });
  }, []);

  const canProceed = useCallback(() => {
    const { currentStep, formData } = state;
    switch (currentStep) {
      case 'welcome':
        return formData.providerType !== null;
      case 'about':
        return (
          formData.firstName.trim().length > 0 &&
          formData.email.trim().length > 0 &&
          formData.ndisRegistered !== null
        );
      case 'services':
        return (
          formData.services.length > 0 &&
          formData.participantCount !== null &&
          formData.workerCount !== null
        );
      case 'team':
        return formData.screeningStatus !== null && formData.policyStatus !== null;
      case 'operations':
        return (
          formData.recordSystem !== null &&
          formData.incidentSystem !== null &&
          formData.complaintProcess !== null &&
          formData.invoiceMethod !== null
        );
      case 'compliance':
        return formData.auditHistory !== null && formData.confidenceLevel !== null;
      case 'audit-readiness':
        return true;
      default:
        return true;
    }
  }, [state]);

  const getStepIndex = useCallback(() => {
    return STEP_ORDER.indexOf(state.currentStep);
  }, [state.currentStep]);

  // Export context value
  const contextValue: WizardContextValue = {
    state,
    dispatch,
    goNext,
    goBack,
    updateField,
    updateAuditReadiness,
    toggleArrayItem,
    canProceed,
    getStepIndex,
  };

  return (
    <WizardContext.Provider value={contextValue}>
      {children}
    </WizardContext.Provider>
  );
}

// ───────────────────────────────────────────
// Hook
// ───────────────────────────────────────────

export function useWizard(): WizardContextValue {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used within WizardProvider');
  return ctx;
}

// ───────────────────────────────────────────
// Elicitation Progress Tracker
// ───────────────────────────────────────────
// This product tracks elicitation completion only.
// It tracks elicitation completion only.

export function getElicitationProgress(data: WizardFormData): number {
  const totalSections = 7;
  let completedSections = 0;

  // Welcome (always complete by the time this runs)
  completedSections += 1;

  // About You
  if (data.services && data.services.length > 0) completedSections += 1;

  // Services
  if (data.services && data.services.length > 0) completedSections += 1;

  // Team
  if (data.workerCount !== null) completedSections += 1;

  // Operations
  if (data.recordSystem) completedSections += 1;

  // Risk
  if (data.policyStatus) completedSections += 1;

  // Audit Readiness
  const readinessValues = Object.values(data.auditReadiness);
  if (readinessValues.length > 0 && readinessValues.every((v) => v > 0)) completedSections += 1;

  return Math.round((completedSections / totalSections) * 100);
}

// ───────────────────────────────────────────
// Step Labels
// ───────────────────────────────────────────

export const STEP_LABELS: Record<WizardStep, string> = {
  welcome: 'Welcome',
  about: 'About You',
  services: 'Services',
  team: 'Your Team',
  operations: 'Operations',
  compliance: 'Compliance',
  'audit-readiness': 'Audit Readiness',
  processing: 'Processing',
  results: 'Results',
};
