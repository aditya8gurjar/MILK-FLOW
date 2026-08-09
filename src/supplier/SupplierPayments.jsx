import React, { useState, useEffect, useRef } from 'react';
import { Wallet, IndianRupee, ArrowDownLeft, Landmark, Download } from 'lucide-react';

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

const SupplierPayments = () => {
  const payouts = [
    { id: "#PYT102", date: "May 15, 2024", amount: "₹18,500", status: "Paid", bank: "SBI •••• 4242" },
    { id: "#PYT101", date: "Apr 15, 2024", amount: "₹16,200", status: "Paid", bank: "SBI •••• 4242" },
    { id: "#PYT100", date: "Mar 15, 2024", amount: "₹15,800", status: "Paid", bank: "SBI •••• 4242" },
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Payment History</h1>
          <p className="text-gray-500 mt-1">Track your earnings and bank payouts.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Reveal delay={100} className="lg:col-span-1">
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-3xl p-8 text-white shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-10">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl"><Wallet className="w-6 h-6 text-green-200" /></div>
                <Landmark className="w-8 h-8 text-green-300" />
              </div>
              <p className="text-green-100 text-sm mb-2">Total Earnings (This Month)</p>
              <h2 className="text-4xl font-extrabold">₹18,500</h2>
            </div>
            <div className="relative z-10 mt-8 text-sm text-green-100">
              Next Payout Date: <span className="font-bold text-white">May 31, 2024</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Bank Account Details</h3>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-blue-50 rounded-lg mr-4"><Landmark className="w-6 h-6 text-blue-600" /></div>
                <div>
                  <h4 className="font-bold text-gray-800">State Bank of India</h4>
                  <p className="text-xs text-gray-500">A/C No: 32984729384729 • IFSC: SBIN0001234</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Verified</span>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={300}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-gray-900">Payout History</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {payouts.map(p => (
              <div key={p.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-slate-50/50 transition group">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <ArrowDownLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{p.amount} Credited</h4>
                    <span className="text-xs text-gray-400">{p.date} • {p.bank}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="inline-flex items-center text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-600">{p.status}</span>
                  <button className="text-blue-600 font-bold text-sm flex items-center hover:bg-blue-50 px-3 py-2 rounded-lg transition opacity-0 group-hover:opacity-100">
                    <Download className="w-4 h-4 mr-1" /> Slip
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default SupplierPayments;