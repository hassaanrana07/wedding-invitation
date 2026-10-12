import React, { useEffect, useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { fetchEvents } from '../../services/api';
import OpeningSplashScreen from '../../components/public/OpeningSplashScreen';
import MusicPlayer from '../../components/public/MusicPlayer';
import Navbar from '../../components/public/Navbar';
import HeroSection from '../../components/public/HeroSection';
import CountdownSection from '../../components/public/CountdownSection';
import CoupleSection from '../../components/public/CoupleSection';
import QuranicVersePairs from '../../components/public/QuranicVersePairs';
import SpecialGuestsSection from '../../components/public/SpecialGuestsSection';
import EventsSection from '../../components/public/EventsSection';
import OurStoryTimeline from '../../components/public/OurStoryTimeline';
import QuranicVerseBottom from '../../components/public/QuranicVerseBottom';
import Footer from '../../components/public/Footer';

export default function HomePage() {
  const { wedding } = useWedding();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents()
      .then((data) => setEvents(data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-[#0C0F14] text-[#EFE2C8] selection:bg-gold-500 selection:text-black">
      {/* 1. Theatrical Opening Experience: Ivory Curtains, Instant Scratch-to-Reveal & Bismillah */}
      <OpeningSplashScreen />

      {/* 2. Floating Wedding Shehnai & Melody Controller */}
      <MusicPlayer />

      {/* 3. Sticky Auto-hiding Navigation Bar */}
      <Navbar />

      {/* 4. Royal Wedding Hero Header with Top Quranic Verse (Surah Ar-Rum 30:21) */}
      <HeroSection />

      {/* 5. Live Animated Wedding Countdown */}
      <CountdownSection />

      {/* 6. The Couple & Parental Lineage */}
      <CoupleSection />

      {/* 7. Center Quranic Blessing: Surah An-Naba (78:8) - "And We created you in pairs" */}
      <QuranicVersePairs />

      {/* 8. Honorable Family & Dignitaries in Clean Square Grid */}
      <SpecialGuestsSection />

      {/* 9. Pakistani Wedding Ceremonies with Integrated Venues & Directions */}
      <EventsSection events={events} />

      {/* 10. Our Stories & Cherished Milestones */}
      <OurStoryTimeline />

      {/* 11. Bottom Quranic Du'a: Surah Al-Furqan (25:74) Directly Above Footer */}
      <QuranicVerseBottom />

      {/* 12. Lightweight Wedding Footer with Assistance Contacts & Royal Seal */}
      <Footer />
    </div>
  );
}
