import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { servicesAPI } from '../services/api';
import ServiceCard from '../components/services/ServiceCard';
import ServiceFilterBar from '../components/services/ServiceFilterBar';
import { ServiceCardSkeleton } from '../components/common/SkeletonCard';
import EmptyState from '../components/common/EmptyState';
import BookingModal from '../components/services/BookingModal';
import { Sparkles } from 'lucide-react';

const CustomerDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('newest');

  // Booking Modal State
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const s = searchParams.get('search') || '';
    setCategory(cat);
    setSearchQuery(s);
  }, [searchParams]);

  // Fetch services whenever filter parameters change
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const params = {
          sort: sortBy
        };
        if (category && category !== 'All') {
          params.category = category;
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        const res = await servicesAPI.getAll(params);
        if (res.success && res.services) {
          setServices(res.services);
        }
      } catch (err) {
        console.error('Error fetching services:', err);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchServices();
    }, 200);

    return () => clearTimeout(timer);
  }, [category, searchQuery, sortBy]);

  const handleCategorySelect = (newCat) => {
    setCategory(newCat);
    const newParams = new URLSearchParams(searchParams);
    if (newCat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', newCat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (val.trim()) {
      newParams.set('search', val.trim());
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setCategory('All');
    setSearchQuery('');
    setSearchParams({});
  };

  const handleQuickBook = (service) => {
    setSelectedServiceForBooking(service);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen py-10 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="inline-flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ServeEasy Service Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Book Verified Home Professionals
          </h1>
          <p className="mt-1 text-slate-500 text-sm">
            Hand-picked, background-checked specialists with transparent fixed INR pricing.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <ServiceFilterBar
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={services.length}
        />

        {/* Services Grid or Skeleton or Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ServiceCardSkeleton key={i} />
            ))}
          </div>
        ) : services.length === 0 ? (
          <EmptyState
            icon="search"
            title="No Services Found"
            description="We couldn't find any services matching your active filters. Try searching for a different keyword or resetting your category."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
          />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onQuickBook={handleQuickBook}
              />
            ))}
          </motion.div>
        )}
      </div>

      {/* Booking Drawer / Modal */}
      {selectedServiceForBooking && (
        <BookingModal
          service={selectedServiceForBooking}
          isOpen={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
            setSelectedServiceForBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomerDashboard;
