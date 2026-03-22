import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const buttonPink = "rgba(253, 144, 167, 1)";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // In real app, send data to backend
      toast.success("Admin account created! Please sign in.");
      navigate("/admin/signin");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            Admin Sign Up
          </span>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#FD90A7] text-white rounded-full font-semibold"
              style={{ backgroundColor: buttonPink }}
            >
              {isSubmitting ? "Creating..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminSignUp;
