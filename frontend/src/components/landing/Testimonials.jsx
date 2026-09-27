import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Sneha Kulkarni',
    city: 'Indiranagar, Bengaluru',
    service: 'Split AC Power Jet Cleaning',
    review:
      'Rajesh arrived right on time with a specialized jet pump and waterproof canvas bag. Zero water splashed on my wooden flooring, and our AC cooling is restored like day one!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    date: '2 days ago'
  },
  {
    name: 'Rohan Nambiar',
    city: 'Powai, Mumbai',
    service: 'Full Home Deep Cleaning',
    review:
      'Booked ServeEasy deep cleaning for our 3BHK before housewarming. Sunita and her team operated single-disc scrubbers on the balcony tiles and steam cleaned the kitchen. Exceptional quality!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    date: '1 week ago'
  },
  {
    name: 'Divya Sen',
    city: 'Vasant Kunj, Delhi NCR',
    service: "Ayurvedic Glow Facial & Pedicure",
    review:
      'Priya is extremely hygienic and professional. Sealed single-use kit opened in front of me, relaxing foot massage, and zero commute in evening traffic. Highly recommended!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: '3 days ago'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
            <span>Real Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by Over 12,000+ Homeowners
          </h2>
          <p className="mt-3 text-slate-600 text-sm">
            Read authentic experiences from residents across Bengaluru, Mumbai, and Delhi NCR.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-50/80 rounded-3xl p-7 border border-slate-200/70 shadow-soft flex flex-col justify-between relative group hover:bg-white hover:border-brand-300 hover:shadow-card transition-all duration-300"
            >
              <div>
                {/* Star rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">5.0</span>
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{item.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-sm font-bold text-slate-900">
                        {item.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {item.city}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-medium">
                  {item.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
