import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Droplets, Wallet, PauseCircle, PlayCircle, Plus, ArrowUpRight, CheckCircle2, Truck } from 'lucide-react';

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

// Animated Progress Ring for Subscription Cycle
const ProgressRing = ({ percentage }) => {
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const circumference = 2 * Math.PI * 40;
  const offset = isVisible ? circumference - (percentage / 100) * circumference : circumference;

  return (
    <div ref={ref} className="relative w-24 h-24">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
        <circle 
          cx="48" cy="48" r="40" 
          stroke="currentColor" 
          strokeWidth="8" 
          fill="transparent" 
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-blue-600 transition-all duration-[2000ms] ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-extrabold text-gray-900">{isVisible ? `${percentage}%` : '0%'}</span>
        <span className="text-[10px] text-gray-400 font-medium">Cycle Done</span>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const stats = [
    { title: "Wallet Balance", value: "₹1,250", icon: <Wallet className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Deliveries This Month", value: "18", icon: <CheckCircle2 className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Extra Orders", value: "2", icon: <Plus className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" }
  ];

  const upcomingDeliveries = [
    { day: "Today", date: "May 20", slot: "Morning", time: "5:30 AM - 6:00 AM", status: "Out for Delivery", icon: <Sun className="w-5 h-5 text-yellow-500" /> },
    { day: "Today", date: "May 20", slot: "Evening", time: "5:30 PM - 6:00 PM", status: "Scheduled", icon: <Moon className="w-5 h-5 text-indigo-500" /> },
    { day: "Tomorrow", date: "May 21", slot: "Morning", time: "5:30 AM - 6:00 AM", status: "Scheduled", icon: <Sun className="w-5 h-5 text-yellow-500" /> }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner & Active Plan */}
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Welcome Message */}
          <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-600/20">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
            
            <div className="relative z-10">
              <h1 className="text-3xl font-extrabold mb-2">Good Morning, Rajesh! 👋</h1>
              <p className="text-blue-100 mb-8">Your fresh milk is out for delivery and will arrive by 6:00 AM.</p>
              
              {/* Active Plan Details */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between border border-white/20">
                <div>
                  <p className="text-blue-100 text-xs font-medium uppercase tracking-wider mb-1">Active Plan</p>
                  <h3 className="text-xl font-bold">Family Plus (2L/Day)</h3>
                </div>
                <button className="bg-red-500/80 hover:bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center transition">
                  <PauseCircle className="w-4 h-4 mr-1" /> Pause
                </button>
              </div>
            </div>
          </div>

          {/* Cycle Progress */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Billing Cycle</h3>
            <p className="text-sm text-gray-500 mb-6">15 days left for this month</p>
            <ProgressRing percentage={50} />
          </div>

        </div>
      </Reveal>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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

      {/* Upcoming Deliveries & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upcoming Deliveries Timeline */}
        <Reveal delay={200} className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-gray-900">Upcoming Deliveries</h3>
              <button className="text-blue-600 font-bold text-sm hover:underline flex items-center">
                View History <ArrowUpRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            <div className="relative border-l-2 border-slate-100 ml-4 space-y-8">
              {upcomingDeliveries.map((d, index) => (
                <div key={index} className="relative pl-8">
                  <div className={`absolute -left-[11px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-md z-10 ${d.status === 'Out for Delivery' ? 'bg-blue-500 animate-ping' : 'bg-slate-300'}`}></div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition">
                    <div className="flex items-center space-x-4 mb-2 md:mb-0">
                      <div className="p-2 bg-white rounded-lg shadow-sm">{d.icon}</div>
                      <div>
                        <h4 className="font-bold text-gray-800 text-sm">{d.slot} Delivery</h4>
                        <p className="text-xs text-gray-400">{d.day}, {d.date} • {d.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {d.status === 'Out for Delivery' && <Truck className="w-4 h-4 text-blue-500" />}
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${d.status === 'Out for Delivery' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                        {d.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Quick Actions */}
        <Reveal delay={400}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-8">Quick Actions</h3>
            
            <div className="space-y-4 flex-grow">
              <button className="w-full flex items-center justify-between p-4 bg-blue-50 rounded-xl text-blue-600 font-bold hover:bg-blue-100 transition group">
                <span className="flex items-center"><Plus className="w-5 h-5 mr-3" /> Order Extra Milk</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 bg-yellow-50 rounded-xl text-yellow-600 font-bold hover:bg-yellow-100 transition group">
                <span className="flex items-center"><PauseCircle className="w-5 h-5 mr-3" /> Vacation Mode</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-green-50 rounded-xl text-green-600 font-bold hover:bg-green-100 transition group">
                <span className="flex items-center"><Wallet className="w-5 h-5 mr-3" /> Add Money to Wallet</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>Next bill generated on: <span className="font-bold text-gray-800">May 31</span></span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  );
};

export default CustomerDashboard;