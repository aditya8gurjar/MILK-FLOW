import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Upload, Check, Phone, Mail, User, 
  Briefcase, Bike, Factory, UserCog, ChevronDown, Heart
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

const Careers = () => {
  const [activeJob, setActiveJob] = useState(0);
  const [fileName, setFileName] = useState("");

  const perks = [
    { icon: <Heart className="w-8 h-8 text-red-600" />, title: "Health Insurance", desc: "Comprehensive medical coverage for you and your family." },
    { icon: <Briefcase className="w-8 h-8 text-blue-600" />, title: "Job Security", desc: "Stable, long-term employment with timely salaries." },
    { icon: <UserCog className="w-8 h-8 text-green-600" />, title: "Career Growth", desc: "Promotions and training programs from within the company." },
    { icon: <Bike className="w-8 h-8 text-yellow-600" />, title: "Travel Allowance", desc: "Fuel and vehicle maintenance reimbursed for field staff." }
  ];

  const jobs = [
    {
      title: "Delivery Boy",
      type: "Full Time",
      location: "Ratlam City",
      icon: <Bike className="w-6 h-6 text-blue-600" />,
      desc: "Responsible for delivering fresh milk to customer homes before 7 AM. Must have a two-wheeler and a valid driving license."
    },
    {
      title: "Collection Center Manager",
      type: "Full Time",
      location: "Village Centers",
      icon: <Factory className="w-6 h-6 text-green-600" />,
      desc: "Manage milk collection from village suppliers, operate Fat & SNF testing machines, and maintain daily logs. Graduate preferred."
    },
    {
      title: "Quality Control Analyst",
      type: "Full Time",
      location: "Ratlam HQ",
      icon: <UserCog className="w-6 h-6 text-indigo-600" />,
      desc: "Perform daily lab tests on milk batches to ensure zero adulteration. B.Sc. in Dairy Technology or Microbiology required."
    }
  ];

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO & FORM SPLIT SECTION ================= */}
      <section className="relative py-16 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Image & Text */}
          <Reveal direction="left">
            <div>
              <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider inline-flex items-center">
                <Briefcase className="w-4 h-4 mr-2" /> WE'RE HIRING!
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
                Build Your Career with <span className="text-shine">Ratlam Dairy</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Join a fast-growing local business that values hard work, transparency, and community. We are looking for passionate people to help us deliver purity.
              </p>

              {/* Relatable Team Image with Ken Burns */}
              <div className="relative rounded-3xl shadow-2xl w-full h-[350px] overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Team Working" 
                  className="w-full h-full object-cover animate-kenburns"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Floating Hiring Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center space-x-3 hover:scale-110 transition duration-300 animate-bounce">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">3 Open</h4>
                    <p className="text-gray-500 text-xs">Positions</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Side: Animated Application Form */}
          <Reveal direction="right" delay={200}>
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Apply Online</h2>
                <p className="text-gray-500 mb-8">Fill in your details. Our HR team will contact you within 48 hours.</p>
                
                <form className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="text" placeholder="e.g. Rajesh Sharma" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="tel" placeholder="98765 43210" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input type="email" placeholder="rajesh@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position Applied For</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none bg-white">
                      <option>Select a Position</option>
                      <option>Delivery Boy</option>
                      <option>Collection Center Manager</option>
                      <option>Quality Control Analyst</option>
                    </select>
                  </div>

                  {/* Resume Upload (Animated Dropzone) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume</label>
                    <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 group ${fileName ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className={`w-8 h-8 mb-2 transition transform group-hover:scale-125 ${fileName ? 'text-green-600' : 'text-gray-400 group-hover:text-blue-600'}`} />
                        {fileName ? (
                          <p className="text-sm text-green-600 font-medium flex items-center">
                            <Check className="w-4 h-4 mr-1" /> {fileName}
                          </p>
                        ) : (
                          <>
                            <p className="text-sm text-gray-500"><span className="font-semibold text-blue-600">Click to upload</span> or drag & drop</p>
                            <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX (Max 5MB)</p>
                          </>
                        )}
                      </div>
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>

                  {/* Shiny Submit Button */}
                  <button 
                    type="button" 
                    className="btn-shine w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative"
                  >
                    <span className="relative z-10 flex items-center">Submit Application <ArrowRight className="ml-2 w-5 h-5" /></span>
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= OPEN POSITIONS (Accordion) ================= */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">OPEN POSITIONS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Current Job Openings</h2>
              <p className="text-gray-500 mt-4">Find the role that fits you best and apply today.</p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Reveal key={index} delay={index * 100} direction="up">
                <div className={`bg-gray-50 rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  activeJob === index ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-gray-200'
                }`}>
                  <button 
                    className="w-full flex justify-between items-center p-6 text-left"
                    onClick={() => setActiveJob(activeJob === index ? null : index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl transition duration-300 ${activeJob === index ? 'bg-blue-600 text-white rotate-12' : 'bg-white text-blue-600'}`}>
                        {job.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">{job.type}</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${activeJob === index ? 'transform rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeJob === index ? 'max-h-60' : 'max-h-0'}`}>
                    <div className="p-6 pt-0 text-gray-600">
                      <p className="mb-4">{job.desc}</p>
                      <button className="text-blue-600 font-bold flex items-center hover:underline">
                        Apply for this role <ArrowRight className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PERKS & BENEFITS SECTION ================= */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <Reveal direction="zoom">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-bold tracking-widest">EMPLOYEE BENEFITS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">Why Work With Us?</h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, index) => (
              <Reveal key={index} delay={index * 150} direction="up">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition duration-300 h-full text-center group">
                  <div className="bg-gray-50 p-5 rounded-2xl w-fit mx-auto mb-6 group-hover:bg-blue-50 group-hover:scale-110 group-hover:rotate-6 transition duration-300">
                    {perk.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{perk.title}</h3>
                  <p className="text-gray-500 text-sm">{perk.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;