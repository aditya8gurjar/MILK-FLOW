import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, X, ArrowRight, Sparkles, Sun, Moon, 
  Zap, Crown, ChevronDown, Milk
} from 'lucide-react';

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

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [activeFaq, setActiveFaq] = useState(null);

  const plans = [
    {
      name: "Basic Sip",
      icon: <Sun className="w-8 h-8 text-yellow-500" />,
      dailyPrice: 60,
      monthlyPrice: 1500,
      desc: "Perfect for individuals trying out our service.",
      features: [
        "1 Liter Cow Milk Daily",
        "Morning Delivery Only",
        "Standard Packaging",
        "WhatsApp Support",
        "Pause Subscription Anytime"
      ],
      popular: false
    },
    {
      name: "Family Plus",
      icon: <Crown className="w-8 h-8 text-blue-600" />,
      dailyPrice: 120,
      monthlyPrice: 3200,
      desc: "Best for daily needs of a standard family.",
      features: [
        "2 Liters Cow/Buffalo Milk Mix",
        "Morning & Evening Delivery",
        "500g Curd / Week (Free)",
        "Premium Glass Bottle Packaging",
        "Priority Customer Support",
        "Free Delivery Charges"
      ],
      popular: true
    },
    {
      name: "Premium Dairy",
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      dailyPrice: 200,
      monthlyPrice: 5500,
      desc: "Complete dairy solution for large families.",
      features: [
        "3 Liters Buffalo Milk Daily",
        "Morning & Evening Delivery",
        "1Kg Ghee / Month (Free)",
        "1Kg Paneer / Month (Free)",
        "Premium Gold Packaging",
        "Dedicated Account Manager"
      ],
      popular: false
    }
  ];

  // Comparison Table Data
  const comparisonFeatures = [
    { feature: "Cow Milk", basic: true, family: true, premium: true },
    { feature: "Buffalo Milk", basic: false, family: true, premium: true },
    { feature: "Morning Delivery", basic: true, family: true, premium: true },
    { feature: "Evening Delivery", basic: false, family: true, premium: true },
    { feature: "Glass Bottle Packaging", basic: false, family: true, premium: true },
    { feature: "Free Curd (Weekly)", basic: false, family: true, premium: true },
    { feature: "Free Ghee (Monthly)", basic: false, family: false, premium: true },
    { feature: "Priority Support", basic: false, family: true, premium: true },
  ];

  const faqs = [
    { q: "Can I change my plan after subscribing?", a: "Yes! You can upgrade or downgrade your subscription plan at any time from your Customer Dashboard. Changes reflect from the next billing cycle." },
    { q: "What happens if I go on vacation?", a: "You can activate 'Vacation Mode' from your dashboard. We will pause your deliveries and adjust your bill accordingly. No milk wasted, no money lost!" },
    { q: "Are there any hidden delivery charges?", a: "No. Delivery is 100% free for Family Plus and Premium Dairy plans. For the Basic plan, a nominal ₹50/month delivery charge applies." },
    { q: "How is the monthly bill calculated?", a: "Monthly plans are billed for 30 days. If you opt for daily billing, you pay at the end of the month based on actual deliveries made." }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO & TOGGLE SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
              SUBSCRIPTION PLANS
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Choose Your <span className="text-shine">Perfect Plan</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              Flexible plans designed for every family size. No contracts, cancel anytime. Pure milk, guaranteed.
            </p>
          </Reveal>

          {/* Animated Toggle Switch */}
          <Reveal direction="up" delay={200}>
            <div className="inline-flex items-center bg-white p-2 rounded-full shadow-lg border border-gray-100">
              <button
                onClick={() => setIsMonthly(false)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center space-x-2 ${
                  !isMonthly ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Sun className="w-5 h-5" /> <span>Daily</span>
              </button>
              <button
                onClick={() => setIsMonthly(true)}
                className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center space-x-2 ${
                  isMonthly ? 'bg-blue-600 text-white shadow-md scale-105' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Moon className="w-5 h-5" /> <span>Monthly</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${isMonthly ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'}`}>10% OFF</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10 items-center">
          {plans.map((plan, index) => (
            <Reveal key={index} delay={index * 200} direction="up" className="h-full">
              <div className={`relative h-full rounded-2xl transition-all duration-300 hover:-translate-y-4 group ${
                plan.popular ? 'gradient-border animate-glow-border scale-105 z-10' : 'bg-white shadow-xl border border-gray-100 hover:shadow-2xl'
              }`}>
                
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center animate-bounce">
                    <Zap className="w-4 h-4 mr-1 fill-current" /> MOST POPULAR
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">
                  <div className={`mb-6 inline-flex p-3 rounded-2xl transition group-hover:rotate-12 group-hover:scale-110 ${
                    plan.popular ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm mb-6">{plan.desc}</p>
                  
                  <div className="mb-8 flex items-end">
                    <span className="text-5xl font-extrabold text-gray-900">
                      ₹{isMonthly ? plan.monthlyPrice : plan.dailyPrice}
                    </span>
                    <span className="text-gray-400 ml-2 mb-1">/ {isMonthly ? 'month' : 'day'}</span>
                  </div>

                  <Link 
                    to="/register" 
                    className={`block text-center py-4 rounded-full font-bold transition transform hover:scale-105 mb-8 ${
                      plan.popular 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Subscribe Now
                  </Link>

                  <ul className="space-y-4 mt-auto">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-600">
                        <div className={`mr-3 mt-1 p-1 rounded-full ${plan.popular ? 'bg-green-100' : 'bg-gray-100'}`}>
                          <Check className={`w-4 h-4 ${plan.popular ? 'text-green-600' : 'text-gray-600'}`} />
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= COMPARISON TABLE ================= */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">COMPARE PLANS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Find The Best Fit For You</h2>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100}>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left p-6 font-bold text-gray-500">Features</th>
                    <th className="p-6 text-center font-bold text-yellow-500">Basic</th>
                    <th className="p-6 text-center font-bold text-blue-600 bg-blue-50/50">Family</th>
                    <th className="p-6 text-center font-bold text-green-600">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((row, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                      }`}
                    >
                      <td className="p-6 font-medium text-gray-700">{row.feature}</td>
                      <td className="p-6 text-center">
                        {row.basic ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                      </td>
                      <td className="p-6 text-center bg-blue-50/30">
                        {row.family ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                      </td>
                      <td className="p-6 text-center">
                        {row.premium ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : <X className="w-5 h-5 text-gray-300 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PRICING FAQ ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-bold tracking-widest">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Pricing Questions?</h2>
            </div>
          </Reveal>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 100} direction="left">
                <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition hover:scale-[1.02]">
                  <button 
                    className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-800 text-lg">{faq.q}</span>
                    <ChevronDown className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${activeFaq === index ? 'transform rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40' : 'max-h-0'}`}>
                    <div className="p-5 pt-0 text-gray-600">{faq.a}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-600 opacity-20 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-green-600 opacity-20 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <Milk className="w-12 h-12 text-blue-400 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Still Have Doubts?</h2>
            <p className="text-lg mb-8 text-gray-300 max-w-xl">
              Contact our team directly. We’ll help you choose the right plan and answer any questions you have about our dairy process.
            </p>
            <Link to="/contact" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
              Contact Us <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Pricing;