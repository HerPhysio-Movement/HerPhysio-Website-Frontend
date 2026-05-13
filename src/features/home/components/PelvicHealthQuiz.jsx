import { useState } from 'react';
import { Sparkles, ArrowRight, ChevronRight, Heart, Brain, Activity, CheckCircle2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: 'What stage of life are you currently in?',
    options: [
      { label: 'Adolescence / Young Adult', value: 'adolescence' },
      { label: 'Pregnancy / Postpartum', value: 'postpartum' },
      { label: 'Perimenopause / Menopause', value: 'menopause' },
      { label: 'General Wellness', value: 'general' },
    ],
    icon: Heart,
  },
  {
    id: 2,
    question: 'Are you experiencing any pelvic discomfort or symptoms?',
    options: [
      { label: 'Yes, pain or pressure', value: 'pain' },
      { label: 'Yes, incontinence or leakage', value: 'incontinence' },
      { label: 'Yes, other concerns', value: 'other' },
      { label: 'No, I feel fine', value: 'none' },
    ],
    icon: Brain,
  },
  {
    id: 3,
    question: 'What are you most interested in learning about?',
    options: [
      { label: 'Pelvic floor exercises', value: 'exercises' },
      { label: 'Nutrition & lifestyle', value: 'nutrition' },
      { label: 'Emotional well‑being', value: 'wellbeing' },
      { label: 'Professional physiotherapy', value: 'physio' },
    ],
    icon: Activity,
  },
];

// Personalized recommendations based on answers
const getRecommendations = (answers) => {
  const recs = [];

  // Stage-based recommendations
  if (answers[0] === 'postpartum') {
    recs.push({
      title: 'Postpartum Recovery Program',
      description: 'Our 3‑Month Mentorship Program is perfect for you.',
      link: '/volunteer-signup',
      color: '#FD90A7',
    });
  } else if (answers[0] === 'menopause') {
    recs.push({
      title: 'Menopause & Pelvic Health Webinar',
      description: 'Watch our free webinar on managing pelvic health during menopause.',
      link: '/resources#webinars',
      color: '#C7365B',
    });
  }

  // Symptom-based recommendations
  if (answers[1] === 'pain' || answers[1] === 'incontinence') {
    recs.push({
      title: 'Book a Virtual Consultation',
      description: 'Speak with a certified women\'s health physiotherapist.',
      link: '/contact-us',
      color: '#F08020',
    });
  }

  // Interest-based recommendations
  if (answers[2] === 'exercises') {
    recs.push({
      title: 'Pelvic Floor Basics Course',
      description: 'Learn the anatomy and exercises you need.',
      link: '/resources#courses',
      color: '#3070F0',
    });
  } else if (answers[2] === 'physio') {
    recs.push({
      title: 'Join Our Community',
      description: 'Connect with professionals and peers who share your journey.',
      link: '/community',
      color: '#6020F0',
    });
  }

  // Fallback if no specific recommendations
  if (recs.length === 0) {
    recs.push({
      title: 'Explore Our Resources',
      description: 'Browse articles, videos, and guides tailored to your needs.',
      link: '/resources',
      color: '#FD90A7',
    });
  }

  return recs;
};

const PelvicHealthQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0..questions.length-1
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleOptionSelect = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
  };

  const recommendations = getRecommendations(answers);
  const currentQuestion = questions[currentStep];
  const Icon = currentQuestion?.icon;

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Subtle texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 30%, #FD90A7 1px, transparent 1px), radial-gradient(circle at 70% 70%, #C7365B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
            <Sparkles className="w-4 h-4" />
            Discover Your Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">
            Pelvic Health Quiz
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-[#A19390] text-sm max-w-md mx-auto">
            Answer a few questions to get personalised recommendations for your pelvic health journey.
          </p>
        </div>

        {/* Quiz card */}
        <div className="bg-white/70 backdrop-blur-md border border-[#F3E4E2] rounded-2xl shadow-xl p-6 sm:p-8">
          {!showResults ? (
            <>
              {/* Progress bar */}
              <div className="flex items-center gap-2 mb-8">
                {questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="flex-1 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: idx <= currentStep ? '#FD90A7' : '#F3E4E2',
                    }}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="text-center mb-8">
                {Icon && (
                  <div className="mx-auto w-14 h-14 rounded-full bg-[#FD90A7]/10 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#FD90A7]" />
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#1A1A1A]">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className="w-full text-left px-5 py-4 rounded-xl border border-[#F3E4E2] bg-white hover:bg-[#FD90A7]/5 hover:border-[#FD90A7] transition-all group flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-[#1A1A1A]">
                      {option.label}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#A19390] group-hover:text-[#FD90A7] transition-colors" />
                  </button>
                ))}
              </div>

              <p className="text-center text-xs text-[#A19390] mt-6">
                Question {currentStep + 1} of {questions.length}
              </p>
            </>
          ) : (
            /* Results */
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#FD90A7]/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#FD90A7]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Your Personalised Recommendations</h3>
              <p className="text-[#A19390] text-sm mb-8">
                Based on your answers, here are some resources that may help you.
              </p>

              <div className="space-y-4 text-left">
                {recommendations.map((rec, idx) => (
                  <Link
                    key={idx}
                    to={rec.link}
                    className="block p-4 rounded-xl border border-[#F3E4E2] hover:shadow-md transition-all"
                    style={{ backgroundColor: `${rec.color}08` }}
                  >
                    <h4 className="font-semibold text-[#1A1A1A] mb-1">{rec.title}</h4>
                    <p className="text-sm text-[#A19390]">{rec.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium mt-2" style={{ color: rec.color }}>
                      Explore <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>

              <button
                onClick={resetQuiz}
                className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 border border-[#F3E4E2] text-[#A19390] rounded-full text-sm font-medium hover:text-[#FD90A7] hover:border-[#FD90A7] transition"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PelvicHealthQuiz;