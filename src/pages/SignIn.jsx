import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { useUser } from '../context/UserContext';

const SignIn = () => {
  const { login } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [focused, setFocused] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    setFocused({ ...focused, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    setFocused({ ...focused, [e.target.name]: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await login(formData.email, formData.password);
      toast.success('Signed in!');
      if (user.role === 'admin' || user.role === 'superadmin') {
        navigate('/dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen px-4 py-20 bg-white sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          {/* Left side – form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* Removed the decorative dash line */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-2">
                Welcome back
              </h1>
              <p className="text-[#525560]">Sign in to your account</p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <div className="relative">
                  <label
                    className={`absolute left-10 transition-all duration-200 font-poppins pointer-events-none ${
                      focused.email || formData.email
                        ? 'text-xs -top-2 bg-white px-1 text-[#FD90A7] z-20'
                        : 'top-[.8rem] text-gray-400'
                    }`}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="relative">
                  <label
                    className={`absolute left-10 transition-all duration-200 font-poppins pointer-events-none ${
                      focused.password || formData.password
                        ? 'text-xs -top-2 bg-white px-1 text-[#FD90A7] z-20'
                        : 'top-[.8rem] text-gray-400'
                    }`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full pl-9 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                {/* Forgot password & submit */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#FD90A7] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#FD90A7] text-white rounded-lg font-semibold hover:bg-[#f77997] transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Signing in...'
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" /> Sign In
                    </>
                  )}
                </button>
              </form>

              <p className="mt-6 text-sm text-center text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/volunteer-signup"
                  className="text-[#FD90A7] hover:underline font-medium"
                >
                  Volunteer Sign Up
                </Link>
              </p>
            </div>
          </div>

          {/* Right side – decorative info */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="bg-[#FFF5F7] rounded-lg p-8 border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#FD90A7]/10 rounded-full flex items-center justify-center mb-5">
                  <LogIn className="w-10 h-10 text-[#FD90A7]" />
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-3">
                  Join the Movement
                </h3>
                <p className="text-[#525560] text-sm leading-relaxed">
                  Access exclusive resources, register for events, and connect with a community dedicated to women's health.
                </p>
                <div className="w-full pt-6 mt-6 border-t border-gray-200">
                  <div className="flex justify-center gap-4 text-xs text-gray-400">
                    <span>✓ Free membership</span>
                    <span>✓ Expert content</span>
                    <span>✓ Community support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;