import { useState } from "react";
import {
  MapPin,
  Send,
  Phone,
  Mail,
  Heart,
  HandHeart,
  Handshake,
} from "lucide-react";
import ContactMap from "../components/ContactPage/contactMap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const buttonPink = "rgba(253, 144, 167, 1)";

// Office locations with directions (kept for map, but removed from UI)
const offices = [
  {
    name: "Head Office",
    address: "23 Marina Road, Lagos Island, Lagos, Nigeria",
    coords: [6.4531, 3.3958],
    directions: [
      {
        from: "Murtala Muhammed Airport",
        time: "30 mins via Lagos-Ibadan Expressway",
      },
      { from: "CMS Bus Stop", time: "10 mins walk or 5 mins drive" },
      { from: "Oshodi", time: "25 mins via Ikorodu Road" },
    ],
  },
  {
    name: "Branch Office",
    address: "Opp Awolowo round about, Ikeja, Lagos, Nigeria",
    coords: [6.608, 3.356],
    directions: [
      {
        from: "Murtala Muhammed Airport",
        time: "15 mins via Obafemi Awolowo Way",
      },
      { from: "Ikeja City Mall", time: "5 mins walk" },
      { from: "Ojota", time: "10 mins via Ikorodu Road" },
    ],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(formData);
      toast.success("Message sent! We'll get back to you soon.");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetInvolved = (type) => {
    if (type === "donate") {
      toast("Donation feature coming soon!");
    } else if (type === "volunteer") {
      window.location.href = "/volunteer-signup";
    } else if (type === "partner") {
      toast("Partnership opportunities – contact us directly.");
    }
  };

  return (
    <main id="main-content" className="bg-white relative">
      {/* Subtle brand pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="contact-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill={buttonPink} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with dash */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
            <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
              Get in touch
            </span>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D2130] mb-4">
              We'd love to hear from you
            </h1>
            <p className="text-lg text-[#525560] max-w-2xl mx-auto">
              Have a question, want to collaborate, or just want to say hello?
              Reach out – we're here for you.
            </p>
          </div>

          {/* Two‑column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Left: Contact Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200"
              >
                <h3 className="text-2xl font-bold text-[#1D2130] mb-6">
                  Send us a message
                </h3>
                <div className="space-y-5">
                  {/* First Name */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-200 font-poppins ${
                        focused.firstName || formData.firstName
                          ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <label
                      className={`absolute left-4 transition-all duration-200 font-poppins ${
                        focused.lastName || formData.lastName
                          ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
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
                      Message
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
                    className="w-full py-3 px-6 rounded-full text-white font-semibold hover:opacity-90 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-poppins disabled:opacity-50"
                    style={{ backgroundColor: buttonPink }}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Contact Info + Get Involved */}
            <div className="space-y-6">
              {/* Let's Talk Card */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition">
                <h3 className="text-xl font-bold text-[#1D2130] mb-4">
                  Let's talk
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+2347089198901"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#FD90A7] transition group"
                  >
                    <div className="w-10 h-10 bg-[#FD90A7]/10 rounded-full flex items-center justify-center group-hover:bg-[#FD90A7]/20">
                      <Phone className="w-5 h-5 text-[#FD90A7]" />
                    </div>
                    <span>+234 708 919 8901</span>
                  </a>
                  <a
                    href="mailto:info@womensphysiocare.org"
                    className="flex items-center gap-3 text-gray-600 hover:text-[#FD90A7] transition group"
                  >
                    <div className="w-10 h-10 bg-[#FD90A7]/10 rounded-full flex items-center justify-center group-hover:bg-[#FD90A7]/20">
                      <Mail className="w-5 h-5 text-[#FD90A7]" />
                    </div>
                    <span>herphysiomovement@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Get Involved */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-[#1D2130] mb-4">
                  Get Involved
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleGetInvolved("donate")}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FD90A7]/10 text-[#FD90A7] rounded-xl hover:bg-[#FD90A7] hover:text-white transition"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Donate</span>
                  </button>
                  <Link
                    to="/volunteer-signup"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FD90A7]/10 text-[#FD90A7] rounded-xl hover:bg-[#FD90A7] hover:text-white transition"
                  >
                    <HandHeart className="w-5 h-5" />
                    <span className="font-medium">Volunteer</span>
                  </Link>
                  <button
                    onClick={() => handleGetInvolved("partner")}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-[#FD90A7]/10 text-[#FD90A7] rounded-xl hover:bg-[#FD90A7] hover:text-white transition"
                  >
                    <Handshake className="w-5 h-5" />
                    <span className="font-medium">Partner</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Your support helps us reach more women and transform lives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full‑width Map Section (unchanged) */}
        <div className="w-full bg-gray-100 py-12 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="inline-block bg-[#FD90A7]/10 text-[#FD90A7] px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider mb-3">
                Visit us
              </span>
              <h2 className="text-3xl font-bold text-[#1D2130]">
                Our Locations
              </h2>
              <p className="text-[#525560] mt-2">
                Find us at either of our offices – we'd love to meet you.
              </p>
            </div>
            <ContactMap offices={offices} />
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-[#FFD8E1] to-[#ffe4ec] rounded-3xl p-8 md:p-12 text-center shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-[#1D2130] mb-3">
              Stay in the loop
            </h3>
            <p className="text-[#525560] mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for updates, resources, and event
              invitations.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-full text-white font-semibold hover:opacity-90 transition shadow-md"
                style={{ backgroundColor: buttonPink }}
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-[#525560] mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
