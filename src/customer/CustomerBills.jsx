import React, { useState, useEffect, useRef } from 'react';
import { Receipt, Download, IndianRupee, CheckCircle2, AlertCircle, Search } from 'lucide-react';

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

const CustomerBills = () => {
  const stats = [
    { title: "Total Spent", value: "₹32,400", icon: <IndianRupee className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Paid Invoices", value: "12", icon: <CheckCircle2 className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Pending Due", value: "₹3,200", icon: <AlertCircle className="w-6 h-6" />, colorClass: "bg-red-50 text-red-600" }
  ];

  const invoices = [
    { id: "#INV1045", date: "May 15, 2024", amount: "₹3,200", status: "Paid", plan: "Family Plus" },
    { id: "#INV1044", date: "Apr 15, 2024", amount: "₹3,200", status: "Paid", plan: "Family Plus" },
    { id: "#INV1043", date: "Mar 15, 2024", amount: "₹3,200", status: "Paid", plan: "Family Plus" },
    { id: "#INV1042", date: "Feb 15, 2024", amount: "₹2,800", status: "Paid", plan: "Basic Sip" },
    { id: "#INV1041", date: "Jan 15, 2024", amount: "₹2,800", status: "Paid", plan: "Basic Sip" }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Bills & Invoices</h1>
          <p className="text-gray-500 mt-1">Download past invoices or pay pending dues.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.colorClass}`}>{stat.icon}</div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 flex justify-between items-center border-b border-slate-100">
            <h2 className="text-xl font-bold text-gray-900">Payment History</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search invoice..." className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none w-64 text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Invoice ID</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Plan</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-200 group">
                    <td className="py-4 px-6">
                      <span className="font-bold text-gray-800 text-sm flex items-center"><Receipt className="w-4 h-4 mr-2 text-blue-500" /> {inv.id}</span>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm hidden md:table-cell">{inv.plan}</td>
                    <td className="py-4 px-6 text-gray-500 text-sm">{inv.date}</td>
                    <td className="py-4 px-6 font-extrabold text-gray-900 text-sm">{inv.amount}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-blue-600 font-bold text-sm flex items-center hover:bg-blue-50 px-3 py-2 rounded-lg transition ml-auto opacity-0 group-hover:opacity-100">
                        <Download className="w-4 h-4 mr-1" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default CustomerBills;