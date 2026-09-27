import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/landing/Hero';
import CategoryGrid from '../components/landing/CategoryGrid';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen"
    >
      <Hero />
      <CategoryGrid />
      <HowItWorks />
      <Testimonials />

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-brand-900 via-brand-800 to-teal-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-700/60 border border-brand-500/30 text-brand-200 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready to experience effortless home care?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Book a Verified Professional Today.
          </h2>
          <p className="text-brand-100/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Join thousands of happy homeowners across Bengaluru, Mumbai, and Delhi NCR. Transparent INR pricing, on-time arrivals, and full 30-day satisfaction guarantee.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-brand-900 hover:bg-brand-50 text-sm font-extrabold shadow-lg shadow-black/20 hover:scale-105 transition-all flex items-center justify-center space-x-2"
            >
              <span>Explore All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-700/80 hover:bg-brand-700 text-white border border-brand-400/40 text-sm font-bold transition-all flex items-center justify-center"
            >
              <span>Create Free Account</span>
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LandingPage;
