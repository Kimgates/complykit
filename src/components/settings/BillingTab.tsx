import { useState } from 'react';
import { CreditCard, Download, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

const invoices: Invoice[] = [
  { id: 'inv-001', date: '15 Jan 2026', description: 'Growth Plan — Monthly', amount: '$39.00', status: 'Paid' },
  { id: 'inv-002', date: '15 Dec 2025', description: 'Growth Plan — Monthly', amount: '$39.00', status: 'Paid' },
  { id: 'inv-003', date: '15 Nov 2025', description: 'Growth Plan — Monthly', amount: '$39.00', status: 'Paid' },
  { id: 'inv-004', date: '15 Oct 2025', description: 'Growth Plan — Monthly', amount: '$39.00', status: 'Paid' },
  { id: 'inv-005', date: '15 Sep 2025', description: 'Growth Plan — Monthly', amount: '$39.00', status: 'Paid' },
];

export default function BillingTab() {
  const [promoCode, setPromoCode] = useState('');

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Current Plan
        </h3>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="px-3 py-1 bg-leaf-50 text-leaf-700 text-sm font-semibold rounded-full border border-leaf-200">
                Growth
              </span>
              <span className="flex items-center gap-1.5 text-sm text-leaf-600">
                <span className="w-2 h-2 bg-leaf-500 rounded-full inline-block" />
                Active
              </span>
            </div>
            <p className="text-base text-slate-700 mt-2">$39/month</p>
            <p className="text-sm text-slate-400">
              Next billing: 15 February 2026
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 text-sm font-semibold text-slate-700 border-2 border-slate-200 rounded-xl hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50 transition-all duration-200">
              Change Plan
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200">
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Payment Method
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-slate-100 rounded-md flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">
                Visa ending in 4242
              </p>
              <p className="text-xs text-slate-400">Expires 12/27</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-all duration-200">
            Update Card
          </button>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Billing History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3 pr-4">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3 pr-4">
                  Description
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3 pr-4">
                  Amount
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider pb-3 pr-4">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-slate-400 uppercase tracking-wider pb-3">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.id}
                  className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 pr-4 text-sm text-slate-600 whitespace-nowrap">
                    {inv.date}
                  </td>
                  <td className="py-3.5 pr-4 text-sm text-slate-700">
                    {inv.description}
                  </td>
                  <td className="py-3.5 pr-4 text-sm font-medium text-slate-800 whitespace-nowrap">
                    {inv.amount}
                  </td>
                  <td className="py-3.5 pr-4">
                    <span
                      className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        inv.status === 'Paid' &&
                          'bg-leaf-50 text-leaf-700',
                        inv.status === 'Pending' &&
                          'bg-amber-50 text-amber-700',
                        inv.status === 'Failed' && 'bg-red-50 text-red-700'
                      )}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <button className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-leaf-600 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Credits & Promotions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Credits & Promotions
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-leaf-700 font-medium">
                Referral credits: $20
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Refer a provider, get $20 off your next bill
              </p>
            </div>
            <button className="inline-flex items-center gap-1 text-sm font-medium text-leaf-600 hover:text-leaf-700 transition-colors">
              Invite
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 max-w-[200px] px-4 py-2.5 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
            <button className="px-5 py-2.5 text-sm font-semibold text-slate-700 border-2 border-slate-200 rounded-xl hover:border-leaf-400 hover:text-leaf-700 hover:bg-leaf-50 transition-all duration-200">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
