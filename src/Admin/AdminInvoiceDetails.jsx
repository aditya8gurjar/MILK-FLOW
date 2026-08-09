import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Milk, IndianRupee } from 'lucide-react';

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

const AdminInvoiceDetails = () => {
  const items = [
    { desc: "Cow Milk (Morning)", qty: "30 Liters", rate: "₹60", amount: "₹1,800" },
    { desc: "Buffalo Milk (Evening)", qty: "30 Liters", rate: "₹80", amount: "₹2,400" },
    { desc: "Extra Ghee (500g)", qty: "1 Unit", rate: "₹275", amount: "₹275" },
  ];
  const subtotal = 4475;
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <Link to="/admin/billing" className="text-gray-500 hover:text-blue-600 flex items-center mb-2 transition">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Invoices
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">Invoice #INV-1045</h1>
            <p className="text-gray-500">Issued on May 15, 2024</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center">
            <Download className="w-5 h-5 mr-2" /> Download PDF
          </button>
        </div>
      </Reveal>

      {/* Invoice Card */}
      <Reveal delay={200}>
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg"><Milk className="w-6 h-6 text-white" /></div>
              <div>
                <h2 className="text-xl font-bold">Ratlam Dairy</h2>
                <p className="text-xs text-slate-400">Ratlam, Madhya Pradesh 457001</p>
              </div>
            </div>
            <div className="text-right mt-4 sm:mt-0">
              <h3 className="text-2xl font-extrabold">INVOICE</h3>
              <p className="text-sm text-slate-400">#INV-1045</p>
            </div>
          </div>

          {/* Bill To & Dates */}
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-slate-100">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Billed To</p>
              <h4 className="font-bold text-gray-800">Rajesh Sharma</h4>
              <p className="text-sm text-gray-500">12, Station Road, Near Bus Stand,</p>
              <p className="text-sm text-gray-500">Ratlam, MP 457001</p>
              <p className="text-sm text-gray-500 mt-2">+91 98765 43210</p>
            </div>
            <div className="sm:text-right">
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Invoice Date</p>
                <p className="font-bold text-gray-800">May 15, 2024</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Due Date</p>
                <p className="font-bold text-red-500">May 20, 2024</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="p-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase rounded-l-lg">Description</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Qty</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase">Rate</th>
                  <th className="py-3 px-4 text-xs font-bold text-gray-500 uppercase rounded-r-lg text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-slate-50">
                    <td className="py-4 px-4 font-medium text-gray-800 text-sm">{item.desc}</td>
                    <td className="py-4 px-4 text-gray-500 text-sm">{item.qty}</td>
                    <td className="py-4 px-4 text-gray-500 text-sm">{item.rate}</td>
                    <td className="py-4 px-4 font-bold text-gray-800 text-sm text-right">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="p-8 flex justify-end">
            <div className="w-full sm:w-1/2 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-gray-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Charges</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-200">
                <span className="font-bold text-gray-800">Total Amount</span>
                <span className="text-2xl font-extrabold text-blue-600 flex items-center"><IndianRupee className="w-5 h-5" />{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate-50 p-6 text-center">
            <p className="text-sm text-gray-500">Thank you for choosing Ratlam Dairy! This is a computer-generated invoice and does not require a signature.</p>
          </div>

        </div>
      </Reveal>
    </div>
  );
};

export default AdminInvoiceDetails;