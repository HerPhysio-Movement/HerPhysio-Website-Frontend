import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext';

const AdminSignUp = () => {
  const navigate = useNavigate();
  const { adminSignup } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => setFocused({ ...focused, [field]: true });
  const handleBlur = (field) => setFocused({ ...focused, [field]: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    try {
      await adminSignup(formData.email, formData.password);
      toast.success('Admin account created! Redirecting to sign in...');
      setTimeout(() => navigate('/admin/signin'), 1500);
    } catch (error) {
      console.error('Admin signup error:', error);
      const errorMsg = error.message || 'Failed to create Admin account';
      if (errorMsg.includes('already exists')) {
        toast.error('Admin account already exists. Redirecting to sign in...');
        setTimeout(() => navigate('/admin/signin'), 2000);
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md mx-auto">
        {/* Removed decorative dash */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-2">Create Admin Account</h1>
          <p className="text-[#525560]">Set up the first administrator for the platform</p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8">
          <div className="bg-[#FFF5F7] rounded-lg p-3 mb-6 text-center">
            <p className="text-xs text-[#525560]">
              ⚠️ <span className="font-medium">Only one admin account can be created.</span> After this, use the regular sign‑in.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-200 font-poppins ${
                  focused.name || formData.name
                    ? 'text-xs -top-2 bg-white px-1 text-[#FD90A7]'
                    : 'top-3 text-gray-400'
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-200 font-poppins ${
                  focused.email || formData.email
                    ? 'text-xs -top-2 bg-white px-1 text-[#FD90A7]'
                    : 'top-3 text-gray-400'
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins"
                  required
                />
              </div>
            </div>

            {/* Password with eye toggle */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-200 font-poppins ${
                  focused.password || formData.password
                    ? 'text-xs -top-2 bg-white px-1 text-[#FD90A7]'
                    : 'top-3 text-gray-400'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  className="w-full pl-9 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FD90A7] transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password with eye toggle */}
            <div className="relative">
              <label
                className={`absolute left-3 transition-all duration-200 font-poppins ${
                  focused.confirmPassword || formData.confirmPassword
                    ? 'text-xs -top-2 bg-white px-1 text-[#FD90A7]'
                    : 'top-3 text-gray-400'
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={() => handleBlur('confirmPassword')}
                  className="w-full pl-9 pr-10 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FD90A7] transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#FD90A7] text-white rounded-lg font-semibold hover:bg-[#f77997] transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an admin account?{' '}
              <Link to="/admin/signin" className="text-[#FD90A7] hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminSignUp;