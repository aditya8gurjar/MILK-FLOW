import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, PieChart, TrendingUp, Users, Droplets } from 'lucide-react';

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

const AdminReports = () => {
  const [chart1Visible, setChart1Visible] = useState(false);
  const [chart2Visible, setChart2Visible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setChart1Visible(true), 300);
    const t2 = setTimeout(() => setChart2Visible(true), 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const monthlyData = [
    { month: "Jan", val: 65 }, { month: "Feb", val: 75 }, { month: "Mar", val: 60 },
    { month: "Apr", val: 80 }, { month: "May", val: 95 }, { month: "Jun", val: 85 }
  ];

  const productShare = [
    { name: "Cow Milk", percent: 50, color: "bg-blue-500" },
    { name: "Buffalo Milk", percent: 35, color: "bg-yellow-500" },
    { name: "Ghee/Curd", percent: 15, color: "bg-green-500" }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Deep dive into your dairy business performance.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Bar Chart */}
        <Reveal delay={200} className="lg:col-span-2">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Monthly Revenue Growth</h3>
                <p className="text-sm text-gray-500">Revenue in Lakhs (₹)</p>
              </div>
              <div className="flex items-center text-green-500 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 mr-1" /> +18% Overall
              </div>
            </div>

            <div className="relative w-full h-56 flex items-end justify-between gap-4 pt-6">
              <div className="absolute inset-0 flex flex-col justify-between pb-8 pt-6">
                <div className="border-t border-dashed border-slate-100 w-full"></div>
                <div className="border-t border-dashed border-slate-100 w-full"></div>
                <div className="border-t border-dashed border-slate-100 w-full"></div>
              </div>
              {monthlyData.map((data, index) => (
                <div key={index} className="relative flex flex-col items-center justify-end h-full group flex-1 z-10">
                  <span className="absolute top-0 opacity-0 group-hover:opacity-100 transition bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">₹{data.val}L</span>
                  <div className="w-full max-w-[50px] bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out group-hover:from-blue-700" style={{ height: `${chart1Visible ? data.val : 0}%` }}></div>
                  <span className="mt-3 text-sm font-medium text-gray-500">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Product Distribution */}
        <Reveal delay={400}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-900 mb-1">Product Distribution</h3>
            <p className="text-sm text-gray-500 mb-8">Sales by category</p>
            
            <div className="flex justify-center mb-8 relative">
              <div className="relative w-32 h-32">
                {/* CSS Donut Chart Simulation */}
                <div className="absolute inset-0 rounded-full border-[16px] border-slate-100"></div>
                <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-blue-500 transition-transform duration-1000" style={{ transform: chart2Visible ? 'rotate(180deg)' : 'rotate(0deg)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-auto">
              {productShare.map((p, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`w-3 h-3 rounded-full ${p.color} mr-2`}></span>
                    <span className="text-sm font-medium text-gray-600">{p.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{p.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Top Performers */}
      <Reveal delay={300}>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performing Villages</h3>
          <div className="space-y-4">
            {[
              { name: "Namli", liters: "1,200 L", percent: 90, icon: <Droplets className="w-5 h-5 text-blue-500" /> },
              { name: "Alot", liters: "950 L", percent: 75, icon: <Droplets className="w-5 h-5 text-blue-500" /> },
              { name: "Jaora", liters: "600 L", percent: 50, icon: <Droplets className="w-5 h-5 text-blue-500" /> }
            ].map((v, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="p-2 bg-slate-50 rounded-lg">{v.icon}</div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-bold text-gray-800">{v.name}</span>
                    <span className="text-sm font-medium text-gray-500">{v.liters}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-1000" style={{ width: chart2Visible ? `${v.percent}%` : '0%' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default AdminReports;