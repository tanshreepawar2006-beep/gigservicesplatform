import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Search, 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Wind,
  Wrench,
  Zap,
  Scissors,
  Paintbrush,
  UserCheck
} from 'lucide-react';

const CATEGORIES = [
  { name: 'AC Services', title: 'AC Repair & Cleaning', desc: 'Foam jet cleaning, gas refill & repairs', icon: Wind, color: 'bg-sky-50 text-sky-600' },
  { name: 'Cleaning', title: 'Deep Home Cleaning', desc: 'Full home, kitchen & sofa shampooing', icon: Sparkles, color: 'bg-emerald-50 text-emerald-600' },
  { name: 'Plumbing', title: 'Plumbing Solutions', desc: 'Leakages, tap replacement & blockages', icon: Wrench, color: 'bg-amber-50 text-amber-600' },
  { name: 'Electrical', title: 'Electrical & Wiring', desc: 'Switchboards, fan & appliance setup', icon: Zap, color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Grooming & Salon', title: 'Salon & Beauty', desc: 'At-home facials, waxing & grooming', icon: Scissors, color: 'bg-rose-50 text-rose-600' },
  { name: 'Painting', title: 'Accent Wall Painting', desc: 'Texture painting & interior touchups', icon: Paintbrush, color: 'bg-purple-50 text-purple-600' },
];

const STEPS = [
  {
    step: '01',
    title: 'Choose a Service',
    desc: 'Browse hundreds of verified local services with transparent pricing & reviews.',
  },
  {
    step: '02',
    title: 'Pick Time & Location',
    desc: 'Select a date, time slot, and enter your address for hassle-free scheduling.',
  },
  {
    step: '03',
    title: 'Relax & Pay After',
    desc: 'Our certified expert arrives on time. Inspect the work and pay cash or online.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Aarav Sharma',
    role: 'Homeowner, Mumbai',
    rating: 5,
    text: 'The AC Foam Jet service was exceptional! The technician arrived with professional tools and left my AC cooling like brand new. Booking took less than 20 seconds.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200',
  },
  {
    name: 'Pooja Iyer',
    role: 'Interior Designer, Bengaluru',
    rating: 5,
    text: 'I hired deep home cleaning for a newly renovated flat. Sunita and her team did a magical job. Highly recommended for quality-conscious people!',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200',
  },
  {
    name: 'Karan Mehra',
    role: 'Tech Lead, Delhi NCR',
    rating: 5,
    text: 'Extremely clean UI and straightforward booking experience. No spam calls or hidden charges. The smart switchboard installation was smooth.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200',
  },
];

export const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="space-y-20 pb-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-slate-50">
        {/* Subtle decorative blurred circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-400/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 space-y-6 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-extrabold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-600" /> Premium Home Services
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Expert Home Services, <br className="hidden sm:inline" />
                <span className="text-brand-600 underline decoration-brand-300 decoration-wavy decoration-2">
                  Delivered Effortlessly.
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Book verified professionals for AC repair, deep cleaning, plumbing, electrical work & salon at home. On-time guarantee with upfront transparent pricing.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto lg:mx-0 relative">
                <div className="flex items-center bg-white p-2 rounded-2xl shadow-card border border-slate-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                  <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search 'AC Repair', 'Deep Cleaning'..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none font-medium"
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-md shadow-brand-500/25 transition-all shrink-0 active:scale-95"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Trust Metrics */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>100% Background Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                  <span>4.8 / 5 Rating</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-600" />
                  <span>On-Time Arrival</span>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Image Card Stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 relative w-full max-w-lg"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
                  alt="ServeEasy Home Cleaning Service"
                  className="w-full h-[380px] sm:h-[440px] object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Sunita Sharma</p>
                      <p className="text-[11px] text-slate-500 font-medium">CleanCraft Solutions • 4.9 ★</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-800">
                    Verified Pro
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold tracking-wider text-brand-600 uppercase">Categories</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Home Services
          </h2>
          <p className="text-slate-500 text-sm">
            Select a service category to explore verified providers in your city
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
              >
                <Link
                  to={`/services?category=${encodeURIComponent(cat.name)}`}
                  className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft hover:shadow-card hover:border-brand-500/50 transition-all flex flex-col justify-between group h-full"
                >
                  <div className="space-y-4">
                    <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-600 group-hover:translate-x-1 transition-transform">
                    <span>Explore Services</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-extrabold tracking-wider text-brand-400 uppercase">Seamless Experience</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How ServeEasy Works
            </h2>
            <p className="text-slate-400 text-sm">
              3 simple steps to get your home serviced by top-rated professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {STEPS.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="bg-slate-800/60 border border-slate-700/60 p-8 rounded-3xl relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-4xl font-black text-brand-500/30 tracking-wider">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-6 mt-4 flex items-center text-brand-400 text-xs font-bold gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Simple & Transparent
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-extrabold tracking-wider text-brand-600 uppercase">Customer Love</span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Thousands of Families
          </h2>
          <p className="text-slate-500 text-sm">
            Read real feedback from happy homeowners who rely on ServeEasy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-brand-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Are you a skilled Service Provider?
            </h2>
            <p className="text-brand-100 text-sm leading-relaxed">
              Grow your local customer base with ServeEasy. List your services, set your own prices, and get job requests delivered straight to your dashboard.
            </p>
          </div>
          <Link
            to="/signup?role=provider"
            className="px-6 py-3.5 bg-white text-brand-800 hover:bg-brand-50 font-extrabold text-sm rounded-2xl shadow-lg transition-all active:scale-95 shrink-0"
          >
            Join as Service Provider
          </Link>
        </div>
      </section>
    </div>
  );
};
