import { useState, useMemo } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import SearchAndFilters from "../components/Dashboard/SearchAndFilters";
import DataTable from "../components/Dashboard/DataTable";
import Modal from "../components/Dashboard/Modal";
import UserOverview from "../components/Dashboard/UserOverview";
import UserManagement from "../components/Dashboard/UserManagement";
import ActivityLogs from "../components/Dashboard/ActivityLogs";
import { filterTabs } from "../components/Dashboard/constants";
import { useUser } from "../context/UserContext";
import { can } from "../utils/roles";

// Initial mock data
const initialProjects = [
  {
    id: 1,
    name: "PTDOS Outreach",
    status: "Active",
    date: "15-09-2025",
    statusColor: "green",
    location: "Lagos",
  },
  {
    id: 2,
    name: "Website Launch",
    status: "Completed",
    date: "15-09-2025",
    statusColor: "blue",
    location: "Ikeja",
  },
  {
    id: 3,
    name: "Collaboration with Neurorehab",
    status: "Postponed",
    date: "15-09-2025",
    statusColor: "yellow",
    location: "Abuja",
  },
  {
    id: 4,
    name: "Maternity Outreach",
    status: "Pending",
    date: "15-09-2025",
    statusColor: "orange",
    location: "Port Harcourt",
  },
];

const initialArticles = [
  {
    id: 1,
    title: "Women's Health Awareness",
    author: "Dr. Smith",
    date: "10-09-2025",
    status: "Published",
  },
  {
    id: 2,
    title: "Pelvic Floor Exercises",
    author: "PT. Jane",
    date: "05-09-2025",
    status: "Pending",
  },
];

const initialEvents = [
  { id: 1, name: "Wellness Workshop", date: "20-09-2025", location: "Lagos" },
  { id: 2, name: "Fundraising Gala", date: "25-09-2025", location: "Ikeja" },
];

const initialWebinars = [
  {
    id: 1,
    title: "Pelvic Health Webinar",
    host: "Dr. Bola",
    date: "15-09-2025",
  },
  { id: 2, title: "Postpartum Care", host: "PT. Chidi", date: "18-09-2025" },
];

const initialVolunteers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    dateJoined: "01-01-2025",
    role: "volunteer",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    dateJoined: "15-02-2025",
    role: "admin",
  },
];

const Dashboard = () => {
  const { currentUser } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Projects");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [projects, setProjects] = useState(initialProjects);
  const [articles, setArticles] = useState(initialArticles);
  const [events, setEvents] = useState(initialEvents);
  const [webinars, setWebinars] = useState(initialWebinars);
  const [volunteers, setVolunteers] = useState(initialVolunteers);

  const visibleTabs = filterTabs.filter((tab) =>
    tab.roles.includes(currentUser.role),
  );

  const getCurrentData = () => {
    switch (activeFilter) {
      case "Projects":
        return projects;
      case "Articles":
        return articles;
      case "Events":
        return events;
      case "Webinar":
        return webinars;
      case "Volunteers":
        return volunteers;
      default:
        return [];
    }
  };

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
  }, [
    activeFilter,
    searchQuery,
    projects,
    articles,
    events,
    webinars,
    volunteers,
  ]);

  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    const results = [];

    projects.forEach((item) => {
      if (
        item.name.toLowerCase().includes(query) ||
        (item.location && item.location.toLowerCase().includes(query))
      ) {
        results.push({ ...item, type: "Projects", displayName: item.name });
      }
    });
    articles.forEach((item) => {
      if (
        item.title.toLowerCase().includes(query) ||
        item.author.toLowerCase().includes(query)
      ) {
        results.push({ ...item, type: "Articles", displayName: item.title });
      }
    });
    events.forEach((item) => {
      if (
        item.name.toLowerCase().includes(query) ||
        (item.location && item.location.toLowerCase().includes(query))
      ) {
        results.push({ ...item, type: "Events", displayName: item.name });
      }
    });
    webinars.forEach((item) => {
      if (
        item.title.toLowerCase().includes(query) ||
        item.host.toLowerCase().includes(query)
      ) {
        results.push({ ...item, type: "Webinar", displayName: item.title });
      }
    });
    volunteers.forEach((item) => {
      if (
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.role.toLowerCase().includes(query)
      ) {
        results.push({ ...item, type: "Volunteers", displayName: item.name });
      }
    });

    return results.slice(0, 10);
  }, [searchQuery, projects, articles, events, webinars, volunteers]);

  const updateData = (newData) => {
    switch (activeFilter) {
      case "Projects":
        setProjects(newData);
        break;
      case "Articles":
        setArticles(newData);
        break;
      case "Events":
        setEvents(newData);
        break;
      case "Webinar":
        setWebinars(newData);
        break;
      case "Volunteers":
        setVolunteers(newData);
        break;
      default:
        break;
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
    const updated = current.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    updateData(updated);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const current = getCurrentData();
      const updated = current.filter((item) => item.id !== id);
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

  const handleSearchResultClick = (result) => {
    setActiveFilter(result.type);
    setSearchQuery(result.displayName);
  };

  // Track first rendered component to remove top padding
  let isFirst = true;

  return (
    <div className="min-h-screen bg-gray-50 flex relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dashboard-pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="#FD90A7" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dashboard-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 flex w-full">
        {/* Mobile sidebar overlay */}
        <div
          className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-xl overflow-y-auto">
            <Sidebar closeSidebar={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 bg-white shadow-md shrink-0 border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen w-full max-w-full">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-0 overflow-x-hidden">
            {/* Role-based sections with first component having no top padding */}
            {can(currentUser, "view_user_stats") && (
              <UserOverview noTopPadding={isFirst && (isFirst = false)} />
            )}
            {can(currentUser, "view_activity_logs") && (
              <ActivityLogs noTopPadding={isFirst && (isFirst = false)} />
            )}
            {can(currentUser, "manage_roles") && (
              <UserManagement noTopPadding={isFirst && (isFirst = false)} />
            )}

            {/* Common content – always visible */}
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
    </div>
  );
};

export default Dashboard;
