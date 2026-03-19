import { Link } from "react-router-dom";
import { Home, Users, FileText, Heart, Mail, Camera } from "lucide-react";

const navItems = [
  { name: "Home", icon: Home, path: "/" },
  { name: "About us", icon: Users, path: "/about-us" },
  { name: "Community", icon: Heart, path: "/community" },
  { name: "Resources", icon: FileText, path: "/resources" },
  { name: "Contact Us", icon: Mail, path: "/contact-us" },
];

const Sidebar = ({ closeSidebar }) => {
  const initials = "AA";

  return (
    <div className="h-full flex flex-col bg-white relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sidebar-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#FD90A7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sidebar-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Profile section */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#FD90A7]/10 flex items-center justify-center text-[#FD90A7] font-bold text-lg">
              {initials}
            </div>
            <button className="absolute bottom-0 right-0 w-4 h-4 bg-[#FD90A7] rounded-full flex items-center justify-center text-white hover:bg-[#f77997] transition">
              <Camera className="w-2.5 h-2.5" />
            </button>
          </div>
          <div>
            <h3 className="font-bold text-[#1D2130] font-zodiak">Antonia Abraham</h3>
            <p className="text-xs text-[#525560] font-poppins">Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={closeSidebar}
                className="flex items-center gap-3 px-4 py-3 text-sm text-[#525560] rounded-xl hover:bg-[#FD90A7]/10 hover:text-[#FD90A7] transition-all duration-200 font-poppins"
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;