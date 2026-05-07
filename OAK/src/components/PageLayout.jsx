import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PageLayout({ children }) {
  const { pathname, hash } = useLocation();

  // Scroll to top or specific hash on route/hash change
  useEffect(() => {
    if (hash) {
      // Small delay to allow page rendering before scrolling
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="min-h-screen relative flex flex-col"
    >
      <div className="grain"></div>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
