import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';

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

const Refund = () => {
  const sections = [
    { id: "eligible", title: "1. Refund Eligibility" },
    { id: "process", title: "2. Refund Process" },
    { id: "timing", title: "3. Processing Time" },
    { id: "wallet", title: "4. Wallet Adjustments" }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
              <FileText className="w-4 h-4 mr-2" /> REFUND POLICY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Fair <span className="text-shine">Refund Terms</span>
            </h1>
            <p className="text-gray-500">Last Updated: May 15, 2024</p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-12">
          <Reveal direction="left" className="hidden lg:block">
            <div className="sticky top-28">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Table of Contents</h3>
              <ul className="space-y-3">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a href={`#${sec.id}`} className="text-gray-500 hover:text-green-600 hover:translate-x-1 transition duration-300 inline-block font-medium text-sm">
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-3 space-y-12">
            <Reveal direction="up" id="eligible">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-green-600 rounded-full mr-3"></span>
                Refund Eligibility
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>If you receive milk that is sour, tampered with, or leaking, you are eligible for a full refund or a free replacement for the next delivery.</p>
                <p>If you pause your subscription and have paid in advance, the unused days will be adjusted in your next billing cycle or refunded to your wallet.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="process">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-green-600 rounded-full mr-3"></span>
                Refund Process
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>To request a refund, please report the issue to our support team via WhatsApp or Email within 24 hours of the delivery. You may be asked to provide a photo of the defective product.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="timing">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-green-600 rounded-full mr-3"></span>
                Processing Time
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Approved refunds to your Ratlam Dairy wallet are processed instantly. Bank refunds may take 5-7 business days to reflect in your account.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="wallet">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-green-600 rounded-full mr-3"></span>
                Wallet Adjustments
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Missed deliveries initiated by our team (e.g., vehicle breakdown) will automatically credit the refund amount to your wallet, which can be used for future orders.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-12 h-12 text-green-600 mb-4 mx-auto" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Need a Refund?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">Contact our support team within 24 hours of your delivery to report the issue.</p>
            <Link to="/contact" className="bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition flex items-center shadow-lg hover:scale-105 transform w-fit mx-auto">
              Contact Support <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Refund;