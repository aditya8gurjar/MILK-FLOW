import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, User, ArrowRight, Tag, Send, 
  Heart, Newspaper, Coffee, BookOpen
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

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = [
    { name: "All", icon: <Tag className="w-5 h-5" /> },
    { name: "Health Tips", icon: <Heart className="w-5 h-5" /> },
    { name: "Dairy News", icon: <Newspaper className="w-5 h-5" /> },
    { name: "Milk Benefits", icon: <Coffee className="w-5 h-5" /> },
    { name: "Recipes", icon: <BookOpen className="w-5 h-5" /> }
  ];

  const featuredPost = {
    title: "The Ultimate Guide to A2 Cow Milk: Why It's Better for Your Family",
    excerpt: "Discover the science behind A2 protein, how it differs from regular milk, and why it's easier to digest for children and adults alike.",
    img: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    author: "Dr. Anjali Mehta",
    date: "May 15, 2024",
    readTime: "5 min read",
    category: "Milk Benefits"
  };

  const posts = [
    {
      id: 1,
      title: "5 Delicious Recipes Using Fresh Homemade Paneer",
      excerpt: "From rich curries to grilled snacks, here are our top 5 ways to use fresh paneer.",
      img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Chef Rohit",
      date: "May 10, 2024",
      readTime: "4 min read",
      category: "Recipes"
    },
    {
      id: 2,
      title: "Why Fat & SNF Testing Matters in Your Daily Milk",
      excerpt: "Understand what Fat and SNF levels mean for your milk's quality and nutrition.",
      img: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Vikram Patel",
      date: "May 8, 2024",
      readTime: "6 min read",
      category: "Dairy News"
    },
    {
      id: 3,
      title: "How to Store Ghee to Retain Flavor for Months",
      excerpt: "Learn the traditional tricks to keep your bilona ghee fresh and aromatic.",
      img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Sneha Sharma",
      date: "May 5, 2024",
      readTime: "3 min read",
      category: "Health Tips"
    },
    {
      id: 4,
      title: "Morning Milk vs Evening Milk: Is There a Difference?",
      excerpt: "We explore if the time of milking affects the nutritional value of your milk.",
      img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Dr. Anjali Mehta",
      date: "May 1, 2024",
      readTime: "5 min read",
      category: "Milk Benefits"
    },
    {
      id: 5,
      title: "The Journey of Milk: From Village Farm to Your Doorstep",
      excerpt: "A behind-the-scenes look at our cold-chain process and farmer network.",
      img: "https://images.unsplash.com/photo-1605338803155-8b13a4a93f3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Rohit Singh",
      date: "April 28, 2024",
      readTime: "7 min read",
      category: "Dairy News"
    },
    {
      id: 6,
      title: "Boost Your Immunity with These Curd-Based Drinks",
      excerpt: "Beat the heat with refreshing buttermilk and lassi recipes packed with probiotics.",
      img: "https://images.unsplash.com/photo-1606859191213-92b5f1190f4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Chef Rohit",
      date: "April 25, 2024",
      readTime: "4 min read",
      category: "Recipes"
    }
  ];

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === activeCategory);

  const handleFilter = (category) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="bg-white font-sans text-gray-800 overflow-x-hidden pt-24">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <Reveal direction="zoom">
            <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider">
              DAIRY BLOG & NEWS
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mt-6 mb-6 leading-tight">
              Tips, News & <span className="text-shine">Dairy Recipes</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the health benefits of pure milk, learn new recipes, and stay updated with our latest dairy news.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= FEATURED POST ================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <Reveal direction="up">
            <div className="grid lg:grid-cols-2 gap-0 items-center bg-blue-50 rounded-3xl overflow-hidden shadow-sm border border-blue-100">
              <div className="h-80 lg:h-full overflow-hidden">
                <img 
                  src={featuredPost.img} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover animate-kenburns"
                />
              </div>
              <div className="p-8 md:p-12">
                <span className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
                  <span className="flex items-center"><User className="w-4 h-4 mr-2" /> {featuredPost.author}</span>
                  <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {featuredPost.date}</span>
                  <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {featuredPost.readTime}</span>
                </div>
                <button className="btn-shine bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold transition transform hover:scale-105 shadow-lg flex items-center relative">
                  <span className="relative z-10 flex items-center">Read Article <ArrowRight className="ml-2 w-4 h-4" /></span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= FILTER & POSTS GRID ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Animated Filter Tabs */}
          <Reveal direction="up">
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleFilter(cat.name)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                    activeCategory === cat.name
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Posts Grid with Animation */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            {filteredPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 100} direction="up" className="h-full">
                <div className="perspective-1000 h-full">
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden group preserve-3d hover:[transform:rotateY(5deg)_rotateX(5deg)] h-full flex flex-col border border-gray-100">
                    
                    {/* Image Section */}
                    <div className="overflow-hidden h-56 relative">
                      <img 
                        src={post.img} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {post.category}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col flex-grow bg-white relative z-10">
                      <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                        <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {post.date}</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">{post.title}</h3>
                      <p className="text-gray-500 text-sm mb-4 flex-grow">{post.excerpt}</p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <span className="flex items-center text-sm font-medium text-gray-600">
                          <User className="w-4 h-4 mr-2 text-gray-400" /> {post.author}
                        </span>
                        <button className="text-sm font-semibold text-white bg-gray-900 group-hover:bg-blue-600 transition duration-300 w-9 h-9 rounded-full flex items-center justify-center transform group-hover:rotate-45">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER CTA ================= */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-10 rounded-full animate-blob animation-delay-2000"></div>
        
        <Reveal direction="zoom">
          <div className="max-w-3xl mx-auto px-4 text-center text-white relative z-10 flex flex-col items-center">
            <Send className="w-12 h-12 text-blue-300 mb-4 animate-bounce" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-8 text-blue-100">Get the latest dairy news, health tips, and exclusive recipes delivered straight to your inbox.</p>
            
            <div className="flex flex-col sm:flex-row w-full max-w-md gap-4">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-6 py-4 rounded-full text-gray-800 outline-none border-2 border-transparent focus:border-white transition"
                />
              </div>
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition flex items-center justify-center shadow-lg hover:scale-105 transform">
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
};

export default Blog;