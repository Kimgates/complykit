import { useState } from 'react';
import { callHealth, type HealthCheckResult } from '@/lib/edge/callHealth';

export default function DevHealthCheck() {
  const [result, setResult] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const runCheck = async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await callHealth();
      setResult(res);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Dev Only — Edge Function Health
        </span>
        <button
          onClick={runCheck}
          disabled={loading}
          className="px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg hover:bg-slate-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Checking...' : 'Run Check'}
        </button>
      </div>
      {err && (
        <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1 mb-2">
          {err}
        </p>
      )}
      {result && (
        <pre className="text-xs text-slate-700 bg-white border border-slate-100 rounded p-2 overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
