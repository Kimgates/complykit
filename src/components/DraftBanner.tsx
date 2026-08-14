import { AlertTriangle } from 'lucide-react';

export default function DraftBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-amber-800">DRAFT</p>
        <p className="text-sm text-amber-700">
          This document is a draft prepared from your responses. You must review, edit, and approve it before use. This tool does not provide compliance advice.
        </p>
      </div>
    </div>
  );
}
