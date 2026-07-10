import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    const toggle = () => setVisible(window.scrollY > 500);
    toggle();
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, [location.pathname]);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollUp}
      className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[#FD90A7] text-white shadow-xl hover:bg-[#f77997] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;