import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-[#F8FAFC]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full text-center bg-white rounded-3xl p-10 border border-slate-200/80 shadow-soft"
      >
        <div className="w-20 h-20 rounded-3xl bg-brand-50 border border-brand-200/80 text-brand-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Wrench className="w-10 h-10 stroke-[2.2]" />
        </div>

        <span className="text-4xl font-black text-slate-900 font-mono tracking-tight">
          404
        </span>
        <h2 className="text-xl font-bold text-slate-900 mt-2 mb-3">
          Page Under Renovation
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-8">
          The link or page you were trying to access does not exist or has been relocated to another corridor.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 transition-all flex items-center justify-center space-x-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            to="/services"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
          >
            <span>Explore Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
