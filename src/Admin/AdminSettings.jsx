import React, { useState, useEffect, useRef } from 'react';
import { Settings, Bell, Lock, DollarSign, Save, ShieldCheck } from 'lucide-react';

const Reveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(ref.current); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// Custom Toggle Switch
const Toggle = ({ enabled, onChange }) => (
  <button onClick={() => onChange(!enabled)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}>
    <span className={`inline-block w-4 h-4 transform rounded-full bg-white transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const AdminSettings = () => {
  const [notifSettings, setNotifSettings] = useState({ lowStock: true, newCustomer: true, paymentFailed: false });

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">System Settings</h1>
          <p className="text-gray-500 mt-1">Manage dairy pricing, notifications, and security.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Milk Pricing Settings */}
        <Reveal delay={100}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-green-50 rounded-xl text-green-600"><DollarSign className="w-6 h-6" /></div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Milk Pricing</h2>
                <p className="text-sm text-gray-500">Update daily rates per liter.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cow Milk Rate (per Litre)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input type="number" defaultValue="60" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buffalo Milk Rate (per Litre)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input type="number" defaultValue="80" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition" />
                </div>
              </div>
              <button className="btn-shine bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition w-full flex items-center justify-center relative">
                <span className="relative z-10 flex items-center"><Save className="w-4 h-4 mr-2" /> Save Pricing</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Notifications Settings */}
        <Reveal delay={200}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600"><Bell className="w-6 h-6" /></div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-500">Configure alert preferences.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Low Stock Alerts</h4>
                  <p className="text-xs text-gray-500">Notify when packaging is low.</p>
                </div>
                <Toggle enabled={notifSettings.lowStock} onChange={(val) => setNotifSettings({ ...notifSettings, lowStock: val })} />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">New Customer Signup</h4>
                  <p className="text-xs text-gray-500">Alert when someone registers.</p>
                </div>
                <Toggle enabled={notifSettings.newCustomer} onChange={(val) => setNotifSettings({ ...notifSettings, newCustomer: val })} />
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Payment Failures</h4>
                  <p className="text-xs text-gray-500">Alert on failed transactions.</p>
                </div>
                <Toggle enabled={notifSettings.paymentFailed} onChange={(val) => setNotifSettings({ ...notifSettings, paymentFailed: val })} />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Security Settings */}
        <Reveal delay={300} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-red-50 rounded-xl text-red-600"><Lock className="w-6 h-6" /></div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Security & Password</h2>
                <p className="text-sm text-gray-500">Change your admin account password.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition" />
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="flex items-center text-blue-600">
                <ShieldCheck className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">2FA is currently Active.</span>
              </div>
              <button className="text-blue-600 font-bold text-sm hover:underline">Disable</button>
            </div>

            <button className="mt-6 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition flex items-center">
              <Save className="w-4 h-4 mr-2" /> Update Password
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AdminSettings;