import React, { useState, useEffect, useRef } from 'react';
import { FileText, Upload, CheckCircle2, Clock, FileCheck2, Landmark, IdCard } from 'lucide-react';

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

const SupplierDocuments = () => {
  const docs = [
    { name: "Aadhaar Card", desc: "Identity Proof", status: "Verified", icon: <IdCard className="w-8 h-8 text-blue-600" /> },
    { name: "Bank Passbook", desc: "SBI •••• 4242", status: "Verified", icon: <Landmark className="w-8 h-8 text-green-600" /> },
    { name: "Land Documents", desc: "Farm Ownership Proof", status: "Pending", icon: <FileCheck2 className="w-8 h-8 text-yellow-600" /> },
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Documents</h1>
          <p className="text-gray-500 mt-1">Manage your KYC and verification documents securely.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((doc, index) => (
          <Reveal key={index} delay={index * 100}>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col group">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition">{doc.icon}</div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${doc.status === 'Verified' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                  {doc.status}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-1">{doc.name}</h3>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{doc.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-slate-100">
                <button className="w-full flex items-center justify-center py-2 rounded-lg text-sm font-bold transition bg-slate-100 text-gray-600 hover:bg-slate-200">
                  <Upload className="w-4 h-4 mr-2" /> {doc.status === 'Verified' ? 'Re-upload' : 'Upload Now'}
                </button>
              </div>
            </div>
          </Reveal>
        ))}
        
        {/* Upload New Document Card */}
        <Reveal delay={400}>
          <label className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-green-500 hover:bg-green-50 transition duration-300 h-full flex flex-col items-center justify-center text-center cursor-pointer group">
            <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Upload New</h3>
            <p className="text-gray-500 text-sm">Add any other document (PDF, JPG)</p>
            <input type="file" className="hidden" />
          </label>
        </Reveal>
      </div>
    </div>
  );
};

export default SupplierDocuments;