import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext';

const AdminSignUp = () => {
  const { adminSignup } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'superadmin',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => setFocused({ ...focused, [e.target.name]: true });
  const handleBlur = (e) => setFocused({ ...focused, [e.target.name]: false });

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!formData.email.trim() || !formData.password) {
        toast.error('Email and password are required.');
        return;
      }

      if (!/[A-Z]/.test(formData.password)) {
        toast.error('Password must contain at least one uppercase letter.');
        return;
      }

    setIsSubmitting(true);

    try {
      await adminSignup({
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });
      toast.success('Admin account created successfully!');
      navigate('/admin/signin');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-[#FFFAF9]">
      <div className="flex items-center justify-center w-full px-4 py-12 lg:w-1/2 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-block mb-10">
            <img src="/NavLogo.png" alt="Her Physio Movement" className="w-auto h-8" />
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2">
              Sign Up
            </h1>
            <p className="text-[#A19390]">
              Create an admin account for the platform.
            </p>
          </div>

          <div className="p-6 border shadow-xl bg-white/70 backdrop-blur-xl border-white/50 rounded-2xl sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A19390] group-focus-within:text-[#FD90A7] transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#F3E4E2] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent transition text-[#1A1A1A] placeholder-[#A19390]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A19390] group-focus-within:text-[#FD90A7] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Min. 6 characters"
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-[#F3E4E2] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent transition text-[#1A1A1A] placeholder-[#A19390]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-[#A19390] hover:text-[#FD90A7] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-[#A19390] mt-6">
              Already have an account?{' '}
              <Link to="/admin/signin" className="text-[#FD90A7] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#FD90A7]/10 via-[#FFF3EB] to-[#FFEFE7]">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#FD90A7]/10 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#C7365B]/5 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
          <div className="flex items-center justify-center w-24 h-24 mb-8 border shadow-xl rounded-2xl bg-white/70 backdrop-blur-xl border-white/50">
            <UserPlus className="w-12 h-12 text-[#FD90A7]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">
            Join Our Community
          </h2>
          <p className="text-[#A19390] max-w-sm leading-relaxed">
            Get access to resources, events, and a network of women supporting women. Your journey to better pelvic health starts here.
          </p>
        </div>

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#F3E4E2 1px, transparent 1px), linear-gradient(90deg, #F3E4E2 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>
    </main>
  );
};

export default AdminSignUp;
