// src/features/home/components/MythBusters.jsx
import { useState } from 'react';
import { Sparkles, HelpCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

const allMyths = [
  {
    id: 1,
    myth: 'Pelvic pain after childbirth is normal and will go away on its own.',
    fact: 'Persistent pelvic pain should be evaluated by a physiotherapist. Early intervention prevents long‑term issues.',
  },
  {
    id: 2,
    myth: 'Only older women need pelvic floor exercises.',
    fact: 'Pelvic floor health is important at every age – pregnancy, postpartum, menopause, and even for young women.',
  },
  {
    id: 3,
    myth: 'If you have a C‑section, you don’t need pelvic floor therapy.',
    fact: 'Pregnancy itself weakens the pelvic floor, regardless of delivery method. All postnatal women benefit.',
  },
  {
    id: 4,
    myth: 'Kegels are the only exercise for pelvic floor.',
    fact: 'A tailored program may include relaxation, coordination, breathing, and whole‑body strengthening.',
  },
  {
    id: 5,
    myth: 'Leaking urine is a normal part of ageing.',
    fact: 'Urinary incontinence is common but not normal. Physiotherapy can significantly improve or resolve it.',
  },
  {
    id: 6,
    myth: 'Pelvic organ prolapse always requires surgery.',
    fact: 'Many cases can be managed with physiotherapy, lifestyle changes, and pelvic floor exercises.',
  },
  {
    id: 7,
    myth: 'You can’t exercise during pregnancy.',
    fact: 'Moderate exercise is encouraged, with modifications. Pelvic floor physiotherapy helps prepare for birth.',
  },
  {
    id: 8,
    myth: 'Men don’t have pelvic floor problems.',
    fact: 'Men can also experience pelvic pain, incontinence, and dysfunction – physiotherapy helps both genders.',
  },
  {
    id: 9,
    myth: 'Pelvic exams are always painful.',
    fact: 'A skilled physiotherapist will work gently, listen to your feedback, and stop if you feel pain.',
  },
  {
    id: 10,
    myth: 'Vaginal delivery always damages the pelvic floor permanently.',
    fact: 'Most women recover well with proper postnatal care and physiotherapy.',
  },
  {
    id: 11,
    myth: 'Pelvic floor therapy is only about Kegels.',
    fact: 'It includes relaxation, coordination, breathing, core strengthening, and whole‑body movement.',
  },
  {
    id: 12,
    myth: 'You need a doctor’s referral to see a pelvic physio.',
    fact: 'In most countries you can book directly with a physiotherapist – no referral required.',
  },
  {
    id: 13,
    myth: 'Back pain has nothing to do with pelvic floor.',
    fact: 'The pelvic floor works together with deep core muscles; weakness can contribute to back pain.',
  },
  {
    id: 14,
    myth: 'Once you have incontinence, nothing can be done.',
    fact: 'Physiotherapy is highly effective – many women see significant improvement within weeks.',
  },
  {
    id: 15,
    myth: 'Pelvic floor exercises are too difficult.',
    fact: 'A physiotherapist will teach you simple, gentle techniques tailored to your body.',
  },
];

const VISIBLE_COUNT = 4;

const MythBusters = () => {
  const [showAll, setShowAll] = useState(false);
  const [active, setActive] = useState(null);

  const displayedMyths = showAll ? allMyths : allMyths.slice(0, VISIBLE_COUNT);
  const hasMore = allMyths.length > VISIBLE_COUNT;

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FD90A7]/10 px-4 py-2 rounded-full text-sm font-medium text-[#FD90A7] mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Myth Busters</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-3">Myths vs. Real Facts</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            Tap any myth to reveal the truth – evidence‑based answers to common misconceptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedMyths.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-5 cursor-pointer border border-gray-100 hover:shadow-md transition-all duration-300"
              onClick={() => setActive(active === item.id ? null : item.id)}
            >
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#FD90A7] shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-[#1D2130] mb-2 leading-relaxed">{item.myth}</p>
                  {active === item.id && (
                    <div className="flex items-start gap-3 mt-3 pt-3 border-t border-gray-100">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-600 leading-relaxed">{item.fact}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
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
                  View all ({allMyths.length - VISIBLE_COUNT} more) <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MythBusters;