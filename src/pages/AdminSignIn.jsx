import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const buttonPink = "rgba(253, 144, 167, 1)";

const AdminSignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Dummy validation – replace with real API call
      if (email === "admin@hpm.org" && password === "admin123") {
        localStorage.setItem("adminLoggedIn", "true");
        toast.success("Admin signed in");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
            Admin Sign In
          </span>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#FD90A7] text-white rounded-full font-semibold"
              style={{ backgroundColor: buttonPink }}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminSignIn;
