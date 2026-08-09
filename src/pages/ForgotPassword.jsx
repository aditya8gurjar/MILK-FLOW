import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

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

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: "Email", icon: <Mail className="w-5 h-5" /> },
    { id: 2, name: "OTP", icon: <KeyRound className="w-5 h-5" /> },
    { id: 3, name: "Reset", icon: <Lock className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-16 min-h-screen flex items-center">
      <section className="relative w-full bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden py-12">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-md mx-auto px-4">
          <Reveal direction="zoom">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-block bg-blue-100 p-3 rounded-2xl text-blue-600 mb-4">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Forgot Password?</h2>
                  <p className="text-gray-500 text-sm mt-1">No worries, we'll send you reset instructions.</p>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-between mb-8">
                  {steps.map((s, i) => (
                    <React.Fragment key={s.id}>
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${step >= s.id ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                          {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= s.id ? 'text-blue-600' : 'text-gray-400'}`}>{s.name}</span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-grow h-1 mx-2 rounded-full transition-all duration-500 ${step > s.id ? 'bg-blue-600' : 'bg-slate-100'}`}></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step 1: Email */}
                {step === 1 && (
                  <div className="space-y-5 animate-[zoomIn_0.3s_ease-out]">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="email" placeholder="name@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="btn-shine w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative">
                      <span className="relative z-10 flex items-center">Send OTP <ArrowRight className="ml-2 w-5 h-5" /></span>
                    </button>
                  </div>
                )}

                {/* Step 2: OTP */}
                {step === 2 && (
                  <div className="space-y-5 animate-[zoomIn_0.3s_ease-out]">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 text-center">Enter 4-Digit OTP</label>
                      <div className="flex justify-center space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <input key={i} type="text" maxLength="1" className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition" />
                        ))}
                      </div>
                      <p className="text-center text-xs text-gray-400 mt-3">Didn't receive code? <button className="text-blue-600 font-bold hover:underline">Resend</button></p>
                    </div>
                    <button onClick={() => setStep(3)} className="btn-shine w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative">
                      <span className="relative z-10 flex items-center">Verify OTP <ArrowRight className="ml-2 w-5 h-5" /></span>
                    </button>
                  </div>
                )}

                {/* Step 3: New Password */}
                {step === 3 && (
                  <div className="space-y-5 animate-[zoomIn_0.3s_ease-out]">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 outline-none" />
                      </div>
                    </div>
                    <Link to="/login" className="btn-shine w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center relative">
                      <span className="relative z-10 flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> Reset Password</span>
                    </Link>
                  </div>
                )}
                
                <p className="text-center text-sm text-gray-500 mt-6">
                  Remembered it? <Link to="/login" className="text-blue-600 font-bold hover:underline">Back to Login</Link>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <style>{`@keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
};

export default ForgotPassword;