import React from 'react';
import { SearchX, CalendarX2, Sparkles } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = SearchX,
  title = 'No results found',
  description = 'Try adjusting your search query or selecting a different category filter.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-8 shadow-soft">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 shadow-inner">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1.5">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:bg-brand-700 transition-all active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
