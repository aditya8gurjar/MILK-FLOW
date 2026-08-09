
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Phone, Mail, LifeBuoy, Send, Plus, ChevronDown } from 'lucide-react';

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

const CustomerSupport = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const faqs = [
    { q: "How do I pause my subscription?", a: "Go to 'My Subscription' and toggle Vacation Mode." },
    { q: "What are the delivery charges?", a: "Delivery is 100% free for all monthly plans." },
    { q: "How is the milk packaged?", a: "We use sanitized glass bottles for morning and pouches for evening." }
  ];

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Customer Support</h1>
          <p className="text-gray-500 mt-1">We are here to help. Reach out to us anytime.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Reveal delay={100}>
          <a href="https://wa.me/919876543210" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col items-center text-center group">
            <div className="p-4 bg-green-50 rounded-2xl mb-4 group-hover:scale-110 transition"><MessageCircle className="w-8 h-8 text-green-600" /></div>
            <h3 className="font-bold text-gray-800 text-lg">WhatsApp Us</h3>
            <p className="text-sm text-gray-500 mt-1">Fastest response time</p>
          </a>
        </Reveal>
        <Reveal delay={200}>
          <a href="tel:+919876543210" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col items-center text-center group">
            <div className="p-4 bg-blue-50 rounded-2xl mb-4 group-hover:scale-110 transition"><Phone className="w-8 h-8 text-blue-600" /></div>
            <h3 className="font-bold text-gray-800 text-lg">Call Support</h3>
            <p className="text-sm text-gray-500 mt-1">Mon-Sat: 6 AM - 8 PM</p>
          </a>
        </Reveal>
        <Reveal delay={300}>
          <a href="mailto:support@ratlamdairy.com" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full flex flex-col items-center text-center group">
            <div className="p-4 bg-yellow-50 rounded-2xl mb-4 group-hover:scale-110 transition"><Mail className="w-8 h-8 text-yellow-600" /></div>
            <h3 className="font-bold text-gray-800 text-lg">Email Us</h3>
            <p className="text-sm text-gray-500 mt-1">Replies within 24h</p>
          </a>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Raise a Ticket */}
        <Reveal delay={200}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center mb-8">
              <LifeBuoy className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Raise a Ticket</h2>
            </div>
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" placeholder="e.g. Delivery didn't arrive" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Description</label>
                <textarea rows="4" placeholder="Describe your issue..." className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition resize-none"></textarea>
              </div>
              <button type="button" className="btn-shine w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center relative">
                <span className="relative z-10 flex items-center"><Send className="w-4 h-4 mr-2" /> Submit Ticket</span>
              </button>
            </form>
          </div>
        </Reveal>

        {/* FAQs */}
        <Reveal delay={300}>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center mb-8">
              <Plus className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Quick FAQs</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-xl border-2 border-transparent hover:border-blue-100 transition">
                  <button className="w-full flex justify-between items-center p-4 text-left" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                    <span className="font-semibold text-gray-800 text-sm">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-blue-600 transition-transform duration-300 ${activeFaq === index ? 'transform rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="p-4 pt-0 text-gray-500 text-sm">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default CustomerSupport;