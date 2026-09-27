import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Clock, Award, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 fill-current text-brand-100" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Serve<span className="text-brand-500">Easy</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Premium home services at your doorstep. Verified professionals, transparent pricing, and instant booking for your home maintenance needs.
            </p>
            <div className="flex items-center gap-4 text-xs font-medium text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-brand-500" /> Verified Pros
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-brand-500" /> On-Time Service
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-brand-500" /> Best Price
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Explore Services
                </Link>
              </li>
              <li>
                <Link to="/signup?role=provider" className="hover:text-white transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Customer Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Top Categories</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services?category=AC+Services" className="hover:text-white transition-colors">
                  AC Services & Repair
                </Link>
              </li>
              <li>
                <Link to="/services?category=Cleaning" className="hover:text-white transition-colors">
                  Deep Home Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services?category=Plumbing" className="hover:text-white transition-colors">
                  Plumbing Solutions
                </Link>
              </li>
              <li>
                <Link to="/services?category=Electrical" className="hover:text-white transition-colors">
                  Electrical & Switchboards
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Available In</h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-300">Mumbai</li>
              <li className="flex items-center gap-2 text-slate-300">Bengaluru</li>
              <li className="flex items-center gap-2 text-slate-300">Delhi NCR</li>
              <li className="flex items-center gap-2 text-slate-300">Pune</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ServeEasy Technologies Pvt Ltd. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for modern home living.
          </p>
        </div>
      </div>
    </footer>
  );
};
