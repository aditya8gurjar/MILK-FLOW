import React, { useState, useEffect, useRef } from 'react';
import { Star, MessageSquare, Send, ThumbsUp } from 'lucide-react';

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

const CustomerFeedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="space-y-8">
      <Reveal>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Share Your Feedback</h1>
          <p className="text-gray-500 mt-1">We value your opinion. Let us know how we're doing!</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Feedback Form */}
        <Reveal delay={100} className="lg:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full">
            <div className="flex items-center mb-8">
              <MessageSquare className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-bold text-gray-900">Rate Your Experience</h2>
            </div>

            {/* Star Rating */}
            <div className="flex flex-col items-center mb-8 bg-slate-50 p-8 rounded-2xl">
              <p className="text-gray-500 font-medium mb-4">How was today's morning delivery?</p>
              <div className="flex space-x-4">
                {[...Array(5)].map((_, index) => {
                  const starValue = index + 1;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHover(starValue)}
                      onMouseLeave={() => setHover(0)}
                      className="transition transform hover:scale-125"
                    >
                      <Star
                        className={`w-12 h-12 transition-colors duration-200 ${
                          (hover || rating) >= starValue ? 'text-yellow-400 fill-current' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              {rating > 0 && <p className="mt-4 text-lg font-bold text-blue-600">Thank you for rating!</p>}
            </div>

            {/* Text Feedback */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Feedback (Optional)</label>
              <textarea
                rows="5"
                placeholder="Tell us what you liked or how we can improve..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition resize-none"
              ></textarea>
            </div>

            <button className="btn-shine w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center relative">
              <span className="relative z-10 flex items-center"><Send className="w-5 h-5 mr-2" /> Submit Feedback</span>
            </button>
          </div>
        </Reveal>

        {/* Previous Feedback / Info */}
        <Reveal delay={200}>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl shadow-sm text-white h-full flex flex-col">
            <ThumbsUp className="w-12 h-12 text-blue-200 mb-6" />
            <h2 className="text-2xl font-extrabold mb-4">Your Voice Matters</h2>
            <p className="text-blue-100 mb-8">Your feedback helps us improve our milk quality, delivery routes, and customer service.</p>
            
            <div className="mt-auto bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                </div>
                <span className="ml-2 text-sm font-bold">5.0</span>
              </div>
              <p className="text-xs text-blue-100">"The glass bottle packaging is premium and the milk stays fresh for days. Highly recommended!"</p>
              <p className="text-xs text-blue-200 mt-2">- Submitted on May 15, 2024</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default CustomerFeedback;