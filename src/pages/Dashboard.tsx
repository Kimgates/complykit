import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlusCircle,
  ClipboardCheck,
  Calculator,
  UserPlus,
  BookOpen,
  ChartBar,
  FileText,
  AlertTriangle,
  Clock,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  BookOpenIcon,
  Shield,
  ClipboardList,
} from 'lucide-react';
import PolicyCard from '@/components/dashboard/PolicyCard';
import GapCard from '@/components/dashboard/GapCard';
import DeadlineItem from '@/components/dashboard/DeadlineItem';
import {
  policies,
  dashboardMetrics,
  learningModules,
  upcomingDeadlines,
  recentActivity,
} from '@/data/policies';

const quickActions = [
  { label: 'Generate New Policy', icon: PlusCircle, color: 'text-leaf-600', href: '/get-started' },
  { label: 'Run Mock Audit', icon: ClipboardCheck, color: 'text-teal-600', href: '/mock-audit' },
  { label: 'Check Invoice', icon: Calculator, color: 'text-coral-500', href: '/invoice-checker' },
  { label: 'Add Worker', icon: UserPlus, color: 'text-slate-600', href: '/screening' },
  { label: 'Start Learning', icon: BookOpen, color: 'text-leaf-600', href: '/learn' },
  { label: 'View Reports', icon: ChartBar, color: 'text-slate-600', href: '/compliance' },
];

const activityIcons: Record<string, { icon: typeof CheckCircle; color: string }> = {
  compliant: { icon: CheckCircle, color: 'text-leaf-500' },
  warning: { icon: AlertCircle, color: 'text-status-amber' },
  info: { icon: FileText, color: 'text-status-blue' },
  action: { icon: ClipboardList, color: 'text-coral-500' },
};

