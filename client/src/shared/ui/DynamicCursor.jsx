import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export function DynamicCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 240, damping: 28 });
  const sy = useSpring(y, { stiffness: 240, damping: 28 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 14);
      y.set(event.clientY - 14);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden size-7 border border-white/30 mix-blend-difference lg:block"
      style={{ x: sx, y: sy }}
    />
  );
}
