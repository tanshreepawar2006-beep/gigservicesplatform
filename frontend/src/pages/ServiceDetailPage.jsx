import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  ArrowLeft,
  Calendar,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { servicesAPI } from '../services/api';
import BookingModal from '../components/services/BookingModal';
import LicenseBadgeModal from '../components/common/LicenseBadgeModal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        const res = await servicesAPI.getById(id);
        if (res.success && res.service) {
          setService(res.service);
        }
      } catch (err) {
        console.error('Error fetching service:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleBookClick = () => {
    if (!isAuthenticated) {
      showToast('Please log in as a Customer to book this service.', 'info');
      navigate('/login', { state: { from: `/services/${id}` } });
      return;
    }
    if (user?.role === 'provider') {
      showToast('Service providers cannot book services. Please use a customer account.', 'error');
      return;
    }
    setIsBookingModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        <div className="w-32 h-6 bg-slate-200 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <div className="w-full h-96 bg-slate-200 rounded-3xl" />
            <div className="w-3/4 h-8 bg-slate-200 rounded" />
            <div className="w-full h-24 bg-slate-100 rounded-2xl" />
          </div>
          <div className="w-full h-96 bg-slate-200 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Service Not Found</h2>
        <p className="text-slate-500 text-sm mb-6">
          The service listing you are looking for may have been archived or removed.
        </p>
        <Link
          to="/services"
          className="px-6 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold shadow-md"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  const provider = service.providerId || {};

  return (
    <div className="min-h-screen py-8 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-xs font-semibold text-slate-500">
          <Link to="/services" className="hover:text-brand-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Services</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <Link
            to={`/services?category=${encodeURIComponent(service.category)}`}
            className="hover:text-brand-600 transition-colors"
          >
            {service.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-800 truncate max-w-xs">{service.title}</span>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column: Media & Information Hierarchy */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Banner */}
            <div className="relative rounded-3xl overflow-hidden shadow-soft border border-slate-200/80 h-72 sm:h-96 w-full bg-slate-100">
              <img
                src={service.imageUrl}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white/95 backdrop-blur-md text-slate-900 shadow-sm">
                  {service.category}
                </span>
              </div>

              <div className="absolute top-4 right-4 flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/80 backdrop-blur-md text-white">
                <Clock className="w-3.5 h-3.5 text-slate-300" />
                <span>{service.duration || '60 mins'}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center space-x-2 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{service.rating?.toFixed(1) || '4.9'}</span>
                  <span className="text-slate-400 font-normal">
                    ({service.reviewCount || 42} verified reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft space-y-5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {service.title}
              </h1>

              <div className="pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  About This Service
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                  {service.description}
                </p>
              </div>

              {/* What's Included / Checklist */}
              {service.features && service.features.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    What's Included in This Package
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Provider Profile Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-700 mb-4">
                <Award className="w-4 h-4" />
                <span>Certified Service Specialist</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-slate-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-brand-100 border border-brand-200 overflow-hidden flex-shrink-0 flex items-center justify-center text-brand-800 text-xl font-black">
                    {provider.avatar ? (
                      <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                    ) : (
                      provider.name?.charAt(0) || 'P'
                    )}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-lg font-bold text-slate-900">
                        {provider.name || 'Verified Partner'}
                      </h4>
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-200/60">
                        <ShieldCheck className="w-3 h-3 text-brand-600" />
                        Verified Pro
                      </span>
                      <button
                        onClick={() => setIsLicenseModalOpen(true)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 transition-colors shadow-2xs"
                        title="Click to view verified trade license and credentials"
                      >
                        <Award className="w-3 h-3 text-emerald-600" />
                        <span>Govt. Licensed ({provider.license?.number || 'Verified'})</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {provider.city || 'Bengaluru'}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {provider.rating || '4.9'} Partner Rating
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200/80">
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>Verified Direct Dispatch</span>
                </div>
              </div>

              <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {provider.bio ||
                  'Experienced, certified technician with rigorous background vetting and ongoing quality audits.'}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky "Book Now" CTA Card */}
          <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-card">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs uppercase font-bold text-slate-400">
                  Package Pricing
                </span>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-slate-900">
                    ₹{service.price?.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[11px] text-emerald-600 font-semibold">
                    Inclusive of all taxes
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/60 space-y-2 mb-6">
                <div className="flex items-center space-x-2 text-xs font-bold text-brand-900">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  <span>ServeEasy Standard Guarantee</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  ✓ Free rework within 30 days if not satisfied<br />
                  ✓ Pay securely post-service inspection<br />
                  ✓ Police-verified background checked partners
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookClick}
                className="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-base shadow-lg shadow-brand-600/25 hover:shadow-brand-600/35 transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Service Now</span>
              </motion.button>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-400">
                  ⚡ Next available slots starting tomorrow in your city
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <BookingModal
          service={service}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}

      {/* License Verification Modal */}
      <LicenseBadgeModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        providerId={provider._id}
        initialLicense={provider.license}
        providerName={provider.name}
      />
    </div>
  );
};

export default ServiceDetailPage;
