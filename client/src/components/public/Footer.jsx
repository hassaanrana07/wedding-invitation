import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Sparkles, Heart } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import { weddingData } from '../../data/weddingData';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import { DelicateHeart, FloralDivider } from '../ui/BotanicalOrnaments';

export default function Footer() {
  const { wedding } = useWedding();
  // Strictly filter to exactly TWO family contacts as requested by the client
  const contacts = (weddingData.contacts || []).slice(0, 2);

  return (
    <footer className="relative py-20 px-5 sm:px-8 border-t border-[#E3D8C4] bg-gradient-to-b from-[#FAF8F5] via-[#F5EFE6] to-[#EFE8DC] text-center overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 botanical-dots opacity-25 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        {/* Monogram Seal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex items-center justify-center"
        >
          <RoyalMonogramSeal size={88} variant="ivory" showSubtext={true} subtext="AH" glow={true} />
        </motion.div>

        {/* Wedding Identity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="font-cinzel text-xs tracking-[0.4em] uppercase text-[#B89047] block mb-1 font-semibold">
            {wedding.app_title || 'AHMED & AYESHA'}
          </span>
          <h2 className="font-script text-5xl sm:text-7xl text-[#1B382B] leading-none">
            {wedding.couple_title || 'Ahmed & Ayesha'}
          </h2>
          {wedding.hashtag && (
            <p className="font-sans text-xs tracking-widest uppercase text-[#B89047] font-semibold mt-2.5">
              {wedding.hashtag}
            </p>
          )}

          <p className="font-serif italic text-sm sm:text-base text-[#5D5347] max-w-lg mx-auto font-light leading-relaxed mt-4">
            "{wedding.footer_text || 'Thank you for being an indispensable part of our story and celebrations. We warmly await your gracious presence and prayers.'}"
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* EXACTLY TWO FAMILY CONTACTS (BRIDE'S & GROOM'S REPRESENTATIVES)*/}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto p-6 sm:p-8 rounded-[32px] border border-[#C5A059]/40 bg-[#FFFDF9] shadow-[0_15px_40px_rgba(27,56,43,0.06)] text-left"
        >
          <div className="flex items-center justify-center gap-2 mb-6 text-center">
            <DelicateHeart size={14} className="text-[#B89047]" />
            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#1B382B]">
              Family Representatives & Inquiries
            </span>
            <DelicateHeart size={14} className="text-[#B89047]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E3D8C4] flex flex-col justify-between gap-3 text-xs hover:border-[#C5A059] transition-colors shadow-sm"
              >
                <div>
                  <p className="text-[10px] sm:text-[11px] font-cinzel text-[#B89047] uppercase tracking-wider font-semibold">
                    {c.role}
                  </p>
                  <p className="text-sm font-serif font-bold text-[#1B382B] mt-0.5">{c.name}</p>
                  {c.relation && (
                    <p className="text-[11px] text-[#756A5E] font-serif italic mt-0.5">{c.relation}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#EAE0D2]">
                  {/* Phone Call Button */}
                  <a
                    href={`tel:${c.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFDF9] hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF8F5] border border-[#E3D8C4] transition-all font-mono text-[11px] font-medium"
                    title={`Call ${c.name}`}
                  >
                    <Phone className="w-3 h-3 text-[#B89047]" />
                    <span>Call</span>
                  </a>

                  {/* Direct WhatsApp Button */}
                  {c.whatsapp && (
                    <a
                      href={`https://wa.me/${c.whatsapp}?text=${encodeURIComponent(`Hello ${c.name}, regarding the wedding of Ahmed & Ayesha:`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366] text-[#128C7E] hover:text-white border border-[#25D366]/30 transition-all font-sans text-[11px] font-semibold"
                      title={`WhatsApp message to ${c.name}`}
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-5 pt-3 border-t border-[#EAE0D2] text-[11px] text-[#756A5E] italic text-center">
            Please feel free to reach out for ceremony directions, hospitality, or accommodation assistance.
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C5A059]/60 bg-[#FFFDF9] hover:bg-[#1B382B] text-[#1B382B] hover:text-[#FAF8F5] text-xs font-cinzel font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89047]" />
            <span>Replay Opening Invitation</span>
          </button>
        </div>

        {/* Closing Quranic Du'a & Copyright */}
        <div className="pt-8 border-t border-[#E3D8C4] text-center space-y-2">
          <p className="font-serif italic text-sm text-[#1B382B]">
            "Bārak-Allāhu lakumā wa bāraka 'alaykumā wa jama'a baynakumā fī khayr"
          </p>
          <p className="text-[11px] text-[#756A5E] font-mono tracking-wider">
            © 2027 Wedding of Ahmed Hassan & Ayesha Fatima. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
