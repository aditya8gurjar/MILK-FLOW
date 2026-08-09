import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, ShieldCheck } from 'lucide-react';

// UPGRADED Reveal Component
const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
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

  const hiddenStyles = {
    up: 'opacity-0 translate-y-16',
    left: 'opacity-0 -translate-x-16',
    right: 'opacity-0 translate-x-16',
    zoom: 'opacity-0 scale-90',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1200ms] ease-out ${className} ${
        isVisible ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : hiddenStyles[direction]
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Terms = () => {
  const sections = [
    { id: "intro", title: "1. Introduction" },
    { id: "subscriptions", title: "2. Subscriptions & Deliveries" },
    { id: "payments", title: "3. Payments & Billing" },
    { id: "quality", title: "4. Quality & Returns" },
    { id: "liability", title: "5. Limitation of Liability" }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
              <FileText className="w-4 h-4 mr-2" /> LEGAL AGREEMENT
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Terms & <span className="text-shine">Conditions</span>
            </h1>
            <p className="text-gray-500">Last Updated: May 15, 2024</p>
          </Reveal>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-12">
          
          {/* Sidebar Navigation */}
          <Reveal direction="left" className="hidden lg:block">
            <div className="sticky top-28">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Table of Contents</h3>
              <ul className="space-y-3">
                {sections.map((sec) => (
                  <li key={sec.id}>
                    <a 
                      href={`#${sec.id}`} 
                      className="text-gray-500 hover:text-blue-600 hover:translate-x-1 transition duration-300 inline-block font-medium text-sm"
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            
            <Reveal direction="up" id="intro">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></span>
                Introduction
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Welcome to Ratlam Dairy. By subscribing to our daily milk delivery services, purchasing our dairy products, or using our website and mobile application, you agree to be bound by these Terms and Conditions.</p>
                <p>These terms outline the rules and regulations for using our services. If you do not agree with any part of these terms, please do not use our services.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="subscriptions">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></span>
                Subscriptions & Deliveries
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Customers can choose between daily and monthly subscription plans. Deliveries are made during the selected morning (5 AM - 8 AM) or evening (5 PM - 7 PM) slots.</p>
                <p>Customers can pause or modify their subscriptions via their dashboard. Requests for pausing subscriptions must be made at least 24 hours in advance to avoid being charged for the next day's delivery.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="payments">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></span>
                Payments & Billing
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Monthly subscriptions must be paid in advance. Daily subscriptions are billed at the end of the month based on the actual number of deliveries made.</p>
                <p>We accept payments via UPI, Credit/Debit Cards, and Net Banking. In case of failed transactions, please contact customer support.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="quality">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></span>
                Quality & Returns
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>We guarantee 100% pure and unadulterated milk. If you find the milk packet tampered with, leaking, or sour, please report it to our support team within 24 hours of delivery.</p>
                <p>Upon verification, we will replace the product free of charge or adjust the amount in your next billing cycle.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="liability">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></span>
                Limitation of Liability
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Ratlam Dairy shall not be liable for any indirect, incidental, or consequential damages arising out of the use of our services. Our total liability shall not exceed the amount paid by the customer for the specific product causing the claim.</p>
                <p>We are not responsible for delays caused by natural disasters, strikes, or government restrictions.</p>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-16 bg-gray-50">
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-12 h-12 text-blue-600 mb-4 mx-auto" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Have Questions About Our Policies?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">Our customer support team is always here to help you understand our terms and conditions.</p>
            <Link to="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition flex items-center shadow-lg hover:scale-105 transform w-fit mx-auto">
              Contact Support <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Terms;