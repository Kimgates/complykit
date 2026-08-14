import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Mail, UserCheck, UserX } from 'lucide-react';
import { cn } from '@/lib/utils';

type MemberStatus = 'Active' | 'Pending';
type MemberRole = 'Admin' | 'Editor' | 'Viewer';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  addedDate: string;
  initials: string;
  isOwner?: boolean;
}

const roleLabels: Record<MemberRole, string> = {
  Admin: 'Full access',
  Editor: 'Can edit policies',
  Viewer: 'Read-only',
};

export default function TeamTab() {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: '1', name: 'You (Owner)', email: 'jane@complykit.au', role: 'Admin', status: 'Active', addedDate: '1 Nov 2025', initials: 'JC', isOwner: true },
    { id: '2', name: 'Sarah M.', email: 'sarah@complykit.au', role: 'Editor', status: 'Active', addedDate: '15 Dec 2025', initials: 'SM' },
    { id: '3', name: 'David K.', email: 'david@complykit.au', role: 'Viewer', status: 'Pending', addedDate: '5 Jan 2026', initials: 'DK' },
  ]);

  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<MemberRole>('Viewer');

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    const newMember: TeamMember = {
      id: `m-${Date.now()}`,
      name: inviteEmail.split('@')[0],
      email: inviteEmail,
      role: inviteRole,
      status: 'Pending',
      addedDate: new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }),
      initials: inviteEmail[0].toUpperCase() + inviteEmail[1]?.toUpperCase() || 'U',
    };
    setMembers((prev) => [...prev, newMember]);
    setInviteEmail('');
    setInviteRole('Viewer');
    setShowInvite(false);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const resendInvite = (id: string) => {
    // Placeholder for resend logic
    console.log('Resend invite to', id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-heading text-[22px] font-semibold text-slate-900">
            Team Members ({members.length - 1} of 10)
          </h3>
          <p className="text-sm text-slate-400 mt-0.5">
            Manage who has access to your ComplyKit account
          </p>
        </div>
        <button
          onClick={() => setShowInvite(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-leaf-500 text-white font-semibold text-sm rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          Invite Member
        </button>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInvite && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 z-50"
              onClick={() => setShowInvite(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-modal p-6 z-50 mx-4"
            >
              <div className="flex items-center justify-between mb-5">
                <h4 className="font-heading text-lg font-semibold text-slate-900">
                  Invite Team Member
                </h4>
                <button
                  onClick={() => setShowInvite(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="colleague@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as MemberRole)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
                  >
                    {(['Admin', 'Editor', 'Viewer'] as MemberRole[]).map((role) => (
                      <option key={role} value={role}>
                        {role} — {roleLabels[role]}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleInvite}
                  className="w-full py-3 bg-leaf-500 text-white font-semibold rounded-xl hover:bg-leaf-600 transition-all duration-200 mt-2"
                >
                  Send Invite
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Member List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_120px_100px_100px_140px] gap-4 px-6 py-3 bg-slate-50 border-b border-slate-100">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Member
          </span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Role
          </span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Status
          </span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            Added
          </span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider text-right">
            Actions
          </span>
        </div>

        {/* Members */}
        {members.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            className="grid grid-cols-1 md:grid-cols-[1fr_120px_100px_100px_140px] gap-3 md:gap-4 px-6 py-4 border-b border-slate-50 last:border-b-0 items-center hover:bg-slate-50/50 transition-colors"
          >
            {/* Member */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-700 text-xs font-bold flex-shrink-0">
                {member.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {member.name}
                </p>
                <p className="text-xs text-slate-400 truncate">
                  {member.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div>
              <span
                className={cn(
                  'inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium',
                  member.role === 'Admin' && 'bg-purple-50 text-purple-700',
                  member.role === 'Editor' && 'bg-blue-50 text-blue-700',
                  member.role === 'Viewer' && 'bg-slate-100 text-slate-600'
                )}
              >
                {member.role}
              </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-1.5">
              {member.status === 'Active' ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-leaf-500" />
                  <span className="text-sm text-leaf-600">Active</span>
                </>
              ) : (
                <>
                  <UserX className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-sm text-amber-600">Pending</span>
                </>
              )}
            </div>

            {/* Added Date */}
            <span className="text-sm text-slate-400">{member.addedDate}</span>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2">
              {member.status === 'Pending' && (
                <button
                  onClick={() => resendInvite(member.id)}
                  className="text-xs font-medium text-leaf-600 hover:text-leaf-700 px-2 py-1 hover:bg-leaf-50 rounded-lg transition-colors"
                >
                  Resend
                </button>
              )}
              {!member.isOwner && (
                <button
                  onClick={() => removeMember(member.id)}
                  className="text-xs font-medium text-red-500 hover:text-red-600 px-2 py-1 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
