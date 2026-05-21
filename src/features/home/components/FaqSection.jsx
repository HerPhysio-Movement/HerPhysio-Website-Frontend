// src/features/home/components/FaqSection.jsx
import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, X } from 'lucide-react';

const allFaqs = [
  {
    id: 1,
    question: 'What is Her Physio Movement?',
    answer:
      'Her Physio Movement is a non‑governmental organization dedicated to transforming women\'s health physiotherapy in Nigeria and across Africa. We build a new generation of women\'s health physiotherapists and changemakers while improving physical health outcomes for women through education, advocacy, and community outreach.',
    accent: '#FD90A7',
    bgTray: '#FEF3D6',
  },
  {
    id: 2,
    question: 'Who can benefit from your services?',
    answer:
      'Any woman seeking better understanding of her body, pelvic health, prenatal/postnatal care, or chronic pain management can benefit. We also serve physiotherapy students and professionals who want to specialise in women\'s health.',
    accent: '#C7365B',
    bgTray: '#FCDAD7',
  },
  {
    id: 3,
    question: 'How can I become a volunteer?',
    answer:
      'Simply fill out the volunteer sign‑up form on our website. We’ll review your application and get back to you within a few days. Volunteers can help with outreach events, social media, administration, or clinical support.',
    accent: '#F08020',
    bgTray: '#E2E0FB',
  },
  {
    id: 4,
    question: 'Are your events free to attend?',
    answer:
      'Most of our webinars, panel sessions, and community outreaches are free. Some specialised training programs may have a nominal fee to cover materials, but we offer scholarships for those in need.',
    accent: '#6020F0',
    bgTray: '#FEF3D6',
  },
  {
    id: 5,
    question: 'How can I donate to support your work?',
    answer:
      'You can donate directly through our website (donate button) or contact us for bank transfer details. Every contribution helps us reach more women and train more physiotherapists.',
    accent: '#FD90A7',
    bgTray: '#FCDAD7',
  },
  {
    id: 6,
    question: 'Do you partner with other organisations?',
    answer:
      'Yes! We collaborate with NGOs, hospitals, universities, and corporate bodies that share our mission. Visit the Partner page to express interest in partnering with us.',
    accent: '#C7365B',
    bgTray: '#E2E0FB',
  },
];

// Scatter positions for desktop/tablet
const cardStyles = [
  { rotation: '-10deg', top: '8%', left: '5%', z: 10 },
  { rotation: '-6deg', top: '5%', left: '35%', z: 30 },
  { rotation: '10deg', top: '12%', left: '65%', z: 0 },
  { rotation: '-4deg', top: '45%', left: '10%', z: 40 },
  { rotation: '8deg', top: '50%', left: '55%', z: 20 },
  { rotation: '-8deg', top: '75%', left: '30%', z: 10 },
];

const FaqSection = () => {
  const [selectedFaq, setSelectedFaq] = useState(null);   // modal open state
  const [showAllModal, setShowAllModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openFaqModal = (faq) => setSelectedFaq(faq);
  const closeFaqModal = () => setSelectedFaq(null);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 bg-[#EBF0FF] overflow-hidden">
      {/* Soft ambient blooms */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FD90A7]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6020F0]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN – Title & CTA (span 4) */}
          <div className="lg:col-span-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#FD90A7]/20 rounded-full text-sm font-semibold text-[#FD90A7] mb-5 shadow-sm">
              <Sparkles className="w-4 h-4" />
              Got questions?
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight font-serif mb-4" style={{ fontFamily: "'Zodiak', serif" }}>
              Frequently Asked{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
                Questions
              </span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mb-8">
              Tap any card to reveal the answer. Still need help? Reach out to our team.
            </p>
            <button
              onClick={() => setShowAllModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD90A7] text-white rounded-full font-semibold shadow-lg shadow-[#FD90A7]/20 hover:bg-[#F77997] transition"
            >
              View all FAQs <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* RIGHT COLUMN – Scatter Card Deck (span 8) */}
          <div className="lg:col-span-8 relative">
            {/* Obvious call‑to‑action pill */}
            <div className="flex justify-center lg:justify-end mb-6 lg:mb-0 lg:absolute lg:top-0 lg:right-0 z-50">
              <div className="bg-[#FD90A7] text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce-slow">
                <span className="text-sm font-semibold">Click any card to read FAQ</span>
                <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* --- DESKTOP / TABLET: absolute scatter (unchanged) --- */}
            <div className="hidden md:block relative h-[550px] w-full">
              <div className="relative w-full h-full max-w-2xl mx-auto">
                {allFaqs.map((faq, idx) => {
                  const style = cardStyles[idx % cardStyles.length];
                  return (
                    <div
                      key={faq.id}
                      onClick={() => openFaqModal(faq)}
                      className={`job-scatter-card absolute w-64 md:w-72 bg-white rounded-3xl shadow-lg cursor-pointer transition-all duration-500 ${
                        isVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
                      }`}
                      style={{
                        transform: `rotate(${style.rotation})`,
                        top: style.top,
                        left: style.left,
                        zIndex: style.z,
                        transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                        boxShadow: '0 12px 32px -8px rgba(26, 29, 58, 0.08)',
                      }}
                    >
                      <FaqCardContent faq={faq} />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- MOBILE: clean vertical stack --- */}
            <div className="md:hidden space-y-4 px-2">
              {allFaqs.map((faq, idx) => (
                <div
                  key={faq.id}
                  onClick={() => openFaqModal(faq)}
                  className={`w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg cursor-pointer transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <FaqCardContent faq={faq} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Single FAQ Modal */}
      {selectedFaq && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={closeFaqModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 border border-gray-200 animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FD90A7]/10 flex items-center justify-center text-sm font-bold text-[#FD90A7]">
                {selectedFaq.id}
              </div>
              <button onClick={closeFaqModal} className="p-2 rounded-full hover:bg-gray-100 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">{selectedFaq.question}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{selectedFaq.answer}</p>
          </div>
        </div>
      )}

      {/* All FAQs Modal */}
      {showAllModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowAllModal(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 border border-gray-200 animate-modal-pop"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">All FAQs</h2>
              <button onClick={() => setShowAllModal(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              {allFaqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <h3 className="font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .animate-modal-pop {
          animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes modalPop {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
};

/* ===== Reusable Card Content (no expand/ collapse, just visual) ===== */
const FaqCardContent = ({ faq }) => (
  <>
    <div className="p-5 pb-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-6 h-6 rounded-lg bg-[#FD90A7]/10 flex items-center justify-center text-xs font-bold text-[#FD90A7]">
          {faq.id}
        </div>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Question</span>
      </div>
      <h3 className="font-bold text-base text-gray-900 mb-2">{faq.question}</h3>
      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg border border-[#FD90A7]/20 text-[#FD90A7]">FAQ</span>
        <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg border border-[#C7365B]/20 text-[#C7365B]">Help</span>
      </div>
    </div>
    <div
      className="accent-timeline-tray pt-3 pb-2 px-4 -mt-3 rounded-b-3xl"
      style={{ backgroundColor: faq.bgTray }}
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
        Tap to read answer
      </p>
    </div>
  </>
);

export default FaqSection;