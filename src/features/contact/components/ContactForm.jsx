// src/features/contact/components/ContactForm.jsx
import { useState } from 'react';
import { Send, Sparkles, Mail, Phone, MapPin, User, Tag, MessageSquare, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../../../services/contactAPI';
import { FormField, ContactInfoCard, SocialLinksGrid } from './FormComponents';
import { contactInfoData, socialMediaLinks } from '../data/contactData';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    setFocused({ ...focused, [field]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const trimmedData = {
        f_name: formData.f_name.trim(),
        l_name: formData.l_name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      };
      await contactAPI.submitContactForm(trimmedData);
      toast.success('Message sent! We will get back to you soon.');
      setFormData({ f_name: '', l_name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative px-4 py-20 overflow-hidden bg-white sm:px-6 lg:px-8">
      {/* Ultra‑subtle brand background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Very faint pink orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#FD90A7]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-80 h-80 bg-[#C7365B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FD90A7]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Clean, on‑brand header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-[#FD90A7]/10 text-[#FD90A7] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1D2130] mb-4 leading-tight">
            We'd love to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD90A7] to-[#C7365B]">
              hear from you
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-base leading-relaxed text-gray-600">
            Have a question, want to collaborate, or just say hello? We're here to help and respond within 24 hours.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Left – Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 shadow-lg rounded-xl p-7 sm:p-9">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name fields row */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    name="f_name"
                    label="First Name"
                    icon={User}
                    value={formData.f_name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('f_name')}
                    onBlur={() => handleBlur('f_name')}
                    focused={focused.f_name}
                    required
                  />
                  <FormField
                    name="l_name"
                    label="Last Name"
                    icon={User}
                    value={formData.l_name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('l_name')}
                    onBlur={() => handleBlur('l_name')}
                    focused={focused.l_name}
                    required
                  />
                </div>

                <FormField
                  name="email"
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  focused={focused.email}
                  required
                />

                <FormField
                  name="subject"
                  label="Subject"
                  icon={Tag}
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={() => handleBlur('subject')}
                  focused={focused.subject}
                  required
                />

                <FormField
                  name="message"
                  label="Message"
                  icon={MessageSquare}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={() => handleBlur('message')}
                  focused={focused.message}
                  isTextarea={true}
                  rows={5}
                  required
                />

                {/* Brand button – clean pink gradient */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] hover:from-[#f77997] hover:to-[#b12e4f] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="mt-2 text-xs text-center text-gray-500">
                  We’ll get back to you as soon as possible – usually within 24 hours.
                </p>
              </form>
            </div>
          </div>

          {/* Right – Contact Info */}
          <div className="space-y-6 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-5">
                {/* Brand accent bar */}
                <div className="w-1 h-6 bg-gradient-to-b from-[#FD90A7] to-[#C7365B] rounded-full" />
                <h3 className="text-xl font-bold text-[#1D2130]">Quick Contact</h3>
              </div>
              <div className="space-y-3">
                {contactInfoData.map((info) => (
                  <ContactInfoCard
                    key={info.id}
                    icon={info.icon}
                    title={info.title}
                    value={info.value}
                    href={info.href}
                    type={info.type}
                  />
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#1D2130] mb-3">Connect With Us</h3>
              <SocialLinksGrid links={socialMediaLinks} />
            </div>

            {/* Response time card with tiny brand hint */}
            <div className="bg-[#FD90A7]/5 border border-[#FD90A7]/10 rounded-xl p-5">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-[#C7365B]">Response Time: </span>
                We typically reply within 24 hours. For urgent matters, please call directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;