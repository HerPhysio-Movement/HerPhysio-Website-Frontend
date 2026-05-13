import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../../../services/contactAPI';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { name: 'About us', path: '/about-us' },
      { name: 'What we do', path: '/about-us' },
      { name: 'Team', path: '/team' },
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
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo & description */}
          <div className="lg:col-span-4">
            <img src="/FooterLogo.png" alt="Her Physio Movement Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Building a new generation of women's health physiotherapists and changemakers, shifting the narrative on the health of women across Africa.
            </p>
            <div className="flex gap-3 mt-6">
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
                  className="w-9 h-9 bg-gray-800 rounded-md flex items-center justify-center hover:bg-[#FD90A7] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="text-white text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation columns */}
          {footerLinks.map((section) => (
            <nav key={section.title} className="lg:col-span-2">
              <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 text-sm hover:text-[#FD90A7] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter section – fixed responsive */}
          <div className="lg:col-span-4">
            <div className="bg-gray-900/50 rounded-lg p-5 border border-gray-800">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-[#FD90A7]" />
                <h4 className="font-semibold text-white">Stay Updated</h4>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Get the latest news, events, and resources delivered to your inbox.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className="flex-1 min-w-0 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[#FD90A7] text-white rounded-md font-medium hover:bg-[#f77997] transition disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? 'Subscribing...' : <><Send className="w-4 h-4" /> Subscribe</>}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-gray-500 text-xs">
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
    </footer>
  );
};

export default Footer;