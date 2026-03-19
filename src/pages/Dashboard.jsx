import { useState, useMemo } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import SearchAndFilters from "../components/Dashboard/SearchAndFilters";
import DataTable from "../components/Dashboard/DataTable";
import Modal from "../components/Dashboard/Modal";
import { filterTabs } from "../components/Dashboard/constants";
import { X } from "lucide-react";

const userRole = "admin";

// Mock data (unchanged)
const initialProjects = [
  { id: 1, name: "PTDOS Outreach", status: "Active", date: "15-09-2025", statusColor: "green", location: "Lagos" },
  { id: 2, name: "Website Launch", status: "Completed", date: "15-09-2025", statusColor: "blue", location: "Ikeja" },
  { id: 3, name: "Collaboration with Neurorehab", status: "Postponed", date: "15-09-2025", statusColor: "yellow", location: "Abuja" },
  { id: 4, name: "Maternity Outreach", status: "Pending", date: "15-09-2025", statusColor: "orange", location: "Port Harcourt" },
];

const initialArticles = [
  { id: 1, title: "Women's Health Awareness", author: "Dr. Smith", date: "10-09-2025", status: "Published" },
  { id: 2, title: "Pelvic Floor Exercises", author: "PT. Jane", date: "05-09-2025", status: "Pending" },
];

const initialEvents = [
  { id: 1, name: "Wellness Workshop", date: "20-09-2025", location: "Lagos" },
  { id: 2, name: "Fundraising Gala", date: "25-09-2025", location: "Ikeja" },
];

const initialWebinars = [
  { id: 1, title: "Pelvic Health Webinar", host: "Dr. Bola", date: "15-09-2025" },
  { id: 2, title: "Postpartum Care", host: "PT. Chidi", date: "18-09-2025" },
];

