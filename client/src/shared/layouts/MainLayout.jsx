import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../ui/Header.jsx';
import { Footer } from '../ui/Footer.jsx';
import { MobileBottomNav } from '../ui/MobileBottomNav.jsx';
import { DynamicCursor } from '../ui/DynamicCursor.jsx';

export function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-noir-bg text-noir-text">
      <DynamicCursor />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
