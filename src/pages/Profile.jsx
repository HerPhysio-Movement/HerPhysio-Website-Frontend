import { useState } from "react";
import { User, Mail, Shield, Camera, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const buttonPink = "rgba(253, 144, 167, 1)";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Antonia",
    lastName: "Abraham",
    email: "antonia.abraham@hpm.org",
    role: "Admin",
    bio: "Passionate about women's health and empowering communities.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save changes (API call would go here)
    setIsEditing(false);
    alert("Profile updated (demo)");
  };

  return (
    <main className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Prominent Back to Dashboard button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2 mb-6 rounded-full border-2 transition-all duration-200 hover:bg-pink-50 text-sm font-medium"
          style={{ borderColor: buttonPink, color: buttonPink }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header with dash */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 sm:w-10 md:w-12 h-0.5 bg-[#1D2130]" />
          <span className="uppercase text-[#1D2130] font-bold text-sm tracking-[2px]">
            Profile
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            View and manage your personal information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-3xl font-bold">
                {profileData.firstName[0]}
                {profileData.lastName[0]}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-gray-600 flex items-center gap-1 justify-center sm:justify-start">
                <Shield className="w-4 h-4 text-pink-500" />
                {profileData.role}
              </p>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition disabled:bg-gray-50 disabled:text-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition disabled:bg-gray-50 disabled:text-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition disabled:bg-gray-50 disabled:text-gray-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                rows="3"
                value={profileData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition disabled:bg-gray-50 disabled:text-gray-500 resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Profile;