const learningIcons: Record<string, typeof BookOpenIcon> = {
  book: BookOpenIcon,
  clipboard: ClipboardList,
  shield: Shield,
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

export default function Dashboard() {
  const [filter, setFilter] = useState<'all' | 'compliant' | 'needs-review' | 'non-compliant'>('all');

  const filteredPolicies = filter === 'all'
    ? policies
    : policies.filter((p) => p.status === filter);

  const allGaps = policies.flatMap((p) =>
    p.gaps.map((g) => ({ ...g, policyId: p.id }))
  );

  return (
    <div className="space-y-8 pb-8">
      {/* Section 1: Overview Row */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Policies Generated Card */}
        <motion.div
          className="bg-white rounded-16 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-[2px] transition-all duration-300 border border-slate-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-teal-400" />
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[28px] font-semibold text-teal-700">{dashboardMetrics.policiesGenerated}</span>
              <p className="font-heading text-sm font-semibold text-slate-500 mt-1">Policies Active</p>
              <p className="text-xs text-status-amber mt-1">{dashboardMetrics.policiesNeedReview} need review</p>
            </div>
            <FileText className="w-6 h-6 text-teal-500" />
          </div>
        </motion.div>

        {/* Drafts Needing Review Card */}
        <motion.div
          className="bg-white rounded-16 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-[2px] transition-all duration-300 border border-slate-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-status-amber" />
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[28px] font-semibold" style={{ color: '#B45309' }}>{dashboardMetrics.openGaps}</span>
              <p className="font-heading text-sm font-semibold text-slate-500 mt-1">Gaps to Fix</p>
              <p className="text-xs text-slate-500 mt-1">{dashboardMetrics.criticalGaps} critical, {dashboardMetrics.recommendedGaps} recommended</p>
            </div>
            <AlertTriangle className="w-6 h-6 text-status-amber" />
          </div>
        </motion.div>

        {/* Upcoming Deadlines Card */}
        <motion.div
          className="bg-white rounded-16 p-6 shadow-card hover:shadow-card-hover hover:-translate-y-[2px] transition-all duration-300 border border-slate-100 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-coral-400" />
          <div className="flex items-start justify-between">
            <div>
              <span className="font-mono text-[28px] font-semibold text-coral-600">{dashboardMetrics.upcomingDeadlines}</span>
              <p className="font-heading text-sm font-semibold text-slate-500 mt-1">Due Soon</p>
              <p className="text-xs text-slate-500 mt-1">Worker screening + SIL prep</p>
            </div>
            <Clock className="w-6 h-6 text-coral-500" />
          </div>
        </motion.div>
      </motion.div>

      {/* Section 2: Quick Actions Bar */}
      <motion.div
        className="flex flex-wrap gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.06, duration: 0.3 }}
            >
              <Link
                to={action.href}
                className="inline-flex items-center gap-2.5 px-5 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-[1px] active:scale-[0.98] transition-all duration-150"
              >
                <Icon className={`w-[18px] h-[18px] ${action.color}`} />
                {action.label}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Section 3: Your Policies */}
      <motion.div
        className="bg-white rounded-16 p-6 shadow-card border border-slate-100"
        custom={3}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div>
            <h2 className="font-heading text-xl font-semibold text-slate-900">Your Policies</h2>
            <p className="text-sm text-slate-500 mt-0.5">{policies.length} policies generated for your practice</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-leaf-500 transition-colors"
            >
              <option value="all">All</option>
              <option value="compliant">Compliant</option>
              <option value="needs-review">Needs Review</option>
              <option value="non-compliant">Non-Compliant</option>
            </select>
            <Link
              to="/policies"
              className="inline-flex items-center gap-1 text-sm font-medium text-leaf-600 hover:text-leaf-700 transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {filteredPolicies.map((policy, index) => (
            <PolicyCard
              key={policy.id}
              id={policy.id}
              title={policy.title}
              category={policy.category}
              status={policy.status}
              lastUpdated={policy.lastUpdated}
              index={index}
            />
          ))}
        </div>
      </motion.div>

      {/* Section 4: Document Status */}
      <motion.div
        className="bg-white rounded-16 p-6 shadow-card border border-slate-100"
        custom={4}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading text-xl font-semibold text-slate-900">Priority Gaps</h2>
            <p className="text-sm text-slate-500 mt-0.5">{allGaps.length} items need your attention</p>
          </div>
          <Link
            to="/documents"
            className="inline-flex items-center gap-1 text-sm font-medium text-leaf-600 hover:text-leaf-700 transition-colors"
          >
            View Full Analysis
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-0 divide-y divide-slate-50">
          {allGaps.slice(0, 5).map((gap, index) => (
            <GapCard
              key={gap.id}
              id={gap.id}
              severity={gap.severity}
              title={gap.title}
              description={gap.description}
              auditRisk={gap.auditRisk}
              index={index}
              policyId={gap.policyId}
            />
          ))}
        </div>
      </motion.div>

      {/* Section 5: Learning Progress */}
      <motion.div
        className="bg-white rounded-16 p-6 shadow-card border border-slate-100"
        custom={5}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-heading text-xl font-semibold text-slate-900">Your Learning</h2>
            <p className="text-sm text-slate-500 mt-0.5">Continue where you left off</p>
          </div>
          <Link
            to="/learn"
            className="inline-flex items-center gap-1 text-sm font-medium text-leaf-600 hover:text-leaf-700 transition-colors"
          >
            Go to Learning Hub
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {learningModules.map((mod, index) => {
            const Icon = learningIcons[mod.icon] || BookOpen;
            return (
              <motion.div
                key={mod.id}
                className="bg-white border border-slate-100 rounded-xl p-4 hover:shadow-card-hover transition-all duration-300"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-[60px] h-[60px] bg-leaf-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-leaf-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading text-sm font-semibold text-slate-800 leading-snug truncate">
                      {mod.title}
                    </h4>
                    <div className="mt-2">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-leaf-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${mod.progress}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[11px] text-slate-400">{mod.progress}% complete</span>
                        <span className="text-[11px] text-slate-400">{mod.remainingMinutes} min remaining</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom Row: Activity + Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 6: Recent Activity */}
        <motion.div
          className="bg-white rounded-16 p-6 shadow-card border border-slate-100"
          custom={6}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="font-heading text-xl font-semibold text-slate-900 mb-4">Recent Activity</h2>
          <div className="space-y-0 divide-y divide-slate-50">
            {recentActivity.map((activity, index) => {
              const config = activityIcons[activity.type] || activityIcons.info;
              const Icon = config.icon;
              return (
                <motion.div
                  key={activity.id}
                  className="flex items-center gap-3 py-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.06, duration: 0.3 }}
                >
                  <Icon className={`w-4 h-4 ${config.color} flex-shrink-0`} />
                  <span className="flex-1 text-sm text-slate-700">{activity.text}</span>
                  <span className="text-xs text-slate-400 flex-shrink-0">{activity.time}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Section 7: Upcoming Deadlines */}
        <motion.div
          className="bg-white rounded-16 p-6 shadow-card border border-slate-100"
          custom={7}
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-semibold text-slate-900">Upcoming Deadlines</h2>
            <Link
              to="/screening"
              className="inline-flex items-center gap-1 text-sm font-medium text-leaf-600 hover:text-leaf-700 transition-colors"
            >
              View Calendar
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-0 divide-y divide-slate-50">
            {upcomingDeadlines.map((deadline, index) => (
              <DeadlineItem
                key={deadline.id}
                title={deadline.title}
                date={deadline.date}
                daysRemaining={deadline.daysRemaining}
                urgency={deadline.urgency}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
