import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building2,
  Bell,
  CreditCard,
  Users,
  Shield,
  Database,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileTab from '@/components/settings/ProfileTab';
import ProviderTab from '@/components/settings/ProviderTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import BillingTab from '@/components/settings/BillingTab';
import TeamTab from '@/components/settings/TeamTab';
import SecurityTab from '@/components/settings/SecurityTab';
import PrivacyTab from '@/components/settings/PrivacyTab';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User, component: ProfileTab },
  { id: 'provider', label: 'Provider Details', icon: Building2, component: ProviderTab },
  { id: 'notifications', label: 'Notifications', icon: Bell, component: NotificationsTab },
  { id: 'billing', label: 'Billing', icon: CreditCard, component: BillingTab },
  { id: 'team', label: 'Team', icon: Users, component: TeamTab },
  { id: 'security', label: 'Security', icon: Shield, component: SecurityTab },
  { id: 'data', label: 'Data & Privacy', icon: Database, component: PrivacyTab },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component || ProfileTab;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-[28px] font-semibold text-slate-900">
          Settings
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your account and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sub-Nav */}
        <nav className="lg:w-[200px] flex-shrink-0">
          {/* Desktop: vertical tabs */}
          <div className="hidden lg:flex flex-col gap-0.5 sticky top-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left',
                  activeTab === tab.id
                    ? 'bg-leaf-50 text-leaf-700 border-l-[3px] border-leaf-500'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 border-l-[3px] border-transparent'
                )}
              >
                <tab.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile: horizontal scrollable tabs */}
          <div className="lg:hidden flex gap-1 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
                  activeTab === tab.id
                    ? 'bg-leaf-50 text-leaf-700 border border-leaf-200'
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                )}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
