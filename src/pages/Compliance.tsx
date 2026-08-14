import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Download, FileText, CheckCircle, X } from 'lucide-react';
import HealthScoreRing from '@/components/compliance/HealthScoreRing';
import StandardCard from '@/components/compliance/StandardCard';
import GapTable from '@/components/compliance/GapTable';
import { AlertsSection } from '@/components/compliance/AlertCard';
import RegulatoryFeed from '@/components/compliance/RegulatoryFeed';
import {
  practiceStandards,
  complianceAlerts,
  complianceReports,
} from '@/data/compliance';
import type { PracticeStandard } from '@/data/compliance';

function ReportsSection() {
  return (
    <motion.div
      className="bg-white rounded-16 border border-slate-100 shadow-card p-5 lg:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xl font-semibold font-heading text-slate-900">Reports</h3>
        <button className="inline-flex items-center gap-2 px-4 py-2 border-2 border-slate-200 text-slate-700 text-sm font-semibold rounded-xl hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50 transition-all">
          <FileText className="w-4 h-4" />
          Generate New Report
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Report</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Date</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {complianceReports.map((report, i) => (
              <motion.tr
                key={report.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <td className="px-3 py-3.5 text-sm font-medium text-slate-800">{report.name}</td>
                <td className="px-3 py-3.5 text-sm text-slate-500">
                  {new Date(report.date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-3 py-3.5">
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                    report.type === 'auto'
                      ? 'bg-leaf-50 text-leaf-700 border border-leaf-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {report.type === 'auto' ? 'Auto' : 'Manual'}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#16A34A]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {report.status === 'ready' ? 'Ready' : report.status}
                  </span>
                </td>
                <td className="px-3 py-3.5">
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// Standard Detail Drawer
function StandardDetailDrawer({
  standard,
  onClose,
}: {
  standard: PracticeStandard | null;
  onClose: () => void;
}) {
  if (!standard) return null;

  const scoreColor =
    standard.score === null
      ? '#94A3B8'
      : standard.score >= 75
        ? '#22C55E'
        : standard.score >= 50
          ? '#F59E0B'
          : '#EF4444';

  const metCount = standard.indicators.filter((i) => i.status === 'met').length;
  const totalApplicable = standard.indicators.filter((i) => i.status !== 'na').length;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        className="relative w-full max-w-[480px] h-full bg-white shadow-modal overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        {/* Colored top bar */}
        <div className="h-1" style={{ backgroundColor: scoreColor }} />

        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-start justify-between z-10">
          <div>
            <h3 className="text-lg font-semibold font-heading text-slate-900">{standard.name}</h3>
            <p className="text-2xl font-bold font-mono mt-1" style={{ color: scoreColor }}>
              {standard.score !== null ? `${standard.score}/100` : 'N/A'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold text-slate-700 mb-2">About this standard</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{standard.description}</p>
          </motion.div>

          {/* Score comparison */}
          {standard.score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-sm font-semibold text-slate-700 mb-3">Score vs. Required</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Your score</span>
                  <span className="font-semibold text-slate-800">{standard.score}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${standard.score}%`,
                      backgroundColor: scoreColor,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Required</span>
                  <span className="font-semibold text-slate-800">80%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-slate-400"
                    style={{ width: '80%' }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-slate-700 mb-3">
              Indicators ({metCount}/{totalApplicable} met)
            </h4>
            <div className="space-y-2">
              {standard.indicators.map((ind) => (
                <div
                  key={ind.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-slate-100"
                >
                  {ind.status === 'met' && <CheckCircle className="w-4 h-4 text-[#22C55E] flex-shrink-0" />}
                  {ind.status === 'partial' && (
                    <div className="w-4 h-4 rounded-full border-2 border-[#F59E0B] flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                    </div>
                  )}
                  {ind.status === 'not-met' && (
                    <div className="w-4 h-4 rounded-full border-2 border-[#EF4444] flex items-center justify-center flex-shrink-0">
                      <X className="w-2.5 h-2.5 text-[#EF4444]" />
                    </div>
                  )}
                  {ind.status === 'na' && <div className="w-4 h-4 rounded-full bg-slate-200 flex-shrink-0" />}
                  <span className="text-sm text-slate-700">{ind.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="pt-4 border-t border-slate-100"
          >
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Recommended Actions</h4>
            <div className="space-y-2">
              {standard.indicators
                .filter((i) => i.status === 'not-met' || i.status === 'partial')
                .map((ind) => (
                  <div
                    key={ind.id}
                    className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] flex-shrink-0" />
                    <span className="text-sm text-slate-700">Address: {ind.name}</span>
                  </div>
                ))}
              {standard.indicators.filter((i) => i.status === 'not-met' || i.status === 'partial').length === 0 && (
                <p className="text-sm text-slate-500">All indicators are met. Great work!</p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Compliance Page ──────────────────────────────────────────────

export default function Compliance() {
  const [selectedStandard, setSelectedStandard] = useState<PracticeStandard | null>(null);

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-900">Compliance Centre</h1>
          <p className="text-sm text-slate-400 mt-0.5">Last full assessment: 3 days ago</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-leaf-500 text-white text-sm font-semibold rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all self-start">
          <RefreshCw className="w-4 h-4" />
          Run New Assessment
        </button>
      </motion.div>

      {/* Section 1: Health Score */}
      <HealthScoreRing />

      {/* Section 2: Traffic Light Overview */}
      <motion.div
        className="bg-white rounded-16 border border-slate-100 shadow-card p-5 lg:p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="mb-5">
          <h3 className="text-xl font-semibold font-heading text-slate-900">
            NDIS Practice Standards — Quick View
          </h3>
          <p className="text-sm text-slate-500 mt-0.5">
            Traffic-light status across all compliance areas
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {practiceStandards.map((standard, i) => (
            <StandardCard
              key={standard.id}
              standard={standard}
              index={i}
              onOpenDetail={setSelectedStandard}
            />
          ))}
        </div>
      </motion.div>

      {/* Section 3: Critical Alerts */}
      <AlertsSection alerts={complianceAlerts} />

      {/* Section 4: Gap Analysis */}
      <GapTable />

      {/* Section 5: Regulatory Updates */}
      <RegulatoryFeed />

      {/* Section 6: Reports */}
      <ReportsSection />

      {/* Detail Drawer */}
      {selectedStandard && (
        <StandardDetailDrawer
          standard={selectedStandard}
          onClose={() => setSelectedStandard(null)}
        />
      )}
    </div>
  );
}
