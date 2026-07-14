// src/pages/Donate.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Mail, Banknote, Package, Clock, MessageSquare } from 'lucide-react';

const donationOptions = [
  {
    id: 'money',
    label: 'Financial Contribution',
    icon: Banknote,
    description: 'I want to donate money to support your programs.',
  },
  {
    id: 'time',
    label: 'Volunteer My Time',
    icon: Clock,
    description: 'I want to offer my time and skills as a volunteer.',
  },
  {
    id: 'other',
    label: 'Other / Custom Message',
    icon: MessageSquare,
    description: 'I have another way I would like to help.',
  },
];

const Donate = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (id) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((opt) => opt !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const selectedLabels = donationOptions
      .filter((opt) => selectedOptions.includes(opt.id))
      .map((opt) => `• ${opt.label}`)
      .join('\n');

    const subject = encodeURIComponent('Donation / Support Inquiry');
    const body = encodeURIComponent(
      `Hi Her Physio Movement team,\n\nI would like to contribute in the following way(s):\n${selectedLabels}\n\nPlease let me know the next steps. Thank you!\n\nBest regards`
    );

    window.location.href = `mailto:herphysiomovement@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-[#FFFAF9] pt-20 pb-16">
      <div className="max-w-2xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md border border-[#F3E4E2] rounded-2xl shadow-xl p-8 md:p-12">
          {/* Icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-[#FD90A7]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-4">
            Support Our Vision
          </h1>
          <p className="text-[#A19390] max-w-md mx-auto mb-8">
            Choose how you’d like to contribute. We will follow up with you personally.
          </p>

          {/* Donation options */}
          <div className="mb-8 space-y-3 text-left">
            {donationOptions.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => toggleOption(option.id)}
                  className={`w-full flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? 'border-[#FD90A7] bg-[#FD90A7]/5 shadow-sm'
                      : 'border-[#F3E4E2] bg-white hover:border-[#FD90A7]/50'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-[#FD90A7]/20' : 'bg-[#F3E4E2]/30'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${isSelected ? 'text-[#FD90A7]' : 'text-[#A19390]'}`}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-semibold text-sm ${isSelected ? 'text-[#FD90A7]' : 'text-[#1A1A1A]'}`}>
                      {option.label}
                    </p>
                    <p className="text-xs text-[#A19390] mt-0.5">{option.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#FD90A7] flex items-center justify-center flex-shrink-0 self-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={selectedOptions.length === 0}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send to Email
            <Mail className="w-5 h-5" />
          </button>

          <p className="text-xs text-[#A19390] mt-6">
            You will be redirected to your email app with a pre‑filled message. If nothing happens, you can also write to us directly at{' '}
            <a href="mailto:herphysiomovement@gmail.com" className="text-[#FD90A7] underline">
              herphysiomovement@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Donate;