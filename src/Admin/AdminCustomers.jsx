import React, { useState, useEffect, useRef } from 'react';
import { Users, UserPlus, Search, Eye, Edit3, Trash2, PauseCircle, PlayCircle, Filter } from 'lucide-react';

// Custom Reveal Component
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AdminCustomers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: "Total Customers", value: "1,524", icon: <Users className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Active Subscriptions", value: "1,410", icon: <PlayCircle className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Paused Subscriptions", value: "114", icon: <PauseCircle className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" },
    { title: "New This Month", value: "86", icon: <UserPlus className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const customers = [
    { id: "#CUST1045", name: "Rajesh Sharma", area: "Station Road", plan: "Family Plus", qty: "2 L / Day", status: "Active", img: "https://i.pravatar.cc/150?img=12" },
    { id: "#CUST1046", name: "Priya Verma", area: "MG Road", plan: "Basic Sip", qty: "1 L / Day", status: "Paused", img: "https://i.pravatar.cc/150?img=45" },
    { id: "#CUST1047", name: "Anil Khandelwal", area: "Jaora Road", plan: "Premium Dairy", qty: "3 L / Day", status: "Active", img: "https://i.pravatar.cc/150?img=33" },
    { id: "#CUST1048", name: "Sunita Joshi", area: "Aligarh", plan: "Family Plus", qty: "2 L / Day", status: "Active", img: "https://i.pravatar.cc/150?img=44" },
    { id: "#CUST1049", name: "Mahesh Patel", area: "Civil Lines", plan: "Basic Sip", qty: "1 L / Day", status: "Cancelled", img: "https://i.pravatar.cc/150?img=13" },
    { id: "#CUST1050", name: "Kavita Jain", area: "Subhash Nagar", plan: "Premium Dairy", qty: "3 L / Day", status: "Active", img: "https://i.pravatar.cc/150?img=49" }
  ];

  const getStatusStyle = (status) => {
    if (status === 'Active') return 'bg-green-50 text-green-600';
    if (status === 'Paused') return 'bg-yellow-50 text-yellow-600';
    return 'bg-red-50 text-red-600';
  };

  return (
    <div className="space-y-8">
      
      {/* Page Header & Add Button */}
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Customer Management</h1>
            <p className="text-gray-500 mt-1">View, edit, and manage all your dairy customers.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <UserPlus className="w-5 h-5 mr-2" /> Add New Customer
          </button>
        </div>
      </Reveal>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex items-center space-x-4">
              <div className={`p-3 rounded-xl ${stat.colorClass}`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Customers Table Card */}
      <Reveal delay={200}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          
          {/* Table Header / Search */}
          <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-gray-900">All Customers</h2>
            
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search by name or area..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none w-full md:w-72 text-sm"
                />
              </div>
              <button className="bg-slate-100 hover:bg-slate-200 text-gray-600 p-2.5 rounded-full transition">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Area</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Plan & Qty</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-4 px-6 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition duration-200 group">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={customer.img} alt={customer.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-sm" />
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{customer.name}</h4>
                          <span className="text-xs text-gray-400">{customer.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 text-sm hidden md:table-cell">{customer.area}</td>
                    <td className="py-4 px-6 hidden lg:table-cell">
                      <span className="font-medium text-gray-800 text-sm">{customer.plan}</span>
                      <span className="text-xs text-gray-400 block">{customer.qty}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${getStatusStyle(customer.status)}`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
                        <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-6 flex justify-between items-center border-t border-slate-100">
            <p className="text-sm text-gray-500">Showing 1-6 of 1,524 customers</p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-slate-100 transition disabled:opacity-50" disabled>Prev</button>
              <button className="px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 text-white shadow-md transition">1</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-slate-100 transition">2</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-slate-100 transition">3</button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition">Next</button>
            </div>
          </div>

        </div>
      </Reveal>

    </div>
  );
};

export default AdminCustomers;