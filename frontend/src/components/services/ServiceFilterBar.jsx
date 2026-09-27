import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const categories = [
  'All',
  'Cleaning',
  'Appliances',
  'Electrical',
  'Plumbing',
  'Grooming',
  'Pest Control'
];

const ServiceFilterBar = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalCount
}) => {
  return (
    <div className="space-y-5 mb-8">
      {/* Search & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by service name or description (e.g. AC, leak, sofa)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white rounded-2xl border border-slate-200/90 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 shadow-soft transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-2xl border border-slate-200/90 shadow-soft">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-transparent border-none focus:outline-none focus:ring-0 cursor-pointer pr-4"
          >
            <option value="newest">Newest First</option>
            <option value="rating">Top Rated (★)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Chips Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center space-x-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25 scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-500 font-semibold whitespace-nowrap pl-2">
          Showing <span className="text-slate-900 font-bold">{totalCount}</span> services
        </div>
      </div>
    </div>
  );
};

export default ServiceFilterBar;
