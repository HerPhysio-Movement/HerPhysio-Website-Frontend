import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";

const buttonPink = "rgba(253, 144, 167, 1)";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-in logic here (API call, etc.)
    console.log(formData);
    alert("Sign in successful! (demo)");
  };

  return (
    <main id="main-content" className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        {/* Header with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            Sign In
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Welcome back
          </h1>
          <p className="text-gray-600">
            Sign in to your account
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
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
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                required
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-pink-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full text-white font-medium transition-all hover:opacity-90 shadow-md hover:shadow-lg flex items-center justify-center"
              style={{ backgroundColor: buttonPink }}
            >
              <LogIn className="w-5 h-5 mr-2" />
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pink-500 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignIn;