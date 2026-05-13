import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Lock,
  Moon,
  Globe,
  ArrowLeft,
  Save,
  Check,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailUpdates: true,
      eventReminders: true,
      newsletter: false,
      volunteerAlerts: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
    },
    theme: 'light',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleToggle = (category, key) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key],
      },
    }));
    if (saveSuccess) setSaveSuccess(false);
  };

  const handlePrivacyChange = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
    if (saveSuccess) setSaveSuccess(false);
  };

  const handleThemeChange = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
    if (saveSuccess) setSaveSuccess(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    toast.success('Settings saved successfully!');
    setSaveSuccess(true);
    setIsSaving(false);
  };

  return (
    <main className="min-h-screen bg-gray-50/80 backdrop-blur-sm pt-20 pb-16 relative overflow-hidden">
      {/* Floating background orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-[#FD90A7]/20 to-[#f77997]/20 rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-[#C7365B]/15 to-[#f77997]/10 rounded-full blur-[80px] animate-float-slow delay-700" />
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#F5A623]/10 rounded-full blur-[60px] animate-float-delayed" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Back to Dashboard link */}
        <Link
          to="/dashboard"
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-lg text-gray-700 hover:text-[#FD90A7] hover:border-[#FD90A7]/30 transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>

        {/* Main Settings Card */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/70 overflow-hidden transition-all duration-500">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-[#FD90A7] via-[#f77997] to-[#C7365B] p-6 sm:p-8 text-white">
            <div className="absolute inset-0 bg-[url('/BG.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
            <div className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-6 h-6" />
              <h1 className="text-2xl sm:text-3xl font-bold">Account Settings</h1>
            </div>
            <p className="mt-2 text-white/80 text-sm max-w-md">
              Customize your experience, notifications, and privacy preferences.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-10">
            {/* Notifications Section */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[#FD90A7]/10 rounded-lg">
                  <Bell className="w-5 h-5 text-[#FD90A7]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Notifications</h2>
                  <p className="text-sm text-gray-500">How you’d like to stay informed.</p>
                </div>
              </div>
              <div className="space-y-4 pl-2">
                {[
                  { key: 'emailUpdates', label: 'Email updates about new content' },
                  { key: 'eventReminders', label: 'Event reminders' },
                  { key: 'newsletter', label: 'Monthly newsletter' },
                  { key: 'volunteerAlerts', label: 'Volunteer opportunities' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50 hover:border-[#FD90A7]/30 transition cursor-pointer">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <Toggle
                      checked={settings.notifications[item.key]}
                      onChange={() => handleToggle('notifications', item.key)}
                    />
                  </label>
                ))}
              </div>
            </section>

            {/* Privacy Section */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[#FD90A7]/10 rounded-lg">
                  <Lock className="w-5 h-5 text-[#FD90A7]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Privacy</h2>
                  <p className="text-sm text-gray-500">Control what others can see.</p>
                </div>
              </div>
              <div className="space-y-4 pl-2">
                <div className="p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50">
                  <label className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Profile visibility</span>
                    <select
                      value={settings.privacy.profileVisibility}
                      onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                      className="text-sm rounded-lg border-gray-200 bg-white/90 py-2 px-3 focus:ring-2 focus:ring-[#FD90A7]/50 focus:border-transparent"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private (logged in only)</option>
                      <option value="admins">Admins only</option>
                    </select>
                  </label>
                </div>
                <label className="flex items-center justify-between p-3 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50 hover:border-[#FD90A7]/30 transition cursor-pointer">
                  <span className="text-sm text-gray-700">Show email on profile</span>
                  <Toggle
                    checked={settings.privacy.showEmail}
                    onChange={() => handlePrivacyChange('showEmail', !settings.privacy.showEmail)}
                  />
                </label>
              </div>
            </section>

            {/* Appearance Section */}
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[#FD90A7]/10 rounded-lg">
                  <Moon className="w-5 h-5 text-[#FD90A7]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Appearance</h2>
                  <p className="text-sm text-gray-500">Choose your theme.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pl-2">
                {['light', 'dark', 'system'].map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => handleThemeChange(theme)}
                    className={`relative px-5 py-3 rounded-lg text-sm font-medium border transition-all duration-200 ${
                      settings.theme === theme
                        ? 'bg-[#FD90A7]/10 border-[#FD90A7] text-[#FD90A7] shadow-sm'
                        : 'bg-white/50 border-gray-200/50 text-gray-700 hover:border-[#FD90A7]/30'
                    }`}
                  >
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    {settings.theme === theme && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FD90A7] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Save Button */}
            <div className="pt-4 border-t border-gray-200/80">
              <button
                type="submit"
                disabled={isSaving}
                className="ml-auto flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#FD90A7] to-[#C7365B] text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition transform hover:scale-[1.02] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Custom Toggle Component (inline for simplicity) */}
      <Toggle styles />
      <style>{`
        /* Toggle Switch */
        .toggle-track {
          position: relative;
          width: 44px;
          height: 24px;
          border-radius: 999px;
          background-color: #d1d5db;
          transition: background-color 0.2s ease;
          cursor: pointer;
        }
        .toggle-track.active {
          background-color: #FD90A7;
        }
        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          transition: transform 0.2s ease;
        }
        .toggle-track.active .toggle-thumb {
          transform: translateX(20px);
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(40px) scale(0.95); }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 18s ease-in-out infinite 3s;
        }
        .delay-700 { animation-delay: 0.7s; }
      `}</style>
    </main>
  );
};

// Reusable Toggle component (internal to this file)
const Toggle = ({ checked, onChange }) => (
  <div onClick={onChange} className={`toggle-track ${checked ? 'active' : ''}`} role="button" tabIndex={0}>
    <div className="toggle-thumb" />
  </div>
);

export default Settings;