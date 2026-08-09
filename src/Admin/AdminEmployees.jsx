import React, { useState, useEffect, useRef } from 'react';
import { Users, UserPlus, Phone, Mail, Briefcase, Bike, Factory, UserCog, Search } from 'lucide-react';

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

const AdminEmployees = () => {
  const stats = [
    { title: "Total Staff", value: "42", icon: <Users className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Delivery Boys", value: "28", icon: <Bike className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Collection Staff", value: "10", icon: <Factory className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" },
    { title: "Managers", value: "4", icon: <UserCog className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const employees = [
    { id: "#EMP01", name: "Ramesh Kumar", role: "Delivery Boy", area: "Station Road", phone: "98765 12345", status: "On Duty", img: "https://i.pravatar.cc/150?img=12" },
    { id: "#EMP02", name: "Suresh Singh", role: "Delivery Boy", area: "MG Road", phone: "98765 67890", status: "Off Duty", img: "https://i.pravatar.cc/150?img=15" },
    { id: "#EMP03", name: "Anil Mehta", role: "Collection Manager", area: "Namli Village", phone: "98765 11111", status: "On Duty", img: "https://i.pravatar.cc/150?img=33" },
    { id: "#EMP04", name: "Vikram Patel", role: "Quality Analyst", area: "Ratlam HQ", phone: "98765 22222", status: "On Duty", img: "https://i.pravatar.cc/150?img=51" },
    { id: "#EMP05", name: "Sneha Sharma", role: "Support Manager", area: "Ratlam HQ", phone: "98765 33333", status: "Off Duty", img: "https://i.pravatar.cc/150?img=44" },
    { id: "#EMP06", name: "Kamal Verma", role: "Delivery Boy", area: "Jaora Road", phone: "98765 44444", status: "On Duty", img: "https://i.pravatar.cc/150?img=68" }
  ];

  const getRoleIcon = (role) => {
    if (role.includes("Delivery")) return <Bike className="w-4 h-4 text-green-500" />;
    if (role.includes("Collection")) return <Factory className="w-4 h-4 text-yellow-500" />;
    return <UserCog className="w-4 h-4 text-indigo-500" />;
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Employee Management</h1>
            <p className="text-gray-500 mt-1">Manage your dairy staff, roles, and shifts.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <UserPlus className="w-5 h-5 mr-2" /> Add Employee
          </button>
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
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-gray-900">Staff Directory</h2>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search staff..." className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none w-64 text-sm" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((emp, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img src={emp.img} alt={emp.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md" />
                    <div>
                      <h3 className="font-bold text-gray-800">{emp.name}</h3>
                      <span className="text-xs text-gray-400">{emp.id}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${emp.status === 'On Duty' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{emp.status}</span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="flex items-center text-gray-600 font-medium">
                    {getRoleIcon(emp.role)} <span className="ml-2">{emp.role}</span>
                  </p>
                  <p className="flex items-center text-gray-500">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-400" /> {emp.area}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
                  <a href={`tel:${emp.phone}`} className="flex-1 bg-blue-50 text-blue-600 font-bold text-xs py-2 rounded-lg flex items-center justify-center hover:bg-blue-100 transition">
                    <Phone className="w-4 h-4 mr-1" /> Call
                  </a>
                  <button className="flex-1 bg-slate-100 text-gray-600 font-bold text-xs py-2 rounded-lg flex items-center justify-center hover:bg-slate-200 transition">
                    <Mail className="w-4 h-4 mr-1" /> Message
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

export default AdminEmployees;