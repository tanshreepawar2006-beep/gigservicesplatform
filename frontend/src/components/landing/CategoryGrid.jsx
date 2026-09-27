import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  AirVent,
  Zap,
  Droplets,
  Scissors,
  Bug,
  ArrowRight
} from 'lucide-react';

const categories = [
  {
    name: 'Cleaning',
    tagline: 'Deep home, kitchen & sanitization',
    startingPrice: '₹499',
    icon: Sparkles,
    color: 'from-emerald-500/10 to-teal-500/20 text-emerald-600 border-emerald-200/80',
    count: '3 Services'
  },
  {
    name: 'Appliances',
    tagline: 'Split ACs, fridges & washers',
    startingPrice: '₹499',
    icon: AirVent,
    color: 'from-blue-500/10 to-sky-500/20 text-blue-600 border-blue-200/80',
    count: '3 Services'
  },
  {
    name: 'Electrical',
    tagline: 'Wiring, MCBs, fans & switchboards',
    startingPrice: '₹299',
    icon: Zap,
    color: 'from-amber-500/10 to-yellow-500/20 text-amber-600 border-amber-200/80',
    count: '2 Services'
  },
  {
    name: 'Plumbing',
    tagline: 'Leakages, taps & tank sterilization',
    startingPrice: '₹349',
    icon: Droplets,
    color: 'from-cyan-500/10 to-teal-500/20 text-cyan-600 border-cyan-200/80',
    count: '2 Services'
  },
  {
    name: 'Grooming',
    tagline: 'Men haircut & women glow facials',
    startingPrice: '₹399',
    icon: Scissors,
    color: 'from-rose-500/10 to-pink-500/20 text-rose-600 border-rose-200/80',
    count: '2 Services'
  },
  {
    name: 'Pest Control',
    tagline: 'Odorless cockroach & termite shield',
    startingPrice: '₹899',
    icon: Bug,
    color: 'from-purple-500/10 to-indigo-500/20 text-purple-600 border-purple-200/80',
    count: '1 Service'
  }
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
              <span>Explore Categories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              What can we help you with today?
            </h2>
            <p className="mt-2 text-slate-500 text-sm max-w-xl">
              Hand-picked professionals equipped with standardized tools and certified training.
            </p>
          </div>

          <button
            onClick={() => navigate('/services')}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-brand-700 hover:text-brand-800 group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/services?category=${encodeURIComponent(cat.name)}`)}
                className="group cursor-pointer p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-brand-500/50 hover:shadow-hover transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                    {cat.count}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  {cat.tagline}
                </p>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Starts from</span>
                  <span className="font-extrabold text-slate-900 text-sm group-hover:text-brand-700 transition-colors">
                    {cat.startingPrice}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
