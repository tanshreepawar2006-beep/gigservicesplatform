import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ServiceCard } from '../components/ServiceCard';
import { CategoryChips } from '../components/CategoryChips';
import { ServiceGridSkeleton } from '../components/SkeletonLoader';
import { EmptyState } from '../components/EmptyState';
import { BookingModal } from '../components/BookingModal';
import { BookingSuccessModal } from '../components/BookingSuccessModal';
import { Search, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const CustomerDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, isCustomer } = useAuth();

  const categoryFromUrl = searchParams.get('category') || 'All';
  const searchFromUrl = searchParams.get('search') || '';

  const [activeCategory, setActiveCategory] = useState(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking Modal States
  const [selectedService, setSelectedService] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    setActiveCategory(categoryFromUrl);
    setSearchQuery(searchFromUrl);
  }, [categoryFromUrl, searchFromUrl]);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getServices({
          category: activeCategory,
          search: searchQuery,
        });
        setServices(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load services. Please check your network connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [activeCategory, searchQuery]);

  const handleCategorySelect = (categoryName) => {
    setActiveCategory(categoryName);
    const newParams = new URLSearchParams(searchParams);
    if (categoryName === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryName);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('search');
    } else {
      newParams.set('search', query);
    }
    setSearchParams(newParams);
  };

  const handleBookNow = (service) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!isCustomer) {
      alert('Only Customer accounts can book home services. Please log in with a customer account.');
      return;
    }
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const handleBookingSuccess = (booking) => {
    setIsBookingModalOpen(false);
    setCreatedBooking(booking);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 min-h-[calc(100vh-12rem)]">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl" />
        
        <div className="space-y-2 relative z-10 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-brand-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Book Trusted Experts
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Explore Local Home Services
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Top-rated background-verified technicians and artisans ready for doorstep service.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="w-full md:w-80 relative z-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800/90 text-white placeholder-slate-400 rounded-2xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <SlidersHorizontal className="w-4 h-4 text-brand-600" /> Filter By Category
          </h2>
          {(activeCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setSearchParams({});
              }}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
        <CategoryChips
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>

      {/* Services Grid */}
      {loading ? (
        <ServiceGridSkeleton count={6} />
      ) : error ? (
        <EmptyState
          title="Connection Error"
          description={error}
          actionLabel="Try Again"
          onAction={() => window.location.reload()}
        />
      ) : services.length === 0 ? (
        <EmptyState
          title="No services match your filter"
          description={`We couldn't find any service for "${searchQuery || activeCategory}". Try searching for another category like AC Services or Cleaning.`}
          actionLabel="Clear Filters"
          onAction={() => {
            setActiveCategory('All');
            setSearchQuery('');
            setSearchParams({});
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        service={selectedService}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />

      {/* Success Modal */}
      <BookingSuccessModal
        booking={createdBooking}
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </div>
  );
};
