import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

const buttonPink = "rgba(253, 144, 167, 1)";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Reset link sent! Check your email.");
      setSubmitted(true);
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <main id="main-content" className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Subtle brand pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="forgot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill={buttonPink} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#forgot-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* Left side – Forgot Password Form */}
            <div className="w-full max-w-md">
              {/* Header with dash */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
                <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px] font-zodiak">
                  Forgot Password
                </span>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-2 font-zodiak">
                  Reset your password
                </h1>
                <p className="text-[#525560] font-poppins">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Forgot Password Form */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-200 font-poppins ${
                          focused || email
                            ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                            : "top-3 text-gray-400"
                        }`}
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-6 rounded-full text-white font-semibold transition-all hover:opacity-90 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ backgroundColor: buttonPink }}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Send Reset Link
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  // Success message
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#1D2130] mb-2 font-zodiak">Check your email</h3>
                    <p className="text-[#525560] mb-4 font-poppins">
                      We've sent a password reset link to <strong>{email}</strong>
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[#FD90A7] hover:underline text-sm font-poppins"
                    >
                      Try a different email
                    </button>
                  </div>
                )}

                {/* Back to Sign In Link */}
                <p className="text-center text-sm text-gray-600 mt-6 font-poppins">
                  Remember your password?{" "}
                  <Link to="/signin" className="text-[#FD90A7] hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Right side – decorative illustration */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="bg-[#FFD8E1] rounded-3xl p-8 text-center">
                <div className="w-24 h-24 bg-[#FD90A7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-10 h-10 text-[#FD90A7]" />
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-2 font-zodiak">
                  No worries
                </h3>
                <p className="text-[#525560] text-sm font-poppins">
                  We'll help you reset your password and get back on track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;