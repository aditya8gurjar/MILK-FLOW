import React, { useState, useEffect, useRef } from 'react';
import { Bell, Truck, Wallet, AlertCircle, CheckCircle2, Trash2 } from 'lucide-react';

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

const CustomerNotifications = () => {
  const notifications = [
    { id: 1, title: "Out for Delivery", desc: "Your morning milk is out for delivery and will arrive by 6:00 AM.", time: "10 mins ago", type: "delivery", unread: true },
    { id: 2, title: "Bill Generated", desc: "Your May invoice of ₹3,200 has been generated. Pay before May 31.", time: "2 hours ago", type: "billing", unread: true },
    { id: 3, title: "Payment Successful", desc: "₹1,000 added to your wallet successfully.", time: "Yesterday", type: "payment", unread: false },
    { id: 4, title: "Delivery Missed", desc: "You missed yesterday's evening delivery. ₹120 refunded to wallet.", time: "Yesterday", type: "alert", unread: false }
  ];

  const getIcon = (type) => {
    if (type === 'delivery') return <Truck className="w-5 h-5 text-blue-600" />;
    if (type === 'billing') return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    if (type === 'payment') return <Wallet className="w-5 h-5 text-green-600" />;
    return <CheckCircle2 className="w-5 h-5 text-red-600" />;
  };

  const getBg = (type) => {
    if (type === 'delivery') return 'bg-blue-50';
    if (type === 'billing') return 'bg-yellow-50';
    if (type === 'payment') return 'bg-green-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-8">
      <Reveal>
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Notifications</h1>
            <p className="text-gray-500 mt-1">Stay updated with your latest dairy activities.</p>
          </div>
          <button className="text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition">Mark all as read</button>
        </div>
      </Reveal>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
        {notifications.map((n, index) => (
          <Reveal key={n.id} delay={index * 100}>
            <div className={`p-6 flex items-start space-x-4 hover:bg-slate-50/50 transition group ${n.unread ? 'bg-blue-50/30' : ''}`}>
              <div className={`p-3 rounded-xl ${getBg(n.type)} group-hover:scale-110 transition`}>
                {getIcon(n.type)}
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <h3 className="font-bold text-gray-800 text-sm">{n.title}</h3>
                  {n.unread && <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>}
                </div>
                <p className="text-gray-500 text-sm mb-1">{n.desc}</p>
                <span className="text-xs text-gray-400">{n.time}</span>
              </div>
              <button className="text-gray-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default CustomerNotifications;