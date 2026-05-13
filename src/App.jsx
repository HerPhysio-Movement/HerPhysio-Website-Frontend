// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './features/shared/components/Navbar';
import Footer from './features/shared/components/Footer';
import { DashboardProvider } from './context/DashboardContext';   // ← added

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Events from './pages/Events';
import Projects from './pages/Projects';
import Community from './pages/Community';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Blog from './pages/Blog';
import VolunteerSignUp from './pages/VolunteerSignUp';
import AdminSignIn from './pages/AdminSignIn';
import AdminSignUp from './pages/AdminSignUp';
import Partner from './pages/Partner';
import Gallery from './pages/Gallery';
import UserDashboard from './pages/UserDashboard';
import Donate from './pages/Donate';

const App = () => (
  <>
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
      <Route path="/dashboard" element={<DashboardProvider><Dashboard /></DashboardProvider>} /> {/* ← wrapped */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/volunteer-signup" element={<VolunteerSignUp />} />
      <Route path="/admin/signin" element={<AdminSignIn />} />
      <Route path="/admin/signup" element={<AdminSignUp />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/donate" element={<Donate />} />
    </Routes>
    <Footer />
  </>
);

export default App;