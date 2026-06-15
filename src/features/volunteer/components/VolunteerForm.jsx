import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { volunteerAPI } from '../../../services/volunteerAPI';
import FormField from '../../shared/FormField';
import { validateForm } from '../../../utils/validateForm';

const VolunteerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_name: '', l_name: '', email: '', p_number: '', motivation_note: '', interest: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm('Volunteers', formData);
    setErrors(validationErrors);
    if (!isValid) return;

    setIsSubmitting(true);
    try {
      await volunteerAPI.signup(formData);
      toast.success('Application submitted! Welcome aboard!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Signup failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Volunteer Sign Up</h1>
        <p className="text-center text-gray-500 mb-8">Join our mission to improve women's health</p>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="First Name" name="f_name" value={formData.f_name} onChange={handleChange} error={errors.f_name} required />
            <FormField label="Last Name" name="l_name" value={formData.l_name} onChange={handleChange} error={errors.l_name} required />
          </div>
          <FormField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} required />
          <FormField label="Phone Number" name="p_number" type="tel" value={formData.p_number} onChange={handleChange} error={errors.p_number} required />
          <FormField label="Why do you want to volunteer?" name="motivation_note" type="textarea" rows={3} value={formData.motivation_note} onChange={handleChange} error={errors.motivation_note} required />
          <FormField label="Areas of Interest" name="interest" value={formData.interest} onChange={handleChange} />
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#FD90A7] text-white rounded-lg font-semibold hover:bg-[#f77997] flex items-center justify-center gap-2">
            {isSubmitting ? 'Submitting...' : <><Send className="w-5 h-5"/> Submit Application</>}
          </button>
        </form>
      </div>
    </section>
  );
};

export default VolunteerForm;
