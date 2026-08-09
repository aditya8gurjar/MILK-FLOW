import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, Beaker, Award, TrendingUp } from 'lucide-react';

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

const SupplierQuality = () => {
  const [chartVisible, setChartVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setChartVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const fatData = [
    { day: "Mon", val: 8.1 }, { day: "Tue", val: 8.4 }, { day: "Wed", val: 8.0 },
    { day: "Thu", val: 8.5 }, { day: "Fri", val: 8.2 }, { day: "Sat", val: 8.6 }, { day: "Sun", val: 8.3 }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Quality Reports</h1>
          <p className="text-gray-500 mt-1">Track your milk's Fat and SNF performance.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Reveal delay={100}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl"><Beaker className="w-6 h-6" /></div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">8.2%</h3>
              <p className="text-sm text-gray-500 font-medium">Avg Fat (This Week)</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl"><BarChart3 className="w-6 h-6" /></div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">9.1%</h3>
              <p className="text-sm text-gray-500 font-medium">Avg SNF (This Week)</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Award className="w-6 h-6" /></div>
            <div>
              <h3 className="text-2xl font-extrabold text-gray-900">A+ Grade</h3>
              <p className="text-sm text-gray-500 font-medium">Premium Quality Milk</p>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={400}>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Weekly Fat Content Trend</h3>
              <p className="text-sm text-gray-500">Daily fat percentage analysis</p>
            </div>
            <div className="flex items-center text-green-500 font-bold text-sm bg-green-50 px-3 py-1 rounded-full">
              <TrendingUp className="w-4 h-4 mr-1" /> +0.4% Improvement
            </div>
          </div>

          <div className="relative w-full h-64 flex items-end justify-between gap-4 pt-6">
            <div className="absolute inset-0 flex flex-col justify-between pb-8 pt-6">
              <div className="border-t border-dashed border-slate-100 w-full"></div>
              <div className="border-t border-dashed border-slate-100 w-full"></div>
              <div className="border-t border-dashed border-slate-100 w-full"></div>
            </div>
            {fatData.map((data, index) => (
              <div key={index} className="relative flex flex-col items-center justify-end h-full group flex-1 z-10">
                <span className="absolute top-0 opacity-0 group-hover:opacity-100 transition bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">{data.val}%</span>
                <div 
                  className="w-full max-w-[50px] bg-gradient-to-t from-yellow-500 to-amber-400 rounded-t-lg transition-all duration-1000 ease-out group-hover:from-yellow-600"
                  style={{ height: `${chartVisible ? (data.val / 10) * 100 : 0}%` }}
                ></div>
                <span className="mt-3 text-sm font-medium text-gray-500">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default SupplierQuality;