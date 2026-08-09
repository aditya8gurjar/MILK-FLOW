import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Wallet, Edit3, Sun, Moon, CheckCircle2, Truck } from 'lucide-react';

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

const AdminCustomerDetails = () => {
  const timeline = [
    { day: "Today", slot: "Morning", time: "5:45 AM", status: "Delivered", icon: <Sun className="w-5 h-5 text-yellow-500" /> },
    { day: "Today", slot: "Evening", time: "5:30 PM", status: "Out for Delivery", icon: <Moon className="w-5 h-5 text-indigo-500" /> },
    { day: "Yesterday", slot: "Morning", time: "5:50 AM", status: "Delivered", icon: <Sun className="w-5 h-5 text-yellow-500" /> },
  ];

  return (
    <div className="space-y-8">
      
      {/* Back Button & Header */}
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <Link to="/admin/customers" className="text-gray-500 hover:text-blue-600 flex items-center mb-2 transition">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Customers
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">Customer Details</h1>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <Edit3 className="w-5 h-5 mr-2" /> Edit Profile
          </button>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile & Plan */}
        <div className="lg:col-span-1 space-y-6">
          <Reveal delay={100}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
              <img src="https://i.pravatar.cc/150?img=12" alt="Customer" className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100 shadow-lg mx-auto mb-4" />
              <h2 className="text-xl font-extrabold text-gray-900">Rajesh Sharma</h2>
              <p className="text-sm text-gray-500">Customer since Jan 2024</p>
              <span className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-600">Active</span>
              
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-4 text-left">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" /> <span className="text-sm">rajesh@example.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" /> <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-start text-gray-600">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" /> <span className="text-sm">12, Station Road, Near Bus Stand, Ratlam</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-white shadow-lg">
              <div className="flex items-center mb-4">
                <Wallet className="w-6 h-6 mr-2 text-blue-200" />
                <h3 className="font-bold">Wallet & Plan</h3>
              </div>
              <p className="text-5xl font-extrabold mb-1">₹1,250</p>
              <p className="text-blue-200 text-sm mb-6">Current Balance</p>
              
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                <p className="text-xs text-blue-200 uppercase tracking-wider">Active Plan</p>
                <h4 className="text-lg font-bold">Family Plus (2L/Day)</h4>
                <p className="text-xs text-blue-100 mt-1 flex items-center"><Calendar className="w-3 h-3 mr-1" /> Renews on May 31</p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Timeline & Stats */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-6">
            <Reveal delay={150}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition">
                <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                <h3 className="text-2xl font-extrabold text-gray-900">18</h3>
                <p className="text-sm text-gray-500">Deliveries This Month</p>
              </div>
            </Reveal>
            <Reveal delay={250}>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition">
                <Truck className="w-8 h-8 text-blue-500 mb-2" />
                <h3 className="text-2xl font-extrabold text-gray-900">2</h3>
                <p className="text-sm text-gray-500">Extra Orders</p>
              </div>
            </Reveal>
          </div>

          {/* Delivery Timeline */}
          <Reveal delay={300}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-gray-900 mb-8">Recent Delivery Activity</h3>
              
              <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
                {timeline.map((t, index) => (
                  <div key={index} className="relative pl-8">
                    <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-md z-10 ${t.status === 'Out for Delivery' ? 'bg-blue-500 animate-ping' : 'bg-green-500'}`}></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                      <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                        <div className="p-2 bg-white rounded-lg shadow-sm">{t.icon}</div>
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{t.slot} Delivery</h4>
                          <p className="text-xs text-gray-400">{t.day}, {t.time}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${t.status === 'Out for Delivery' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        {t.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomerDetails;