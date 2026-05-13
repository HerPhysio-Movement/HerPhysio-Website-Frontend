// src/features/home/components/FaqSection.jsx
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What is Her Physio Movement?',
    answer: 'Her Physio Movement is a non‑governmental organization dedicated to transforming women\'s health physiotherapy in Nigeria and across Africa. We build a new generation of women\'s health physiotherapists and changemakers while improving physical health outcomes for women through education, advocacy, and community outreach.'
  },
  {
    question: 'Who can benefit from your services?',
    answer: 'Any woman seeking better understanding of her body, pelvic health, prenatal/postnatal care, or chronic pain management can benefit. We also serve physiotherapy students and professionals who want to specialise in women\'s health.'
  },
  {
    question: 'How can I become a volunteer?',
    answer: 'Simply fill out the volunteer sign‑up form on our website. We’ll review your application and get back to you within a few days. Volunteers can help with outreach events, social media, administration, or clinical support.'
  },
  {
    question: 'Are your events free to attend?',
    answer: 'Most of our webinars, panel sessions, and community outreaches are free. Some specialised training programs may have a nominal fee to cover materials, but we offer scholarships for those in need.'
  },
  {
    question: 'How can I donate to support your work?',
    answer: 'You can donate directly through our website (donate button) or contact us for bank transfer details. Every contribution helps us reach more women and train more physiotherapists.'
  },
  {
    question: 'Do you partner with other organisations?',
    answer: 'Yes! We collaborate with NGOs, hospitals, universities, and corporate bodies that share our mission. Visit the Partner page to express interest in partnering with us.'
  },
  {
    question: 'Can I join the mentorship program?',
    answer: 'Absolutely. Our 3‑month mentorship program is open to physiotherapists and final‑year students who want to deepen their skills in women\'s health. Applications open twice a year – follow our social media for announcements.'
  },
  {
    question: 'What is the Workshop2Outreach (W20) program?',
    answer: 'W20 is a unique initiative where participants learn to design and implement a mini‑community project addressing a specific women’s health need. It combines online training with on‑ground action.'
  },
  {
    question: 'Do you offer online courses?',
    answer: 'Yes, we have self‑paced online courses on back health, Pilates, pelvic floor basics, and more. They are evidence‑based and designed by expert physiotherapists.'
  },
  {
    question: 'How can I stay updated about your activities?',
    answer: 'Subscribe to our newsletter, follow us on Instagram, LinkedIn, and YouTube, or check the Events section regularly. We post updates about new webinars, outreach dates, and training opportunities.'
  }
];

const INITIAL_VISIBLE = 5;

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, INITIAL_VISIBLE);
  const hasMore = faqs.length > INITIAL_VISIBLE;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="bg-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Got questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">FAQs </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-gray-500">Frequently asked questions you need to know about Her Physio Movement.</p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {visibleFaqs.map((faq, idx) => (
            <div
              key={idx}
              className={`border border-gray-100 rounded-lg bg-white transition-all duration-500 ${
                hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center p-5 text-left font-medium text-[#1D2130] hover:text-[#FD90A7] transition-colors duration-200"
              >
                <span className="text-base sm:text-lg pr-6">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#FD90A7] transition-transform duration-300 flex-shrink-0 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === idx ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show more / Show less button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-[#FD90A7] text-[#FD90A7] rounded-full hover:bg-[#FD90A7] hover:text-white transition-all duration-300 font-medium"
            >
              {showAll ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show more ({faqs.length - INITIAL_VISIBLE} more) <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Still have questions? */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-3">Still have questions?</p>
          <a
            href="/contact-us"
            className="inline-flex items-center gap-2 text-[#FD90A7] font-medium hover:underline transition"
          >
            Contact our team <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;