import { useState } from "react";
import { Bell, Shield, Moon, Globe, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const buttonPink = "rgba(253, 144, 167, 1)";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    eventReminders: true,
    newsletter: false,
    volunteerAlerts: true,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
  });

  const [theme, setTheme] = useState("light");

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings saved (demo)");
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
            Settings
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your preferences and account security
          </p>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Notification Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-pink-500" />
                Notification Preferences
              </h2>
              <div className="space-y-3">
                {[
                  { key: "emailUpdates", label: "Email updates about new content" },
                  { key: "eventReminders", label: "Event reminders" },
                  { key: "newsletter", label: "Monthly newsletter" },
                  { key: "volunteerAlerts", label: "Volunteer opportunities" },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{item.label}</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={() => handleNotificationChange(item.key)}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 rounded-full transition-colors ${
                          notifications[item.key] ? "bg-pink-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                            notifications[item.key] ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy Settings */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-pink-500" />
                Privacy
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Visibility
                  </label>
                  <select
                    value={privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private (only logged in users)</option>
                    <option value="admins">Admins only</option>
                  </select>
                </div>
                <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Show email on profile</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={privacy.showEmail}
                      onChange={(e) => handlePrivacyChange("showEmail", e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition-colors ${
                        privacy.showEmail ? "bg-pink-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                          privacy.showEmail ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Theme Preference */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5 text-pink-500" />
                Appearance
              </h2>
              <div className="flex gap-4">
                {["light", "dark", "system"].map((option) => (
                  <label key={option} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value={option}
                      checked={theme === option}
                      onChange={(e) => setTheme(e.target.value)}
                      className="text-pink-500 focus:ring-pink-500"
                    />
                    <span className="text-gray-700 capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Settings;