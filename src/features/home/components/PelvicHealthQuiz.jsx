// src/features/home/components/PelvicHealthQuiz.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, RefreshCw, Check, Shield, Users } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: 'What stage of life are you currently in?',
    options: [
      { label: 'Young Adult', value: 'adolescence', chipColor: '#FD90A7' },
      { label: 'Pregnancy / Postpartum', value: 'postpartum', chipColor: '#C7365B' },
      { label: 'Perimenopause / Menopause', value: 'menopause', chipColor: '#F08020' },
      { label: 'General Wellness', value: 'general', chipColor: '#6020F0' },
    ],
  },
  {
    id: 2,
    question: 'Are you experiencing any pelvic discomfort?',
    options: [
      { label: 'Pain or pressure', value: 'pain', chipColor: '#FD90A7' },
      { label: 'Incontinence / leakage', value: 'incontinence', chipColor: '#C7365B' },
      { label: 'Other concerns', value: 'other', chipColor: '#F08020' },
      { label: 'No, I feel fine', value: 'none', chipColor: '#6020F0' },
    ],
  },
  {
    id: 3,
    question: 'What interests you most?',
    options: [
      { label: 'Pelvic floor exercises', value: 'exercises', chipColor: '#FD90A7' },
      { label: 'Nutrition & lifestyle', value: 'nutrition', chipColor: '#C7365B' },
      { label: 'Emotional well‑being', value: 'wellbeing', chipColor: '#F08020' },
      { label: 'Professional physiotherapy', value: 'physio', chipColor: '#6020F0' },
    ],
  },
];

const getRecommendations = (answers) => {
  const recs = [];
  if (answers[0] === 'postpartum') {
    recs.push({ title: 'Postpartum Recovery', description: 'Our 3‑Month Mentorship Program is perfect for you.', link: '/volunteer-signup', color: '#FD90A7' });
  } else if (answers[0] === 'menopause') {
    recs.push({ title: 'Menopause & Pelvic Health', description: 'Watch our free webinar on managing pelvic health.', link: '/resources#webinars', color: '#C7365B' });
  }
  if (answers[1] === 'pain' || answers[1] === 'incontinence') {
    recs.push({ title: 'Virtual Consultation', description: 'Speak with a certified physiotherapist.', link: '/contact-us', color: '#F08020' });
  }
  if (answers[2] === 'exercises') {
    recs.push({ title: 'Pelvic Floor Basics', description: 'Learn anatomy and exercises you need.', link: '/resources#courses', color: '#3070F0' });
  } else if (answers[2] === 'physio') {
    recs.push({ title: 'Join Our Community', description: 'Connect with professionals and peers.', link: '/community', color: '#6020F0' });
  }
  if (recs.length === 0) {
    recs.push({ title: 'Explore Resources', description: 'Browse articles, videos, and guides.', link: '/resources', color: '#FD90A7' });
  }
  return recs;
};

const PelvicHealthQuiz = () => {
  const [step, setStep] = useState(0);          // 0..2 questions, 3 = results
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const centralCardRef = useRef(null);
  const chipRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (centralCardRef.current) observer.observe(centralCardRef.current);
    return () => observer.disconnect();
  }, []);

  // Parallax tilt on central card
  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = centralCardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Subtle floating for chips
  useEffect(() => {
    chipRefs.current.forEach((chip, i) => {
      if (chip) {
        chip.style.animation = `floatChip ${3 + i * 0.5}s ease-in-out infinite`;
        chip.style.animationDelay = `${i * 0.2}s`;
      }
    });
  }, [step]);

  const handleSelect = (value) => {
    if (transitioning) return;
    setSelectedOption(value);
    setTransitioning(true);

    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[step] = value;
      setAnswers(newAnswers);

      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setStep(3);
      }
      setSelectedOption(null);
      setTransitioning(false);
    }, 400);
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  const recommendations = step === 3 ? getRecommendations(answers) : [];
  const currentQuestion = step < questions.length ? questions[step] : null;

  return (
    <section className="relative py-20 overflow-hidden bg-white md:py-28">
      {/* Ambient geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-12 h-12 rounded-full bg-[#FD90A7]/10 blur-xl" />
        <div className="absolute bottom-32 right-20 w-16 h-16 rounded-full bg-[#6020F0]/10 blur-xl" />
        <div className="absolute top-1/3 right-1/4 w-10 h-10 rounded-lg bg-[#F08020]/10 blur-xl" />
        <svg className="absolute bottom-10 left-1/2 text-[#FD90A7]/10 w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L13.5 9H22.5L14.25 14.25L15.75 22.5L12 17.25L8.25 22.5L9.75 14.25L1.5 9H10.5L12 0Z" /></svg>
      </div>

      <div className="relative z-10 px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FD90A7]/10 rounded-full text-sm font-semibold text-[#FD90A7] mb-5 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Pelvic Health Quiz
          </span>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
            {/* Discover Your Path to Wellness */}
            Answer three simple questions and receive personalised guidance.
          </h2>
          {/* <p className="max-w-md mx-auto mt-3 text-gray-500">
            Answer three simple questions and receive personalised guidance.
          </p> */}
        </div>

        {/* Quiz Content */}
        <div className="relative flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-20">
          {/* LEFT: Central Card (like a phone screen) */}
          <div className="relative w-full max-w-sm">
            {/* Background floating chips (decorative) */}
            {currentQuestion && (
              <div className="absolute inset-0 pointer-events-none">
                {currentQuestion.options.map((opt, idx) => {
                  const angle = (idx / currentQuestion.options.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 170;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <div
                      key={opt.value}
                      className="absolute flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg border border-gray-100 text-xs font-medium text-gray-600"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                        opacity: 0.8,
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.chipColor }} />
                      {opt.label}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Central card – question display */}
            {step < questions.length && currentQuestion && (
              <div
                ref={centralCardRef}
                className="relative bg-white rounded-[32px] shadow-2xl border border-gray-100 p-8 z-10 transition-all duration-300"
                style={{ transformStyle: 'preserve-3d', transform: 'perspective(800px) rotateY(0deg) rotateX(0deg)' }}
              >
                {/* Progress dots */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        idx < step
                          ? 'w-8 bg-[#FD90A7]'
                          : idx === step
                          ? 'w-8 bg-[#FD90A7]'
                          : 'w-2 bg-gray-200'
                      }`}
                    />
                  ))}
                </div>

                <h3 className="mb-6 text-xl font-bold text-gray-900">{currentQuestion.question}</h3>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full text-left px-5 py-3.5 rounded-[14px] border transition-all duration-300 ${
                        selectedOption === opt.value
                          ? 'bg-[#FD90A7] border-[#FD90A7] text-white'
                          : 'border-gray-200 text-gray-700 hover:border-[#FD90A7] hover:bg-[#FD90A7]/5'
                      }`}
                    >
                      <span className="text-sm font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Additional info / CTA (optional) */}
          <div className="hidden w-56 lg:block">
            {/* Decorative empty space or a small stat */}
          </div>
        </div>

        {/* Results */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto mt-10">
            <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#FD90A7] to-[#C7365B] p-6 text-white text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2" />
                <h3 className="text-2xl font-bold">Your Personalised Plan</h3>
                <p className="mt-1 text-sm text-white/80">Based on your answers</p>
              </div>
              <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                {recommendations.map((rec, idx) => (
                  <Link
                    key={idx}
                    to={rec.link}
                    className="p-5 rounded-[14px] border border-gray-200 hover:border-[#FD90A7] hover:bg-[#FD90A7]/5 transition-all group"
                  >
                    <h4 className="mb-1 font-bold text-gray-900">{rec.title}</h4>
                    <p className="text-sm text-gray-500">{rec.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium mt-3 text-[#FD90A7] group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
              <div className="flex justify-center px-6 pb-6">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#FD90A7] text-[#FD90A7] rounded-full font-semibold hover:bg-[#FD90A7]/10 transition"
                >
                  <RefreshCw className="w-4 h-4" /> Retake Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Social Proof Row (Finsy inspired) */}
        <div className="flex flex-col items-center gap-4 mt-16">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">100k+</p>
            <p className="text-sm text-gray-500">Trusted by thousands of women worldwide</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Shield className="w-4 h-4" /> Secure & Confidential
            <span className="w-1 h-1 bg-gray-300 rounded-full" />
            <Users className="w-4 h-4" /> Community Driven
          </div>
        </div>
      </div>

      {/* Keyframes for floating chips */}
      <style>{`
        @keyframes floatChip {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
};

export default PelvicHealthQuiz;