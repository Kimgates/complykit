import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Pencil,
  Share2,
  History,
  CheckCircle,
  AlertCircle,
  XCircle,
  Info,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  Link as LinkIcon,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
} from 'lucide-react';
import { policies } from '@/data/policies';
import type { PolicySection, ComplianceStatus } from '@/data/policies';
import PolicyEditor from '@/components/policy/PolicyEditor';
import VersionHistory from '@/components/policy/VersionHistory';
import AiAssistant from '@/components/policy/AiAssistant';
import PdfExporter from '@/components/policy/PdfExporter';

const statusConfig: Record<ComplianceStatus, { icon: typeof CheckCircle; label: string; bg: string; text: string; border: string }> = {
  compliant: {
    icon: CheckCircle,
    label: 'Compliant',
    bg: 'bg-[#F0FDF4]',
    text: 'text-[#15803D]',
    border: 'border-[#BBF7D0]',
  },
  'needs-review': {
    icon: AlertCircle,
    label: 'Needs Review',
    bg: 'bg-[#FFFBEB]',
    text: 'text-[#B45309]',
    border: 'border-[#FDE68A]',
  },
  'non-compliant': {
    icon: XCircle,
    label: 'Non-Compliant',
    bg: 'bg-[#FEF2F2]',
    text: 'text-[#DC2626]',
    border: 'border-[#FECACA]',
  },
};

