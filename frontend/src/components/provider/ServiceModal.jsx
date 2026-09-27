import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { servicesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const categories = [
  'Cleaning',
  'Appliances',
  'Electrical',
  'Plumbing',
  'Grooming',
  'Pest Control'
];

const presetImages = {
  Cleaning: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
  Appliances: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
  Electrical: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80',
  Plumbing: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
  Grooming: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
  'Pest Control': 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80'
};

const ServiceModal = ({ isOpen, onClose, onSaved, serviceToEdit }) => {
  const { showToast } = useToast();
  const isEditing = !!serviceToEdit;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Appliances');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('60 mins');
  const [imageUrl, setImageUrl] = useState('');
  const [features, setFeatures] = useState([
    'Verified & Background-Checked Specialist',
    'Standard 30-Day Service Guarantee'
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (serviceToEdit) {
      setTitle(serviceToEdit.title || '');
      setCategory(serviceToEdit.category || 'Appliances');
      setDescription(serviceToEdit.description || '');
      setPrice(serviceToEdit.price || '');
      setDuration(serviceToEdit.duration || '60 mins');
      setImageUrl(serviceToEdit.imageUrl || '');
      setFeatures(serviceToEdit.features?.length ? serviceToEdit.features : [
        'Verified & Background-Checked Specialist',
        'Standard 30-Day Service Guarantee'
      ]);
    } else {
      setTitle('');
      setCategory('Appliances');
      setDescription('');
      setPrice('');
      setDuration('60 mins');
      setImageUrl(presetImages['Appliances']);
      setFeatures([
        'Verified & Background-Checked Specialist',
        'Standard 30-Day Service Guarantee'
      ]);
    }
    setErrorMsg('');
  }, [serviceToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    // If user hasn't typed custom image, update image to category preset
    if (!imageUrl || Object.values(presetImages).includes(imageUrl)) {
      setImageUrl(presetImages[newCat] || presetImages.Appliances);
    }
  };

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures([...features, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || !description.trim() || !price || !imageUrl.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        title: title.trim(),
        category,
        description: description.trim(),
        price: Number(price),
        duration: duration.trim(),
        imageUrl: imageUrl.trim(),
        features
      };

      if (isEditing) {
        await servicesAPI.update(serviceToEdit._id, payload);
        showToast('Service updated successfully!', 'success');
      } else {
        await servicesAPI.create(payload);
        showToast('New service published successfully!', 'success');
      }

      onSaved();
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save service.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative bg-white rounded-3xl shadow-modal border border-slate-100 max-w-xl w-full overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200/60">
                Partner Service Catalog
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {isEditing ? 'Edit Service Listing' : 'Publish New Service'}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {errorMsg && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Title *
              </label>
              <input
                type="text"
                placeholder="e.g. Microwave Oven Repair & Magnetron Diagnosis"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
            </div>

            {/* Category & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 cursor-pointer bg-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Estimated Duration
                </label>
                <input
                  type="text"
                  placeholder="e.g. 60 mins, 2 hours"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Price in INR (₹) *
              </label>
              <input
                type="number"
                min="99"
                placeholder="e.g. 499"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 font-semibold"
              />
            </div>

            {/* Image URL & Preview */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Cover Image URL *</span>
                <button
                  type="button"
                  onClick={() => setImageUrl(presetImages[category] || presetImages.Appliances)}
                  className="text-[11px] text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Use Category Preset</span>
                </button>
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              />
              {imageUrl && (
                <div className="mt-2 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = presetImages.Appliances;
                    }}
                  />
                  <span className="absolute bottom-2 right-2 text-[10px] bg-slate-900/80 text-white px-2 py-0.5 rounded-md font-semibold">
                    Preview
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Detailed Service Description *
              </label>
              <textarea
                rows="3"
                placeholder="Explain what is covered in this service, technician checklist, and customer requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 resize-none leading-relaxed"
              />
            </div>

            {/* Key Features List */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Key Deliverables & Inclusions
              </label>
              <div className="space-y-2 mb-2">
                {features.map((f, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium"
                  >
                    <span>• {f}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Free 30-day rework warranty"
                  value={newFeatureInput}
                  onChange={(e) => setNewFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-600/20 hover:shadow-brand-600/30 transition-all flex items-center space-x-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{isEditing ? 'Save Changes' : 'Publish Service'}</span>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ServiceModal;
