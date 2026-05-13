// src/pages/SignUp.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext';

const SignUp = () => {
  const { signup } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    email: '',
    password: '',
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
    setIsSubmitting(true);

    try {
      const userData = {
        ...formData,
        role: 'user',
      };
      await signup(userData);
      toast.success('Account created successfully! 🎉');
      navigate('/user-dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-[#FFFAF9]">
      {/* ---------- LEFT PANEL – Form ---------- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 lg:px-12 py-12">
        <div className="w-full max-w-md">
          {/* Logo / Brand Mark */}
          <Link to="/" className="inline-block mb-10">
            <img src="/NavLogo.png" alt="Her Physio Movement" className="h-8 w-auto" />
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mb-2">
              Sign Up
            </h1>
            <p className="text-[#A19390]">
              Create an account and join our community.
            </p>
          </div>

          {/* Glass card form */}
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  name="f_name"
                  value={formData.f_name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="John"
                  className="w-full px-4 py-3.5 rounded-xl border border-[#F3E4E2] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent transition text-[#1A1A1A] placeholder-[#A19390]"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  name="l_name"
                  value={formData.l_name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  placeholder="Doe"
                  className="w-full px-4 py-3.5 rounded-xl border border-[#F3E4E2] bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent transition text-[#1A1A1A] placeholder-[#A19390]"
                  required
                />
              </div>

              {/* Email */}
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

              {/* Password */}
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  <>
                    Sign Up
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Sign In Link */}
            <p className="text-center text-sm text-[#A19390] mt-6">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#FD90A7] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ---------- RIGHT PANEL – Brand Visual ---------- */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#FD90A7]/10 via-[#FFF3EB] to-[#FFEFE7]">
        {/* Abstract geometric shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#FD90A7]/10 blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#C7365B]/5 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12 text-center">
          <div className="w-24 h-24 rounded-2xl bg-white/70 backdrop-blur-xl shadow-xl flex items-center justify-center mb-8 border border-white/50">
            <UserPlus className="w-12 h-12 text-[#FD90A7]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">
            Join Our Community
          </h2>
          <p className="text-[#A19390] max-w-sm leading-relaxed">
            Get access to resources, events, and a network of women supporting women. Your journey to better pelvic health starts here.
          </p>
        </div>

        {/* Subtle grid texture */}
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

export default SignUp;