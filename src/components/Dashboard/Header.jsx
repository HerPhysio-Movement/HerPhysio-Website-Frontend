import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Calendar, Bell, Menu } from "lucide-react";

const Header = ({ userDropdownOpen, setUserDropdownOpen, setSidebarOpen }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

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

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-3 sticky top-0 z-30">
      {/* Three‑column grid for perfect alignment */}
      <div className="grid grid-cols-3 items-center">
        {/* Left column: hamburger (mobile) + date/status (desktop) */}
        <div className="flex items-center gap-2">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          {/* Date and logged‑in status – hidden on mobile, visible on lg */}
          <div className="hidden lg:flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4 text-pink-500" />
            <span className="text-sm">{formattedDate}</span>
            <div className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Logged in as Admin
            </div>
          </div>
        </div>

        {/* Center column: greeting and welcome back */}
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium text-gray-700">{greeting}, Antonia</p>
        </div>

        {/* Right column: notifications and avatar */}
        <div className="flex justify-end items-center gap-4">
          {/* Notification icon */}
          <button className="relative p-2 text-gray-500 hover:text-pink-500 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Avatar dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 focus:outline-none min-h-[44px] px-2"
              aria-expanded={userDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-semibold">
                A
              </div>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                Antonia
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    // handle logout
                  }}
                  className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;