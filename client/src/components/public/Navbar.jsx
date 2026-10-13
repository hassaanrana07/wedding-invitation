import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

export default function Navbar() {
  const { wedding } = useWedding();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentDateFormatted, setCurrentDateFormatted] = useState('');

  // Dynamic Current Date in Visitor's Local Timezone (e.g. Tuesday 13 October 2026)
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

  // Directional scroll listener: Smoothly hides when scrolled down away from hero, reappears when returning to top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Navbar is visible only in the top/hero area (scrollY <= 160px)
      if (currentScrollY <= 160) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clean, refined navigation links with balanced typography
  const navLinks = [
    { label: 'Invitation', href: '#invitation' },
    { label: 'Welcome', href: '#welcome-message' },
    { label: 'Countdown', href: '#countdown-section' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Family', href: '#honored-family' },
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isScrolled
          ? 'bg-[#FAF8F5]/94 backdrop-blur-xl border-b border-[#E6DBCE] shadow-[0_4px_25px_rgba(27,56,43,0.06)] py-2.5'
          : 'bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-transparent py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 3-Column Balanced Layout: Left Links | Center Logo | Right Date */}
        <div className="flex items-center justify-between">
          
          {/* 1. LEFT SIDE: Balanced Navigation Links */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 flex-1 justify-start">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-cinzel text-[10.5px] xl:text-[11px] tracking-[0.16em] uppercase text-[#1B382B]/85 hover:text-[#B89047] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B89047] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* 2. CENTER: Perfectly Centered RH / Invitation Brand Logo */}
          <div className="flex-1 lg:flex-none flex items-center justify-start lg:justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <RoyalMonogramSeal
                size={36}
                variant="ivory"
                glow={true}
                className="group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col text-left">
                <span className="font-cinzel text-xs sm:text-sm font-bold text-[#1B382B] tracking-[0.25em] group-hover:text-[#B89047] transition-colors">
                  {wedding.app_title || 'RIHA'}
                </span>
                <span className="font-serif italic text-[10.5px] text-[#756A5E] -mt-0.5">
                  {wedding.couple_title || 'Rida & Harish'}
                </span>
              </div>
            </a>
          </div>

          {/* 3. RIGHT SIDE: Perfectly Aligned Countdown / Date Badge (No Inventory Label) */}
          <div className="hidden sm:flex items-center justify-end flex-1 gap-2.5">
            {currentDateFormatted && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFDF9] border border-[#E3D8C4] text-[11px] font-mono text-[#5D5347] shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#B89047]" />
                <span className="font-medium">{currentDateFormatted}</span>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {currentDateFormatted && (
              <div className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFFDF9] border border-[#E3D8C4] text-[10px] font-mono text-[#5D5347]">
                <Clock className="w-3 h-3 text-[#B89047]" />
                <span>{currentDateFormatted}</span>
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#FFFDF9] border border-[#E3D8C4] text-[#1B382B] hover:text-[#B89047] transition-colors cursor-pointer shadow-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#FAF8F5]/98 border-b border-[#E3D8C4] px-6 py-5 shadow-xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-3">
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
                <div className="pt-2 text-center text-xs text-[#756A5E] font-mono">
                  {currentDateFormatted}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