const initialVolunteers = [
  { id: 1, name: "John Doe", email: "john@example.com", dateJoined: "01-01-2025", role: "volunteer" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", dateJoined: "15-02-2025", role: "admin" },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Projects");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [events, setEvents] = useState(initialEvents);
  const [webinars, setWebinars] = useState(initialWebinars);
  const [volunteers, setVolunteers] = useState(initialVolunteers);

  const visibleTabs = filterTabs.filter((tab) => tab.roles.includes(userRole));

  // Get raw data for current filter
  const getCurrentData = () => {
    switch (activeFilter) {
      case "Projects": return projects;
      case "Articles": return articles;
      case "Events": return events;
      case "Webinar": return webinars;
      case "Volunteers": return volunteers;
      default: return [];
    }
  };

  // Filter data based on search query
  const getFilteredData = useMemo(() => {
    const data = getCurrentData();
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase().trim();
    return data.filter((item) => {
      switch (activeFilter) {
        case "Projects":
          return (
            item.name.toLowerCase().includes(query) ||
            (item.location && item.location.toLowerCase().includes(query))
          );
        case "Articles":
          return (
            item.title.toLowerCase().includes(query) ||
            item.author.toLowerCase().includes(query)
          );
        case "Events":
          return (
            item.name.toLowerCase().includes(query) ||
            (item.location && item.location.toLowerCase().includes(query))
          );
        case "Webinar":
          return (
            item.title.toLowerCase().includes(query) ||
            item.host.toLowerCase().includes(query)
          );
        case "Volunteers":
          return (
            item.name.toLowerCase().includes(query) ||
            item.email.toLowerCase().includes(query) ||
            item.role.toLowerCase().includes(query)
          );
        default:
          return true;
      }
    });
  }, [activeFilter, searchQuery, projects, articles, events, webinars, volunteers]);

  // Global search results across all types
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results = [];

    // Search projects
    projects.forEach(item => {
      if (item.name.toLowerCase().includes(query) || (item.location && item.location.toLowerCase().includes(query))) {
        results.push({ ...item, type: "Projects", displayName: item.name });
      }
    });

    // Search articles
    articles.forEach(item => {
      if (item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query)) {
        results.push({ ...item, type: "Articles", displayName: item.title });
      }
    });

    // Search events
    events.forEach(item => {
      if (item.name.toLowerCase().includes(query) || (item.location && item.location.toLowerCase().includes(query))) {
        results.push({ ...item, type: "Events", displayName: item.name });
      }
    });

    // Search webinars
    webinars.forEach(item => {
      if (item.title.toLowerCase().includes(query) || item.host.toLowerCase().includes(query)) {
        results.push({ ...item, type: "Webinar", displayName: item.title });
      }
    });

    // Search volunteers
    volunteers.forEach(item => {
      if (item.name.toLowerCase().includes(query) || item.email.toLowerCase().includes(query) || item.role.toLowerCase().includes(query)) {
        results.push({ ...item, type: "Volunteers", displayName: item.name });
      }
    });

    return results.slice(0, 10); // Limit to 10 results for performance
  }, [searchQuery, projects, articles, events, webinars, volunteers]);

  const updateData = (newData) => {
    switch (activeFilter) {
      case "Projects": setProjects(newData); break;
      case "Articles": setArticles(newData); break;
      case "Events": setEvents(newData); break;
      case "Webinar": setWebinars(newData); break;
      case "Volunteers": setVolunteers(newData); break;
      default: break;
    }
  };

  const handleAdd = (newItem) => {
    const current = getCurrentData();
    const updated = [...current, { ...newItem, id: Date.now() }];
    updateData(updated);
    setModalOpen(false);
  };

  const handleEdit = (updatedItem) => {
    const current = getCurrentData();
    const updated = current.map(item => item.id === updatedItem.id ? updatedItem : item);
    updateData(updated);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const current = getCurrentData();
      const updated = current.filter(item => item.id !== id);
      updateData(updated);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setCurrentItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setCurrentItem(item);
    setModalOpen(true);
  };

  // Handle search result click
  const handleSearchResultClick = (result) => {
    setActiveFilter(result.type);
    setSearchQuery(result.displayName); // Filter to show only this item
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      <div className="fixed inset-0 z-40 lg:hidden pointer-events-none">
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`absolute top-0 left-0 h-full w-64 bg-white shadow-2xl flex flex-col transition-all duration-700 ease-[cubic-bezier(0.2,0.9,0.3,1.3)] ${
            sidebarOpen
              ? "translate-x-0 scale-100 rotate-0 skew-x-0 opacity-100 pointer-events-auto animate-wildEntrance"
              : "-translate-x-full scale-50 -rotate-12 skew-x-12 opacity-0"
          }`}
          style={{ transformOrigin: "left center" }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
            <span className="font-semibold text-gray-800">Menu</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-md p-4 shrink-0">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen w-full max-w-full">
        <Header
          userDropdownOpen={userDropdownOpen}
          setUserDropdownOpen={setUserDropdownOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">Manage HPM content and users</p>

          <SearchAndFilters
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            visibleTabs={visibleTabs}
            onAddClick={openAddModal}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            globalSearchResults={globalSearchResults}
            onSearchResultClick={handleSearchResultClick}
          />

          <DataTable
            data={getFilteredData}
            activeFilter={activeFilter}
            onEdit={openEditModal}
            onDelete={handleDelete}
          />
        </main>
      </div>

      {modalOpen && (
        <Modal
          mode={modalMode}
          activeFilter={activeFilter}
          currentItem={currentItem}
          onClose={() => setModalOpen(false)}
          onSave={modalMode === "add" ? handleAdd : handleEdit}
        />
      )}

      <style>{`
        @keyframes wildEntrance {
          0% {
            transform: translateX(-100%) scale(0.3) rotate(-20deg) skewX(30deg);
            opacity: 0;
            filter: blur(10px);
          }
          40% {
            transform: translateX(10%) scale(1.1) rotate(5deg) skewX(-10deg);
            opacity: 0.9;
            filter: blur(2px);
          }
          70% {
            transform: translateX(-2%) scale(0.98) rotate(-2deg) skewX(3deg);
            opacity: 1;
            filter: blur(0);
          }
          100% {
            transform: translateX(0) scale(1) rotate(0) skewX(0);
            opacity: 1;
            filter: blur(0);
          }
        }
        .animate-wildEntrance {
          animation: wildEntrance 0.8s cubic-bezier(0.2, 0.9, 0.3, 1.3) forwards;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;