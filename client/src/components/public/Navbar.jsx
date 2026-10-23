import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import { useWedding } from '../../context/WeddingContext';
import RoyalMonogramSeal from '../ui/RoyalMonogramSeal';

export default function Navbar() {
  const { wedding } = useWedding();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Scroll listener: Smoothly hides navbar when scrolled down away from top/hero area, reappears at top
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Visible when in top/hero section (scrollY <= 150px), hides when scrolled down
      if (currentScrollY <= 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three Links Left
  const leftNavLinks = [
    { label: 'Invitation', href: '#invitation' },
    { label: 'Welcome', href: '#welcome-message' },
    { label: 'Countdown', href: '#countdown-section' },
  ];

  // Three Links Right
  const rightNavLinks = [
    { label: 'Timeline', href: '#events' },
    { label: 'Family', href: '#honored-family' },
  ];

  const allNavLinks = [...leftNavLinks, ...rightNavLinks];

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
        {/* DESKTOP LAYOUT: [ 3 LINKS LEFT ] [ CENTERED RIHA LOGO ] [ 3 LINKS RIGHT ] */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center w-full">
          
          {/* 1. LEFT SIDE: Three Existing Navigation Links with Consistent Spacing */}
          <div className="flex items-center justify-start gap-8 xl:gap-10">
            {leftNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#1B382B]/85 hover:text-[#B89047] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B89047] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* 2. CENTER: Perfectly Centered RIHA / RH Wedding Logo */}
          <div className="flex items-center justify-center px-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <RoyalMonogramSeal
                size={38}
                variant="ivory"
                glow={true}
                className="group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col text-left">
                <span className="font-cinzel text-sm font-bold text-[#1B382B] tracking-[0.25em] group-hover:text-[#B89047] transition-colors">
                  {wedding.app_title || 'LARAIB & TALAL'}
                </span>
                <span className="font-serif italic text-xs text-[#756A5E] -mt-0.5">
                  {wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}
                </span>
              </div>
            </a>
          </div>

          {/* 3. RIGHT SIDE: Remaining Navigation Links with Consistent Spacing */}
          <div className="flex items-center justify-end gap-8 xl:gap-10">
            {rightNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-cinzel text-xs tracking-[0.2em] uppercase text-[#1B382B]/85 hover:text-[#B89047] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B89047] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW: Logo on Left, Menu Button on Right */}
        <div className="flex lg:hidden items-center justify-between w-full">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <RoyalMonogramSeal size={34} variant="ivory" glow={true} />
            <div className="flex flex-col text-left">
              <span className="font-cinzel text-[13px] font-bold text-[#1B382B] tracking-widest">
                {wedding.app_title || 'LARAIB & TALAL'}
              </span>
              <span className="font-serif italic text-[12px] text-[#756A5E] -mt-0.5">
                {wedding.couple_title || 'Laraib Ajmal & Mirza Talal Baig'}
              </span>
            </div>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#FFFDF9] border border-[#E3D8C4] text-[#1B382B] hover:text-[#B89047] transition-colors cursor-pointer shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
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
              {allNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-cinzel text-sm tracking-[0.2em] uppercase text-[#1B382B] hover:text-[#B89047] py-2 border-b border-[#F0E6D8] transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <Sparkles className="w-3 h-3 text-[#B89047]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
