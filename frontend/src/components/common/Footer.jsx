import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, Clock, Award, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-slate-800/80">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">100% Verified Partners</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Background-checked, identity verified, and trained service specialists.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">On-Time Guarantee</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Choose convenient 2-hour arrival windows that respect your busy schedule.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-900/60 border border-brand-500/30 flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-1">30-Day Service Warranty</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Complete peace of mind. Free rework if anything doesn't meet your standard.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Serve<span className="text-brand-400">Easy</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's premium on-demand platform for everyday home maintenance, deep cleaning, and appliance servicing.
            </p>
            <div className="text-xs text-slate-500">
              ISO 9001:2015 Certified Operations
            </div>
          </div>

          {/* Popular Categories */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Popular Services
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/services?category=Cleaning" className="hover:text-brand-400 transition-colors">
                  Deep Home Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services?category=Appliances" className="hover:text-brand-400 transition-colors">
                  Split AC Jet Wash & Gas
                </Link>
              </li>
              <li>
                <Link to="/services?category=Electrical" className="hover:text-brand-400 transition-colors">
                  Electrician on Demand
                </Link>
              </li>
              <li>
                <Link to="/services?category=Plumbing" className="hover:text-brand-400 transition-colors">
                  Tap & Pipe Leak Repairs
                </Link>
              </li>
              <li>
                <Link to="/services?category=Grooming" className="hover:text-brand-400 transition-colors">
                  Doorstep Salon & Grooming
                </Link>
              </li>
            </ul>
          </div>

          {/* Serving Cities */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Serving Cities
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center justify-between">
                <span>Bengaluru</span>
                <span className="text-[10px] bg-brand-950 text-brand-400 border border-brand-800 px-2 py-0.5 rounded-full">Available</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Mumbai</span>
                <span className="text-[10px] bg-brand-950 text-brand-400 border border-brand-800 px-2 py-0.5 rounded-full">Available</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Delhi NCR</span>
                <span className="text-[10px] bg-brand-950 text-brand-400 border border-brand-800 px-2 py-0.5 rounded-full">Available</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Hyderabad</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Coming Soon</span>
              </li>
            </ul>
          </div>

          {/* Service Partner CTA */}
          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
              Partner with Us
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Are you an experienced electrician, technician, or cleaning professional? Join ServeEasy and grow your income.
            </p>
            <Link
              to="/signup"
              className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
            >
              Register as Partner →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ServeEasy Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Safety Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
