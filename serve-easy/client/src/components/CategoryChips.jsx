import React from 'react';
import { 
  Grid, 
  Wind, 
  Sparkles, 
  Wrench, 
  Zap, 
  Scissors, 
  Paintbrush, 
  Tv 
} from 'lucide-react';

export const categoriesList = [
  { name: 'All', label: 'All Services', icon: Grid },
  { name: 'AC Services', label: 'AC Services', icon: Wind },
  { name: 'Cleaning', label: 'Deep Cleaning', icon: Sparkles },
  { name: 'Plumbing', label: 'Plumbing', icon: Wrench },
  { name: 'Electrical', label: 'Electrical', icon: Zap },
  { name: 'Grooming & Salon', label: 'Salon & Spa', icon: Scissors },
  { name: 'Painting', label: 'Painting', icon: Paintbrush },
  { name: 'Appliance Repair', label: 'Appliance Repair', icon: Tv },
];

export const CategoryChips = ({ activeCategory, onSelectCategory }) => {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
      {categoriesList.map((cat) => {
        const Icon = cat.icon;
        const isSelected = activeCategory === cat.name;
        return (
          <button
            key={cat.name}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
              isSelected
                ? 'bg-brand-600 text-white border-brand-600 shadow-md shadow-brand-500/20 scale-105'
                : 'bg-white text-slate-700 border-slate-200/80 hover:border-brand-500 hover:text-brand-600 hover:bg-slate-50'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
