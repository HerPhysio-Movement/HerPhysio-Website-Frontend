// src/components/Footer.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import toast from "react-hot-toast";

const footerLinks = [
  {
    title: "Home",
    ariaId: "home-nav-heading",
    links: [
      { name: "About us", path: "/about-us" },
      { name: "Team", path: "/team" },
      { name: "What we do", path: "/what-we-do" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    title: "More",
    ariaId: "more-nav-heading",
    links: [
      { name: "Projects", path: "/projects" },
      { name: "Events", path: "/events" },
      { name: "Donate", path: "/donate" },
      { name: "Blog", path: "/blog" },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Successfully subscribed! 🎉");
      setEmail("");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="3" fill="#FD90A7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo column */}
          <div className="lg:col-span-3">
            <img
              src="/FooterLogo.png"
              alt="Her Physio Movement Logo"
              className="mb-4 w-auto h-12 md:h-14"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering women through specialised physiotherapy care across Africa.
            </p>
          </div>

          {/* Navigation columns */}
          {footerLinks.map((section) => (
            <nav
              key={section.title}
              className="lg:col-span-2"
              aria-labelledby={section.ariaId}
            >
              <h4
                id={section.ariaId}
                className="font-bold mb-4 text-white text-base tracking-wide"
              >
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-[#FD90A7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:ring-offset-2 focus:ring-offset-black rounded-sm"
                      aria-describedby={section.ariaId}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Social & Newsletter column – now wider */}
          <div className="lg:col-span-4 space-y-8">
            {/* Social links */}
            <nav aria-labelledby="social-nav-heading">
              <h4
                id="social-nav-heading"
                className="font-bold mb-4 text-white text-base tracking-wide"
              >
                Connect
              </h4>
              <ul className="flex flex-wrap gap-4">
                {[
                  { href: "https://web.facebook.com/share/p/161JYUarcj/", icon: FaFacebookF, label: "Facebook" },
                  { href: "https://www.instagram.com/p/DIKD8dFNNKI/?igsh=YmNqdDhmbm5tZGph", icon: FaInstagram, label: "Instagram" },
                  { href: "https://x.com/Her_Physio?t=hSSvFt2vTzDZZMlir7QXcg&s=09", icon: FaTwitter, label: "Twitter" },
                  { href: "https://www.linkedin.com/posts/herphysio-movement_worldhealthday-herphysiomovement-herphysiotherapist-activity-7315093267895791616--mRE?utm_source=share&utm_medium=member_android&rcm=ACoAADAxTfABjZZ71NTgaA1ioJqt_Vqr-N5zi0Y", icon: FaLinkedinIn, label: "LinkedIn" },
                ].map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FD90A7] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:ring-offset-2 focus:ring-offset-black"
                      aria-label={`Follow us on ${social.label} (opens in new window)`}
                    >
                      <social.icon className="text-white text-sm group-hover:scale-110 transition-transform" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Newsletter Section – now properly responsive */}
            <section
              aria-labelledby="newsletter-heading"
              className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
            >
              <h4
                id="newsletter-heading"
                className="font-bold mb-2 text-white text-lg flex items-center gap-2"
              >
                <MdEmail className="text-[#FD90A7]" />
                <span>Stay Updated</span>
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest news, events, and resources delivered to your inbox.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 items-stretch"
                aria-label="Newsletter subscription"
              >
                <label htmlFor="email-input" className="sr-only">
                  Email address for newsletter subscription
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition disabled:opacity-50"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-[#FD90A7] to-[#f9b8c9] text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-200 whitespace-nowrap shadow-lg disabled:opacity-50 flex-shrink-0"
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            </section>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Her Physio Movement. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link to="/privacy" className="hover:text-[#FD90A7] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#FD90A7] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;