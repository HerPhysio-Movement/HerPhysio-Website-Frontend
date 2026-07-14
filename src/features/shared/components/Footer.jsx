// src/features/shared/components/Footer.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Mail, Send, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../../../services/contactAPI';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { name: 'About us', path: '/about-us' },
      { name: 'What we do', path: '/#what-we-do' },
      { name: 'Meet our team', path: '/about-us#team' },
      { name: 'Contact', path: '/contact-us' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Projects', path: '/projects' },
      { name: 'Events', path: '/events' },
      { name: 'Blog', path: '/blog' },
      { name: 'Gallery', path: '/gallery' },
    ],
  },
  {
    title: 'Get involved',
    links: [
      { name: 'Volunteer', path: '/volunteer-signup' },
      { name: 'Donate', path: '/donate' },
      { name: 'Partner', path: '/partner' },
      { name: 'Resources', path: '/resources' },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      await contactAPI.subscribeToNewsletter({ email });
      toast.success('Successfully subscribed!');
      setEmail('');
    } catch (error) {
      console.error(error);
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden text-white bg-black">
      {/* Subtle grain texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #FD90A7 1px, transparent 1px), radial-gradient(circle at 75% 75%, #C7365B 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        {/* Top section – asymmetric bento grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* LEFT COLUMN – Brand + Description + Social (span 5) */}
          <div className="space-y-8 lg:col-span-5">
            {/* Logo & brand lockup */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-[20px] bg-gradient-to-br from-[#FD90A7] to-[#C7365B] flex items-center justify-center shadow-lg shadow-[#FD90A7]/20">
                <img src="/NavLogo.png" alt="Her Physio Movement" className="object-contain w-8 h-8 brightness-0 invert" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">HerPhysio</h2>
                <p className="text-xs tracking-wider text-gray-400 uppercase">Movement</p>
              </div>
            </div>

            {/* Description */}
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Building a new generation of women's health physiotherapists and changemakers, shifting the narrative on the health of women across Africa.
            </p>

            {/* Social links – pill shaped */}
            <div className="flex gap-3">
              {[
                { href: 'https://web.facebook.com/share/p/161JYUarcj/', icon: FaFacebookF, label: 'Facebook' },
                { href: 'https://www.instagram.com/p/DIKD8dFNNKI/', icon: FaInstagram, label: 'Instagram' },
                { href: 'https://x.com/Her_Physio', icon: FaTwitter, label: 'Twitter' },
                { href: 'https://www.linkedin.com/company/herphysio-movement', icon: FaLinkedinIn, label: 'LinkedIn' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#FD90A7] hover:text-white hover:border-[#FD90A7] transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="text-lg transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>

            {/* Spinning "Explore" rotary badge (like Hex) */}
            <div className="relative flex-shrink-0 w-28 h-28 md:w-32 md:h-32">
              <svg viewBox="0 0 120 120" className="w-full h-full rotary-badge-text-track">
                <defs>
                  <path id="footerCircle" d="M 60,60 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                </defs>
                <text fontSize="8" fill="#FD90A7" fontWeight="bold" letterSpacing="1.5" wordSpacing="0">
                  <textPath href="#footerCircle" startOffset="0%">
                    PARTNER • JOIN US • VOLUNTEER • DONATE •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#FD90A7] flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN – Navigation capsules + Newsletter (span 7) */}
          <div className="grid grid-cols-1 gap-6 lg:col-span-7 sm:grid-cols-3">
            {/* Navigation columns – each as a glass card */}
            {footerLinks.map((section) => (
              <div key={section.title} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[32px] p-5">
                <h4 className="mb-4 text-sm font-bold tracking-wider text-white uppercase">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className="text-gray-400 text-sm hover:text-[#FD90A7] transition-colors flex items-center gap-1 group"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#FD90A7] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter capsule – spans full width in this grid */}
            <div className="sm:col-span-3 bg-gradient-to-br from-[#FD90A7]/10 to-[#C7365B]/10 backdrop-blur-md border border-white/10 rounded-[32px] p-6">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-[#FD90A7]" />
                <h4 className="font-bold text-white">Stay Updated</h4>
              </div>
              <p className="mb-4 text-sm text-gray-400">
                Get the latest news, events, and resources delivered to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 min-w-0 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent transition"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 bg-[#FD90A7] text-white rounded-xl font-semibold hover:bg-[#f77997] transition disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? 'Subscribing...' : <><Send className="w-4 h-4" /> Subscribe</>}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar – copyright & legal */}
        <div className="flex flex-col items-center justify-between pt-6 mt-12 text-xs text-gray-500 border-t border-white/10 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Her Physio Movement. All rights reserved.</p>
          <div className="flex gap-5 mt-3 sm:mt-0">
            <Link to="/privacy" className="hover:text-[#FD90A7] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#FD90A7] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Rotation animation for rotary badge */}
      <style>{`
        .rotary-badge-text-track {
          animation: uniformTextRotationLoop 16s linear infinite;
          transform-origin: center center;
        }
        @keyframes uniformTextRotationLoop {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;