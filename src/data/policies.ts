export type ComplianceStatus = 'compliant' | 'needs-review' | 'non-compliant';

export interface PolicySection {
  id: string;
  type: 'heading' | 'subheading' | 'paragraph' | 'bullet-list' | 'numbered-list' | 'callout-info' | 'callout-warning' | 'callout-tip' | 'callout-important' | 'table';
  content?: string;
  items?: string[];
  rows?: { cells: string[] }[];
  headers?: string[];
}

export interface PolicyGap {
  id: string;
  severity: 'critical' | 'recommended';
  title: string;
  description: string;
  auditRisk: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface PolicyVersion {
  id: string;
  version: string;
  date: string;
  author: string;
  changeSummary: string;
  isCurrent?: boolean;
}

export interface Policy {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  status: ComplianceStatus;
  lastUpdated: string;
  version: string;
  reviewDue: string;
  approvedBy: string;
  approvalDate: string;
  sections: PolicySection[];
  gaps: PolicyGap[];
  versions: PolicyVersion[];
  relatedPolicies: string[];
  mappedStandards: { name: string; status: 'fully-covered' | 'partially-covered' | 'not-covered' }[];
  auditChecklist: { label: string; checked: boolean }[];
}

export const policies: Policy[] = [
  {
    id: 'incident-management',
    code: 'POL-RISK-001',
    title: 'Incident Management Policy',
    category: 'Risk',
    description: 'Procedures for reporting, documenting, and responding to incidents involving participants, workers, and others.',
    status: 'compliant',
    lastUpdated: '2025-12-15T10:30:00Z',
    version: '2.1',
    reviewDue: '2026-03-15',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-12-15',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This procedure outlines how the provider manages incidents involving participants, workers, and others to ensure the safety and wellbeing of all parties and meet NDIS Practice Standards requirements.' },
      { id: 's3', type: 'heading', content: '2. Scope' },
      { id: 's4', type: 'paragraph', content: 'This procedure applies to all workers, contractors, and volunteers of the organisation.' },
      { id: 's5', type: 'callout-tip', content: 'This policy was customised based on your practice profile. You support 5 participants as an independent worker. Adjust the scope if your practice changes.' },
      { id: 's6', type: 'heading', content: '3. Definitions' },
      { id: 's7', type: 'bullet-list', items: ['Incident: An event that causes, or could have caused, harm to a participant', 'Reportable Incident: Incidents that must be notified to the NDIS Commission', 'Near Miss: An incident that did not result in harm but had potential to do so'] },
      { id: 's8', type: 'heading', content: '4. Procedure' },
      { id: 's9', type: 'subheading', content: '4.1 Reporting an Incident' },
      { id: 's10', type: 'numbered-list', items: ['Ensure the immediate safety of the participant and others', 'Provide any necessary first aid or emergency assistance', 'Notify your supervisor or provider within 2 hours', 'Complete the Incident Report Form within 24 hours'] },
      { id: 's11', type: 'callout-warning', content: 'As an independent worker, you are responsible for reporting directly to the NDIS Commission for reportable incidents within 24 hours.' },
      { id: 's12', type: 'subheading', content: '4.2 Incident Classification' },
      { id: 's13', type: 'table', headers: ['Classification', 'Examples', 'Reporting Timeframe'], rows: [{ cells: ['Critical', 'Serious injury, abuse, neglect', 'Within 24 hours to NDIS Commission'] }, { cells: ['Major', 'Hospitalisation, significant property damage', 'Within 24 hours to supervisor'] }, { cells: ['Minor', 'Small cuts, bruises, near misses', 'Within 48 hours via report form'] }] },
      { id: 's14', type: 'subheading', content: '4.3 Documentation Requirements' },
      { id: 's15', type: 'bullet-list', items: ['Complete all fields in the Incident Report Form accurately', 'Include date, time, location, and persons involved', 'Describe the incident objectively without speculation', 'Record any immediate actions taken', 'Submit to supervisor or approved reviewer'] },
      { id: 's16', type: 'heading', content: '5. Roles and Responsibilities' },
      { id: 's17', type: 'bullet-list', items: ['Support Workers: Report incidents promptly, ensure participant safety, complete documentation', 'Supervisors: Review incident reports, escalate as required, ensure follow-up actions', 'Provider: Maintain incident register, report to NDIS Commission, review trends'] },
      { id: 's18', type: 'heading', content: '6. Related Documents' },
      { id: 's19', type: 'bullet-list', items: ['Complaints Handling Policy', 'Worker Code of Conduct', 'Risk Management Policy', 'Emergency Management Policy'] },
      { id: 's20', type: 'heading', content: '7. Review History' },
      { id: 's21', type: 'paragraph', content: 'This policy is reviewed every 12 months or sooner if required by changes in legislation, incident trends, or audit findings.' },
    ],
    gaps: [],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-01-10T09:00:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '2.0', date: '2025-06-20T14:30:00Z', author: 'You', changeSummary: 'Updated reporting timeframes and added classification table' },
      { id: 'v3', version: '2.1', date: '2025-12-15T10:30:00Z', author: 'You', changeSummary: 'Minor wording updates and scope clarification', isCurrent: true },
    ],
    relatedPolicies: ['complaints-handling', 'worker-screening', 'risk-management'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'fully-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'fully-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'partially-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: true },
      { label: 'Evidence of implementation', checked: true },
      { label: 'Regular review scheduled', checked: true },
      { label: 'Complaints linkage documented', checked: false },
      { label: 'Roles clearly assigned', checked: true },
    ],
  },
  {
    id: 'complaints-handling',
    code: 'POL-RIGHTS-001',
    title: 'Complaints Handling Policy',
    category: 'Rights',
    description: 'How participants, families, and others can raise complaints and how they are resolved.',
    status: 'compliant',
    lastUpdated: '2025-12-10T08:15:00Z',
    version: '1.8',
    reviewDue: '2026-04-10',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-12-10',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This policy ensures that complaints are handled fairly, promptly, and in accordance with NDIS Practice Standards. It provides a clear process for raising and resolving concerns.' },
      { id: 's3', type: 'heading', content: '2. Scope' },
      { id: 's4', type: 'paragraph', content: 'This policy applies to all complaints received from participants, their families, advocates, carers, and other stakeholders.' },
      { id: 's5', type: 'heading', content: '3. Principles' },
      { id: 's6', type: 'bullet-list', items: ['Complaints are welcomed as opportunities to improve', 'All complaints are taken seriously and handled confidentially', 'No one will be disadvantaged for making a complaint', 'Complaints will be resolved as quickly as possible'] },
      { id: 's7', type: 'heading', content: '4. Complaints Process' },
      { id: 's8', type: 'subheading', content: '4.1 Making a Complaint' },
      { id: 's9', type: 'paragraph', content: 'Complaints can be made verbally, in writing, via email, or through a third-party advocate. Contact details are provided to all participants at onboarding.' },
      { id: 's10', type: 'subheading', content: '4.2 Acknowledgement' },
      { id: 's11', type: 'paragraph', content: 'All complaints will be acknowledged within 2 business days of receipt.' },
      { id: 's12', type: 'subheading', content: '4.3 Investigation and Resolution' },
      { id: 's13', type: 'numbered-list', items: ['A nominated person will investigate the complaint', 'The complainant will be kept informed of progress', 'A response will be provided within 10 business days', 'If unresolved, the complainant may escalate to the NDIS Commission'] },
      { id: 's14', type: 'callout-info', content: 'You must maintain a complaints register with specific fields as required by NDIS standards. This includes dates, nature of complaint, actions taken, and outcomes.' },
      { id: 's15', type: 'heading', content: '5. External Escalation' },
      { id: 's16', type: 'paragraph', content: 'If a complainant is not satisfied with the internal resolution, they may contact the NDIS Quality and Safeguards Commission directly on 1800 035 544.' },
    ],
    gaps: [
      { id: 'g1', severity: 'recommended', title: 'Complaints Register — Not maintained in required format', description: 'NDIS standards require a centralised complaints register with specific fields.', auditRisk: 'MEDIUM' },
    ],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-02-15T11:00:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '1.8', date: '2025-12-10T08:15:00Z', author: 'You', changeSummary: 'Updated escalation pathway and added register requirements', isCurrent: true },
    ],
    relatedPolicies: ['incident-management', 'participant-rights', 'risk-management'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'fully-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'fully-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'fully-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: true },
      { label: 'Evidence of implementation', checked: true },
      { label: 'Regular review scheduled', checked: false },
      { label: 'Complaints register maintained', checked: false },
      { label: 'Roles clearly assigned', checked: true },
    ],
  },
  {
    id: 'worker-screening',
    code: 'POL-WORK-001',
    title: 'Worker Screening Policy',
    category: 'Workforce',
    description: 'Requirements and procedures for NDIS worker screening checks, renewals, and record keeping.',
    status: 'needs-review',
    lastUpdated: '2025-11-28T16:45:00Z',
    version: '1.5',
    reviewDue: '2026-01-28',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-11-28',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This policy ensures all workers have appropriate NDIS Worker Screening Checks and that records are maintained in compliance with NDIS requirements.' },
      { id: 's3', type: 'heading', content: '2. Screening Requirements' },
      { id: 's4', type: 'bullet-list', items: ['All workers must hold a valid NDIS Worker Screening Check before commencing work', 'Checks must be renewed before expiry', 'Workers must provide consent for ongoing monitoring', 'Risk assessments are conducted for any check outcomes other than cleared'] },
      { id: 's5', type: 'heading', content: '3. Renewal Process' },
      { id: 's6', type: 'numbered-list', items: ['Worker receives 90-day expiry notice', 'Worker applies for renewal via their state/territory screening unit', 'Provider verifies renewal application within 14 days', 'Updated clearance recorded in worker file'] },
      { id: 's7', type: 'callout-warning', content: 'Two worker screening checks expire within 30 days. Renewal applications should be submitted immediately to avoid compliance gaps.' },
      { id: 's8', type: 'heading', content: '4. Record Keeping' },
      { id: 's9', type: 'paragraph', content: 'The provider must maintain a register of all worker screening checks including: worker name, check number, issue date, expiry date, and outcome. This register must be reviewed monthly.' },
    ],
    gaps: [
      { id: 'g1', severity: 'critical', title: 'Worker Screening — 2 workers expire within 30 days', description: 'Sarah M. expires 15 Jan 2026, David K. expires 22 Jan 2026. Renewal applications should be submitted now.', auditRisk: 'HIGH' },
    ],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-03-01T10:00:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '1.5', date: '2025-11-28T16:45:00Z', author: 'You', changeSummary: 'Added renewal process and record keeping requirements', isCurrent: true },
    ],
    relatedPolicies: ['incident-management', 'risk-management'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'fully-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'fully-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'fully-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: true },
      { label: 'Evidence of implementation', checked: false },
      { label: 'Regular review scheduled', checked: true },
      { label: 'Screening register maintained', checked: false },
      { label: 'Roles clearly assigned', checked: true },
    ],
  },
  {
    id: 'risk-management',
    code: 'POL-RISK-002',
    title: 'Risk Management Policy',
    category: 'Risk',
    description: 'Identifying, assessing, and mitigating risks to participants, workers, and the organisation.',
    status: 'compliant',
    lastUpdated: '2025-12-05T13:20:00Z',
    version: '2.0',
    reviewDue: '2026-03-05',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-12-05',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This policy establishes a systematic approach to identifying, assessing, and managing risks to ensure the safety and wellbeing of participants and workers.' },
      { id: 's3', type: 'heading', content: '2. Risk Categories' },
      { id: 's4', type: 'table', headers: ['Category', 'Examples', 'Assessment Frequency'], rows: [{ cells: ['Participant Safety', 'Falls, medication errors, behavioural incidents', 'Continuous'] }, { cells: ['Work Health & Safety', 'Manual handling, workplace hazards', 'Monthly'] }, { cells: ['Environmental', 'Fire, equipment failure, vehicle safety', 'Quarterly'] }, { cells: ['Operational', 'Staff shortages, skill gaps, documentation', 'Quarterly'] }, { cells: ['Financial', 'Fraud, billing errors, cash flow', 'Annually'] }] },
      { id: 's5', type: 'heading', content: '3. Risk Assessment Process' },
      { id: 's6', type: 'numbered-list', items: ['Identify hazards and potential risks', 'Assess likelihood and consequence (use risk matrix)', 'Implement control measures following the hierarchy of controls', 'Monitor and review controls regularly', 'Document all assessments and actions'] },
      { id: 's7', type: 'callout-tip', content: 'Risk assessments should be reviewed whenever there is a significant change in operations, after an incident, or at least annually.' },
      { id: 's8', type: 'heading', content: '4. Roles and Responsibilities' },
      { id: 's9', type: 'bullet-list', items: ['All Workers: Report hazards and risks immediately', 'Supervisors: Conduct regular risk assessments, implement controls', 'Management: Review risk register, allocate resources for controls'] },
    ],
    gaps: [],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-01-20T09:30:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '2.0', date: '2025-12-05T13:20:00Z', author: 'You', changeSummary: 'Added risk matrix and updated assessment frequencies', isCurrent: true },
    ],
    relatedPolicies: ['incident-management', 'emergency-management', 'worker-screening'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'fully-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'fully-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'fully-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: true },
      { label: 'Evidence of implementation', checked: true },
      { label: 'Regular review scheduled', checked: true },
      { label: 'Risk register maintained', checked: true },
      { label: 'Roles clearly assigned', checked: true },
    ],
  },
  {
    id: 'participant-rights',
    code: 'POL-RIGHTS-002',
    title: 'Participant Rights Policy',
    category: 'Rights',
    description: 'Upholding the rights of NDIS participants including dignity, choice, control, and privacy.',
    status: 'compliant',
    lastUpdated: '2025-12-08T11:00:00Z',
    version: '1.3',
    reviewDue: '2026-06-08',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-12-08',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This policy affirms the rights of all participants to be treated with dignity, respect, and to have choice and control over their supports and services.' },
      { id: 's3', type: 'heading', content: '2. Participant Rights' },
      { id: 's4', type: 'bullet-list', items: ['Right to be treated with dignity and respect', 'Right to choice and control over services', 'Right to privacy and confidentiality', 'Right to access information about their supports', 'Right to complain without fear of reprisal', 'Right to cultural safety and inclusion'] },
      { id: 's5', type: 'callout-info', content: 'This policy aligns with the NDIS Charter of Rights and the United Nations Convention on the Rights of Persons with Disabilities.' },
      { id: 's6', type: 'heading', content: '3. Privacy and Confidentiality' },
      { id: 's7', type: 'paragraph', content: 'Personal information is collected, used, and stored in accordance with the Australian Privacy Principles. Participants must provide informed consent before information is shared with third parties.' },
      { id: 's8', type: 'heading', content: '4. Communication' },
      { id: 's9', type: 'paragraph', content: 'Information is provided to participants in formats they can understand. Interpreters and advocates are engaged when needed. Participants are supported to make informed decisions about their care.' },
    ],
    gaps: [],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-04-10T14:00:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '1.3', date: '2025-12-08T11:00:00Z', author: 'You', changeSummary: 'Added privacy and communication sections', isCurrent: true },
    ],
    relatedPolicies: ['complaints-handling', 'medication-management'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'fully-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'fully-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'fully-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: true },
      { label: 'Evidence of implementation', checked: true },
      { label: 'Regular review scheduled', checked: true },
      { label: 'Privacy practices documented', checked: true },
      { label: 'Roles clearly assigned', checked: true },
    ],
  },
  {
    id: 'medication-management',
    code: 'POL-SERV-001',
    title: 'Medication Management Policy',
    category: 'Service Delivery',
    description: 'Safe administration, documentation, and storage of medications for participants.',
    status: 'needs-review',
    lastUpdated: '2025-10-15T09:45:00Z',
    version: '1.4',
    reviewDue: '2026-01-15',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-10-15',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This policy ensures the safe and accurate administration, storage, and documentation of medications in accordance with NDIS Practice Standards and health regulations.' },
      { id: 's3', type: 'heading', content: '2. Scope' },
      { id: 's4', type: 'paragraph', content: 'This policy applies to all workers who administer, assist with, or supervise medication for participants.' },
      { id: 's5', type: 'heading', content: '3. Administration Procedures' },
      { id: 's6', type: 'numbered-list', items: ['Verify participant identity before administration', 'Check the "5 Rights": right participant, medication, dose, route, time', 'Document administration immediately in the Medication Record', 'Report any missed doses, errors, or adverse reactions', 'Store medications securely and at correct temperatures'] },
      { id: 's7', type: 'callout-warning', content: 'Workers must not administer medication beyond their scope of practice or training. Only trained and authorised workers may administer Schedule 4 and Schedule 8 medications.' },
      { id: 's8', type: 'heading', content: '4. Documentation' },
      { id: 's9', type: 'paragraph', content: 'All medication-related activities must be documented in the participant\'s Medication Record, including: medication name, dose, time administered, route, and any observations.' },
    ],
    gaps: [
      { id: 'g1', severity: 'recommended', title: 'Medication Administration — Policy needs review', description: 'Your current policy doesn\'t reference the latest NDIS medication guidelines (updated Nov 2025).', auditRisk: 'MEDIUM' },
    ],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-02-28T10:00:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '1.4', date: '2025-10-15T09:45:00Z', author: 'You', changeSummary: 'Added storage requirements and documentation templates', isCurrent: true },
    ],
    relatedPolicies: ['participant-rights', 'incident-management'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'fully-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'fully-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'partially-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: true },
      { label: 'Evidence of implementation', checked: true },
      { label: 'Regular review scheduled', checked: false },
      { label: 'Medication register maintained', checked: true },
      { label: 'Roles clearly assigned', checked: false },
    ],
  },
  {
    id: 'emergency-management',
    code: 'POL-RISK-003',
    title: 'Emergency Management Policy',
    category: 'Risk',
    description: 'Procedures for responding to fires, medical emergencies, natural disasters, and evacuations.',
    status: 'compliant',
    lastUpdated: '2025-11-20T15:30:00Z',
    version: '1.6',
    reviewDue: '2026-05-20',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-11-20',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This policy establishes procedures for responding to emergencies to ensure the safety of participants, workers, and visitors.' },
      { id: 's3', type: 'heading', content: '2. Emergency Types' },
      { id: 's4', type: 'bullet-list', items: ['Medical emergency (cardiac arrest, severe allergic reaction, choking)', 'Fire or smoke', 'Natural disaster (flood, storm, earthquake)', 'Security threat or aggressive behaviour', 'Utility failure (power, water, gas)'] },
      { id: 's5', type: 'heading', content: '3. Emergency Response' },
      { id: 's6', type: 'numbered-list', items: ['Ensure immediate safety of all persons', 'Call emergency services if required (000)', 'Follow participant-specific emergency plans', 'Contact emergency contacts and next of kin', 'Document the incident and response actions'] },
      { id: 's7', type: 'callout-important', content: 'Every participant must have an individualised emergency management plan that is reviewed at least annually or when their circumstances change.' },
      { id: 's8', type: 'heading', content: '4. Evacuation Procedures' },
      { id: 's9', type: 'paragraph', content: 'Evacuation routes and assembly points are clearly marked. Workers are trained in safe evacuation of participants with mobility or communication support needs. Evacuation drills are conducted at least annually.' },
      { id: 's10', type: 'heading', content: '5. Training' },
      { id: 's11', type: 'paragraph', content: 'All workers must complete emergency response training as part of their induction and receive annual refresher training. Records of training completion are maintained.' },
    ],
    gaps: [],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-03-15T09:00:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '1.6', date: '2025-11-20T15:30:00Z', author: 'You', changeSummary: 'Added individualised emergency plan requirements', isCurrent: true },
    ],
    relatedPolicies: ['incident-management', 'risk-management'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'fully-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'fully-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'fully-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: true },
      { label: 'Evidence of implementation', checked: true },
      { label: 'Regular review scheduled', checked: true },
      { label: 'Evacuation drills documented', checked: true },
      { label: 'Roles clearly assigned', checked: true },
    ],
  },
  {
    id: 'financial-management',
    code: 'POL-GOV-001',
    title: 'Financial Management Policy',
    category: 'Governance',
    description: 'Guidelines for NDIS fund management, invoicing, expense claims, and financial record keeping.',
    status: 'non-compliant',
    lastUpdated: '2025-08-12T10:00:00Z',
    version: '1.1',
    reviewDue: '2026-02-12',
    approvedBy: 'Jane Smith',
    approvalDate: '2025-08-12',
    sections: [
      { id: 's1', type: 'heading', content: '1. Purpose' },
      { id: 's2', type: 'paragraph', content: 'This policy establishes sound financial management practices to ensure NDIS funds are used appropriately, transparently, and in accordance with participant plans and NDIS Pricing Arrangements.' },
      { id: 's3', type: 'heading', content: '2. Invoicing' },
      { id: 's4', type: 'numbered-list', items: ['All services are invoiced using correct NDIS support item numbers', 'Invoices reflect the agreed price limits in the current NDIS Pricing Arrangements', 'Travel and transport costs are claimed in accordance with NDIS guidelines', 'Cancellation claims meet the required notice period requirements'] },
      { id: 's5', type: 'callout-info', content: 'Always check the latest NDIS Pricing Arrangements before invoicing. Rates and conditions are updated annually, typically in July.' },
      { id: 's6', type: 'heading', content: '3. Record Keeping' },
      { id: 's7', type: 'bullet-list', items: ['Maintain accurate records of all income and expenditure', 'Retain records for at least 7 years', 'Reconcile accounts monthly', 'Prepare for annual financial audits'] },
      { id: 's8', type: 'heading', content: '4. Participant Funds' },
      { id: 's9', type: 'paragraph', content: 'Participant funds are used only for supports and services agreed in their NDIS plan. Participants are provided with regular statements of their fund usage.' },
    ],
    gaps: [
      { id: 'g1', severity: 'critical', title: 'Financial records — Incomplete documentation for audit trail', description: 'Several months of financial records are missing proper documentation links to participant plans.', auditRisk: 'HIGH' },
      { id: 'g2', severity: 'recommended', title: 'NDIS Pricing Arrangements — Using outdated rates', description: 'Current invoices reference July 2024 pricing rather than the updated July 2025 NDIS Pricing Arrangements.', auditRisk: 'MEDIUM' },
    ],
    versions: [
      { id: 'v1', version: '1.0', date: '2025-05-20T11:00:00Z', author: 'ComplyKit AI', changeSummary: 'Initial policy generation' },
      { id: 'v2', version: '1.1', date: '2025-08-12T10:00:00Z', author: 'You', changeSummary: 'Added record keeping requirements', isCurrent: true },
    ],
    relatedPolicies: ['risk-management'],
    mappedStandards: [
      { name: 'Module 1: Rights & Responsibilities', status: 'partially-covered' },
      { name: 'Module 2: Governance & Operational Management', status: 'partially-covered' },
      { name: 'Module 3: Delivery of Supports', status: 'partially-covered' },
    ],
    auditChecklist: [
      { label: 'Policy document created', checked: true },
      { label: 'Staff have read and understood', checked: false },
      { label: 'Evidence of implementation', checked: false },
      { label: 'Regular review scheduled', checked: false },
      { label: 'Financial records complete', checked: false },
      { label: 'Roles clearly assigned', checked: false },
    ],
  },
];

