// ───────────────────────────────────────────
// Wizard State Types
// ───────────────────────────────────────────

export type ProviderType =
  | 'independent-worker'
  | 'sole-trader'
  | 'small-provider'
  | 'medium-provider'
  | 'new-to-ndis';

export type RegistrationGroup =
  | 'assistance-daily-life'
  | 'social-community'
  | 'daily-tasks'
  | 'finding-keeping-job'
  | 'improved-living'
  | 'support-coordination'
  | 'specialist-accommodation'
  | 'sil'
  | 'plan-management'
  | 'therapeutic'
  | 'early-childhood'
  | 'behaviour-support'
  | 'home-modifications'
  | 'assistive-tech'
  | 'custom';

export type ServiceType =
  | 'personal-care'
  | 'community-access'
  | 'domestic-assistance'
  | 'transport'
  | 'meal-preparation'
  | 'medication-assistance'
  | 'social-support'
  | 'respite-care'
  | 'behaviour-support'
  | 'plan-management'
  | 'support-coordination'
  | 'sil-sda'
  | 'nursing-care'
  | 'allied-health';

export type ParticipantCount =
  | '1-5'
  | '6-15'
  | '16-30'
  | '31-50'
  | '50+';

export type WorkerCount =
  | 'alone'
  | '1-5'
  | '6-20'
  | '20+';

export type ScreeningStatus =
  | 'all-current'
  | 'some-renewal'
  | 'not-sure'
  | 'none';

export type PolicyStatus =
  | 'comprehensive'
  | 'basic'
  | 'none'
  | 'templates';

export type RecordSystem =
  | 'paper'
  | 'computer'
  | 'practice-software'
  | 'cloud'
  | 'no-system';

export type IncidentSystem =
  | 'formal'
  | 'informal'
  | 'no';

export type ComplaintProcess =
  | 'formal'
  | 'informal'
  | 'none';

export type InvoiceMethod =
  | 'ndis-portal'
  | 'plan-managers'
  | 'participants'
  | 'dont-invoice';

export type AuditHistory =
  | 'passed'
  | 'findings'
  | 'expecting'
  | 'not-applicable';

export type ConfidenceLevel = 1 | 2 | 3 | 4 | 5;

export type TrainingType =
  | 'ndis-orientation'
  | 'first-aid'
  | 'manual-handling'
  | 'medication-admin'
  | 'mental-health'
  | 'safeguarding'
  | 'cultural-awareness'
  | 'behaviour-support-rp'
  | 'fire-safety'
  | 'food-safety'
  | 'infection-control'
  | 'none';

// ───────────────────────────────────────────
// Wizard Form Data
// ───────────────────────────────────────────

export interface WizardFormData {
  // Step 0: Welcome
  providerType: ProviderType | null;

  // Step 1: About You
  firstName: string;
  email: string;
  ndisRegistered: boolean | null;
  registrationGroup: RegistrationGroup | null;

  // Step 2: Services & Participants
  services: ServiceType[];
  participantCount: ParticipantCount | null;
  workerCount: WorkerCount | null;

  // Step 3: Team (conditional)
  screeningStatus: ScreeningStatus | null;
  training: TrainingType[];
  policyStatus: PolicyStatus | null;

  // Step 4: Operations
  recordSystem: RecordSystem | null;
  incidentSystem: IncidentSystem | null;
  complaintProcess: ComplaintProcess | null;
  invoiceMethod: InvoiceMethod | null;

  // Step 5: Compliance Awareness
  auditHistory: AuditHistory | null;
  confidenceLevel: ConfidenceLevel | null;
  biggestConcern: string;

  // Step 6: Audit Readiness (self-assessment)
  auditReadiness: AuditReadinessScores;
}

export interface AuditReadinessScores {
  rightsAndGovernance: number;
  participantPartnership: number;
  supportsDelivery: number;
  supportsEnvironment: number;
  feedbackComplaints: number;
  workforce: number;
  riskManagement: number;
  restrictivePractices: number;
}

// ───────────────────────────────────────────
// Wizard State
// ───────────────────────────────────────────

export type WizardStep =
  | 'welcome'
  | 'about'
  | 'services'
  | 'team'
  | 'operations'
  | 'compliance'
  | 'audit-readiness'
  | 'processing'
  | 'results';

export const STEP_ORDER: WizardStep[] = [
  'welcome',
  'about',
  'services',
  'team',
  'operations',
  'compliance',
  'audit-readiness',
  'processing',
  'results',
];

export interface WizardState {
  currentStep: WizardStep;
  formData: WizardFormData;
  direction: 'forward' | 'backward';
  isSubmitting: boolean;
  completedSteps: WizardStep[];
}

// ───────────────────────────────────────────
// Wizard Actions
// ───────────────────────────────────────────

export type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: WizardStep }
  | { type: 'UPDATE_FIELD'; field: string; value: unknown }
  | { type: 'UPDATE_AUDIT_READINESS'; key: keyof AuditReadinessScores; value: number }
  | { type: 'TOGGLE_ARRAY_ITEM'; field: string; value: string }
  | { type: 'SET_SUBMITTING'; value: boolean }
  | { type: 'LOAD_STATE'; state: Partial<WizardState> }
  | { type: 'RESET' };

// ───────────────────────────────────────────
// Step Validation
// ───────────────────────────────────────────

export interface ValidationErrors {
  [key: string]: string;
}

export type StepValidator = (data: WizardFormData) => ValidationErrors;
