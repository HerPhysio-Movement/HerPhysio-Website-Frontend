import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Bell, Menu, Palette, X } from "lucide-react";

const Header = ({ setSidebarOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [currentTime]);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 px-4 sm:px-6 sticky top-0 z-30 relative overflow-hidden">
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="header-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="#FD90A7" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#header-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-3 items-center max-w-7xl mx-auto">
          {/* Left: hamburger + date/status */}
          <div className="flex items-center gap-2">
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div className="hidden lg:flex items-center gap-2 text-[#525560]">
              <Calendar className="w-4 h-4 text-[#FD90A7]" />
              <span className="text-sm font-poppins">{formattedDate}</span>
              <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2 font-poppins">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Logged in as Admin
              </div>
            </div>
          </div>

          {/* Center: greeting */}
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-medium text-[#1D2130] font-zodiak">{greeting}, Antonia</p>
            <p className="text-xs text-[#525560] font-poppins">Welcome back</p>
          </div>

          {/* Right: notifications, theme, avatar */}
          <div className="flex justify-end items-center gap-4">
            {/* Theme switcher */}
           

            {/* Notifications */}
            <button className="relative p-2 text-[#525560] hover:text-[#FD90A7] transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Avatar – opens modal */}
            <button
              onClick={openModal}
              className="flex items-center gap-2 focus:outline-none min-h-[44px] px-2"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-[#FD90A7]/10 flex items-center justify-center text-[#FD90A7] font-semibold">
                A
              </div>
              <span className="hidden sm:inline text-sm font-medium text-[#1D2130] font-poppins">
                Antonia
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Profile Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-[#525560]" />
            </button>

            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-[#FD90A7]/10 flex items-center justify-center text-[#FD90A7] text-2xl font-bold mx-auto mb-3">
                A
              </div>
              <h3 className="text-xl font-bold text-[#1D2130] font-zodiak">Antonia Abraham</h3>
              <p className="text-sm text-[#525560] font-poppins">Admin</p>
            </div>

            <div className="space-y-3">
              <Link
                to="/profile"
                onClick={closeModal}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-[#FD90A7]/10 transition text-[#1D2130] font-poppins"
              >
                Your Profile
              </Link>
              <Link
                to="/settings"
                onClick={closeModal}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-[#FD90A7]/10 transition text-[#1D2130] font-poppins"
              >
                Settings
              </Link>
              <hr className="border-gray-200" />
              <button
                onClick={() => {
                  closeModal();
                  // handle logout
                }}
                className="block w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 transition text-red-600 font-poppins"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="h-[73px]" />
    </>
  );
};

export default Header;