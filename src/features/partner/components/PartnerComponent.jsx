import { useState } from 'react';
import { Send, Mail, Phone, Building2, Users, Heart, Lightbulb } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../../../services/contactAPI';

const buttonPink = 'rgba(253, 144, 167, 1)';

const PartnerComponent = () => {
  const [formData, setFormData] = useState({ name: '', organization: '', email: '', message: '' });
  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFocus = (e) => setFocused({ ...focused, [e.target.name]: true });
  const handleBlur = (e) => setFocused({ ...focused, [e.target.name]: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactAPI.submitContactForm({
        f_name: formData.name.split(' ')[0] || '',
        l_name: formData.name.split(' ')[1] || '',
        email: formData.email,
        subject: `Partnership inquiry from ${formData.organization}`,
        message: formData.message,
      });
      toast.success('Thank you! We will be in touch soon.');
      setFormData({ name: '', organization: '', email: '', message: '' });
    } catch (error) {
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    { icon: Heart, title: 'Shared Mission', description: 'Align with a movement transforming women\'s health across Africa.' },
    { icon: Users, title: 'Community Impact', description: 'Reach thousands of women and healthcare professionals.' },
    { icon: Lightbulb, title: 'Innovation & Visibility', description: 'Co‑create programs and gain recognition as a change‑maker.' },
    { icon: Building2, title: 'Networking', description: 'Connect with like‑minded individuals and experts.' },
  ];

  return (
    <main className="relative pt-20 pb-16 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <svg width="100%" height="100%"><defs><pattern id="partner-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="2" fill={buttonPink} /></pattern></defs><rect width="100%" height="100%" fill="url(#partner-pattern)" /></svg>
      </div>
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">Partner with us</span>
        </div>
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1D2130] mb-4">Let's change the story together.</h1>
          <p className="text-lg text-[#525560] max-w-2xl mx-auto">
            We collaborate with organisations, foundations, and changemakers who share our vision to change the narrative to improve women's health across Africa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 mb-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-[#1D2130] mb-6">Why partner with us?</h2>
            <div className="space-y-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#FD90A7]/10 rounded-full flex items-center justify-center text-[#FD90A7]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1D2130] text-lg">{benefit.title}</h3>
                      <p className="text-[#525560] text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl sm:p-8">
              <h2 className="text-2xl font-bold text-[#1D2130] mb-4">Become a partner</h2>
              <p className="text-[#525560] mb-6">Fill out the form and we'll reach out to explore opportunities together.</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                {['name', 'organization', 'email'].map((field) => (
                  <div key={field} className="relative">
                    <label htmlFor={`partner-${field}`} className={`absolute left-4 transition-all duration-200 font-poppins ${
                     
                      focused[field] || formData[field] ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400 cursor-text'
                    }`}>
                      {field === 'name' ? 'Full Name' : field === 'organization' ? 'Organization / Company' : 'Email Address'}
                    </label>
                    <input id={`partner-${field}`} type={field === 'email' ? 'email' : 'text'} name={field} value={formData[field]} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur} disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] font-poppins bg-transparent" required />
                  </div>
                ))}
                <div className="relative">
                  <label htmlFor="partner-message" className={`absolute left-4 transition-all duration-200 font-poppins ${
                    focused.message || formData.message ? 'text-xs -top-2 bg-white px-2 text-[#FD90A7]' : 'top-3 text-gray-400 cursor-text'
                  }`}>How can we partner?</label>
                  <textarea id="partner-message" name="message" rows="4" value={formData.message} onChange={handleChange}
                    onFocus={handleFocus} onBlur={handleBlur} disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] resize-none" required />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition rounded-full shadow-md hover:opacity-90"
                  style={{ backgroundColor: buttonPink }}>
                  {isSubmitting ? 'Sending...' : <><Send className="w-5 h-5" /> Send Inquiry</>}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="p-8 text-center border border-gray-200 bg-gray-50 rounded-2xl">
          <p className="text-[#525560] mb-3">Prefer to reach out directly?</p>
          <div className="flex flex-col justify-center gap-4 text-sm sm:flex-row">
            <a href="mailto:herphysiomovement@gmail.com" className="flex items-center gap-2 justify-center text-[#FD90A7] hover:underline"><Mail className="w-4 h-4" /> herphysiomovement@gmail.com</a>
            <a href="tel:+2347089198901" className="flex items-center gap-2 justify-center text-[#FD90A7] hover:underline"><Phone className="w-4 h-4" /> +234 708 919 8901</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PartnerComponent;