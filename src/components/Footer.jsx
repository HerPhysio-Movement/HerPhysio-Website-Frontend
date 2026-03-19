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
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Successfully subscribed! 🎉");
      setEmail("");
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className="bg-black text-white px-4 sm:px-8 md:px-16 py-16"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo column */}
          <div className="lg:col-span-3">
            <img
              src="/FooterLogo.png"
              alt="Her Physio Movement Logo"
              className="mb-4"
              width="121"
              height="65"
            />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering women through specialised physiotherapy care.
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
              <ul className="space-y-2 text-sm text-gray-300" role="list">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="hover:text-[#FD90A7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:ring-offset-2 focus:ring-offset-black rounded-sm px-1"
                      aria-describedby={section.ariaId}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Social & Newsletter column */}
          <div className="lg:col-span-3 space-y-8">
            {/* Social links */}
            <nav aria-labelledby="social-nav-heading">
              <h4
                id="social-nav-heading"
                className="font-bold mb-4 text-white text-base tracking-wide"
              >
                Connect
              </h4>
              <ul className="flex flex-wrap gap-4" role="list">
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
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#FD90A7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:ring-offset-2 focus:ring-offset-black"
                      aria-label={`Follow us on ${social.label} (opens in new window)`}
                    >
                      <social.icon className="text-white text-sm" />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Enhanced Newsletter Section – fully responsive */}
            <section
              aria-labelledby="newsletter-heading"
              className="bg-gray-900/50 p-5 sm:p-6 rounded-xl border border-gray-800 w-full"
            >
              <h4
                id="newsletter-heading"
                className="font-bold mb-2 text-white text-lg flex items-center gap-2"
              >
                <MdEmail className="text-[#FD90A7] flex-shrink-0" />
                <span>Stay Updated</span>
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest news and events delivered to your inbox.
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 w-full"
                aria-label="Newsletter subscription"
                role="form"
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
                  className="w-full px-4 py-3 rounded-lg text-black placeholder-gray-400 bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  aria-required="true"
                  aria-describedby="newsletter-heading email-help"
                />
                <span id="email-help" className="sr-only">
                  Enter your email address to receive our latest updates and news
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 bg-[#FD90A7] text-white rounded-lg font-semibold hover:bg-[#f77997] transform hover:scale-105 transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black shadow-lg disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                  aria-describedby="newsletter-heading"
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