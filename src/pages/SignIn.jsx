import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "../context/UserContext";

const buttonPink = "rgba(253, 144, 167, 1)";

const SignIn = () => {
  const { login } = useUser(); // <-- get login function
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = login(formData.email, formData.password); // login returns user or false
      if (user) {
        toast.success("Signed in!");
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        toast.error("Invalid email or password");
      }
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
                Sign In
              </span>
            </div>
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1D2130] mb-2 font-zodiak">
                Welcome back
              </h1>
              <p className="text-[#525560] font-poppins">
                Sign in to your account
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 font-poppins ${focused.email || formData.email ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]" : "top-3 text-gray-400"}`}
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
                <div className="relative">
                  <label
                    className={`absolute left-4 transition-all duration-200 font-poppins ${focused.password || formData.password ? "text-xs -top-2 bg-white px-2 text-[#FD90A7]" : "top-3 text-gray-400"}`}
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
                  />
                </div>
                <div className="text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#FD90A7] hover:underline font-poppins"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-full text-white font-semibold transition-all hover:opacity-90 shadow-md flex items-center justify-center gap-2 font-poppins disabled:opacity-50"
                  style={{ backgroundColor: buttonPink }}
                >
                  {isSubmitting ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" /> Sign In
                    </>
                  )}
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-6 font-poppins">
                Don't have an account?{" "}
                <Link
                  to="/volunteer-signup"
                  className="text-[#FD90A7] hover:underline font-medium"
                >
                  Volunteer Sign Up
                </Link>
              </p>
            </div>
          </div>
          <div className="hidden lg:block lg:w-1/3">
            <div className="bg-[#FFD8E1] rounded-3xl p-8 text-center">
              <div className="w-24 h-24 bg-[#FD90A7]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <LogIn className="w-10 h-10 text-[#FD90A7]" />
              </div>
              <h3 className="text-xl font-bold text-[#1D2130] mb-2 font-zodiak">
                Welcome to Her Physio Movement
              </h3>
              <p className="text-[#525560] text-sm font-poppins">
                Access your dashboard, manage your profile, and stay connected
                with our community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
