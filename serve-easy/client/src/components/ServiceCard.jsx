import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, UserCheck, ArrowRight } from 'lucide-react';

export const ServiceCard = ({ service, onBookNow }) => {
  const providerName = service.providerId?.name || 'Verified Professional';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col group"
    >
      {/* Image container */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
            {service.category}
          </span>
        </div>

        {/* Rating Pill */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-amber-400 border border-slate-700/50">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{service.rating?.toFixed(1) || '4.8'}</span>
          <span className="text-slate-400 font-normal text-[10px]">({service.reviewsCount || 18})</span>
        </div>

        {/* Location & Duration bottom badges */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[11px]">
            <Clock className="w-3 h-3 text-brand-400" /> {service.duration || '60 mins'}
          </span>
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-md text-[11px]">
            <MapPin className="w-3 h-3 text-brand-400" /> {service.location || 'Mumbai'}
          </span>
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-1 mb-1.5">
            {service.title}
          </h3>
          <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
            {service.description}
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 mb-4">
            <UserCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
            <span className="truncate font-medium">By {providerName}</span>
          </div>
        </div>

        {/* Card Footer: Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Price</span>
            <span className="text-lg font-extrabold text-slate-900">
              ₹{service.price?.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/services/${service._id}`}
              className="p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
              title="View Details"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => onBookNow && onBookNow(service)}
              className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
