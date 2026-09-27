import React from 'react';
import { motion } from 'framer-motion';
import { SearchX, CalendarX, Sparkles, Inbox } from 'lucide-react';

const EmptyState = ({
  icon = 'search',
  title = 'No Results Found',
  description = 'Try refining your filters or search keywords to find what you are looking for.',
  actionLabel,
  onAction
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'calendar':
        return <CalendarX className="w-10 h-10 text-brand-600" />;
      case 'inbox':
        return <Inbox className="w-10 h-10 text-brand-600" />;
      case 'sparkles':
        return <Sparkles className="w-10 h-10 text-brand-600" />;
      case 'search':
      default:
        return <SearchX className="w-10 h-10 text-brand-600" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-soft max-w-lg mx-auto my-8"
    >
      <div className="w-20 h-20 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center mb-5 shadow-sm">
        {renderIcon()}
      </div>
      <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAction}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl shadow-md transition-colors"
        >
          {actionLabel}
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
