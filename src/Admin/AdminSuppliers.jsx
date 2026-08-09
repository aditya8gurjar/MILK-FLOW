import React, { useState, useEffect, useRef } from 'react';
import { 
  Tractor, UserPlus, Search, MapPin, Droplet, Phone, Eye, 
  Wallet, TrendingUp, Milk, Award
} from 'lucide-react';

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

// Animated Capacity Bar
const CapacityBar = ({ value, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
      <div 
        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-[1500ms] ease-out"
        style={{ width: isVisible ? `${value}%` : '0%' }}
      ></div>
    </div>
  );
};

const AdminSuppliers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: "Total Suppliers", value: "254", icon: <Tractor className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Today's Collection", value: "5,200 L", icon: <Droplet className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Pending Payments", value: "₹1.2L", icon: <Wallet className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" },
    { title: "Avg Fat Content", value: "7.8%", icon: <Award className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const suppliers = [
    { id: "#SUP01", name: "Mahesh Patel", village: "Namli", phone: "98765 43210", milkType: "Buffalo", capacity: 85, fat: "8.2%", status: "Active", img: "https://i.pravatar.cc/150?img=60" },
    { id: "#SUP02", name: "Suresh Choudhary", village: "Alot", phone: "98765 12345", milkType: "Cow", capacity: 60, fat: "6.5%", status: "Active", img: "https://i.pravatar.cc/150?img=15" },
    { id: "#SUP03", name: "Rameshwar Singh", village: "Jaora", phone: "98765 67890", milkType: "Mixed", capacity: 90, fat: "7.0%", status: "Active", img: "https://i.pravatar.cc/150?img=33" },
    { id: "#SUP04", name: "Kamal Verma", village: "Piploda", phone: "98765 54321", milkType: "Buffalo", capacity: 40, fat: "8.5%", status: "Inactive", img: "https://i.pravatar.cc/150?img=51" },
    { id: "#SUP05", name: "Gajendra Joshi", village: "Bajna", phone: "98765 98765", milkType: "Cow", capacity: 75, fat: "6.2%", status: "Active", img: "https://i.pravatar.cc/150?img=68" },
    { id: "#SUP06", name: "Devendra Chauhan", village: "Namli", phone: "98765 11111", milkType: "Buffalo", capacity: 95, fat: "8.8%", status: "Active", img: "https://i.pravatar.cc/150?img=12" }
  ];

  return (
    <div className="space-y-8">
      
      {/* Page Header & Add Button */}
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Supplier Management</h1>
            <p className="text-gray-500 mt-1">Manage village farmers, milk collection, and payments.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <UserPlus className="w-5 h-5 mr-2" /> Add New Supplier
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

      {/* Search Bar */}
      <Reveal delay={200}>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search by farmer or village..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none w-full text-sm"
            />
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-500 font-medium">
            <span className="flex items-center"><Milk className="w-4 h-4 mr-2 text-blue-500" /> Cow</span>
            <span className="flex items-center"><Milk className="w-4 h-4 mr-2 text-yellow-500" /> Buffalo</span>
          </div>
        </div>
      </Reveal>

      {/* Suppliers Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier, index) => (
          <Reveal key={supplier.id} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 group relative overflow-hidden">
              
              {/* Background Decorative Icon */}
              <Tractor className="absolute -top-4 -right-4 w-24 h-24 text-slate-50 group-hover:text-blue-50 transition duration-500 rotate-12" />

              {/* Card Header */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img src={supplier.img} alt={supplier.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md" />
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{supplier.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" /> {supplier.village}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  supplier.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {supplier.status}
                </span>
              </div>

              {/* Card Body / Stats */}
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center font-medium">
                    <Milk className="w-4 h-4 mr-2 text-gray-400" /> Milk Type
                  </span>
                  <span className="font-bold text-gray-800">{supplier.milkType}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 flex items-center font-medium">
                    <Award className="w-4 h-4 mr-2 text-gray-400" /> Fat Content
                  </span>
                  <span className="font-bold text-gray-800">{supplier.fat}</span>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500 flex items-center font-medium">
                      <TrendingUp className="w-4 h-4 mr-2 text-gray-400" /> Daily Capacity
                    </span>
                    <span className="font-bold text-gray-800">{supplier.capacity}%</span>
                  </div>
                  <CapacityBar value={supplier.capacity} delay={index * 100} />
                </div>
              </div>

              {/* Card Footer / Actions */}
              <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <a href={`tel:${supplier.phone}`} className="text-blue-600 font-bold text-sm flex items-center hover:bg-blue-50 px-3 py-2 rounded-lg transition">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </a>
                <button className="text-gray-500 font-bold text-sm flex items-center hover:bg-slate-100 px-3 py-2 rounded-lg transition">
                  View Details <Eye className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

    </div>
  );
};

export default AdminSuppliers;