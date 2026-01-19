import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import MusicPlayer from './components/MusicPlayer';
import TouchRipple from './components/TouchRipple';
import Intro from './components/Intro';
import WishCard from './components/WishCard';
import PhotoScene from './components/PhotoScene';
import DoctorScene from './components/DoctorScene';
import FinalScene from './components/FinalScene';
import { siteContent } from './data/siteContent';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  const [currentSection, setCurrentSection] = useState(0);

  // Auto-advance logic
  useEffect(() => {
    const sectionData = siteContent.sections[currentSection];

    // If it has a duration (not 0), set a timer
    if (sectionData && sectionData.duration > 0) {
      const timer = setTimeout(() => {
        nextSection();
      }, sectionData.duration);
      return () => clearTimeout(timer);
    }
  }, [currentSection]);

  const nextSection = () => {
    setCurrentSection((prev) => Math.min(prev + 1, siteContent.sections.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Haptic feedback if available (mobile)
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const replay = () => {
    setCurrentSection(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0: return <Intro />;
      case 1: return <WishCard />;
      case 2: return <PhotoScene />;
      case 3: return <DoctorScene />;
      case 4: return <FinalScene onReplay={replay} />;
      default: return <Intro />;
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden ${siteContent.colors.bg} ${siteContent.colors.text} cursor-pointer selection:bg-rose-accent/30`}
      onClick={nextSection} // Tap anywhere to skip/advance
    >
      {/* Background Animation */}
      <FloatingHearts />
      <MusicPlayer />
      <TouchRipple />

      {/* Main Content Area with Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 2, ease: "easeInOut" }} // Slower transition
          className="w-full min-h-screen"
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* User hint for skip (fades out after a while or stays subtle) */}
      {/* User hint for skip removed as per request */}

      {/* Vercel Analytics & Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
