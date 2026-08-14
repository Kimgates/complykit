import { motion } from 'framer-motion';
import { CheckCircle2, Minus } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  seedling: string;
  growth: string;
  flourish: string;
}

interface ComparisonCategory {
  name: string;
  rows: ComparisonRow[];
}

const categories: ComparisonCategory[] = [
  {
    name: 'Policy Generation',
    rows: [
      { feature: 'Basic templates', seedling: '3', growth: 'Unlimited AI', flourish: 'Unlimited AI' },
      { feature: 'Custom tailoring', seedling: '—', growth: 'Yes', flourish: 'Yes + expert review' },
      { feature: 'Version history', seedling: '—', growth: 'Yes', flourish: 'Yes' },
      { feature: 'PDF export', seedling: '—', growth: 'Yes', flourish: 'Yes' },
    ],
  },
  {
    name: 'Compliance',
    rows: [
      { feature: 'Self-assessment', seedling: 'Yes', growth: 'Yes', flourish: 'Yes' },
      { feature: 'Gap analysis', seedling: '—', growth: 'Yes', flourish: 'Yes + advanced' },
      { feature: 'Traffic-light scoring', seedling: '—', growth: 'Yes', flourish: 'Yes' },
      { feature: 'Compliance alerts', seedling: '—', growth: 'Yes', flourish: 'Yes + phone' },
      { feature: 'Quarterly reports', seedling: '—', growth: 'Yes', flourish: 'Monthly' },
    ],
  },
  {
    name: 'Learning & Audit Prep',
    rows: [
      { feature: 'Community modules', seedling: 'Limited', growth: 'All', flourish: 'All' },
      { feature: 'Mock audit tool', seedling: '—', growth: 'Yes', flourish: 'Yes + advanced' },
      { feature: 'Audit checklist', seedling: 'Basic', growth: 'Full', flourish: 'Full + guided' },
      { feature: 'Achievement tracking', seedling: '—', growth: 'Yes', flourish: 'Yes' },
    ],
  },
  {
    name: 'Tools',
    rows: [
      { feature: 'Screening tracker', seedling: '3 workers', growth: 'Unlimited', flourish: 'Unlimited' },
      { feature: 'Invoice checker', seedling: '5/mo', growth: 'Unlimited', flourish: 'Unlimited' },
      { feature: 'Team collaboration', seedling: '—', growth: '—', flourish: '10 users' },
      { feature: 'API access', seedling: '—', growth: '—', flourish: 'Yes' },
    ],
  },
  {
    name: 'Support',
    rows: [
      { feature: 'Email support', seedling: 'Yes', growth: 'Priority', flourish: 'Priority' },
      { feature: 'Phone support', seedling: '—', growth: '—', flourish: 'Yes' },
      { feature: 'Account manager', seedling: '—', growth: '—', flourish: 'Yes' },
    ],
  },
];

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

function CellContent({ value }: { value: string }) {
  if (value === '—' || value === '—') {
    return <Minus className="w-4 h-4 text-slate-300 mx-auto" />;
  }
  if (value === 'Yes' || value === 'Yes + advanced' || value === 'Yes + expert review' || value === 'Yes + phone' || value === 'Full + guided' || value === 'All' || value === 'Unlimited' || value === 'Unlimited AI' || value === 'Priority' || value === 'Monthly' || value === 'Full' || value === '10 users') {
    return (
      <div className="flex items-center justify-center gap-1.5">
        <CheckCircle2 className="w-4 h-4 text-leaf-500 flex-shrink-0" />
        {value !== 'Yes' && <span className="text-sm text-slate-600">{value}</span>}
      </div>
    );
  }
  if (value === 'Limited' || value === 'Basic' || value === '3' || value === '3 workers' || value === '5/mo') {
    return <span className="text-sm text-slate-500">{value}</span>;
  }
  return <span className="text-sm text-slate-600">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className="max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="font-heading text-[32px] font-semibold text-slate-900">
          Compare All Features
        </h2>
        <p className="text-base text-slate-500 mt-2">
          See exactly what you get with each plan
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full text-left border-collapse">
          {/* Sticky Header */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-white border-b border-slate-200">
              <th className="px-5 py-4 text-sm font-semibold text-slate-700 min-w-[180px]">
                Feature
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-slate-700 text-center min-w-[140px]">
                <span className="block">Seedling</span>
                <span className="text-xs font-normal text-slate-400">Free</span>
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-leaf-700 text-center min-w-[140px] bg-leaf-50/50">
                <span className="block">Growth</span>
                <span className="text-xs font-normal text-leaf-600">$39/mo</span>
              </th>
              <th className="px-5 py-4 text-sm font-semibold text-slate-700 text-center min-w-[140px]">
                <span className="block">Flourish</span>
                <span className="text-xs font-normal text-slate-400">$59/mo</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, ci) => (
              <CategoryRows key={category.name} category={category} categoryIndex={ci} />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function CategoryRows({
  category,
  categoryIndex,
}: {
  category: ComparisonCategory;
  categoryIndex: number;
}) {
  return (
    <>
      {/* Category Header Row */}
      <tr className="bg-slate-100">
        <td
          colSpan={4}
          className="px-5 py-3 text-sm font-semibold text-slate-800"
        >
          {category.name}
        </td>
      </tr>

      {/* Data Rows */}
      {category.rows.map((row, ri) => {
        const globalIndex = categoryIndex * 10 + ri;
        return (
          <motion.tr
            key={row.feature}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.2,
              delay: globalIndex * 0.03,
              ease: easeOutExpo,
            }}
            className={
              ri % 2 === 0
                ? 'bg-white hover:bg-slate-50/50 transition-colors'
                : 'bg-slate-50/50 hover:bg-slate-50 transition-colors'
            }
          >
            <td className="px-5 py-3.5 text-sm text-slate-600 border-b border-slate-100">
              {row.feature}
            </td>
            <td className="px-5 py-3.5 text-center border-b border-slate-100">
              <CellContent value={row.seedling} />
            </td>
            <td className="px-5 py-3.5 text-center border-b border-slate-100 bg-leaf-50/30">
              <CellContent value={row.growth} />
            </td>
            <td className="px-5 py-3.5 text-center border-b border-slate-100">
              <CellContent value={row.flourish} />
            </td>
          </motion.tr>
        );
      })}
    </>
  );
}
