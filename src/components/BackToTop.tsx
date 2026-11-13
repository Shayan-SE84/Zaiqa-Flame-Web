import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll back to top"
      className="fixed bottom-20 md:bottom-6 right-5 z-30 w-11 h-11 rounded-xl bg-[#0B0F17] hover:bg-[#D9232D] text-white shadow-lg border border-white/15 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FEA619]"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
