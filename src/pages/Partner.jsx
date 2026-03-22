import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Handshake,
  Send,
  Mail,
  Phone,
  Building2,
  Users,
  Heart,
  Lightbulb,
} from "lucide-react";
import toast from "react-hot-toast";

const buttonPink = "rgba(253, 144, 167, 1)";

const Partner = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(formData);
      toast.success("Thank you! We'll be in touch soon.");
      setFormData({ name: "", organization: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Heart,
      title: "Shared Mission",
      description:
        "Align with a movement transforming women's health across Africa.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description:
        "Reach thousands of women and healthcare professionals directly.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Visibility",
      description: "Co‑create programs and gain recognition as a change‑maker.",
    },
    {
      icon: Building2,
      title: "Networking",
      description: "Connect with like‑minded organizations and experts.",
    },
  ];

  return (
    <main className="bg-white relative overflow-hidden pt-20 pb-16">
      {/* Subtle brand pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="partner-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill={buttonPink} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#partner-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            Partner with us
          </span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D2130] mb-4">
            Let's change the story together.
          </h1>
          <p className="text-lg text-[#525560] max-w-2xl mx-auto">
            We collaborate with organisations, foundations, and changemakers who
            share our vision of accessible, quality women's health physiotherapy
            across Africa.
          </p>
        </div>

        {/* Two‑column layout: benefits and form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          {/* Left: Benefits */}
          <div>
            <h2 className="text-2xl font-bold text-[#1D2130] mb-6">
              Why partner with us?
            </h2>
            <div className="space-y-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FD90A7]/10 rounded-full flex items-center justify-center text-[#FD90A7]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1D2130] text-lg">
                        {benefit.title}
                      </h3>
                      <p className="text-[#525560] text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Partnership Inquiry Form */}
          <div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-[#1D2130] mb-4">
                Become a partner
              </h2>
              <p className="text-[#525560] mb-6">
                Fill out the form and we'll reach out to explore opportunities
                together.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 font-poppins ${
                      focused.name || formData.name
                        ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                  />
                </div>

                {/* Organization */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 font-poppins ${
                      focused.organization || formData.organization
                        ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 font-poppins ${
                      focused.email || formData.email
                        ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 font-poppins ${
                      focused.message || formData.message
                        ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    How can we partner?
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full text-white font-semibold hover:opacity-90 transition shadow-md flex items-center justify-center gap-2 font-poppins disabled:opacity-50"
                  style={{ backgroundColor: buttonPink }}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Send Inquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact alternative */}
        <div className="text-center bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <p className="text-[#525560] mb-3">Prefer to reach out directly?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm">
            <a
              href="mailto:partners@herphysio.org"
              className="flex items-center gap-2 justify-center text-[#FD90A7] hover:underline"
            >
              <Mail className="w-4 h-4" /> partners@herphysio.org
            </a>
            <a
              href="tel:+2347089198901"
              className="flex items-center gap-2 justify-center text-[#FD90A7] hover:underline"
            >
              <Phone className="w-4 h-4" /> +234 708 919 8901
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Partner;
