import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import ImageWithFallback from '../ui/ImageWithFallback';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

export default function CoupleSection() {
  const { wedding } = useWedding();

  const brideName = wedding.bride_name || 'Rida';
  const brideRelation = wedding.bride_relation || 'Daughter of';
  const brideParents = wedding.bride_parents || 'Mr. and Mrs. Rana Sami-ul-Aziz Khan';

  const groomName = wedding.groom_name || 'Harish';
  const groomRelation = wedding.groom_relation || 'Son of';
  const groomParents = wedding.groom_parents || 'Mr. and Mrs. Shameem Rana';

  return (
    <section id="wedding-intro" className="relative py-24 px-6 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="ambient-glow w-80 h-80 bg-rosewood-500/15 top-1/2 right-10" />
      <div className="ambient-glow w-72 h-72 bg-emerald-500/10 bottom-10 left-10" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-cinzel text-xs tracking-[0.3em] uppercase text-gold-400 mb-2"
          >
            The Auspicious Union
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl font-bold text-gold-light"
          >
            Two Hearts, One Soul
          </motion.h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-4" />
        </div>

        {/* Couple Profile Cards / Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Couple Image with Framed Border & Fallback Protection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-gold-500/30 p-2 bg-[#12161C] shadow-2xl shadow-gold-900/20">
              <div className="overflow-hidden rounded-2xl aspect-[4/5] relative bg-black/50">
                <ImageWithFallback
                  src={wedding.couple_image_url || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85'}
                  alt={wedding.couple_title || 'The Couple'}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                  <span className="font-cinzel text-xs tracking-widest text-gold-300 uppercase block mb-1">
                    Forever & Always
                  </span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {wedding.couple_title || 'Rida & Harish'}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Monogram / Soulmates Badge */}
            <div className="absolute -bottom-5 -right-3 sm:-right-5 flex items-center gap-2.5 bg-[#0C0F14] border border-gold-400/40 px-4 py-2 rounded-full shadow-2xl">
              <RoyalMonogramSeal size={28} glow={true} />
              <Heart className="w-3.5 h-3.5 text-rosewood-400 fill-rosewood-400 animate-pulse" />
              <span className="font-serif text-xs sm:text-sm text-gold-200">Soulmates</span>
            </div>
          </motion.div>

          {/* Couple Description & Parental Lineage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-6 text-center md:text-left"
          >
            <div>
              <span className="font-script text-3xl sm:text-4xl text-gold-300 block mb-2">
                Our Journey of Love
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 font-semibold leading-snug">
                "In all the world, there is no heart for me like yours."
              </h3>
            </div>

            <p className="text-cream-300/80 text-sm sm:text-base leading-relaxed font-light">
              {wedding.intro_story ||
                'From two different worlds to one shared destiny. Our story is woven with laughter, quiet understanding, and an unbreakable bond that brings us to celebrate our forever. We are blessed to embark on this lifelong voyage together, holding hands under the grace and blessings of Allah.'}
            </p>

            {/* Parental Lineage & Dignity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gold-500/20 text-left">
              {/* Bride Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gold-500/20 hover:border-gold-500/40 transition-all">
                <p className="font-cinzel text-[11px] text-gold-400 uppercase tracking-widest mb-1">
                  The Bride
                </p>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-gold-light">
                  {brideName}
                </h4>
                <div className="mt-2 text-xs text-cream-300/90 leading-relaxed">
                  <span className="text-gold-400/80 font-medium text-[11px] block">{brideRelation}</span>
                  <span className="font-medium text-cream-100">{brideParents}</span>
                </div>
              </div>

              {/* Groom Card */}
              <div className="p-5 rounded-2xl bg-black/40 border border-gold-500/20 hover:border-gold-500/40 transition-all">
                <p className="font-cinzel text-[11px] text-gold-400 uppercase tracking-widest mb-1">
                  The Groom
                </p>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-gold-light">
                  {groomName}
                </h4>
                <div className="mt-2 text-xs text-cream-300/90 leading-relaxed">
                  <span className="text-gold-400/80 font-medium text-[11px] block">{groomRelation}</span>
                  <span className="font-medium text-cream-100">{groomParents}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
