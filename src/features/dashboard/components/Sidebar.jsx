import { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Video,
  Users,
  Image,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
} from 'lucide-react';
import { useUser } from '../../../context/UserContext';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, filter: 'Dashboard' },
  { name: 'Projects', icon: FileText, filter: 'Projects' },
  { name: 'Articles', icon: FileText, filter: 'Articles' },
  { name: 'Events', icon: Calendar, filter: 'Events' },
  { name: 'Webinars', icon: Video, filter: 'Webinar' },
  { name: 'Courses', icon: BookOpen, filter: 'Courses' },
  { name: 'Volunteers', icon: Users, filter: 'Volunteers' },
  { name: 'Gallery', icon: Image, filter: 'Gallery' },
];

const Sidebar = ({
  activeFilter,
  setActiveFilter,
  openAddModal,
  isMobile,
  closeSidebar,
}) => {
  const { logout } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isExpanded = !collapsed || hovered;

  const handleItemClick = (item) => {
    if (item.filter === 'Dashboard') {
      setActiveFilter('Dashboard');
    } else {
      setActiveFilter(item.filter);
    }
    if (closeSidebar) closeSidebar();
  };

  return (
    <div
      className="h-full flex flex-col bg-white border-r border-gray-200 transition-all duration-300"
      style={{ width: isExpanded ? '240px' : '70px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo area */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between gap-2">
        {isExpanded ? (
          <img src="/NavLogo.png" alt="Logo" className="h-8 w-auto" />
        ) : (
          <div className="w-8 h-8 bg-[#FD90A7]/20 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-5 h-5 text-[#FD90A7]" />
          </div>
        )}
        {!isMobile && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        )}
        {isMobile && (
          <button onClick={closeSidebar} className="p-1 rounded-md hover:bg-gray-100">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation items */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.filter;
          return (
            <button
              key={item.name}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#FD90A7]/10 text-[#FD90A7]'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isExpanded && <span className="truncate">{item.name}</span>}
            </button>
          );
        })}
      </nav>

      {/* Quick Add button (expanded only) */}
      {isExpanded && (
        <div className="px-3 py-2">
          <button
            onClick={() => openAddModal(activeFilter)}
            className="w-full flex items-center gap-2 px-4 py-2 bg-[#FD90A7] text-white rounded-lg hover:bg-[#f77997] transition"
          >
            <PlusCircle className="w-5 h-5" />
            New {activeFilter === 'Dashboard' ? 'Item' : activeFilter.slice(0, -1)}
          </button>
        </div>
      )}

      {/* Logout */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => {
            logout();
            closeSidebar?.();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isExpanded && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;