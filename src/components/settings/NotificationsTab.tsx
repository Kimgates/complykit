import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ToggleItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  proOnly?: boolean;
}

export default function NotificationsTab() {
  const [toggles, setToggles] = useState<ToggleItem[]>([
    { id: 'compliance', label: 'Compliance Alerts', description: 'Critical gaps and compliance issues', enabled: true },
    { id: 'screening', label: 'Worker Screening Reminders', description: 'Expiry warnings and renewal alerts', enabled: true },
    { id: 'regulatory', label: 'Regulatory Updates', description: 'NDIS regulation changes affecting you', enabled: true },
    { id: 'weekly', label: 'Weekly Summary', description: 'Weekly compliance health digest', enabled: true },
    { id: 'learning', label: 'Learning Reminders', description: 'Continue your in-progress modules', enabled: false },
    { id: 'product', label: 'Product Updates', description: 'New features and improvements', enabled: false },
    { id: 'marketing', label: 'Marketing', description: 'Tips, case studies, and offers', enabled: false },
  ]);

  const [screeningDays, setScreeningDays] = useState<string[]>(['30', '60']);
  const [complianceFreq, setComplianceFreq] = useState('Weekly');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const toggle = (id: string) => {
    setToggles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  const toggleDay = (day: string) => {
    setScreeningDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-5 uppercase tracking-wide">
          Email Notifications
        </h3>
        <div className="space-y-1">
          {toggles.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3.5 border-b border-slate-100 last:border-b-0"
            >
              <div className="pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                  {item.proOnly && (
                    <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-semibold rounded-full uppercase">
                      Pro
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {item.description}
                </p>
              </div>
              <ToggleSwitch enabled={item.enabled} onChange={() => toggle(item.id)} />
            </div>
          ))}
        </div>
      </div>

      {/* Alert Timing */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Alert Timing
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Screening expiry warning
            </label>
            <div className="flex items-center gap-2">
              {['30', '60', '90'].map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border',
                    screeningDays.includes(day)
                      ? 'bg-leaf-50 text-leaf-700 border-leaf-200'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                  )}
                >
                  {day} days
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">
              Compliance check frequency
            </label>
            <select
              value={complianceFreq}
              onChange={(e) => setComplianceFreq(e.target.value)}
              className="px-4 py-2.5 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Notifications */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-5 uppercase tracking-wide">
          Mobile Notifications
        </h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between py-3.5 border-b border-slate-100">
            <div>
              <span className="text-sm font-medium text-slate-700">
                Push notifications
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Receive alerts on your device
              </p>
            </div>
            <ToggleSwitch enabled={pushEnabled} onChange={() => setPushEnabled(!pushEnabled)} />
          </div>
          <div className="flex items-center justify-between py-3.5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">
                  SMS alerts for critical issues
                </span>
                <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[10px] font-semibold rounded-full uppercase">
                  Pro
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Get text messages for urgent compliance matters
              </p>
            </div>
            <ToggleSwitch enabled={smsEnabled} onChange={() => setSmsEnabled(!smsEnabled)} />
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-leaf-500 text-white font-semibold rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all duration-200">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

function ToggleSwitch({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0',
        enabled ? 'bg-leaf-500' : 'bg-slate-200'
      )}
    >
      <div
        className={cn(
          'absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200',
          enabled ? 'translate-x-5' : 'translate-x-0'
        )}
      />
    </button>
  );
}
