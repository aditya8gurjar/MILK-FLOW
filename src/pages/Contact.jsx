import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, MessageCircle, Mail, MapPin, Send, Clock, 
  ArrowRight, Navigation, ChevronUp
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

const Contact = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const contactMethods = [
    { 
      icon: <Phone className="w-8 h-8 text-blue-600" />, 
      title: "Call Us", 
      desc: "Mon-Sat: 6:00 AM - 8:00 PM",
      info: "+91 98765 43210",
      link: "tel:+919876543210",
      bg: "bg-blue-50"
    },
    { 
      icon: <MessageCircle className="w-8 h-8 text-green-600" />, 
      title: "WhatsApp", 
      desc: "Quick chat support 24/7",
      info: "Chat with us",
      link: "https://wa.me/919876543210",
      bg: "bg-green-50"
    },
    { 
      icon: <Mail className="w-8 h-8 text-red-600" />, 
      title: "Email Us", 
      desc: "We reply within 24 hours",
      info: "support@ratlamdairy.com",
      link: "mailto:support@ratlamdairy.com",
      bg: "bg-red-50"
    }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
              GET IN TOUCH
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              We'd Love to <span className="text-shine">Hear From You</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you have a question about our subscription, delivery routes, or just want to say hello, our team is ready to answer all your questions.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= CONTACT CARDS (3D Tilt) ================= */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {contactMethods.map((method, index) => (
            <Reveal key={index} delay={index * 150} direction="up">
              <a 
                href={method.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group perspective-1000"
              >
                <div className={`relative ${method.bg} p-8 rounded-3xl text-center transition duration-300 group-hover:shadow-2xl group-hover:-translate-y-2 border border-transparent group-hover:border-blue-100 preserve-3d group-hover:[transform:rotateX(5deg)_rotateY(-5deg)]`}>
                  <div className="bg-white p-4 rounded-2xl shadow-sm w-fit mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                    {method.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-xl mb-2">{method.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{method.desc}</p>
                  <p className="text-blue-600 font-bold flex items-center justify-center group-hover:underline">
                    {method.info} <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition" />
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= FORM & MAP SPLIT SECTION ================= */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Animated Form */}
          <Reveal direction="left">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-gray-500 mb-8">Fill out the form below, and we'll get back to you as soon as possible.</p>
              
              <form className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" placeholder="98765 43210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none bg-white">
                    <option>General Inquiry</option>
                    <option>Subscription Issue</option>
                    <option>Delivery Complaint</option>
                    <option>Supplier Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea rows="4" placeholder="Write your message here..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none resize-none"></textarea>
                </div>

                {/* Shiny Submit Button */}
                <button 
                  type="button" 
                  className="btn-shine w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative"
                >
                  <span className="relative z-10 flex items-center">Send Message <Send className="ml-2 w-5 h-5" /></span>
                </button>
              </form>
            </div>
          </Reveal>

          {/* Right Side: Custom Animated Map & Info */}
          <Reveal direction="right" delay={200}>
            <div className="relative">
              {/* Map Image with Ken Burns */}
              <div className="rounded-3xl shadow-2xl w-full h-[500px] overflow-hidden relative border border-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Map of Ratlam" 
                  className="w-full h-full object-cover animate-kenburns grayscale-[40%] hover:grayscale-0 transition duration-700"
                />
                <div className="absolute inset-0 bg-blue-900/20"></div>

                {/* Animated Route Line (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 500" preserveAspectRatio="none">
                  <path d="M50,400 Q150,300 200,250 T350,100" stroke="white" strokeWidth="4" strokeDasharray="10, 10" fill="transparent" className="animate-pulse" />
                </svg>

                {/* Pinging Map Pin (Dairy Location) */}
                <div className="absolute top-1/4 right-1/4 flex items-center justify-center">
                  <span className="absolute inline-flex h-12 w-12 rounded-full bg-red-500 opacity-75 animate-ping"></span>
                  <div className="relative inline-flex rounded-full h-10 w-10 bg-red-600 items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-125 transition">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  {/* Floating Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-white px-4 py-2 rounded-lg shadow-xl text-sm font-bold whitespace-nowrap transform group-hover:opacity-100 transition">
                    🥛 Ratlam Dairy HQ
                  </div>
                </div>

                {/* Floating Glassmorphism Info Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Navigation className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Visit Our Office</h4>
                      <p className="text-gray-600 text-sm mt-1">123 Dairy Street, Near Ratlam Junction, Ratlam, Madhya Pradesh 457001</p>
                      <div className="flex items-center text-gray-500 text-sm mt-2">
                        <Clock className="w-4 h-4 mr-2 text-green-600" /> Open: 6:00 AM - 8:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <MessageCircle className="w-12 h-12 text-green-300 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Need Instant Help?</h2>
            <p className="text-lg mb-8 text-blue-100">Our WhatsApp support team is always ready to assist you with your subscriptions and deliveries.</p>
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition flex items-center shadow-lg hover:scale-105 transform"
            >
              Chat on WhatsApp <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* ================= SCROLL TO TOP BUTTON ================= */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 left-8 bg-blue-600 p-4 rounded-full shadow-2xl hover:bg-blue-700 transition z-50 transform hover:scale-110 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>

    </div>
  );
};

export default Contact;