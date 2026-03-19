import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const buttonPink = "rgba(253, 144, 167, 1)";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Account created successfully! 🎉");
      // Redirect or update auth state here
    } catch (error) {
		console.log(error)
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main-content" className="bg-gray-50 min-h-screen relative overflow-hidden">
      {/* Subtle brand pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="signup-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill={buttonPink} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#signup-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
            {/* Left side – Sign Up Form */}
            <div className="w-full max-w-md">
              {/* Header with dash */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
                <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px] font-zodiak">
                  Sign Up
                </span>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-2 font-zodiak">
                  Create an account
                </h1>
                <p className="text-[#525560] font-poppins">
                  Join our community and stay updated
                </p>
              </div>

              {/* Sign Up Form */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name */}
                  <div className="relative">
                    <label
                      htmlFor="firstName"
                      className={`absolute left-4 transition-all duration-200 font-poppins ${
                        focused.firstName || formData.firstName
                          ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="relative">
                    <label
                      htmlFor="lastName"
                      className={`absolute left-4 transition-all duration-200 font-poppins ${
                        focused.lastName || formData.lastName
                          ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-200 font-poppins ${
                        focused.email || formData.email
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
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className={`absolute left-4 transition-all duration-200 font-poppins ${
                        focused.password || formData.password
                          ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                          : "top-3 text-gray-400"
                      }`}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                      required
                      minLength={6}
                    />
                    <p className="text-xs text-gray-500 mt-1 font-poppins">
                      Must be at least 6 characters
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 rounded-full text-white font-semibold transition-all hover:opacity-90 shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-poppins disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: buttonPink }}
                  >
                    {isSubmitting ? (
                      "Creating account..."
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        Sign Up
                      </>
                    )}
                  </button>
                </form>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-600 mt-6 font-poppins">
                  Already have an account?{" "}
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
                  <UserPlus className="w-10 h-10 text-[#FD90A7]" />
                </div>
                <h3 className="text-xl font-bold text-[#1D2130] mb-2 font-zodiak">
                  Join Our Community
                </h3>
                <p className="text-[#525560] text-sm font-poppins">
                  Get access to resources, events, and a network of women supporting women.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;