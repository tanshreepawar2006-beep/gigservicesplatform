import React from 'react';
import { motion } from 'framer-motion';
import { Search, CalendarCheck, Smile, Check } from 'lucide-react';

const steps = [
  {
    step: '01',
    title: 'Select Your Service',
    description:
      'Explore transparently priced services with zero hidden fees. View customer reviews, ratings, and inclusions upfront.',
    icon: Search,
    perks: ['Fixed pricing in INR', 'Verified scope of work']
  },
  {
    step: '02',
    title: 'Pick Date & Slot',
    description:
      'Choose a 2-hour arrival window that fits your schedule seamlessly. Provide your address and any specific instructions.',
    icon: CalendarCheck,
    perks: ['Same-day slots available', 'Instant booking confirmation']
  },
  {
    step: '03',
    title: 'Relax & Pay Post-Job',
    description:
      'Our background-verified professional arrives equipped with professional tools and finishes the task with a 30-day warranty.',
    icon: Smile,
    perks: ['Police-verified partner', '30-day rework warranty']
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
            <span>Effortless Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How ServeEasy Works
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Getting high-quality home service shouldn't feel like a negotiation. Book in 3 simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-50 border border-brand-200/80 flex items-center justify-center text-brand-700">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-3xl font-black text-slate-200 font-mono">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  {item.perks.map((perk) => (
                    <div key={perk} className="flex items-center space-x-2 text-xs text-slate-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