export const dashboardMetrics = {
  complianceScore: 78,
  complianceTrend: 12,
  policiesGenerated: 8,
  policiesNeedReview: 3,
  openGaps: 5,
  criticalGaps: 2,
  recommendedGaps: 3,
  upcomingDeadlines: 2,
};

export const learningModules = [
  { id: 'lm1', title: 'Understanding NDIS Practice Standards', progress: 60, totalMinutes: 30, remainingMinutes: 12, icon: 'book' as const },
  { id: 'lm2', title: 'Audit Preparation Essentials', progress: 30, totalMinutes: 45, remainingMinutes: 32, icon: 'clipboard' as const },
  { id: 'lm3', title: 'Worker Screening Requirements', progress: 0, totalMinutes: 20, remainingMinutes: 20, icon: 'shield' as const },
];

export const upcomingDeadlines = [
  { id: 'd1', title: 'Sarah M. — Worker Screening expires', date: '15 Jan 2026', daysRemaining: 12, urgency: 'critical' as const },
  { id: 'd2', title: 'David K. — Worker Screening expires', date: '22 Jan 2026', daysRemaining: 19, urgency: 'warning' as const },
  { id: 'd3', title: 'SIL Registration deadline', date: '1 July 2026', daysRemaining: 178, urgency: 'info' as const },
];

export const recentActivity = [
  { id: 'a1', type: 'compliant' as const, text: 'Incident Management Policy marked as compliant', time: '2 hours ago' },
  { id: 'a2', type: 'warning' as const, text: 'Worker Screening gap identified for Sarah M.', time: 'Yesterday' },
  { id: 'a3', type: 'info' as const, text: 'New policy generated: Complaints Handling Procedure', time: '2 days ago' },
  { id: 'a4', type: 'compliant' as const, text: 'Completed module: NDIS Code of Conduct', time: '3 days ago' },
  { id: 'a5', type: 'action' as const, text: 'Invoice #1042 validated successfully', time: '4 days ago' },
];
