import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowUpDown } from 'lucide-react';
import { complianceGaps } from '@/data/compliance';
import type { GapSeverity, GapStatus } from '@/data/compliance';

type TabFilter = 'all' | 'critical' | 'recommended' | 'resolved';
type SortKey = 'name' | 'standardName' | 'severity' | 'status';

const severityOrder: Record<GapSeverity, number> = { critical: 0, recommended: 1 };
const statusOrder: Record<GapStatus, number> = { open: 0, 'in-progress': 1, resolved: 2 };

const severityBadge = (severity: GapSeverity) => {
  if (severity === 'critical')
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
        <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
        Critical
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
      <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
      Recommended
    </span>
  );
};

const statusBadge = (status: GapStatus) => {
  const styles = {
    open: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
    'in-progress': 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    resolved: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
  };
  const labels = { open: 'Open', 'in-progress': 'In Progress', resolved: 'Resolved' };
  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const borderColor = (severity: GapSeverity) =>
  severity === 'critical' ? 'border-l-[#EF4444]' : 'border-l-[#F59E0B]';

const actionButton = (action: string) => {
  if (action === 'Fix Now')
    return (
      <button className="px-3 py-1.5 bg-[#EF4444] text-white text-xs font-semibold rounded-lg hover:bg-[#DC2626] transition-colors">
        Fix Now
      </button>
    );
  if (action === 'Update')
    return (
      <button className="px-3 py-1.5 bg-[#3B82F6] text-white text-xs font-semibold rounded-lg hover:bg-[#2563EB] transition-colors">
        Update
      </button>
    );
  return (
    <button className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">
      View
    </button>
  );
};

export default function GapTable() {
  const [activeTab, setActiveTab] = useState<TabFilter>('all');
  const [sortKey, setSortKey] = useState<SortKey>('severity');
  const [sortAsc, setSortAsc] = useState(true);

  const tabs: { key: TabFilter; label: string }[] = [
    { key: 'all', label: `All Gaps (${complianceGaps.length})` },
    { key: 'critical', label: `Critical (${complianceGaps.filter((g) => g.severity === 'critical').length})` },
    { key: 'recommended', label: `Recommended (${complianceGaps.filter((g) => g.severity === 'recommended').length})` },
    { key: 'resolved', label: `Resolved (${complianceGaps.filter((g) => g.status === 'resolved').length})` },
  ];

  const filtered = complianceGaps
    .filter((g) => {
      if (activeTab === 'all') return true;
      if (activeTab === 'resolved') return g.status === 'resolved';
      return g.severity === activeTab;
    })
    .sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'severity') cmp = severityOrder[a.severity] - severityOrder[b.severity];
      else if (sortKey === 'status') cmp = statusOrder[a.status] - statusOrder[b.status];
      else if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortKey === 'standardName') cmp = a.standardName.localeCompare(b.standardName);
      return sortAsc ? cmp : -cmp;
    });

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  return (
    <div className="bg-white rounded-16 border border-slate-100 shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <h3 className="text-xl font-semibold font-heading text-slate-900">Gap Analysis</h3>
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200 self-start">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-slate-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'text-[#16A34A] border-[#22C55E]'
                  : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              {[
                { key: 'severity' as SortKey, label: 'Priority' },
                { key: 'name' as SortKey, label: 'Gap' },
                { key: 'standardName' as SortKey, label: 'Standard' },
                { key: 'severity' as SortKey, label: 'Impact' },
                { key: 'status' as SortKey, label: 'Status' },
                { key: 'name' as SortKey, label: 'Action' },
              ].map((col) => (
                <th
                  key={col.label}
                  className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-3 cursor-pointer hover:text-slate-700 transition-colors"
                  onClick={() => toggleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {filtered.map((gap, i) => (
                <motion.tr
                  key={gap.id}
                  className={`border-b border-slate-50 border-l-[3px] ${borderColor(gap.severity)} hover:bg-slate-50 transition-colors`}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  <td className="px-4 py-3.5">{severityBadge(gap.severity)}</td>
                  <td className="px-4 py-3.5 text-sm font-medium text-slate-800">{gap.name}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{gap.standardName}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{gap.impact}</span>
                  </td>
                  <td className="px-4 py-3.5">{statusBadge(gap.status)}</td>
                  <td className="px-4 py-3.5">{actionButton(gap.action)}</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No gaps found in this category.</div>
        )}
      </div>
    </div>
  );
}
