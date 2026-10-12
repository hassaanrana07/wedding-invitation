import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Calendar, Compass } from 'lucide-react';
import { fetchStory } from '../../services/api';
import ImageWithFallback from '../ui/ImageWithFallback';

export default function OurStoryTimeline() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStory()
      .then((data) => setStories(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && stories.length === 0) return null;

  return (
    <section id="story" className="relative py-24 px-5 sm:px-6 overflow-hidden bg-gradient-to-b from-transparent via-[#0f141f]/60 to-transparent">
      {/* Ambient Lighting Background */}
      <div className="ambient-glow w-96 h-96 bg-gold-500/10 top-1/3 left-1/2 -translate-x-1/2" />
      <div className="ambient-glow w-80 h-80 bg-rosewood-500/10 bottom-10 left-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <p className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-400">
              Our Journey of Togetherness
            </p>
            <Sparkles className="w-4 h-4 text-gold-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient"
          >
            Our Story & Milestones
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm text-cream-300/80 max-w-lg mx-auto mt-3 font-light leading-relaxed"
          >
            From the first spark of friendship in Lahore to forever — cherished chapters woven with joy, understanding, and love.
          </motion.p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-5" />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Central Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-gold-400/60 to-transparent -translate-x-1/2" />

          {/* Left Vertical Spine for Mobile */}
          <div className="block md:hidden absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-transparent via-gold-400/60 to-transparent" />

          <div className="space-y-12 md:space-y-20">
            {stories.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, x: isEven ? -35 : 35, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 pl-10 md:pl-0 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Milestone Jewel Dot (Desktop Center) */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-gold-400 bg-gradient-to-br from-[#181e2b] to-[#0C0F14] items-center justify-center shadow-xl shadow-gold-500/30 z-10 group hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-gold-400 fill-gold-400/40" />
                  </div>

                  {/* Milestone Node (Mobile Left) */}
                  <div className="flex md:hidden absolute left-4 -translate-x-1/2 top-4 w-8 h-8 rounded-full border-2 border-gold-400 bg-[#0C0F14] items-center justify-center shadow-lg shadow-gold-500/30 z-10">
                    <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400/40" />
                  </div>

                  {/* Story Description Card */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-10 text-left' : 'md:pr-10 md:text-right text-left'}`}>
                    <div className="p-6 sm:p-8 rounded-3xl border border-gold-500/25 bg-[#131720]/90 backdrop-blur-md shadow-xl hover:border-gold-400/50 transition-all group">
                      <div className={`flex items-center gap-2 mb-2.5 ${isEven ? 'justify-start' : 'justify-start md:justify-end'}`}>
                        <Calendar className="w-4 h-4 text-gold-400" />
                        <span className="font-cinzel text-base sm:text-lg font-bold text-gold-400 tracking-wider">
                          {item.year}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-gold-light mb-3 group-hover:text-gold-200 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-cream-300/90 leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Story Milestone Photograph */}
                  {item.image_url ? (
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                      <div className="overflow-hidden rounded-3xl border-2 border-gold-500/25 aspect-[16/10] shadow-2xl bg-black/60 group hover:border-gold-400/50 transition-all">
                        <ImageWithFallback
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                          containerClassName="w-full h-full"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block w-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
