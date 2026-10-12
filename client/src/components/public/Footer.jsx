import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { weddingData } from '../../data/weddingData';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

export default function Footer() {
  const { wedding } = useWedding();
  const contacts = weddingData.contacts || [];

  return (
    <footer className="relative py-20 px-5 sm:px-8 border-t border-gold-500/25 bg-gradient-to-b from-[#090C10] via-[#080B0F] to-black text-center overflow-hidden">
      {/* Ambient background glow */}
      <div className="ambient-glow w-96 h-96 bg-gold-600/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Monogram Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex items-center justify-center"
        >
          <RoyalMonogramSeal size={84} showSubtext={true} subtext="RIHA" glow={true} />
        </motion.div>

        {/* Wedding Identity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-gold-400 block mb-1">
            {wedding.app_title || 'RIHA'}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient">
            {wedding.couple_title || 'Rida & Harish'}
          </h2>
          {wedding.hashtag && (
            <p className="font-sans text-xs tracking-widest uppercase text-gold-400 font-semibold mt-2.5">
              {wedding.hashtag}
            </p>
          )}

          <p className="text-xs sm:text-sm text-cream-300/80 max-w-lg mx-auto font-light leading-relaxed mt-4 italic">
            "{wedding.footer_text || 'Thank you for being an indispensable part of our story and celebrations. We warmly await your gracious presence and prayers.'}"
          </p>
        </motion.div>

        {/* Family Assistance & Hospitality Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl border border-gold-500/25 bg-[#12161E]/90 backdrop-blur-md shadow-2xl text-left"
        >
          <div className="flex items-center justify-center gap-2 mb-6 text-center">
            <Phone className="w-4 h-4 text-gold-400" />
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold-300">
              Family Contacts & Guest Inquiries
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-black/40 border border-gold-500/15 flex items-center justify-between gap-3 text-xs hover:border-gold-400/30 transition-colors"
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] font-cinzel text-gold-400/90 uppercase tracking-wider font-semibold">
                    {c.role}
                  </p>
                  <p className="text-xs text-cream-100 font-medium mt-0.5">{c.name}</p>
                </div>

                <a
                  href={`tel:${c.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gold-950/70 border border-gold-500/30 text-gold-300 hover:text-white hover:bg-gold-500/30 transition-all font-mono text-[11px] font-medium shrink-0"
                  title={`Call ${c.name}`}
                >
                  <Phone className="w-3 h-3 text-gold-400" />
                  <span>{c.formatted_phone}</span>
                </a>
              </div>
            ))}
          </div>

          <p className="mt-5 pt-3 border-t border-gold-500/15 text-[11px] text-cream-400/70 italic text-center">
            Please feel free to contact us for wedding ceremony timings, hospitality, or guest assistance.
          </p>
        </motion.div>

        {/* Replay Opening Invitation Action */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => {
              try {
                localStorage.removeItem('riha_scratch_completed');
                localStorage.removeItem('riha_curtain_opened');
              } catch (e) {}
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setTimeout(() => {
                window.location.reload();
              }, 250);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold-400/40 bg-gold-950/70 hover:bg-gold-500 hover:text-black text-gold-300 text-xs font-cinzel font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-lg hover:shadow-gold-500/25"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Replay Opening Invitation</span>
          </button>
        </div>

        {/* Closing Quranic Du'a & Copyright */}
        <div className="pt-8 border-t border-gold-500/15 text-center space-y-2">
          <p className="font-serif text-sm text-gold-300/80 italic">
            "Bārak-Allāhu lakumā wa bāraka 'alaykumā wa jama'a baynakumā fī khayr"
          </p>
          <p className="text-[11px] text-cream-500 font-mono tracking-wider">
            © 2027 RIHA — Wedding of Rida & Harish. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
