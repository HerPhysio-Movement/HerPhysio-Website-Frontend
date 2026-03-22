import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Events from "./pages/Events";
import Projects from "./pages/Projects";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Blog from "./pages/Blog";
import VolunteerSignUp from "./pages/VolunteerSignUp";
import AdminSignIn from "./pages/AdminSignIn";
import AdminSignUp from "./pages/AdminSignUp";
import Partner from "./pages/Partner";
import Gallery from "./pages/Gallery";
import UserDashboard from "./pages/UserDashboard";

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/volunteer-signup" element={<VolunteerSignUp />} />
            <Route path="/admin/signin" element={<AdminSignIn />} />
            <Route path="/admin/signup" element={<AdminSignUp />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Routes>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: { background: "#333", color: "#fff" },
              success: {
                style: { background: "#10b981" },
                iconTheme: { primary: "#fff", secondary: "#10b981" },
              },
            }}
          />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
