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
  // For demo, using initials from "Antonia Abraham" – replace with actual user data
  const initials = "AA";

  return (
    <div className="h-full flex flex-col">
      {/* Profile section – matching the Profile page design */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-2xl">
            {initials}
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition">
            <Camera className="w-3 h-3" />
          </button>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-3">Antonia Abraham</h2>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
          Admin
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={closeSidebar}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition min-h-[44px]"
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;