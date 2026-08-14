import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Trash2, ExternalLink, AlertTriangle } from 'lucide-react';

export default function PrivacyTab() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [exportRequested, setExportRequested] = useState(false);

  const handleExport = () => {
    setExportRequested(true);
    setTimeout(() => setExportRequested(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Data Export */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-3 uppercase tracking-wide">
          Data Export
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          Download a complete copy of your policies, compliance data, and account
          information. We&apos;ll prepare a ZIP file and email you a download link.
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={handleExport}
            disabled={exportRequested}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 border-2 border-slate-200 rounded-xl hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            {exportRequested ? 'Request Sent' : 'Request Export'}
          </button>
          <span className="text-xs text-slate-400">
            Delivered as ZIP file within 24 hours
          </span>
        </div>
        <AnimatePresence>
          {exportRequested && (
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-3 text-xs text-leaf-600 bg-leaf-50 px-3 py-2 rounded-lg inline-block"
            >
              Your data export has been queued. Check your email for the download
              link.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Data Deletion */}
      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <h3 className="text-sm font-semibold text-status-red mb-3 uppercase tracking-wide">
          Delete Account
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          This will permanently delete all your data including policies,
          compliance records, and team information. This action cannot be undone.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-red-600 border-2 border-red-200 rounded-xl hover:bg-red-50 transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 z-50"
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteConfirm('');
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-modal p-6 z-50 mx-4"
            >
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-status-red" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-semibold text-slate-900">
                    Delete your account?
                  </h4>
                  <p className="text-sm text-slate-500 mt-1">
                    All your data will be permanently removed. This cannot be
                    undone.
                  </p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Type <span className="font-mono font-bold text-slate-900">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                  className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-status-red focus:ring-[3px] focus:ring-red-500/15 transition-all duration-200 font-mono"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirm('');
                  }}
                  className="flex-1 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteConfirm !== 'DELETE'}
                  className="flex-1 py-2.5 text-sm font-semibold text-white bg-status-red rounded-xl hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Permanently Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Privacy Links */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Privacy
        </h3>
        <div className="space-y-1">
          {[
            { label: 'Cookie preferences', href: '#' },
            { label: 'Privacy policy', href: '/support/privacy' },
            { label: 'How we use your data', href: '#' },
            { label: 'Terms of service', href: '#' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center justify-between py-3 border-b border-slate-50 last:border-b-0 group hover:bg-slate-50/50 -mx-2 px-2 rounded-lg transition-colors"
            >
              <span className="text-sm text-slate-700 group-hover:text-slate-900">
                {link.label}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
