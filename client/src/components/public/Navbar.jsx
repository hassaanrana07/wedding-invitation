import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Clock, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';
import { DelicateHeart } from '../ui/BotanicalOrnaments';

export default function Navbar() {
  const { wedding } = useWedding();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentDateFormatted, setCurrentDateFormatted] = useState('');

  // Dynamic Current Date in Visitor's Local Timezone
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    setCurrentDateFormatted(formatted);
  }, []);

  // Directional scroll listener: hides when scrolling down, reveals when scrolling up or at top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Clean navigation links with "Our Story" completely removed
  const navLinks = [
    { label: 'Invitation', href: '#invitation' },
    { label: 'Welcome', href: '#welcome-message' },
    { label: 'Countdown', href: '#countdown-section' },
    { label: 'Program Timeline', href: '#timeline' },
    { label: 'Honored Family', href: '#honored-family' },
    { label: 'Ceremonies', href: '#events' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isScrolled
          ? 'bg-[#FAF8F5]/92 backdrop-blur-xl border-b border-[#E6DBCE] shadow-[0_4px_25px_rgba(27,56,43,0.06)] py-3'
          : 'bg-gradient-to-b from-[#FAF8F5]/90 via-[#FAF8F5]/60 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between">
        {/* Brand & Monogram Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <RoyalMonogramSeal size={38} variant="ivory" glow={true} className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-cinzel text-sm sm:text-base font-bold text-[#1B382B] tracking-widest group-hover:text-[#B89047] transition-colors">
              {wedding.app_title || 'RIHA'}
            </span>
            <span className="font-serif italic text-[11px] text-[#6E645A] -mt-1 hidden sm:block">
              {wedding.couple_title || 'Rida & Harish'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="font-cinzel text-[11px] tracking-[0.2em] uppercase text-[#1B382B]/85 hover:text-[#B89047] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B89047] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Action: Current Date Badge */}
        <div className="hidden sm:flex items-center gap-3">
          {currentDateFormatted && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF9] border border-[#E3D8C4] text-[11px] font-mono text-[#5D5347] shadow-sm">
              <Clock className="w-3.5 h-3.5 text-[#B89047]" />
              <span>{currentDateFormatted}</span>
            </div>
          )}

          <a
            href="#events"
            onClick={(e) => handleLinkClick(e, '#events')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#1B382B] hover:bg-[#254A39] text-[#FAF8F5] text-xs font-cinzel font-semibold tracking-wider transition-all shadow-sm"
          >
            <DelicateHeart size={13} className="text-[#EAD7A5]" />
            <span>Itinerary</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#FFFDF9] border border-[#E3D8C4] text-[#1B382B] hover:text-[#B89047] transition-colors cursor-pointer shadow-sm"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#FAF8F5]/98 border-b border-[#E3D8C4] px-6 py-5 shadow-xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-3.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#1B382B] hover:text-[#B89047] py-2 border-b border-[#F0E6D8] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <Sparkles className="w-3 h-3 text-[#B89047]" />
                </a>
              ))}

              {currentDateFormatted && (
                <div className="pt-2 text-center text-xs text-[#6E645A] font-mono">
                  Today: {currentDateFormatted}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
