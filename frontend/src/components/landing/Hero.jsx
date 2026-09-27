import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, ShieldCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/services');
    }
  };

  const popularSearches = ['Deep Cleaning', 'Split AC Service', 'Electrician', 'Plumber', 'Men Haircut'];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-brand-50/60 via-slate-50 to-white">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Trust Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white border border-brand-200/80 shadow-soft text-brand-800 text-xs font-semibold mb-6"
          >
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
            <span>Over 12,000+ Verified 5-Star Bookings Completed</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]"
          >
            Expert Home Services,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-700 via-brand-600 to-teal-500">
              Delivered to Your Door.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            From AC servicing and deep home scrubbing to certified electricians and plumbers. Transparent INR pricing, guaranteed on-time arrival, and 30-day warranty.
          </motion.p>

          {/* Live Search Bar */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="p-2 sm:p-2.5 bg-white rounded-2xl sm:rounded-3xl shadow-card border border-slate-200/90 flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center flex-1 w-full px-3">
                <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="What service do you need? (e.g., AC cleaning, bathroom scrub, plumber)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3 rounded-xl sm:rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all flex-shrink-0"
              >
                <span>Find Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.form>

          {/* Popular Tag Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500"
          >
            <span className="font-semibold text-slate-600">Popular:</span>
            {popularSearches.map((item) => (
              <button
                key={item}
                onClick={() => navigate(`/services?search=${encodeURIComponent(item)}`)}
                className="px-3 py-1 rounded-full bg-white hover:bg-brand-50 hover:text-brand-700 border border-slate-200/80 text-slate-600 transition-colors shadow-2xs font-medium"
              >
                {item}
              </button>
            ))}
          </motion.div>

          {/* Key Value Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-slate-200/60 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">4.9 / 5 Stars</div>
                <div className="text-xs text-slate-500">From 8,400+ reviews</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-200/80 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">100% Vetted</div>
                <div className="text-xs text-slate-500">Police-verified pros</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">On-Time Arrival</div>
                <div className="text-xs text-slate-500">2-hour arrival slot</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">30-Day Warranty</div>
                <div className="text-xs text-slate-500">Free rework guarantee</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
