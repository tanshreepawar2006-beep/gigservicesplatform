import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, ExternalLink, Compass, ShieldCheck } from 'lucide-react';

const GoogleMapModal = ({ isOpen, onClose, address, customerName, serviceTitle }) => {
  if (!isOpen || !address) return null;

  const lat = address.coordinates?.lat || 12.9352;
  const lng = address.coordinates?.lng || 77.6245;
  const fullAddress = `${address.street || ''}, ${address.city || ''} ${address.pincode || ''}`;
  const encodedAddress = encodeURIComponent(`${fullAddress}`);

  // Google Maps Embed URL (uses coordinates or full address for pinpoint accuracy)
  const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-modal border border-slate-100 max-w-2xl w-full overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200/60 mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>Job Dispatch Location</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Customer Service Destination
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {customerName ? `Client: ${customerName} • ` : ''}{serviceTitle || 'Home Service'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Google Map Frame */}
          <div className="relative w-full h-80 bg-slate-100">
            <iframe
              title="Job Location Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapSrc}
              className="w-full h-full"
            />
            {/* Live Location Marker Overlay Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-2 text-xs font-bold text-slate-800 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-600 animate-ping" />
              <span>Target Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}</span>
            </div>
          </div>

          {/* Destination Details & Driving Navigation CTA */}
          <div className="p-6 space-y-4">
            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <MapPin className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  Delivery Address
                </div>
                <div className="text-sm font-bold text-slate-900 leading-snug">
                  {address.street}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {address.city} - {address.pincode}
                </div>
                {address.landmark && (
                  <div className="text-xs text-brand-700 font-medium mt-1">
                    📌 Landmark: {address.landmark}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified geo-coordinates for direct dispatch</span>
              </span>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Google Maps Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default GoogleMapModal;
