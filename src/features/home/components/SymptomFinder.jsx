import { useState } from 'react';
import { Sparkles, ChevronRight, CheckCircle2, RefreshCw, Stethoscope, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const symptomCategories = [
  {
    id: 'pelvic',
    label: 'Pelvic Pain / Pressure',
    icon: Stethoscope,
    specificSymptoms: [
      'Pain during intercourse',
      'Chronic pelvic pain',
      'Pain when sitting or walking',
      'Feeling of heaviness in the pelvis',
    ],
  },
  {
    id: 'incontinence',
    label: 'Incontinence / Leakage',
    icon: Stethoscope,
    specificSymptoms: [
      'Leakage when coughing or sneezing',
      'Sudden urge to urinate',
      'Leakage during exercise',
      'Frequent nighttime urination',
    ],
  },
  {
    id: 'postpartum',
    label: 'Postpartum Concerns',
    icon: Stethoscope,
    specificSymptoms: [
      'Diastasis recti (ab separation)',
      'C‑section scar pain',
      'Perineal tear recovery',
      'Low back or hip pain',
    ],
  },
  {
    id: 'menopause',
    label: 'Menopause / Hormonal Changes',
    icon: Stethoscope,
    specificSymptoms: [
      'Vaginal dryness',
      'Pelvic organ prolapse',
      'Urinary tract infections',
      'Painful bladder',
    ],
  },
];

// Recommendation engine maps categories to specific resource links
const getRecommendation = (categoryId, selectedSymptoms) => {
  const base = [];
  if (categoryId === 'pelvic') {
    base.push({
      title: 'Pelvic Pain Relief Webinar',
      description: 'Learn evidence‑based strategies from our expert physiotherapist.',
      link: '/resources#webinars',
      color: '#FD90A7',
    });
  }
  if (categoryId === 'incontinence') {
    base.push({
      title: 'Pelvic Floor Basics Course',
      description: 'Start with simple exercises to regain control.',
      link: '/resources#courses',
      color: '#C7365B',
    });
  }
  if (categoryId === 'postpartum') {
    base.push({
      title: 'Postpartum Recovery Program',
      description: 'Join the 3‑Month Mentorship Program designed for new mothers.',
      link: '/volunteer-signup',
      color: '#F08020',
    });
  }
  if (categoryId === 'menopause') {
    base.push({
      title: 'Menopause & Pelvic Health Guide',
      description: 'Our free webinar covers everything you need to know.',
      link: '/resources#webinars',
      color: '#6020F0',
    });
  }
  // Always recommend consultation if symptoms are present
  base.push({
    title: 'Book a Virtual Consultation',
    description: 'Speak one‑on‑one with a certified women\'s health physiotherapist.',
    link: '/contact-us',
    color: '#3070F0',
  });
  return base.slice(0, 3); // max 3 recommendations
};

const SymptomFinder = () => {
  const [step, setStep] = useState(0); // 0 = choose category, 1 = choose symptoms, 2 = show results
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSymptoms([]);
    setStep(1);
  };

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleShowResults = () => setStep(2);

  const reset = () => {
    setStep(0);
    setSelectedCategory(null);
    setSelectedSymptoms([]);
  };

  const selectedCat = symptomCategories.find(cat => cat.id === selectedCategory);
  const recommendations = step === 2 ? getRecommendation(selectedCategory, selectedSymptoms) : [];

  return (
    <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#FFFAF9' }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 30%, #FD90A7 1px, transparent 1px), radial-gradient(circle at 80% 70%, #C7365B 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-[#F3E4E2] text-sm font-semibold text-[#F08020] mb-5">
            <Stethoscope className="w-4 h-4" />
            Symptom Checker
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-3">Find Your Path to Relief</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-[#A19390] text-sm max-w-md mx-auto">Tell us how you feel, and we’ll connect you with the right resources.</p>
        </div>

        <div className="bg-white/70 backdrop-blur-md border border-[#F3E4E2] rounded-2xl shadow-xl p-6 sm:p-8">
          {step === 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Select a symptom category:</h3>
              {symptomCategories.map(cat => (
                <button key={cat.id} onClick={() => handleCategorySelect(cat.id)}
                  className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-[#F3E4E2] bg-white hover:bg-[#FD90A7]/5 hover:border-[#FD90A7] transition group">
                  <span className="text-sm font-medium text-[#1A1A1A]">{cat.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#A19390] group-hover:text-[#FD90A7]" />
                </button>
              ))}
            </div>
          )}

          {step === 1 && selectedCat && (
            <div>
              <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">Select any symptoms you’re experiencing:</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCat.specificSymptoms.map(symptom => (
                  <button key={symptom} onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-[#FD90A7] text-white border-[#FD90A7]'
                        : 'bg-white border-[#F3E4E2] text-[#A19390] hover:border-[#FD90A7] hover:text-[#FD90A7]'
                    }`}>
                    {symptom}
                  </button>
                ))}
              </div>
              <button onClick={handleShowResults}
                disabled={selectedSymptoms.length === 0}
                className="w-full py-3.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2">
                Get Recommendations <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-[#FD90A7]/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#FD90A7]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">Your Personalised Plan</h3>
              <p className="text-[#A19390] text-sm mb-8">Based on your symptoms, here are the next steps.</p>
              <div className="space-y-4 text-left">
                {recommendations.map((rec, idx) => (
                  <Link key={idx} to={rec.link}
                    className="block p-4 rounded-xl border border-[#F3E4E2] hover:shadow-md transition"
                    style={{ backgroundColor: `${rec.color}08` }}>
                    <h4 className="font-semibold text-[#1A1A1A] mb-1">{rec.title}</h4>
                    <p className="text-sm text-[#A19390]">{rec.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium mt-2" style={{ color: rec.color }}>
                      Go <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
              <button onClick={reset} className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 border border-[#F3E4E2] text-[#A19390] rounded-full text-sm font-medium hover:text-[#FD90A7] hover:border-[#FD90A7] transition">
                <RefreshCw className="w-4 h-4" /> Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SymptomFinder;