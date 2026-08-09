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

const Cancellation = () => {
  const sections = [
    { id: "sub", title: "1. Subscription Cancellation" },
    { id: "daily", title: "2. Daily Order Cancellation" },
    { id: "charges", title: "3. Cancellation Charges" },
    { id: "reactivate", title: "4. Reactivation" }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
              <FileText className="w-4 h-4 mr-2" /> CANCELLATION POLICY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Easy <span className="text-shine">Cancellations</span>
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
                    <a href={`#${sec.id}`} className="text-gray-500 hover:text-red-600 hover:translate-x-1 transition duration-300 inline-block font-medium text-sm">
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-3 space-y-12">
            <Reveal direction="up" id="sub">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-red-600 rounded-full mr-3"></span>
                Subscription Cancellation
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>You can cancel your monthly subscription anytime directly from your Customer Dashboard. There are no lock-ins or cancellation fees for stopping your recurring milk delivery.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="daily">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-red-600 rounded-full mr-3"></span>
                Daily Order Cancellation
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>If you wish to cancel a specific day's delivery (e.g., going out of town), you must pause your subscription or cancel the day's order before 10:00 PM the previous night. Orders cancelled after the cutoff time may not be eligible for a refund.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="charges">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-red-600 rounded-full mr-3"></span>
                Cancellation Charges
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>We do not charge any fees for standard cancellations. However, frequent last-minute cancellations may result in a temporary hold on your account to prevent milk wastage.</p>
              </div>
            </Reveal>

            <Reveal direction="up" id="reactivate">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-4 flex items-center">
                <span className="w-1.5 h-8 bg-red-600 rounded-full mr-3"></span>
                Reactivation
              </h2>
              <div className="text-gray-600 space-y-4 leading-relaxed">
                <p>Cancelled subscriptions can be reactivated anytime by logging into your dashboard and selecting a new plan. Your previous delivery details will be saved for easy setup.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <ShieldCheck className="w-12 h-12 text-red-600 mb-4 mx-auto" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">Need Help Cancelling?</h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto">Our support team can guide you through the cancellation process from your dashboard.</p>
            <Link to="/contact" className="bg-red-600 text-white px-8 py-4 rounded-full font-bold hover:bg-red-700 transition flex items-center shadow-lg hover:scale-105 transform w-fit mx-auto">
              Contact Support <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Cancellation;