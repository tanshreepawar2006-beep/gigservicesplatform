import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Edit2, Loader2, Image as ImageIcon, Sparkles } from 'lucide-react';
import { api } from '../services/api';

const SAMPLE_IMAGES = [
  { label: 'AC Maintenance', url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800' },
  { label: 'Deep Cleaning', url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800' },
  { label: 'Electrical Work', url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800' },
  { label: 'Plumbing', url: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?q=80&w=800' },
  { label: 'Grooming & Salon', url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800' },
];

export const CreateEditServiceModal = ({ serviceToEdit, isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AC Services');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('60 mins');
  const [location, setLocation] = useState('Mumbai');
  const [imageUrl, setImageUrl] = useState(SAMPLE_IMAGES[0].url);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (serviceToEdit) {
      setTitle(serviceToEdit.title || '');
      setCategory(serviceToEdit.category || 'AC Services');
      setPrice(serviceToEdit.price || '');
      setDuration(serviceToEdit.duration || '60 mins');
      setLocation(serviceToEdit.location || 'Mumbai');
      setImageUrl(serviceToEdit.imageUrl || SAMPLE_IMAGES[0].url);
      setDescription(serviceToEdit.description || '');
    } else {
      setTitle('');
      setCategory('AC Services');
      setPrice('');
      setDuration('60 mins');
      setLocation('Mumbai');
      setImageUrl(SAMPLE_IMAGES[0].url);
      setDescription('');
    }
  }, [serviceToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !price || !description || !imageUrl) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title,
        category,
        price: Number(price),
        duration,
        location,
        imageUrl,
        description
      };

      let result;
      if (serviceToEdit) {
        result = await api.updateService(serviceToEdit._id, payload);
      } else {
        result = await api.createService(payload);
      }

      onSuccess(result);
    } catch (err) {
      setError(err.message || 'Failed to save service listing');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-modal border border-slate-100 my-8"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" /> Provider Studio
            </div>
            <h2 className="text-xl font-extrabold pr-8">
              {serviceToEdit ? 'Edit Service Listing' : 'Add New Service Listing'}
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Service Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Deep AC Foam Jet Cleaning"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800"
                required
              />
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800 bg-white"
                >
                  <option value="AC Services">AC Services</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Grooming & Salon">Grooming & Salon</option>
                  <option value="Painting">Painting</option>
                  <option value="Appliance Repair">Appliance Repair</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Price (INR ₹) *
                </label>
                <input
                  type="number"
                  min="50"
                  placeholder="e.g. 599"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800"
                  required
                />
              </div>
            </div>

            {/* Duration & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 60 mins / 2 hrs"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  City / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800"
                />
              </div>
            </div>

            {/* Image URL & Preset Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Image URL *
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800 mb-2"
                required
              />
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-slate-400 mr-1">Sample Photos:</span>
                {SAMPLE_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageUrl(img.url)}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition-colors"
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Service Description *
              </label>
              <textarea
                rows="3"
                placeholder="Explain what is included in this service, procedure, tools used..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-medium text-slate-800 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving Listing...
                  </>
                ) : (
                  <>
                    {serviceToEdit ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {serviceToEdit ? 'Update Service Listing' : 'Publish Service Listing'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
