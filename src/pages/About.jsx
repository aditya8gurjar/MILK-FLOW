import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Milk, ArrowRight, Target, Eye, Heart, Award, 
  Users, Leaf, ShieldCheck, TrendingUp, ChevronUp, ChevronDown
} from 'lucide-react';

// UPGRADED Reveal Component (Supports Left, Right, Up, Zoom)
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

const About = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      setShowScrollTop(scrollTop > 400);
      setScrollProgress((scrollTop / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const values = [
    { icon: <Leaf className="w-8 h-8 text-green-600" />, title: "100% Organic", desc: "No preservatives, no adulteration. Just pure, farm-fresh milk." },
    { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: "Quality Tested", desc: "Every batch tested for Fat & SNF content to ensure premium quality." },
    { icon: <Users className="w-8 h-8 text-indigo-600" />, title: "Farmer First", desc: "Fair pricing and timely payments to empower local village suppliers." },
    { icon: <Award className="w-8 h-8 text-yellow-600" />, title: "Hygienic Packaging", desc: "Strict cold-chain process from collection center to your doorstep." }
  ];

  const journey = [
    { year: "2015", title: "The Beginning", desc: "Started with just 10 cows and a vision to provide pure milk to Ratlam." },
    { year: "2018", title: "Village Expansion", desc: "Partnered with 5 local villages, empowering 50+ farmers with fair prices." },
    { year: "2021", title: "Digital Revolution", desc: "Launched our subscription platform and delivery app for seamless service." },
    { year: "2024", title: "Ratlam's Favorite", desc: "Now serving 1500+ families daily with 5000+ liters of pure milk." }
  ];

  const team = [
    { name: "Rohit Singh", role: "Founder & CEO", img: "https://i.pravatar.cc/300?img=11" },
    { name: "Anjali Mehta", role: "Head of Operations", img: "https://i.pravatar.cc/300?img=44" },
    { name: "Vikram Patel", role: "Quality Manager", img: "https://i.pravatar.cc/300?img=12" },
    { name: "Sneha Sharma", role: "Customer Support Lead", img: "https://i.pravatar.cc/300?img=49" }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden">
      
      {/* ================= SCROLL PROGRESS BAR ================= */}
      <div className="fixed top-0 left-0 w-full h-1.5 bg-transparent z-[100]">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-40 pb-24 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
              OUR STORY
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Bringing the <span className="text-shine">Purest Milk</span> to Ratlam
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are on a mission to connect rural village farmers directly with urban households, ensuring purity, transparency, and fair trade.
            </p>
          </Reveal>
          
          <div className="mt-16 flex justify-center animate-bounce">
            <div className="bg-white p-3 rounded-full shadow-lg border border-gray-100">
              <ChevronDown className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY (Sliding from Left/Right) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <Reveal direction="left">
            <div className="relative group">
              <div className="rounded-3xl shadow-2xl w-full h-[450px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1605338803155-8b13a4a93f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Indian Village Farmer" 
                  className="w-full h-full object-cover animate-kenburns"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl hidden md:block hover:scale-110 transition duration-300">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-gray-900">9 Years</h4>
                    <p className="text-gray-500 text-sm">of Trust & Purity</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={200}>
            <div>
              <span className="text-blue-600 font-bold tracking-widest">WHO WE ARE</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                From a Small Village to Your Home
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2015, Ratlam Dairy started as a small initiative to stop milk adulteration in our city. We saw how middlemen exploited farmers and compromised milk quality. 
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Today, we partner directly with 25+ villages, ensuring farmers get fair prices and you get 100% pure, unadulterated milk delivered fresh to your doorstep every morning.
              </p>
              <Link to="/contact" className="inline-flex items-center text-blue-600 font-bold hover:underline">
                Talk to us <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <Reveal direction="left">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 h-full">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-500 leading-relaxed">
                To eliminate milk adulteration by building a transparent, farm-to-home supply chain. We aim to provide every household with nutrient-rich, pure milk while empowering local farmers with sustainable income.
              </p>
            </div>
          </Reveal>
          
          <Reveal direction="right" delay={200}>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition duration-300 h-full">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 hover:rotate-12 transition">
                <Eye className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-500 leading-relaxed">
                To become Madhya Pradesh's most trusted and loved dairy brand, known for ethical practices, technological innovation in dairy farming, and unwavering commitment to quality.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">OUR CORE VALUES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Why Families Trust Us</h2>
            </div>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="bg-gray-50 p-8 rounded-2xl text-center hover:bg-white hover:shadow-xl transition border border-transparent hover:border-blue-100 h-full hover:-translate-y-2 duration-300">
                  <div className="bg-white p-4 rounded-2xl shadow-sm w-fit mx-auto mb-6 flex items-center justify-center hover:scale-110 transition">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{value.title}</h3>
                  <p className="text-gray-500 text-sm">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR JOURNEY (Timeline) ================= */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">MILESTONES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Our Journey So Far</h2>
            </div>
          </Reveal>
          
          <div className="relative border-l-2 border-blue-200 ml-4 md:ml-0 space-y-12">
            {journey.map((item, index) => (
              <Reveal key={index} delay={index * 200} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className={`flex flex-col md:flex-row items-start gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="hidden md:block w-1/2"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute -left-[11px] w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-md z-10 mt-2 animate-ping"></div>
                  
                  <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition ml-8 md:ml-12 hover:-translate-y-2 duration-300">
                    <span className="text-3xl font-extrabold text-blue-100 absolute -z-0 mt-[-20px] ml-[-10px]">{item.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 relative z-10">{item.title}</h3>
                    <p className="text-gray-500 relative z-10">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM SECTION (Grayscale to Color) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">OUR TEAM</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Meet The Faces Behind Ratlam Dairy</h2>
            </div>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition duration-500 hover:-translate-y-2">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-80 object-cover transition duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80 group-hover:opacity-95 transition duration-300"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition duration-300">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-blue-200 text-sm">{member.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-blue-600 opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-green-600 opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <Heart className="w-12 h-12 text-red-500 fill-current mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Join Our Dairy Family</h2>
            <p className="text-lg mb-8 text-gray-300 max-w-xl">
              Whether you want pure milk for your family or fair prices for your farm, we are here for you.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
                Subscribe Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/become-supplier" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-gray-900 transition flex items-center">
                Become a Supplier
              </Link>
            </div>
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

export default About;