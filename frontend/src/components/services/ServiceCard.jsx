import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

const ServiceCard = ({ service, onQuickBook }) => {
  const provider = service.providerId || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-hover hover:border-brand-400/60 transition-all duration-300 flex flex-col group"
    >
      {/* Service Image with Category & Rating Badge */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

        {/* Category Pill */}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
          {service.category}
        </span>

        {/* Duration Pill */}
        <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white">
          <Clock className="w-3 h-3 text-slate-300" />
          <span>{service.duration || '60 mins'}</span>
        </div>

        {/* Bottom Image Stats: Rating & Reviews */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>{service.rating?.toFixed(1) || '4.9'}</span>
          <span className="text-slate-400 font-normal">
            ({service.reviewCount || 34})
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link
            to={`/services/${service._id}`}
            className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-1 block mb-2"
          >
            {service.title}
          </Link>

          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>
        </div>

        <div>
          {/* Provider Snippet */}
          <div className="flex items-center space-x-2.5 py-3 border-t border-slate-100 mb-4">
            <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {provider.name?.charAt(0) || 'P'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="text-xs font-bold text-slate-800 truncate">
                  {provider.name || 'Verified Specialist'}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600 flex-shrink-0" />
              </div>
              <span className="text-[10px] text-slate-400 block truncate">
                {provider.city || 'Bengaluru'} • {provider.rating || '4.9'}★ Partner
              </span>
            </div>
          </div>

          {/* Price & CTA Action */}
          <div className="pt-2 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                Standard Price
              </span>
              <span className="text-xl font-extrabold text-slate-900">
                ₹{service.price?.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                to={`/services/${service._id}`}
                className="px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors flex items-center space-x-1"
              >
                <span>Details</span>
              </Link>
              <button
                onClick={() => onQuickBook && onQuickBook(service)}
                className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 transition-all flex items-center space-x-1"
              >
                <span>Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
