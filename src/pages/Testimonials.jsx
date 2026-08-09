import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, Quote, ArrowRight, TrendingUp, Users, 
  Heart, Tractor, CheckCircle2
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

// Custom Animated Bar Component for Ratings
const AnimatedBar = ({ percent, delay }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center space-x-3">
      <span className="text-sm font-bold text-gray-600 w-4">5</span>
      <Star className="w-4 h-4 text-yellow-400 fill-current" />
      <div className="flex-grow h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-[1500ms] ease-out"
          style={{ width: isVisible ? `${percent}%` : '0%' }}
        ></div>
      </div>
      <span className="text-sm font-medium text-gray-500 w-10 text-right">{percent}%</span>
    </div>
  );
};

const Testimonials = () => {
  const stats = [
    { icon: <Users className="w-8 h-8 text-blue-600" />, value: "1,500+", label: "Happy Families" },
    { icon: <Tractor className="w-8 h-8 text-green-600" />, value: "250+", label: "Village Suppliers" },
    { icon: <Star className="w-8 h-8 text-yellow-500" />, value: "4.9/5", label: "Average Rating" }
  ];

  const customerReviews = [
    { name: "Rajesh Sharma", role: "Customer, Station Road", text: "The milk quality is exceptional. It feels just like the milk we used to get in our village. Delivery is always on time!", img: "https://i.pravatar.cc/150?img=12", rating: 5 },
    { name: "Priya Verma", role: "Customer, MG Road", text: "I subscribed to their monthly plan. The ghee is pure and the customer support is very responsive. Highly recommended!", img: "https://i.pravatar.cc/150?img=45", rating: 5 },
    { name: "Anil Khandelwal", role: "Customer, Jaora Road", text: "Best dairy service in Ratlam! The glass bottle packaging is premium and the milk stays fresh for days.", img: "https://i.pravatar.cc/150?img=33", rating: 5 },
    { name: "Sunita Joshi", role: "Customer, Aligarh", text: "Their paneer is so soft and fresh. It feels great to know exactly where my family's milk is coming from.", img: "https://i.pravatar.cc/150?img=44", rating: 5 },
    { name: "Mahesh Patel", role: "Customer, Civil Lines", text: "Vacation mode is a lifesaver! I paused my subscription for a week and resumed it without any hassle.", img: "https://i.pravatar.cc/150?img=13", rating: 5 },
    { name: "Kavita Jain", role: "Customer, Subhash Nagar", text: "The buttermilk is perfect for summers. Pure, unadulterated, and delivered right to my doorstep before breakfast.", img: "https://i.pravatar.cc/150?img=49", rating: 5 }
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
              <Heart className="w-4 h-4 mr-2" /> REAL STORIES, REAL PEOPLE
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Loved by <span className="text-shine">Ratlam Families</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our customers and partner farmers have to say about Ratlam Dairy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= STATS & RATING BREAKDOWN ================= */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition duration-300 border border-transparent hover:border-blue-100">
                  <div className="flex justify-center mb-3">{stat.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: Animated Rating Bars */}
          <Reveal direction="right" delay={200}>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="text-5xl font-extrabold text-gray-900">4.9</div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-500 text-sm mt-1">Based on 1,200+ reviews</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <AnimatedBar percent={90} delay={0} />
                <AnimatedBar percent={8} delay={200} />
                <AnimatedBar percent={2} delay={400} />
                <AnimatedBar percent={0} delay={600} />
                <AnimatedBar percent={0} delay={800} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= CUSTOMER REVIEWS GRID ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">CUSTOMER REVIEWS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">What Our Customers Say</h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {customerReviews.map((review, index) => (
              <Reveal key={index} delay={index * 100} direction="up">
                <div className="perspective-1000 h-full">
                  <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 h-full border border-gray-100 relative overflow-hidden preserve-3d hover:[transform:rotateY(5deg)_rotateX(5deg)] group">
                    
                    <Quote className="absolute top-6 right-6 w-16 h-16 text-gray-100 group-hover:text-blue-100 transition duration-300" fill="currentColor" />
                    
                    <div className="relative z-10">
                      <div className="flex mb-4">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                      </div>
                      <p className="text-gray-600 italic mb-6 leading-relaxed">"{review.text}"</p>
                      
                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                        <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 grayscale group-hover:grayscale-0 transition duration-300" />
                        <div>
                          <h4 className="font-bold text-gray-900">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SUPPLIER TESTIMONIAL SPLIT SECTION ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image with Glassmorphism Quote */}
          <Reveal direction="left">
            <div className="relative rounded-3xl shadow-2xl w-full h-[450px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1605338803155-8b13a4a93f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Indian Village Farmer" 
                className="w-full h-full object-cover animate-kenburns"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              {/* Floating Glass Quote */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:scale-[1.02] transition duration-300">
                <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                <p className="text-gray-700 font-medium italic mb-4">
                  "Partnering with Ratlam Dairy changed my life. Timely payments and transparent fat testing. A boon for local farmers."
                </p>
                <div className="flex items-center space-x-3">
                  <img src="https://i.pravatar.cc/150?img=60" alt="Farmer" className="w-10 h-10 rounded-full object-cover ring-2 ring-green-100" />
                  <div>
                    <h4 className="font-bold text-gray-900">Mahesh Patel</h4>
                    <p className="text-xs text-gray-500">Village Supplier, Namli</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Side: Text & Points */}
          <Reveal direction="right" delay={200}>
            <div>
              <span className="text-green-600 font-bold tracking-widest">SUPPLIER STORIES</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">
                Empowering Local Farmers
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We don't just serve customers; we support the backbone of our dairy—our village farmers. By eliminating middlemen, we ensure fair prices and timely payments for their hard work.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Direct bank transfers every week",
                  "Digital Fat & SNF testing in front of you",
                  "Free veterinary support for your cattle",
                  "Doorstep milk collection from village centers"
                ].map((point, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{point}</p>
                  </div>
                ))}
              </div>

              <Link to="/become-supplier" className="btn-shine bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center w-fit relative">
                <span className="relative z-10 flex items-center">Become a Supplier <ArrowRight className="ml-2 w-5 h-5" /></span>
              </Link>
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
            <Users className="w-12 h-12 text-green-300 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Join Our Happy Family</h2>
            <p className="text-lg mb-8 text-blue-100">Experience the purity of farm-fresh milk delivered to your doorstep. Start your subscription today!</p>
            <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
              Subscribe Now <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Testimonials;