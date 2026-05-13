// src/pages/Dashboard.jsx

import { useState, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Context
import { useUser } from '../context/UserContext';
import { useDashboardData } from '../context/DashboardContext';
import { can } from '../utils/roles';

// API Services – courseAPI is now available
import {
  projectAPI,
  eventAPI,
  blogAPI,
  webinarAPI,
  volunteerAPI,
  courseAPI,
} from '../services';

// Dashboard Components
import Sidebar from '../features/dashboard/components/Sidebar';
import Header from '../features/dashboard/components/Header';
import DataTable from '../features/dashboard/components/DataTable';
import Modal from '../features/dashboard/components/Modal';
import UserOverview from '../features/dashboard/components/UserOverview';
import UserManagement from '../features/dashboard/components/UserManagement';
import ActivityLogs from '../features/dashboard/components/ActivityLogs';
import DashboardStats from '../features/dashboard/components/DashboardStats';
import ResourceToolbar from '../features/dashboard/components/ResourceToolbar';
import ConfirmModal from '../features/shared/components/ConfirmModal'; // custom confirmation modal

const Dashboard = () => {
  // ------------------------------------------------------------------
  // 1. ALL HOOKS – unconditional, same order every render
  // ------------------------------------------------------------------
  const { currentUser } = useUser();
  const {
    projects,
    events,
    articles,
    webinars,
    volunteers,
    courses, // now fetched from context
    loading: dataLoading,
    error: dataError,
    refresh,
  } = useDashboardData();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('Dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentItem, setCurrentItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Delete confirmation state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // User display name
  const userName = currentUser?.f_name
    ? `${currentUser.f_name} ${currentUser.l_name || ''}`.trim()
    : currentUser?.name || currentUser?.email?.split('@')[0] || 'Admin';

  // ------------------------------------------------------------------
  // 2. Derived data & memoisation
  // ------------------------------------------------------------------
  const getCurrentData = () => {
    switch (activeFilter) {
      case 'Projects':   return projects;
      case 'Articles':   return articles;
      case 'Events':     return events;
      case 'Webinar':    return webinars;
      case 'Courses':    return courses || [];
      case 'Volunteers': return volunteers;
      default:           return [];
    }
  };

  const filteredData = useMemo(() => {
    const data = getCurrentData();
    if (!Array.isArray(data) || !searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((item) => {
      switch (activeFilter) {
        case 'Projects':
          return (item.name || item.title)?.toLowerCase().includes(q);
        case 'Articles':
          return item.title?.toLowerCase().includes(q);
        case 'Events':
          return item.event_name?.toLowerCase().includes(q);
        case 'Webinar':
          return item.title?.toLowerCase().includes(q);
        case 'Courses':
          return item.title?.toLowerCase().includes(q);
        case 'Volunteers':
          return (
            `${item.f_name} ${item.l_name}`.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q)
          );
        default:
          return true;
      }
    });
  }, [activeFilter, searchQuery, projects, events, articles, webinars, courses, volunteers]);

  // ------------------------------------------------------------------
  // 3. Early exits (after hooks)
  // ------------------------------------------------------------------
  if (!currentUser) return <Navigate to="/admin/signin" replace />;
  if (dataLoading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (dataError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {dataError}
        <button onClick={refresh} className="ml-2 underline">Retry</button>
      </div>
    );

  // ------------------------------------------------------------------
  // 4. CRUD operations – fully wired with courseAPI
  // ------------------------------------------------------------------
  const createItem = async (payload) => {
    switch (activeFilter) {
      case 'Projects':   return projectAPI.createProject(payload);
      case 'Events':     return eventAPI.createEvent(payload);
      case 'Articles':   return blogAPI.createBlog(payload);
      case 'Webinar':    return webinarAPI.createWebinar(payload);
      case 'Courses':    return courseAPI.createCourse(payload);
      case 'Volunteers': return volunteerAPI.signup({ ...payload, role: 'volunteer' });
      default: throw new Error('Unknown type');
    }
  };

  const updateItem = async (id, payload) => {
    switch (activeFilter) {
      case 'Projects':   return projectAPI.updateProject(id, payload);
      case 'Events':     return eventAPI.updateEvent(id, payload);
      case 'Articles':   return blogAPI.updateBlog(id, payload);
      case 'Webinar':    return webinarAPI.updateWebinar(id, payload);
      case 'Courses':    return courseAPI.updateCourse(id, payload);
      default: throw new Error('Unknown type');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteTarget({ id });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    const { id } = deleteTarget;
    try {
      switch (activeFilter) {
        case 'Projects':   await projectAPI.deleteProject(id); break;
        case 'Events':     await eventAPI.deleteEvent(id); break;
        case 'Articles':   await blogAPI.deleteBlog(id); break;
        case 'Webinar':    await webinarAPI.deleteWebinar(id); break;
        case 'Courses':    await courseAPI.deleteCourse(id); break;
        default: break;
      }
      toast.success('Deleted successfully');
      refresh();
    } catch (error) {
      toast.error(error.message || 'Delete failed');
    } finally {
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteTarget(null);
  };

  const handleSave = async (payload) => {
    try {
      if (payload._delete) {
        // delete triggered from modal (fallback)
        await handleDeleteClick(payload.id || currentItem?.id);
        setModalOpen(false);
        return;
      }

      if (modalMode === 'add') {
        await createItem(payload);
        toast.success(`${activeFilter.slice(0, -1)} created`);
      } else {
        const id = currentItem?.id || currentItem?._id;
        if (!id) throw new Error('Item ID missing');
        await updateItem(id, payload);
        toast.success(`${activeFilter.slice(0, -1)} updated`);
      }
      refresh();
      setModalOpen(false);
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setCurrentItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode('edit');
    setCurrentItem(item);
    setModalOpen(true);
  };

  const handleVolunteerStatusUpdate = async (id, status) => {
    try {
      await volunteerAPI.updateVolunteerStatus(id, status);
      toast.success(`Status updated to ${status}`);
      refresh();
    } catch (error) {
      toast.error(error.message || 'Status update failed');
    }
  };

  const handleStatClick = (filter) => {
    setActiveFilter(filter);
    setSearchQuery('');
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  // ------------------------------------------------------------------
  // 5. Render
  // ------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          openAddModal={openAddModal}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          isMobile
          closeSidebar={closeSidebar}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          openAddModal={openAddModal}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={toggleSidebar} userName={userName} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-auto">
          {activeFilter === 'Dashboard' ? (
            // Dashboard Overview
            <>
              <DashboardStats
                eventsCount={events.length}
                projectsCount={projects.length}
                volunteersCount={volunteers.length}
                articlesCount={articles.length}
                coursesCount={(courses || []).length}
                onStatClick={handleStatClick}
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {can(currentUser, 'view_user_stats') && <UserOverview />}
                {can(currentUser, 'view_activity_logs') && <ActivityLogs />}
              </div>
              {can(currentUser, 'manage_roles') && <UserManagement />}
            </>
          ) : (
            // Resource Management View
            <>
              <ResourceToolbar
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddClick={openAddModal}
              />
              <DataTable
                data={filteredData}
                activeFilter={activeFilter}
                onEdit={openEditModal}
                onDelete={handleDeleteClick} // custom confirm
                onVolunteerStatusUpdate={handleVolunteerStatusUpdate}
              />
            </>
          )}
        </main>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <Modal
          mode={modalMode}
          activeFilter={activeFilter}
          currentItem={currentItem}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Dashboard;