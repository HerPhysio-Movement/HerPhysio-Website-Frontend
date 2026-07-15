// src/pages/Dashboard.jsx

import { useState, useMemo, useEffect, useCallback } from 'react';
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
  articleAPI,
  webinarAPI,
  volunteerAPI,
  courseAPI,
  galleryAPI,
} from '../services';
import {
  createItem as dashboardCreateItem,
  updateItem as dashboardUpdateItem,
} from '../utils/dashboardHelpers';
import { extractArrayFromResponse } from '../utils/apiHelpers';

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
import { getResourceLabel } from '../features/dashboard/utils/resourceLabels';

const normalizeStatus = (status) => String(status || '').toLowerCase();
const isArchiveStatus = (status) => ['archive', 'archived'].includes(normalizeStatus(status));
const isEmailSearch = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
const omitStatus = (item) => {
  const payload = { ...item };
  delete payload.status;
  return payload;
};

const Dashboard = () => {
  // ------------------------------------------------------------------
  // 1. ALL HOOKS – unconditional, same order every render
  // ------------------------------------------------------------------
  const { currentUser } = useUser();
  const {
    projects,
    events,
    articles,
    blogs,
    webinars,
    volunteers,
    courses, // now fetched from context
    gallery,
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
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventRegistrations, setSelectedEventRegistrations] = useState([]);
  const [registrationsLoading, setRegistrationsLoading] = useState(false);
  const [registrationsError, setRegistrationsError] = useState(null);
  const [eventRegistrationCounts, setEventRegistrationCounts] = useState({});
  const [eventEmailResults, setEventEmailResults] = useState([]);
  const [eventEmailSearchLoading, setEventEmailSearchLoading] = useState(false);
  const [eventEmailSearchError, setEventEmailSearchError] = useState(null);

  // User display name
  const userName = currentUser?.f_name
    ? `${currentUser.f_name} ${currentUser.l_name || ''}`.trim()
    : currentUser?.name || currentUser?.email?.split('@')[0] || 'Admin';

  // ------------------------------------------------------------------
  // 2. Derived data & memoisation
  // ------------------------------------------------------------------
  const getCurrentData = useCallback(() => {
    switch (activeFilter) {
      case 'Projects':   return projects;
      case 'Articles':   return articles;
      case 'Blogs':      return blogs;
      case 'Events':     return events;
      case 'Webinar':    return webinars;
      case 'Courses':    return courses || [];
      case 'Gallery':    return gallery || [];
      case 'Volunteers': return volunteers;
      default:           return [];
    }
  }, [activeFilter, projects, articles, blogs, events, webinars, courses, gallery, volunteers]);

  const shouldSearchEventsByEmail = activeFilter === 'Events' && isEmailSearch(searchQuery);

  const filteredData = useMemo(() => {
    const data = getCurrentData();
    if (shouldSearchEventsByEmail) return eventEmailResults;
    if (!Array.isArray(data) || !searchQuery.trim()) return data;
    const q = searchQuery.toLowerCase();
    return data.filter((item) => {
      switch (activeFilter) {
        case 'Projects':
          return (item.name || item.title)?.toLowerCase().includes(q);
        case 'Articles':
          return item.title?.toLowerCase().includes(q) || item.author?.toLowerCase().includes(q);
        case 'Blogs':
          return item.title?.toLowerCase().includes(q) || item.author?.toLowerCase().includes(q);
        case 'Events':
          return item.event_name?.toLowerCase().includes(q);
        case 'Webinar':
          return item.title?.toLowerCase().includes(q);
        case 'Courses':
          return (
            item.course_title?.toLowerCase().includes(q) ||
            item.title?.toLowerCase().includes(q) ||
            item.caption?.toLowerCase().includes(q) ||
            item.category?.toLowerCase().includes(q) ||
            item.link?.toLowerCase().includes(q) ||
            (Array.isArray(item.tags) ? item.tags.join(' ') : item.tags || '').toLowerCase().includes(q)
          );
        case 'Gallery':
          return item.title?.toLowerCase().includes(q) || item.caption?.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
        case 'Volunteers':
          return (
            `${item.f_name} ${item.l_name}`.toLowerCase().includes(q) ||
            item.email?.toLowerCase().includes(q)
          );
        default:
          return true;
      }
    });
  }, [activeFilter, searchQuery, getCurrentData, shouldSearchEventsByEmail, eventEmailResults]);

  useEffect(() => {
    if (!shouldSearchEventsByEmail) {
      setEventEmailResults([]);
      setEventEmailSearchLoading(false);
      setEventEmailSearchError(null);
      return;
    }

    let cancelled = false;
    const email = searchQuery.trim();

    setEventEmailSearchLoading(true);
    setEventEmailSearchError(null);

    const timeoutId = setTimeout(async () => {
      try {
        const result = await eventAPI.getUserEvents(email);
        if (cancelled) return;

        const userEvents = extractArrayFromResponse(result, [
          'events',
          'registered_events',
          'registeredEvents',
          'data',
          'items',
          'results',
        ]);
        setEventEmailResults(userEvents);
      } catch (error) {
        if (cancelled) return;
        setEventEmailResults([]);
        setEventEmailSearchError(error.message || 'Failed to find events for this email');
      } finally {
        if (!cancelled) setEventEmailSearchLoading(false);
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [shouldSearchEventsByEmail, searchQuery]);

  useEffect(() => {
    if (activeFilter !== 'Events' || !Array.isArray(events) || events.length === 0) {
      setEventRegistrationCounts({});
      return;
    }

    const fetchRegistrationCounts = async () => {
      const counts = {};
      await Promise.all(
        events.map(async (event) => {
          const id = event._id || event.id;
          if (!id) return;
          try {
            const result = await eventAPI.getEventRegistrations(id);
            const registrations = Array.isArray(result)
              ? result
              : result.registrations || result.data || [];
            counts[id] = Array.isArray(registrations) ? registrations.length : 0;
          } catch {
            counts[id] = 0;
          }
        })
      );
      setEventRegistrationCounts(counts);
    };

    fetchRegistrationCounts();
  }, [activeFilter, events]);

  const handleOpenEventRegistrations = async (event) => {
    const id = event._id || event.id;
    if (!id) return;

    setSelectedEvent(event);
    setRegistrationModalOpen(true);
    setRegistrationsLoading(true);
    setRegistrationsError(null);

    try {
      const result = await eventAPI.getEventRegistrations(id);
      const registrations = Array.isArray(result)
        ? result
        : result.registrations || result.data || [];
      setSelectedEventRegistrations(Array.isArray(registrations) ? registrations : []);
    } catch (error) {
      setRegistrationsError(error.message || 'Failed to load registrations');
      setSelectedEventRegistrations([]);
    } finally {
      setRegistrationsLoading(false);
    }
  };

  const handleCloseRegistrationsModal = () => {
    setRegistrationModalOpen(false);
    setSelectedEvent(null);
    setSelectedEventRegistrations([]);
    setRegistrationsError(null);
  };

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
    return await dashboardCreateItem(payload, activeFilter, currentUser);
  };

  const updateItem = async (id, payload) => {
    return await dashboardUpdateItem(id, payload, activeFilter, currentUser);
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
        case 'Articles':   await articleAPI.deleteArticle(id); break;
        case 'Blogs':      await blogAPI.deleteBlog(id); break;
        case 'Events':     await eventAPI.deleteEvent(id); break;
        case 'Webinar':    await webinarAPI.deleteWebinar(id); break;
        case 'Courses':    await courseAPI.deleteCourse(id); break;
        case 'Gallery':    await galleryAPI.deleteImage(id); break;
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
        toast.success(`${getResourceLabel(activeFilter)} created`);
      } else {
        const id = currentItem?.id || currentItem?._id;
        if (!id) throw new Error('Item ID missing');

        const prevStatus = normalizeStatus(currentItem?.status);
        const newStatus = normalizeStatus(payload.status);
        const statusChanged = prevStatus !== newStatus;
        const usesStatusEndpoint = activeFilter === 'Projects' || activeFilter === 'Blogs';
        const updatePayload = usesStatusEndpoint && statusChanged ? omitStatus(payload) : payload;

        await updateItem(id, updatePayload);

        if (usesStatusEndpoint && statusChanged) {
          if (activeFilter === 'Projects') {
            if (newStatus === 'published') {
              await projectAPI.publishProject(id);
            } else if (isArchiveStatus(newStatus)) {
              await projectAPI.archiveProject(id);
            }
          }

          if (activeFilter === 'Blogs') {
            if (newStatus === 'published') {
              await blogAPI.publishBlog(id);
            } else if (isArchiveStatus(newStatus)) {
              await blogAPI.archiveBlog(id);
            }
          }
        }

        toast.success(`${getResourceLabel(activeFilter)} updated`);
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
                volunteers={volunteers}
                volunteersCount={volunteers.length}
                articlesCount={articles.length}
                blogsCount={blogs.length}
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
                searchLoading={eventEmailSearchLoading}
                searchError={eventEmailSearchError}
                searchHint={
                  activeFilter === 'Events'
                    ? 'Search by event name, or enter a user email to view their registered events.'
                    : null
                }
              />
              {eventEmailSearchLoading ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-200 text-[#FD90A7]">
                  Searching registered events...
                </div>
              ) : (
                <DataTable
                  data={filteredData}
                  activeFilter={activeFilter}
                  onEdit={openEditModal}
                  onDelete={handleDeleteClick} // custom confirm
                  onVolunteerStatusUpdate={handleVolunteerStatusUpdate}
                  onEventRegistrationsClick={handleOpenEventRegistrations}
                  eventRegistrationCounts={eventRegistrationCounts}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Event Registrations Modal */}
      {registrationModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleCloseRegistrationsModal}
        >
          <div
            className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 border-b border-gray-200/60 bg-white/80 backdrop-blur-md rounded-t-2xl">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Registrations for {selectedEvent?.event_name || selectedEvent?.name || 'Event'}</h2>
                <div className="w-12 h-1 bg-linear-to-r from-[#FD90A7] to-[#C7365B] mt-1 rounded-full" />
                <p className="mt-2 text-sm text-gray-500">{selectedEventRegistrations.length} users registered</p>
              </div>
              <button
                onClick={handleCloseRegistrationsModal}
                aria-label="Close registrations modal"
                className="p-2 rounded-lg hover:bg-gray-100 transition text-gray-400 hover:text-gray-700"
              >
                &#10005;
              </button>
            </div>
            <div className="px-6 py-6">
              {registrationsLoading ? (
                <div className="text-center py-12 text-[#FD90A7]">Loading registrations...</div>
              ) : registrationsError ? (
                <div className="text-center py-12 text-red-500">{registrationsError}</div>
              ) : selectedEventRegistrations.length === 0 ? (
                <div className="text-center py-12 text-[#A19390]">No registrations yet.</div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <table className="min-w-full w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">First Name</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Name</th>
                        <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedEventRegistrations.map((registration, index) => {
                        const firstName = registration.f_name || registration.first_name || '';
                        const lastName = registration.l_name || registration.last_name || '';
                        return (
                          <tr key={registration.id || registration._id || index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-sm text-gray-700">{firstName || '—'}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{lastName || '—'}</td>
                            <td className="px-4 py-3 text-sm text-gray-700">{registration.email || '—'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
