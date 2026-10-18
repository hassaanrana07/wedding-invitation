import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, MapPin } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import ImageWithFallback from '../ui/ImageWithFallback';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import {
  FloralDivider,
  DelicateHeart,
  BotanicalHeaderArch,
  BotanicalFloralSprig,
} from '../ui/BotanicalOrnaments';

export default function CoupleSection() {
  const { wedding } = useWedding();

  const brideName = wedding.bride_name || 'Laraib Ajmal';
  const brideRelation = wedding.bride_relation || 'Daughter of';
  const brideParents = wedding.bride_parents || 'Muhammad Ajmal';

  const groomName = wedding.groom_name || 'Mirza Talal Baig';
  const groomRelation = wedding.groom_relation || 'Son of';
  const groomParents = wedding.groom_parents || 'Mirza Shahzad Baig';

  return (
    <section
      id="welcome-message"
      className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F0E6]/50 to-[#FAF8F5]"
    >
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 botanical-dots opacity-30 pointer-events-none" />

      {/* Decorative Floral Sprigs */}
      <div className="absolute top-12 left-6 opacity-40 pointer-events-none hidden lg:block select-none">
        <BotanicalFloralSprig size={70} className="rotate-45" />
      </div>
      <div className="absolute bottom-12 right-6 opacity-40 pointer-events-none hidden lg:block select-none">
        <BotanicalFloralSprig size={70} className="-rotate-45" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Upper Delicate Floral Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2"
        >
          <BotanicalHeaderArch className="mb-2" />
          <span className="font-bodoni text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#74836F] font-semibold block">
            Welcome To Our Celebration
          </span>
        </motion.div>

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-script text-4xl sm:text-5xl lg:text-6xl text-[#1B382B] font-normal leading-tight mt-1 select-none"
        >
          Two Destined Souls, One Sacred Journey
        </motion.h2>

        {/* Elegant Centered Welcome Blessing Card (Reference 3) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative p-6 sm:p-10 rounded-[32px] bg-[#FFFDF9] border border-[#C5A059]/35 shadow-[0_15px_40px_rgba(27,56,43,0.05)] max-w-2xl mx-auto my-6 overflow-hidden text-center"
        >
          {/* Subtle Watermark Calligraphy in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
            <span className="font-script text-8xl sm:text-9xl text-[#1B382B] whitespace-nowrap">
              Laraib & Talal
            </span>
          </div>

          {/* Upper Thin Divider with Heart — 🖤 — */}
          <div className="flex items-center justify-center gap-3 mb-4 max-w-[200px] mx-auto relative z-10">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
            <span className="text-[#1B382B] text-xs select-none">🖤</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
          </div>

          {/* Poetic Message from Reference 3 */}
          <p className="font-cormorant text-base sm:text-xl text-[#1B382B] leading-relaxed max-w-lg mx-auto font-normal relative z-10">
            We are honored to welcome you to the wedding celebrations of{' '}
            <strong className="font-bodoni font-bold text-[#1B382B]">Laraib Ajmal & Mirza Talal Baig</strong>.
            As they begin their journey together in faith and love, we thank you for being part of this blessed occasion 🖤
          </p>

          {/* Lower Thin Divider with Heart — 🖤 — */}
          <div className="flex items-center justify-center gap-3 mt-4 max-w-[200px] mx-auto relative z-10">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/40 to-[#C5A059]" />
            <span className="text-[#1B382B] text-xs select-none">🖤</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/40 to-[#C5A059]" />
          </div>
        </motion.div>

        {/* The Couple Presentation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center mt-12 text-left">
          {/* Couple Portrait in Luxury Arch Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="relative rounded-[40px] overflow-hidden border-2 border-[#C5A059]/40 p-2.5 bg-[#FFFDF9] shadow-[0_20px_50px_rgba(27,56,43,0.08)]">
              <div className="overflow-hidden rounded-[32px] aspect-[4/5] relative bg-[#F5EFE6]">
                <ImageWithFallback
                  src={
                    wedding.couple_image_url ||
                    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85'
                  }
                  alt={wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B382B]/60 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 text-center pointer-events-none">
                  <span className="font-script text-3xl sm:text-4xl text-[#FFF9E6] block drop-shadow-sm">
                    {wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}
                  </span>
                  <span className="font-bodoni text-[10px] sm:text-[11px] tracking-[0.25em] text-[#EAD7A5] uppercase mt-0.5 block">
                    December 2026 • Lahore
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Soulmates Medallion */}
            <div className="absolute -bottom-4 -right-2 sm:-right-4 flex items-center gap-2 bg-[#FFFDF9] border border-[#C5A059]/50 px-3.5 py-1.5 rounded-full shadow-lg">
              <RoyalMonogramSeal size={26} variant="ivory" glow={false} />
              <DelicateHeart size={13} className="text-[#B89047]" />
              <span className="font-serif italic text-xs text-[#1B382B] font-medium">Soulmates</span>
            </div>
          </motion.div>

          {/* Parental Lineage & Blessing Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* The Bride Card */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E8DEC9] shadow-[0_8px_25px_rgba(27,56,43,0.04)] hover:border-[#C5A059]/50 transition-all">
              <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#B89047] font-semibold block mb-1">
                The Bride
              </span>
              <h3 className="font-script text-3xl sm:text-4xl text-[#1B382B] leading-none mb-1.5">
                {brideName}
              </h3>
              <p className="font-serif italic text-xs text-[#756A5E]">{brideRelation}</p>
              <p className="font-serif text-sm sm:text-base font-semibold text-[#1B382B] mt-0.5">
                {brideParents}
              </p>
            </div>

            {/* The Groom Card */}
            <div className="p-6 rounded-3xl bg-[#FFFDF9] border border-[#E8DEC9] shadow-[0_8px_25px_rgba(27,56,43,0.04)] hover:border-[#C5A059]/50 transition-all">
              <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-[#B89047] font-semibold block mb-1">
                The Groom
              </span>
              <h3 className="font-script text-3xl sm:text-4xl text-[#1B382B] leading-none mb-1.5">
                {groomName}
              </h3>
              <p className="font-serif italic text-xs text-[#756A5E]">{groomRelation}</p>
              <p className="font-serif text-sm sm:text-base font-semibold text-[#1B382B] mt-0.5">
                {groomParents}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Lower Floral Decoration */}
        <div className="mt-14">
          <FloralDivider variant="gold" />
        </div>
      </div>
    </section>
  );
}
