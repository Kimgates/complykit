import { useState } from 'react';
import { Info } from 'lucide-react';

const serviceTypeOptions = [
  'Daily Living',
  'Social & Community Participation',
  'Transport',
  'Plan Management',
  'Support Coordination',
  'Therapy',
  'Home Modifications',
  'Assistive Technology',
  'Supported Employment',
  'Respite Care',
  'SIL / SDA',
];

const states = [
  'New South Wales',
  'Victoria',
  'Queensland',
  'Western Australia',
  'South Australia',
  'Tasmania',
  'Australian Capital Territory',
  'Northern Territory',
];

export default function ProviderTab() {
  const [form, setForm] = useState({
    orgName: 'Bright Care Services Pty Ltd',
    abn: '12 345 678 901',
    ndisReg: '4050001234',
    providerType: 'Registered Provider',
    yearsOperating: '3-5 years',
    participantCount: '10-25',
    workerCount: '5-10',
    selectedServices: ['Daily Living', 'Social & Community Participation', 'Transport'],
    selectedStates: ['New South Wales'],
    primaryLocation: 'Sydney, NSW',
    registrationStatus: 'Registered',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const toggleState = (state: string) => {
    setForm((prev) => ({
      ...prev,
      selectedStates: prev.selectedStates.includes(state)
        ? prev.selectedStates.filter((s) => s !== state)
        : [...prev.selectedStates, state],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Business Information */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Business Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Business / Provider Name
            </label>
            <input
              type="text"
              value={form.orgName}
              onChange={(e) => update('orgName', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              ABN
            </label>
            <input
              type="text"
              value={form.abn}
              onChange={(e) => update('abn', e.target.value)}
              placeholder="12 345 678 901"
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              NDIS Registration Number
            </label>
            <input
              type="text"
              value={form.ndisReg}
              onChange={(e) => update('ndisReg', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              NDIS Provider Type
            </label>
            <select
              value={form.providerType}
              onChange={(e) => update('providerType', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
            >
              <option>Registered Provider</option>
              <option>Unregistered Provider</option>
              <option>Self-Managed Participant</option>
              <option>Plan Managed</option>
              <option>Support Coordinator</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Years Operating
            </label>
            <select
              value={form.yearsOperating}
              onChange={(e) => update('yearsOperating', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
            >
              <option>Less than 1</option>
              <option>1-2 years</option>
              <option>3-5 years</option>
              <option>5-10 years</option>
              <option>10+ years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Service Details
        </h3>

        {/* Service Types */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2.5">
            Services Provided
          </label>
          <div className="flex flex-wrap gap-2">
            {serviceTypeOptions.map((service) => {
              const selected = form.selectedServices.includes(service);
              return (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'bg-leaf-50 text-leaf-700 border border-leaf-200'
                      : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        {/* States */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-700 mb-2.5">
            States / Territories Operated In
          </label>
          <div className="flex flex-wrap gap-2">
            {states.map((state) => {
              const selected = form.selectedStates.includes(state);
              return (
                <button
                  key={state}
                  onClick={() => toggleState(state)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'bg-leaf-50 text-leaf-700 border border-leaf-200'
                      : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {state}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Primary Location
            </label>
            <input
              type="text"
              value={form.primaryLocation}
              onChange={(e) => update('primaryLocation', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Participant Count
            </label>
            <select
              value={form.participantCount}
              onChange={(e) => update('participantCount', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
            >
              <option>1-5</option>
              <option>5-10</option>
              <option>10-25</option>
              <option>25-50</option>
              <option>50-100</option>
              <option>100+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Worker Count
            </label>
            <select
              value={form.workerCount}
              onChange={(e) => update('workerCount', e.target.value)}
              className="w-full px-4 py-3 bg-white border-[1.5px] border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-leaf-500 focus:ring-[3px] focus:ring-leaf-500/15 transition-all duration-200 appearance-none"
            >
              <option>Just me</option>
              <option>2-5</option>
              <option>5-10</option>
              <option>10-25</option>
              <option>25-50</option>
              <option>50+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Profile */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h3 className="text-sm font-semibold text-slate-800 mb-4 uppercase tracking-wide">
          Compliance Profile
        </h3>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Registration Status
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            {(['Registered', 'Unregistered', 'In Progress'] as const).map(
              (status) => (
                <label
                  key={status}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <div
                    onClick={() => update('registrationStatus', status)}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      form.registrationStatus === status
                        ? 'border-leaf-500'
                        : 'border-slate-300'
                    }`}
                  >
                    {form.registrationStatus === status && (
                      <div className="w-2.5 h-2.5 bg-leaf-500 rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-slate-600">{status}</span>
                </label>
              )
            )}
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="flex items-start gap-3 px-4 py-3 bg-teal-50 rounded-xl border border-teal-100">
        <Info className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-teal-700">
          This information helps us tailor your policies and compliance
          recommendations. Update anytime.
        </p>
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
