import React, { useState, useEffect, useRef } from 'react';
import { Users, Droplets, Wallet, Truck, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Custom Reveal Component for Admin
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

const AdminDashboard = () => {
  const [chartVisible, setChartVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChartVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: "Total Customers", value: "1,524", change: "+12%", trend: "up", icon: <Users className="w-6 h-6" />, colorClass: "bg-blue-50 text-blue-600" },
    { title: "Milk Collected Today", value: "5,200 L", change: "+5%", trend: "up", icon: <Droplets className="w-6 h-6" />, colorClass: "bg-green-50 text-green-600" },
    { title: "Today's Revenue", value: "₹4.2L", change: "+8%", trend: "up", icon: <Wallet className="w-6 h-6" />, colorClass: "bg-yellow-50 text-yellow-600" },
    { title: "Pending Deliveries", value: "34", change: "-2%", trend: "down", icon: <Truck className="w-6 h-6" />, colorClass: "bg-indigo-50 text-indigo-600" }
  ];

  const chartData = [
    { day: "Mon", value: 60 }, { day: "Tue", value: 75 }, { day: "Wed", value: 50 },
    { day: "Thu", value: 85 }, { day: "Fri", value: 70 }, { day: "Sat", value: 95 }, { day: "Sun", value: 80 }
  ];

  const recentActivities = [
    { name: "Rajesh Sharma", action: "Subscribed to Family Plan", time: "2 mins ago" },
    { name: "Mahesh Patel", action: "Added 15L Buffalo Milk", time: "15 mins ago" },
    { name: "Priya Verma", action: "Payment of ₹3,200 received", time: "1 hour ago" },
    { name: "Delivery Boy 4", action: "Completed Route A", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <Reveal>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-blue-600/20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
          
          <div className="relative z-10 flex flex-wrap justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold mb-2">Good Morning, Rohit! 👋</h1>
              <p className="text-blue-100">Here is what's happening at your dairy today.</p>
            </div>
            <button className="mt-4 sm:mt-0 bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition transform hover:scale-105 shadow-lg flex items-center">
              View Detailed Reports <ArrowUpRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </Reveal>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.colorClass}`}>
                  {stat.icon}
                </div>
                <span className={`flex items-center text-sm font-bold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Charts & Quality Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Growth Chart - FIXED & STABILIZED */}
        <Reveal delay={200} className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Weekly Milk Collection</h3>
                <p className="text-sm text-gray-500">Litres collected per day (in thousands)</p>
              </div>
              <div className="flex items-center text-green-500 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 mr-1" /> +15% Growth
              </div>
            </div>

            {/* Graph Container */}
            <div className="relative w-full h-56 flex items-end justify-between gap-4 pt-6">
              {/* Background Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pb-8 pt-6">
                <div className="border-t border-dashed border-slate-100 w-full"></div>
                <div className="border-t border-dashed border-slate-100 w-full"></div>
                <div className="border-t border-dashed border-slate-100 w-full"></div>
              </div>

              {/* Bars */}
              {chartData.map((data, index) => (
                <div key={index} className="relative flex flex-col items-center justify-end h-full group flex-1 z-10">
                  {/* Tooltip */}
                  <span className="absolute top-0 opacity-0 group-hover:opacity-100 transition bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {data.value}L
                  </span>
                  
                  {/* Bar */}
                  <div 
                    className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out group-hover:from-blue-700 group-hover:to-blue-500"
                    style={{ height: `${chartVisible ? data.value : 0}%` }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Days Labels */}
            <div className="flex justify-between gap-4 mt-4">
              {chartData.map((data, index) => (
                <span key={index} className="text-sm font-medium text-gray-500 flex-1 text-center">{data.day}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Quality Rings */}
        <Reveal delay={400}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Quality Assurance</h3>
            <p className="text-sm text-gray-500 mb-8">Average testing results today</p>
            
            <div className="flex justify-around items-center flex-grow">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-extrabold text-green-500">92%</div>
                <p className="mt-2 text-sm font-medium text-gray-500">SNF Level</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-extrabold text-blue-500">85%</div>
                <p className="mt-2 text-sm font-medium text-gray-500">Fat Level</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Recent Activity Table */}
      <Reveal delay={300}>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="py-4 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="py-4 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Time</th>
                  <th className="py-4 px-4 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity, index) => (
                  <tr key={index} className="border-b border-slate-50 hover:bg-slate-50 transition duration-200">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img src={`https://i.pravatar.cc/150?img=${index + 10}`} alt="User" className="w-9 h-9 rounded-full" />
                        <span className="font-bold text-gray-800 text-sm">{activity.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">{activity.action}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm hidden md:table-cell">{activity.time}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-block bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Success</span>
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

export default AdminDashboard;