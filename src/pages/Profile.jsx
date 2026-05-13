// src/pages/Profile.jsx

import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Camera,
  Mail,
  Shield,
  Edit3,
  Save,
  X,
  Calendar,
  Clock,
  Heart,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { currentUser } = useUser();

  // If not logged in, redirect to sign-in
  if (!currentUser) return <Navigate to="/signin" replace />;

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    f_name: currentUser.f_name || '',
    l_name: currentUser.l_name || '',
    email: currentUser.email || '',
    role: currentUser.role || 'Admin',
    bio: currentUser.bio || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to update profile
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const cancelEdit = () => {
    setProfile({
      f_name: currentUser.f_name || '',
      l_name: currentUser.l_name || '',
      email: currentUser.email || '',
      role: currentUser.role || 'Admin',
      bio: currentUser.bio || '',
    });
    setIsEditing(false);
  };

  // Dummy stats (will be replaced with real data later)
  const stats = [
    { label: 'Events Attended', value: 12, icon: Calendar },
    { label: 'Volunteer Hours', value: 36, icon: Clock },
    { label: 'Community Points', value: 245, icon: Heart },
  ];

  const initials = `${profile.f_name?.[0] || ''}${profile.l_name?.[0] || ''}`.toUpperCase();

  return (
    <main className="min-h-screen bg-gray-50/80 backdrop-blur-sm pt-20 pb-16">
      {/* Floating background orbs – subtle and brand‑colored */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FD90A7]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#C7365B]/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 left-1/3 w-48 h-48 bg-[#F5A623]/8 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back to Dashboard link */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md border border-gray-200 text-gray-600 hover:text-[#FD90A7] transition-all group mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        {/* Glassmorphism hero card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 overflow-hidden">
          {/* Cover / header area */}
          <div className="relative h-36 sm:h-44 bg-gradient-to-r from-[#FD90A7] via-[#f77997] to-[#C7365B]">
            <div className="absolute inset-0 bg-[url('/BG.png')] bg-cover bg-center opacity-20" />
            <button className="absolute top-3 right-3 bg-white/30 backdrop-blur-md p-2 rounded-xl text-white hover:bg-white/50 transition">
              <Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Avatar + main info */}
          <div className="relative px-4 sm:px-6 pb-6 -mt-12 sm:-mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              {/* Avatar */}
              <div className="relative group w-24 h-24 sm:w-28 sm:h-28 shrink-0">
                <div className="w-full h-full rounded-full ring-4 ring-white bg-gradient-to-br from-[#FD90A7] to-[#C7365B] flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
                  {initials}
                </div>
                <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md text-[#FD90A7] hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Name, role, email */}
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 flex-wrap">
                  {profile.f_name} {profile.l_name}
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#FD90A7]/15 text-[#FD90A7] text-sm font-semibold">
                    <Shield className="w-4 h-4" />
                    {profile.role}
                  </span>
                </h1>
                <p className="text-gray-500 flex items-center gap-1 mt-1">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </p>
                {profile.bio && !isEditing && (
                  <p className="text-gray-600 mt-3 max-w-xl italic border-l-4 border-[#FD90A7] pl-3 text-sm">
                    “{profile.bio}”
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 sm:self-start">
                {isEditing ? (
                  <>
                    <button
                      onClick={cancelEdit}
                      className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="p-2 rounded-xl bg-[#FD90A7] text-white hover:bg-[#f77997] transition"
                    >
                      <Save className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:border-[#FD90A7] hover:text-[#FD90A7] transition shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 px-4 sm:px-6 pb-5 border-t border-gray-100 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm">
                <stat.icon className="w-5 h-5 text-[#FD90A7] mb-1" />
                <span className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</span>
                <span className="text-xs text-gray-500 text-center">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Edit form – appears when editing */}
        {isEditing && (
          <div className="mt-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 p-5 sm:p-6 transition-all duration-300">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-[#FD90A7]" />
              Edit Your Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="f_name"
                    value={profile.f_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/90 focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="l_name"
                    value={profile.l_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/90 focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white/90 focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  name="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white/90 focus:ring-2 focus:ring-[#FD90A7] focus:border-transparent"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;