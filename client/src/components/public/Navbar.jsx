import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar, Clock, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

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

  const navLinks = [
    { label: 'Ceremonies', href: '#events' },
    { label: 'Our Story', href: '#story' },
    { label: 'Honored Family', href: '#honored-family' },
    { label: 'Countdown', href: '#countdown-section' },
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
          ? 'bg-[#080B10]/95 backdrop-blur-xl border-b border-gold-500/20 shadow-2xl py-3'
          : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4 sm:py-5'
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
          <RoyalMonogramSeal size={38} glow={true} className="group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-cinzel text-sm sm:text-base font-bold gold-text-gradient tracking-widest">
              {wedding.app_title || 'RIHA'}
            </span>
            <span className="font-serif text-[10px] text-cream-300/80 -mt-1 hidden sm:block">
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
              className="text-xs font-cinzel tracking-wider uppercase text-cream-300 hover:text-gold-300 transition-colors cursor-pointer relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right Section: Dynamic Current Date Pill & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {currentDateFormatted && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-950/40 border border-gold-500/30 text-gold-300 text-[11px] font-mono tracking-wide shadow-sm">
              <Clock className="w-3 h-3 text-gold-400 shrink-0" />
              <span>{currentDateFormatted}</span>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-gold-500/30 text-gold-300 hover:bg-gold-500/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-gold-500/20 bg-[#0C1017]/95 backdrop-blur-2xl px-6 py-5 shadow-2xl"
          >
            {currentDateFormatted && (
              <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-950/60 border border-gold-400/30 text-gold-300 text-[11px] font-mono">
                <Clock className="w-3 h-3 text-gold-400" />
                <span>Today: {currentDateFormatted}</span>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm font-cinzel tracking-wider uppercase text-cream-200 hover:text-gold-300 py-1 border-b border-gold-500/10 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-gold-400 text-xs">→</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
