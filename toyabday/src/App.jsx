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
  const [showNextButton, setShowNextButton] = useState(false);

  // Timer to show next button
  useEffect(() => {
    setShowNextButton(false);
    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, 5000); // 5 seconds delay
    return () => clearTimeout(timer);
  }, [currentSection]);

  const nextSection = () => {
    if (currentSection < siteContent.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Haptic feedback if available (mobile)
      if (navigator.vibrate) navigator.vibrate(50);
    }
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
      className={`min-h-screen relative overflow-hidden ${siteContent.colors.bg} ${siteContent.colors.text} selection:bg-rose-accent/30`}
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

      {/* Next Button (appears after 5s) - not shown on final page */}
      <AnimatePresence>
        {showNextButton && currentSection < siteContent.sections.length - 1 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSection}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-8 py-3 bg-rose-accent text-white rounded-full font-serif text-lg shadow-xl shadow-rose-accent/30 flex items-center gap-2 hover:bg-opacity-90 transition-colors"
          >
            Next
          </motion.button>
        )}
      </AnimatePresence>

      {/* Vercel Analytics & Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
