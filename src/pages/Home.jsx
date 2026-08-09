import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Milk, Truck, Leaf, ShieldCheck, ArrowRight, Star, MapPin, 
  Phone, ChevronDown, Sun, Droplets, Award, Users, Package
} from 'lucide-react';

import cowImg from "../assets/cow.jpg";
import buffaloImg from "../assets/buffalo.jpg";
import gheeImg from "../assets/ghee.jpg";
import curdImg from "../assets/curd.jpg";
import paneerImg from "../assets/paneer.jpg";
import butterImg from "../assets/butter.webp";
import buttermilkImg from "../assets/buttermilk.jpg";
import khoaImg from "../assets/khoa.webp";

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

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { icon: <Users className="w-8 h-8 text-blue-600" />, value: "1500+", label: "Happy Customers" },
    { icon: <Droplets className="w-8 h-8 text-green-600" />, value: "5000L", label: "Daily Milk Collection" },
    { icon: <MapPin className="w-8 h-8 text-red-600" />, value: "25+", label: "Villages Connected" },
    { icon: <Award className="w-8 h-8 text-yellow-600" />, value: "100%", label: "Pure & Unadulterated" }
  ];

  // Updated with relatable Cow, Buffalo, and Curd images
    // Updated with relatable Cow, Buffalo, and Curd images
  const products = [
    { 
      name: "Cow Milk", 
      desc: "A2 Desi Cow Milk, rich in nutrients.", 
      price: "₹60 / Litre", 
      img: cowImg, 
    },
    { 
      name: "Buffalo Milk", 
      desc: "Thick & creamy high-fat buffalo milk.", 
      price: "₹62 / Litre", 
      img: buffaloImg,  // <-- Yahan URL hata kar buffaloImg likha hai
    },
    { 
      name: "Pure Ghee", 
      desc: "Traditional bilona method pure ghee.", 
      price: "₹750 / Kg", 
      img: gheeImg
    },
    { 
      name: "Fresh Curd", 
      desc: "Thick, probiotic-rich homemade curd.", 
      price: "₹40 / 500g", 
      img: curdImg,
    }
  ];

  const features = [
    { icon: <Sun className="w-10 h-10 text-yellow-500" />, title: "Morning & Evening Delivery", desc: "Flexible slots to fit your daily routine. Get milk before breakfast or before dinner." },
    { icon: <Leaf className="w-10 h-10 text-green-600" />, title: "100% Organic & Fresh", desc: "No preservatives, no adulteration. Straight from the farm to your table." },
    { icon: <ShieldCheck className="w-10 h-10 text-blue-600" />, title: "Quality Tested", desc: "Every batch is tested for Fat & SNF content to ensure premium quality." },
    { icon: <Package className="w-10 h-10 text-indigo-600" />, title: "Easy Subscriptions", desc: "Pause, modify, or cancel your subscription anytime from your dashboard." }
  ];

  const steps = [
    { num: "01", title: "Choose Your Plan", desc: "Select from daily or monthly subscription plans for milk, ghee, or curd.", icon: <Package className="w-12 h-12 text-blue-500" /> },
    { num: "02", title: "We Collect & Process", desc: "Milk is collected from village suppliers, tested, and packaged hygenically.", icon: <Droplets className="w-12 h-12 text-green-500" /> },
    { num: "03", title: "Doorstep Delivery", desc: "Get fresh milk delivered to your home every morning before 7 AM.", icon: <Truck className="w-12 h-12 text-yellow-500" /> }
  ];

  const testimonials = [
    { name: "Rajesh Sharma", role: "Customer, Ratlam", text: "The milk quality is exceptional. It feels just like the milk we used to get in our village. Delivery is always on time!", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Priya Verma", role: "Customer, Ratlam", text: "I subscribed to their monthly plan. The ghee is pure and the customer support is very responsive. Highly recommended!", img: "https://i.pravatar.cc/150?img=45" },
    { name: "Mahesh Patel", role: "Village Supplier", text: "Partnering with this dairy has changed my life. Timely payments and transparent fat testing. A boon for local farmers.", img: "https://i.pravatar.cc/150?img=33" }
  ];

  const faqs = [
    { q: "How do I subscribe to daily milk delivery?", a: "You can easily subscribe by clicking on 'Subscribe Now', filling out your details, and selecting your preferred milk type and quantity." },
    { q: "What are the delivery timings?", a: "Morning deliveries are completed between 5:00 AM and 8:00 AM. Evening deliveries are between 5:00 PM and 7:00 PM." },
    { q: "Can I pause my subscription if I go on vacation?", a: "Yes, you can activate 'Vacation Mode' from your Customer Dashboard to pause deliveries temporarily without being charged." },
    { q: "How can I become a village supplier?", a: "Visit the 'Become a Village Supplier' page, fill out the registration form with your daily capacity and bank details, and our team will contact you." }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 animate-pulse">
              🥛 100% Fresh & Organic Milk in Ratlam
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              From Local Farms <br/>
              <span className="text-shine">Direct to Your Doorstep</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Experience the purity of unadulterated cow and buffalo milk. Subscribe today for fresh, quality-tested dairy products delivered every morning.
            </p>
            <div className="flex flex-wrap space-x-4">
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold flex items-center shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
                Subscribe Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link to="/become-supplier" className="bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-800 px-8 py-4 rounded-full font-bold flex items-center transition hover:bg-gray-50">
                Become a Supplier
              </Link>
            </div>
          </Reveal>
          
          {/* Floating Image with Ken Burns Effect */}
          <Reveal direction="right">
            <div className="relative flex justify-center animate-float">
              <div className="relative rounded-3xl shadow-2xl w-full max-w-md h-[500px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Fresh Milk Pouring" 
                  className="w-full h-full object-cover animate-kenburns"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-3 hover:scale-110 transition">
                <div className="bg-green-100 p-3 rounded-full">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">100% Organic</h4>
                  <p className="text-sm text-gray-500">No Preservatives</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= STATS SECTION ================= */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 100} direction="zoom">
              <div className="text-center hover:scale-110 transition transform">
                <div className="flex justify-center mb-3 bg-gray-50 p-4 rounded-full w-20 h-20 mx-auto items-center hover:rotate-6 transition">{stat.icon}</div>
                <h3 className="text-3xl font-extrabold text-gray-900">{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ================= PRODUCTS SHOWCASE (3D Tilt Hover) ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-bold tracking-widest">FRESH PRODUCTS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Our Daily Dairy Essentials</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Pure, natural, and sourced directly from local farmers in Ratlam.</p>
            </div>
          </Reveal>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                {/* 3D Tilt Container */}
                <div className="perspective-1000">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition duration-300 overflow-hidden group preserve-3d hover:[transform:rotateY(5deg)_rotateX(5deg)]">
                    <div className="overflow-hidden h-56 relative">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500 animate-kenburns" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                        <span className="text-white font-bold translate-y-4 group-hover:translate-y-0 transition duration-300">View Details</span>
                      </div>
                    </div>
                    <div className="p-5 bg-white relative z-10">
                      <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                      <p className="text-gray-500 text-sm mt-1 mb-4">{product.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold text-lg">{product.price}</span>
                        <Link to="/products" className="text-sm font-semibold text-gray-400 hover:text-blue-600 flex items-center transition">
                          View <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <Reveal direction="right">
              <span className="text-blue-600 font-bold tracking-widest">WHY CHOOSE US</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-6">The Purest Milk You Can Find</h2>
              <p className="text-gray-600 mb-8">
                We follow a strict cold-chain process from the village collection center to your home. Our milk is tested for adulteration, ensuring your family gets the nutrition they deserve.
              </p>
              <Link to="/about" className="text-blue-600 font-bold flex items-center hover:underline">
                Learn more about our process <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Reveal>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Reveal key={index} delay={index * 150} direction="left">
                  <div className="p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100 hover:-translate-y-2 duration-300 h-full">
                    <div className="mb-4 bg-white p-3 rounded-xl shadow-sm w-fit hover:rotate-12 transition">{feature.icon}</div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm">{feature.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">SIMPLE PROCESS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">How It Works</h2>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 border-t-2 border-dashed border-blue-200 z-0"></div>
            
            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 200} direction="up">
                <div className="bg-white p-8 rounded-2xl shadow-sm text-center relative z-10 hover:scale-105 transition transform hover:-rotate-1">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-blue-50">
                    {step.icon}
                  </div>
                  <span className="absolute top-4 right-6 text-5xl font-extrabold text-gray-100">{step.num}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">TESTIMONIALS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">What Our Customers Say</h2>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative hover:shadow-xl transition h-full hover:-translate-y-2 duration-300">
                  <div className="absolute top-6 right-6 text-6xl text-blue-100 font-serif">“</div>
                  <div className="flex mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-gray-600 italic mb-6 relative z-10">{testimonial.text}</p>
                  <div className="flex items-center space-x-3">
                    <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 transition hover:ring-blue-400" />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-12">
              <span className="text-blue-600 font-bold tracking-widest">FAQ</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Frequently Asked Questions</h2>
            </div>
          </Reveal>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Reveal key={index} delay={index * 100} direction="right">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition">
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
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Ready for Pure Milk?</h2>
            <p className="text-lg mb-8 text-blue-100">Join 1500+ families in Ratlam who trust us for their daily dairy needs. Start your subscription today!</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center shadow-lg hover:scale-105 transform">
                Subscribe Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a href="tel:+919876543210" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-blue-600 transition flex items-center">
                <Phone className="mr-2 w-5 h-5" /> Call Us
              </a>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Home;