import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

const buttonPink = "rgba(253, 144, 167, 1)";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here (API call, etc.)
    console.log(formData);
    alert("Sign up successful! (demo)");
  };

  return (
    <main id="main-content" className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        {/* Header with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            Sign Up
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-gray-600">
            Join our community and stay updated
          </p>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition"
                required
              />
            </div>

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
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full text-white font-medium transition-all hover:opacity-90 shadow-md hover:shadow-lg flex items-center justify-center"
              style={{ backgroundColor: buttonPink }}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/signin" className="text-pink-500 hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUp;