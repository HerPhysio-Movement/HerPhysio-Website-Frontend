// src/pages/VolunteerSignUp.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const buttonPink = "rgba(253, 144, 167, 1)";

const VolunteerSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
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
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In a real app, send data to backend
      toast.success("Volunteer application submitted! 🎉");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen relative overflow-hidden pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          <div className="w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
              <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px] font-zodiak">
                Volunteer Sign Up
              </span>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-2 font-zodiak">
                Join as a Volunteer
              </h1>
              <p className="text-[#525560] font-poppins">
                Be part of the change – sign up to volunteer with us.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div className="relative">
                  <label
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="relative">
                  <label
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
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 font-poppins ${
                      focused.phone || formData.phone
                        ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]"
                        : "top-3 text-gray-400"
                    }`}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent transition font-poppins disabled:opacity-50"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 6 characters
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full text-white font-semibold transition-all hover:opacity-90 shadow-md flex items-center justify-center gap-2 font-poppins disabled:opacity-50"
                  style={{ backgroundColor: buttonPink }}
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" /> Sign Up as Volunteer
                    </>
                  )}
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-6 font-poppins">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-[#FD90A7] hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/3">
            <div className="bg-[#FFD8E1] rounded-3xl p-8 text-center">
              <div className="w-24 h-24 bg-[#FD90A7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-10 h-10 text-[#FD90A7]" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2130] mb-2 font-zodiak">
                Make a Difference
              </h3>
              <p className="text-[#525560] text-sm font-poppins">
                Join our volunteer community and help transform women's health
                across Africa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VolunteerSignUp;
