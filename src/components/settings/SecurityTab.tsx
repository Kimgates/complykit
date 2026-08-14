import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Monitor, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActiveSession {
  id: string;
  browser: string;
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
}

const sessions: ActiveSession[] = [
  { id: 's1', browser: 'Chrome 131', device: 'MacBook Pro', location: 'Sydney, AU', lastActive: 'Active now', current: true },
  { id: 's2', browser: 'Safari 18', device: 'iPhone 15', location: 'Sydney, AU', lastActive: '2 hours ago' },
  { id: 's3', browser: 'Firefox 133', device: 'Windows PC', location: 'Melbourne, AU', lastActive: '3 days ago' },
];

export default function SecurityTab() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [activeSessions, setActiveSessions] = useState(sessions);

  const passwordStrength = useMemo(() => {
    if (!newPassword) return 0;
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[0-9]/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;
    return score;
  }, [newPassword]);

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = [
    'bg-status-red',
    'bg-status-amber',
    'bg-status-amber',
    'bg-leaf-500',
  ];

  const passwordsMatch =
    !confirmPassword || newPassword === confirmPassword;

  const revokeSession = (id: string) => {
    setActiveSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const revokeAllOthers = () => {
    setActiveSessions((prev) => prev.filter((s) => s.current));
  };

  return (
    <div className="space-y-6">
      {/* Password Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Password
        </h3>
        <div className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
            {/* Strength Indicator */}
            {newPassword && (
              <div className="mt-2 space-y-1.5">
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        'h-1.5 flex-1 rounded-full transition-all duration-300',
                        passwordStrength >= level
                          ? strengthColors[passwordStrength - 1]
                          : 'bg-slate-200'
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Password strength:{" "}
                  <span
                    className={cn(
                      'font-medium',
                      passwordStrength === 1 && 'text-status-red',
                      passwordStrength === 2 && 'text-status-amber',
                      passwordStrength === 3 && 'text-status-amber',
                      passwordStrength === 4 && 'text-leaf-600'
                    )}
                  >
                    {strengthLabels[passwordStrength - 1]}
                  </span>
                </p>
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                'w-full px-4 py-3 bg-white border-[1.5px] rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-[3px] transition-all duration-200',
                !passwordsMatch
                  ? 'border-status-red focus:border-status-red focus:ring-red-500/15'
                  : 'border-slate-200 focus:border-leaf-500 focus:ring-leaf-500/15'
              )}
            />
            <AnimatePresence>
              {!passwordsMatch && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs text-status-red mt-1"
                >
                  Passwords do not match
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <button
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              !passwordsMatch ||
              passwordStrength < 2
            }
            className="px-6 py-2.5 bg-leaf-500 text-white font-semibold text-sm rounded-xl hover:bg-leaf-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-leaf-500 transition-all duration-200"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Two-Factor Authentication
        </h3>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {twoFAEnabled ? (
              <Shield className="w-5 h-5 text-leaf-500 mt-0.5 flex-shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-status-amber mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className="text-sm font-medium text-slate-700">
                {twoFAEnabled ? 'Enabled' : 'Not enabled'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <button
            onClick={() => setTwoFAEnabled(!twoFAEnabled)}
            className={cn(
              'px-5 py-2 text-sm font-semibold rounded-xl border-2 transition-all duration-200',
              twoFAEnabled
                ? 'border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600'
                : 'border-slate-200 text-slate-700 hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50'
            )}
          >
            {twoFAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">
            Active Sessions
          </h3>
          {activeSessions.length > 1 && (
            <button
              onClick={revokeAllOthers}
              className="text-xs font-medium text-slate-500 hover:text-red-500 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors"
            >
              Revoke All Others
            </button>
          )}
        </div>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between py-3 border-b border-slate-50 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <Monitor className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-700">
                    {session.browser} on {session.device}
                    {session.current && (
                      <span className="ml-2 text-[10px] bg-leaf-50 text-leaf-700 px-1.5 py-0.5 rounded-full font-medium">
                        Current
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-slate-400">
                    {session.location} &bull; {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => revokeSession(session.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
