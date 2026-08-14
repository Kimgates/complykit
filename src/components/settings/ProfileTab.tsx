import { useState } from 'react';
import { Camera, Trash2 } from 'lucide-react';

export default function ProfileTab() {
  const [form, setForm] = useState({
    firstName: 'Jane',
    lastName: 'Cooper',
    email: 'jane@complykit.au',
    phone: '0412 345 678',
    bio: 'NDIS registered provider since 2021. Passionate about delivering quality care services.',
    role: 'Owner / Director',
    timezone: 'Australia/Sydney',
    dateFormat: 'DD/MM/YYYY',
    language: 'English (AU)',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Avatar
        </h3>
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-full bg-leaf-100 flex items-center justify-center text-leaf-700 font-heading text-2xl font-bold">
            {form.firstName[0]}{form.lastName[0]}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all duration-200">
                <Camera className="w-4 h-4" />
                Change Photo
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200">
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
            <p className="text-xs text-slate-400">
              JPG, PNG or GIF. Max 2MB.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              First Name
            </label>
            <input
              type="text"
              value={form.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              value={form.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Role / Title
            </label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              placeholder="e.g. Owner, Support Worker"
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Bio
            </label>
            <textarea
              value={form.bio}
              onChange={(e) => update('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 resize-y"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Timezone
            </label>
            <select
              value={form.timezone}
              onChange={(e) => update('timezone', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
            >
              <option>Australia/Sydney</option>
              <option>Australia/Melbourne</option>
              <option>Australia/Brisbane</option>
              <option>Australia/Perth</option>
              <option>Australia/Adelaide</option>
              <option>Australia/Darwin</option>
              <option>Australia/Hobart</option>
              <option>Australia/Canberra</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Language
            </label>
            <select
              value={form.language}
              onChange={(e) => update('language', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
            >
              <option>English (AU)</option>
              <option>English (UK)</option>
              <option>English (US)</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date Format
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => update('dateFormat', 'DD/MM/YYYY')}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    form.dateFormat === 'DD/MM/YYYY'
                      ? 'border-leaf-500'
                      : 'border-slate-300'
                  }`}
                >
                  {form.dateFormat === 'DD/MM/YYYY' && (
                    <div className="w-2.5 h-2.5 bg-leaf-500 rounded-full" />
                  )}
                </div>
                <span className="text-sm text-slate-600">DD/MM/YYYY</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <div
                  onClick={() => update('dateFormat', 'MM/DD/YYYY')}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    form.dateFormat === 'MM/DD/YYYY'
                      ? 'border-leaf-500'
                      : 'border-slate-300'
                  }`}
                >
                  {form.dateFormat === 'MM/DD/YYYY' && (
                    <div className="w-2.5 h-2.5 bg-leaf-500 rounded-full" />
                  )}
                </div>
                <span className="text-sm text-slate-600">MM/DD/YYYY</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="px-8 py-3 bg-leaf-500 text-white font-semibold rounded-xl hover:bg-leaf-600 hover:-translate-y-[1px] hover:shadow-button-primary active:translate-y-0 transition-all duration-200">
          Save Changes
        </button>
      </div>
    </div>
  );
}
