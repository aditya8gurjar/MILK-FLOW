import React, { useState, useEffect, useRef } from 'react';
import { Wallet, IndianRupee, TrendingUp, Search, Download, CheckCircle2, AlertCircle } from 'lucide-react';

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

const AdminBilling = () => {
  const stats = [
    { title: "Total Revenue", value: "₹4.2L", icon: <IndianRupee className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Pending Invoices", value: "₹85,000", icon: <AlertCircle className="w-6 h-6" />, colorClass: "bg-red-50 text-red-600" },
    { title: "Active Subscriptions", value: "1,410", icon: <Wallet className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Growth (MoM)", value: "+12%", icon: <TrendingUp className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const invoices = [
    { id: "#INV1045", cust: "Rajesh Sharma", plan: "Family Plus", amount: "₹3,200", date: "May 15", status: "Paid", img: "https://i.pravatar.cc/150?img=12" },
    { id: "#INV1046", cust: "Priya Verma", plan: "Basic Sip", amount: "₹1,500", date: "May 15", status: "Pending", img: "https://i.pravatar.cc/150?img=45" },
    { id: "#INV1047", cust: "Anil Khandelwal", plan: "Premium Dairy", amount: "₹5,500", date: "May 14", status: "Paid", img: "https://i.pravatar.cc/150?img=33" },
    { id: "#INV1048", cust: "Sunita Joshi", plan: "Family Plus", amount: "₹3,200", date: "May 14", status: "Failed", img: "https://i.pravatar.cc/150?img=44" }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Billing & Payments</h1>
          <p className="text-gray-500 mt-1">Manage invoices, transactions, and revenue.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <h2 className="text-xl font-bold text-gray-900">Recent Invoices</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search invoice..." className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none w-64 text-sm" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Plan</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-200 group">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={inv.img} alt={inv.cust} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{inv.cust}</h4>
                          <span className="text-xs text-gray-400">{inv.id} • {inv.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm hidden md:table-cell">{inv.plan}</td>
                    <td className="py-4 px-6 font-extrabold text-gray-900 text-sm">{inv.amount}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full ${inv.status === 'Paid' ? 'bg-green-50 text-green-600' : inv.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                        {inv.status === 'Paid' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {inv.status}
                      </span>
                    </td>
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

export default AdminBilling;