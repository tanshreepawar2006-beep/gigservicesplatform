import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { BookingModal } from '../components/BookingModal';
import { BookingSuccessModal } from '../components/BookingSuccessModal';
import { 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isCustomer } = useAuth();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking Modal States
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getServiceById(id);
        setService(data);
      } catch (err) {
        console.error(err);
        setError('Service not found or unavailable');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isCustomer) {
      alert('Only Customer accounts can book services. Please log in with a customer account.');
      return;
    }
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (booking) => {
    setIsBookingModalOpen(false);
    setCreatedBooking(booking);
    setIsSuccessModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-md mx-auto my-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Service Not Found</h2>
        <p className="text-slate-500 text-xs">{error || 'This service listing may have been removed.'}</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-1 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services
        </Link>
      </div>
    );
  }

  const provider = service.providerId || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[calc(100vh-12rem)]">
      {/* Back Button */}
      <div>
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Hero Image */}
          <div className="relative h-64 sm:h-96 rounded-3xl overflow-hidden shadow-card border border-slate-200/80 bg-slate-900">
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-white text-slate-900 shadow-md uppercase tracking-wider">
                {service.category}
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/90 text-amber-400 backdrop-blur-md border border-slate-700">
              <Star className="w-4 h-4 fill-current" />
              <span>{service.rating?.toFixed(1) || '4.9'}</span>
              <span className="text-slate-400 font-normal text-[11px]">({service.reviewsCount || 24} reviews)</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
              <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md">
                {service.title}
              </h1>
              <div className="flex items-center gap-4 text-xs text-slate-200">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-400" /> {service.duration || '60 mins'}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" /> {service.location || 'Mumbai'}
                </span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Service Description</h2>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
              {service.description}
            </p>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Single-use sealed hygiene equipment</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>30-Day Service Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Transparent Cash on Delivery Payment</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Free reschedule up to 2 hours before</span>
              </div>
            </div>
          </div>

          {/* Provider Info Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-brand-600" /> About the Service Partner
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                Verified Provider
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-md">
                {provider.name ? provider.name.charAt(0) : 'P'}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">{provider.name || 'Professional Partner'}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {provider.city || 'Mumbai'} • Active on ServeEasy
                </p>
                {provider.bio && (
                  <p className="text-xs text-slate-600 pt-1 leading-relaxed italic">
                    "{provider.bio}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky CTA Sidebar (Right 1 col) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card space-y-6">
            <div className="space-y-1 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900">
                  ₹{service.price?.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-500">all inclusive</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>Duration</span>
                <span className="font-bold text-slate-800">{service.duration || '60 mins'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Location</span>
                <span className="font-bold text-slate-800">{service.location || 'Mumbai'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cancellation</span>
                <span className="font-bold text-emerald-600">Free</span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full py-4 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Calendar className="w-5 h-5" /> Book Appointment Now
            </button>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" /> Pay after service completion
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modals */}
      <BookingModal
        service={service}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />

      <BookingSuccessModal
        booking={createdBooking}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};