function DocumentSection({ section, editMode }: { section: PolicySection; editMode: boolean }) {
  if (editMode) {
    return <EditableSectionView section={section} />;
  }

  switch (section.type) {
    case 'heading':
      return (
        <motion.h2
          className="font-heading text-2xl font-semibold text-slate-900 mt-10 mb-4 scroll-mt-20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {section.content}
        </motion.h2>
      );
    case 'subheading':
      return (
        <motion.h3
          className="font-heading text-lg font-semibold text-slate-800 mt-8 mb-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {section.content}
        </motion.h3>
      );
    case 'paragraph':
      return (
        <p className="text-base text-slate-700 leading-relaxed mb-4 max-w-content">
          {section.content}
        </p>
      );
    case 'bullet-list':
      return (
        <ul className="mb-4 space-y-2 ml-6">
          {section.items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-base text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-leaf-500 mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'numbered-list':
      return (
        <ol className="mb-4 space-y-2 ml-6">
          {section.items?.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-base text-slate-700">
              <span className="text-leaf-600 font-semibold text-sm mt-0.5 flex-shrink-0">{idx + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'callout-info':
      return (
        <div className="my-5 p-4 bg-teal-50 border-l-[3px] border-teal-500 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <p className="text-base text-teal-800 leading-relaxed">{section.content}</p>
          </div>
        </div>
      );
    case 'callout-warning':
      return (
        <div className="my-5 p-4 bg-[#FFFBEB] border-l-[3px] border-status-amber rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#92400E] flex-shrink-0 mt-0.5" />
            <p className="text-base text-[#92400E] leading-relaxed">{section.content}</p>
          </div>
        </div>
      );
    case 'callout-tip':
      return (
        <div className="my-5 p-4 bg-leaf-50 border-l-[3px] border-leaf-500 rounded-r-lg">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-leaf-700 flex-shrink-0 mt-0.5" />
            <p className="text-base text-leaf-800 leading-relaxed">{section.content}</p>
          </div>
        </div>
      );
    case 'callout-important':
      return (
        <div className="my-5 p-4 bg-[#FEF2F2] border-l-[3px] border-status-red rounded-r-lg">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" />
            <p className="text-base text-[#991B1B] leading-relaxed">{section.content}</p>
          </div>
        </div>
      );
    case 'table':
      return (
        <div className="my-5 overflow-x-auto">
          <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
            {section.headers && (
              <thead>
                <tr className="bg-slate-100">
                  {section.headers.map((h, idx) => (
                    <th key={idx} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, ridx) => (
                <tr key={ridx} className={ridx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  {row.cells.map((cell, cidx) => (
                    <td key={cidx} className="px-4 py-3 text-sm text-slate-700 border-t border-slate-100">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

function EditableSectionView({ section }: { section: PolicySection }) {
  return (
    <div className="mb-2">
      <div
        className="border-l-2 border-transparent hover:border-slate-200 rounded px-2 py-1 transition-all"
        contentEditable
        suppressContentEditableWarning
      >
        {section.type === 'heading' && (
          <h2 className="font-heading text-2xl font-semibold text-slate-900">{section.content}</h2>
        )}
        {section.type === 'subheading' && (
          <h3 className="font-heading text-lg font-semibold text-slate-800">{section.content}</h3>
        )}
        {section.type === 'paragraph' && <p className="text-base text-slate-700 leading-relaxed">{section.content}</p>}
        {(section.type === 'bullet-list' || section.type === 'numbered-list') && (
          <div className="text-base text-slate-700">
            {section.items?.map((item, i) => <div key={i}>{item}</div>)}
          </div>
        )}
        {section.type.startsWith('callout') && <p className="text-base">{section.content}</p>}
      </div>
    </div>
  );
}

export default function PolicyViewer() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const policy = policies.find((p) => p.id === id);

  const [editMode, setEditMode] = useState(searchParams.get('edit') === 'true');
  const [showHistory, setShowHistory] = useState(false);
  const [sections, setSections] = useState<PolicySection[]>([]);
  const [showAllAuditItems, setShowAllAuditItems] = useState(false);
  const [auditItems, setAuditItems] = useState<{ label: string; checked: boolean }[]>([]);

  useEffect(() => {
    if (policy) {
      setSections(policy.sections);
      setAuditItems(policy.auditChecklist);
    }
  }, [policy]);

  if (!policy) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <FileX className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="font-heading text-xl font-semibold text-slate-800">Policy not found</h2>
        <p className="text-slate-500 mt-2">The policy you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/dashboard"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-leaf-500 text-white font-semibold rounded-xl hover:bg-leaf-600 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const status = statusConfig[policy.status];
  const StatusIcon = status.icon;
  const completedAuditCount = auditItems.filter((i) => i.checked).length;
  const auditProgress = Math.round((completedAuditCount / auditItems.length) * 100);

  const toggleAuditItem = (index: number) => {
    setAuditItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const relatedPoliciesList = policies.filter((p) => policy.relatedPolicies.includes(p.id));

  return (
    <div className="flex flex-col h-[calc(100dvh-72px)] -m-6 lg:-m-8">
      {/* Top Bar */}
      <motion.div
        className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-4 lg:px-6 flex-shrink-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Policies</span>
          </Link>
          <div className="w-px h-6 bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="font-heading text-sm font-semibold text-slate-800 truncate">{policy.title}</h1>
            <button className="text-slate-300 hover:text-slate-600 transition-colors flex-shrink-0">
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-3">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            {status.label}
          </span>
          <span className="text-xs text-slate-400">Last saved: 2 mins ago</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
          >
            <History className="w-4 h-4" />
            History
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              editMode
                ? 'bg-leaf-500 text-white hover:bg-leaf-600'
                : 'border-2 border-slate-200 text-slate-700 hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50'
            }`}
          >
            <Pencil className="w-4 h-4" />
            {editMode ? 'Save' : 'Edit'}
          </button>
          {editMode && (
            <button
              onClick={() => setEditMode(false)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
            >
              Cancel
            </button>
          )}
          <PdfExporter policy={policy} variant="primary" className="hidden sm:inline-flex" />
        </div>
      </motion.div>

      {/* Edit Mode Toolbar */}
      <AnimatePresence>
        {editMode && (
          <motion.div
            className="bg-white border-b border-slate-200 flex-shrink-0"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="h-12 flex items-center px-4 gap-1 overflow-x-auto">
              {[
                { icon: 'B', label: 'Bold' },
                { icon: 'I', label: 'Italic' },
                { icon: 'H1', label: 'Heading 1' },
                { icon: 'H2', label: 'Heading 2' },
                { icon: 'H3', label: 'Heading 3' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-all"
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
              <div className="w-px h-5 bg-slate-200 mx-1" />
              {[
                { icon: '\u2022', label: 'Bullet List' },
                { icon: '1.', label: 'Numbered List' },
              ].map((item) => (
                <button
                  key={item.label}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-md transition-all"
                  title={item.label}
                >
                  {item.icon}
                </button>
              ))}
              <div className="w-px h-5 bg-slate-200 mx-1" />
              <span className="text-xs text-slate-400 ml-auto">Auto-saves every 30s</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Document Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          {editMode ? (
            <PolicyEditor sections={sections} onChange={setSections} />
          ) : (
            <motion.div
              className="max-w-[800px] mx-auto px-6 lg:px-12 py-10 min-h-[80vh]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              {/* Document Header */}
              <div className="mb-8">
                <p className="text-sm text-slate-400 uppercase tracking-wide">[Provider Name]</p>
                <motion.h1
                  className="font-heading text-3xl lg:text-[32px] font-semibold text-slate-900 mt-2 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {policy.title}
                </motion.h1>
                <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
                  <span>Version {policy.version}</span>
                  <span>\u2022</span>
                  <span>Generated by ComplyKit</span>
                  <span>\u2022</span>
                  <span>Last updated: {new Date(policy.lastUpdated).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="mt-3">
                  <span className="inline-block px-3 py-1 bg-leaf-50 text-leaf-600 text-xs font-mono font-medium rounded-lg border border-leaf-200">
                    {policy.code}
                  </span>
                </div>

                {/* Approval Block */}
                <div className="mt-4 p-3 bg-leaf-50 rounded-lg border border-leaf-100">
                  <p className="text-sm text-slate-600">
                    Approved by: {policy.approvedBy} | Date: {policy.approvalDate} | Review due: {policy.reviewDue}
                  </p>
                  <p className="text-xs text-status-amber mt-1">Next review: {policy.reviewDue}</p>
                </div>
              </div>

              {/* Document Body */}
              <div className="mt-10">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
                  >
                    <DocumentSection section={section} editMode={editMode} />
                  </motion.div>
                ))}
              </div>

              {/* End of Document */}
              <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                <p className="text-xs text-slate-400">End of Document</p>
                <p className="text-xs text-slate-400 mt-1">{policy.code} | Version {policy.version}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar - Desktop */}
        <div className="hidden xl:flex w-[340px] flex-shrink-0 bg-slate-50 border-l border-slate-100 flex-col">
          {/* Compliance Mapping Panel */}
          <motion.div
            className="p-5 border-b border-slate-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-leaf-600" />
              <h3 className="font-heading text-sm font-semibold text-slate-800">NDIS Standards Mapped</h3>
            </div>
            <div className="space-y-2">
              {policy.mappedStandards.map((standard, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${
                      standard.status === 'fully-covered' ? 'bg-leaf-500' : standard.status === 'partially-covered' ? 'bg-status-amber' : 'bg-status-red'
                    }`}
                  />
                  <span className="text-sm text-slate-600 flex-1 leading-snug">{standard.name}</span>
                  <span
                    className={`text-[10px] font-medium flex-shrink-0 ${
                      standard.status === 'fully-covered' ? 'text-leaf-600' : standard.status === 'partially-covered' ? 'text-status-amber' : 'text-status-red'
                    }`}
                  >
                    {standard.status === 'fully-covered' ? 'Fully covered' : standard.status === 'partially-covered' ? 'Partially' : 'Not covered'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Audit Checklist Panel */}
          <motion.div
            className="p-5 border-b border-slate-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-leaf-600" />
              <h3 className="font-heading text-sm font-semibold text-slate-800">Audit Preparation</h3>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500">{completedAuditCount}/{auditItems.length} completed</span>
                <span className="text-slate-400">{auditProgress}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-leaf-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${auditProgress}%` }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              {auditItems.slice(0, showAllAuditItems ? undefined : 4).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleAuditItem(idx)}
                  className="w-full flex items-center gap-2.5 py-1.5 text-left group"
                >
                  {item.checked ? (
                    <CheckSquare className="w-4 h-4 text-leaf-500 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-300 group-hover:text-slate-400 flex-shrink-0" />
                  )}
                  <span className={`text-sm ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            {auditItems.length > 4 && (
              <button
                onClick={() => setShowAllAuditItems(!showAllAuditItems)}
                className="inline-flex items-center gap-1 mt-2 text-xs text-leaf-600 hover:text-leaf-700 transition-colors"
              >
                {showAllAuditItems ? (
                  <>Show less <ChevronUp className="w-3 h-3" /></>
                ) : (
                  <>Show all <ChevronDown className="w-3 h-3" /></>
                )}
              </button>
            )}
          </motion.div>

          {/* Related Documents Panel */}
          <motion.div
            className="p-5 border-b border-slate-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <LinkIcon className="w-4 h-4 text-leaf-600" />
              <h3 className="font-heading text-sm font-semibold text-slate-800">Related Policies</h3>
            </div>
            <div className="space-y-2">
              {relatedPoliciesList.map((rp) => (
                <Link
                  key={rp.id}
                  to={`/policies/${rp.id}`}
                  className="block text-sm text-leaf-600 hover:text-leaf-700 hover:underline transition-colors"
                >
                  {rp.title}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* AI Assistant Panel */}
          <motion.div
            className="flex-1 min-h-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.4 }}
          >
            <AiAssistant policyTitle={policy.title} />
          </motion.div>
        </div>
      </div>

      {/* Version History Modal */}
      <VersionHistory
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        versions={policy.versions}
        onRestore={(version) => {
          console.log('Restore version:', version);
          setShowHistory(false);
        }}
      />
    </div>
  );
}

// Missing import for the not-found state
function FileX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="m8.5 10 7 7" />
      <path d="m15.5 10-7 7" />
    </svg>
  );
}
