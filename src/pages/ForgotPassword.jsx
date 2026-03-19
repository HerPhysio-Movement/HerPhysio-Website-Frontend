import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const buttonPink = "rgba(253, 144, 167, 1)";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here (API call, etc.)
    console.log("Password reset requested for:", email);
    setSubmitted(true);
    // In a real app, you'd show a success message and maybe redirect
  };

  return (
    <main id="main-content" className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        {/* Header with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            Forgot Password
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Reset your password
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="johndoe@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-full text-white font-medium transition-all hover:opacity-90 shadow-md hover:shadow-lg flex items-center justify-center"
                style={{ backgroundColor: buttonPink }}
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Reset Link
              </button>
            </form>
          ) : (
            // Success message after submission
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 mb-4">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-pink-500 hover:underline text-sm"
              >
                Try a different email
              </button>
            </div>
          )}

          {/* Back to Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Remember your password?{" "}
            <Link to="/signin" className="text-pink-500 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;