/**
 * Dashboard Utilities - Handles all dashboard business logic
 * Centralizes API calls, data transformation, and validation
 */

import { extractArrayFromResponse, formatErrorMessage, validateRequired } from './apiHelpers';
import { VALIDATION_RULES, TOAST_MESSAGES } from './constants';
import {
  projectAPI, eventAPI, blogAPI, webinarAPI, volunteerAPI
} from '../services';

/**
 * Fetch all dashboard data with error handling
 * @param {Object} currentUser - Current user object
 * @returns {Promise} - Promise with all data
 */
export const fetchDashboardData = async (currentUser) => {
  if (!currentUser) throw new Error('User not authenticated');

  try {
    const results = await Promise.allSettled([
      projectAPI.getProjects?.() || Promise.resolve({}),
      eventAPI.getAllEvents?.() || Promise.resolve({}),
      blogAPI.getAllBlogsAdmin?.() || Promise.resolve({}),
      webinarAPI.getAllWebinars?.() || Promise.resolve({}),
      volunteerAPI.getAllVolunteers?.() || Promise.resolve({})
    ]);

    return {
      projects: extractArrayFromResponse(results[0].value, ['projects', 'data']),
      events: extractArrayFromResponse(results[1].value, ['events', 'data']),
      articles: extractArrayFromResponse(results[2].value, ['blogs', 'data', 'articles']),
      webinars: extractArrayFromResponse(results[3].value, ['webinars', 'data']),
      volunteers: extractArrayFromResponse(results[4].value, ['volunteers', 'data'])
    };
  } catch (error) {
    console.error('Dashboard data fetch failed:', error);
    throw error;
  }
};

/**
 * Prepare item for API submission based on filter type
 * @param {Object} item - Item data
 * @param {string} filterType - Type of item (Projects, Events, Articles, etc.)
 * @param {Object} currentUser - Current user
 * @returns {Object} - Prepared payload
 */
export const prepareItemPayload = (item, filterType, currentUser) => {
  let payload = { ...item };

  if (filterType === 'Events') {
    // Normalize event time format
    if (payload.event_time && payload.event_time.length === 5) {
      payload.event_time = `${payload.event_time}:00`;
    }
    
    // Handle capacity as number
    if (payload.capacity === '' || payload.capacity === undefined) {
      delete payload.capacity;
    } else {
      payload.capacity = Number(payload.capacity);
    }
    
    // Normalize date format (DD-MM-YYYY to YYYY-MM-DD)
    if (payload.event_date?.includes('-')) {
      const parts = payload.event_date.split('-');
      if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
        payload.event_date = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    
    // Set defaults
    if (!payload.event_host) payload.event_host = 'Her Physio Movement';
    if (!payload.caption) payload.caption = payload.description?.slice(0, 50) || 'Event';
    
    // Validate minimum description length
    if (payload.description && payload.description.length < VALIDATION_RULES.MIN_DESCRIPTION_LENGTH) {
      throw new Error(`Description must be at least ${VALIDATION_RULES.MIN_DESCRIPTION_LENGTH} characters`);
    }
  }

  if (filterType === 'Articles') {
    // Add current user email if not provided
    if (!payload.email && currentUser?.email) {
      payload.email = currentUser.email;
    }
    
    // Validate content length
    if (payload.content && payload.content.length < VALIDATION_RULES.MIN_CONTENT_LENGTH) {
      throw new Error(`Content must be at least ${VALIDATION_RULES.MIN_CONTENT_LENGTH} characters`);
    }
  }

  return payload;
};

/**
 * Validate item data before submission
 * @param {Object} item - Item to validate
 * @param {string} filterType - Type of item
 * @returns {Object} - { isValid: boolean, error: string }
 */
export const validateItemData = (item, filterType) => {
  const requiredFields = {
    Projects: ['title', 'description', 'category'],
    Events: ['event_name', 'event_host', 'caption', 'description', 'event_date', 'event_time', 'venue'],
    Articles: ['author', 'email', 'title', 'content'],
    Webinar: ['title', 'host'],
    Volunteers: ['f_name', 'l_name', 'email', 'p_number', 'motivation_note']
  };

  const required = requiredFields[filterType] || [];
  const validation = validateRequired(item, required);
  
  if (!validation.isValid) {
    return {
      isValid: false,
      error: validation.errors[0]
    };
  }

  return { isValid: true, error: null };
};

/**
 * Create a new item via API
 * @param {Object} item - Item data
 * @param {string} filterType - Type of item
 * @param {Object} currentUser - Current user
 * @returns {Promise} - API response
 */
export const createItem = async (item, filterType, currentUser) => {
  // Validate
  const validation = validateItemData(item, filterType);
  if (!validation.isValid) throw new Error(validation.error);

  // Prepare payload
  const payload = prepareItemPayload(item, filterType, currentUser);

  // Submit to API
  switch (filterType) {
    case 'Projects':
      return await projectAPI.createProject(payload);
    case 'Events':
      return await eventAPI.createEvent(payload);
    case 'Articles':
      return await blogAPI.createBlog(payload);
    case 'Webinar':
      return await webinarAPI.createWebinar(payload);
    case 'Volunteers':
      return await volunteerAPI.signup({ ...payload, role: 'volunteer' });
    default:
      throw new Error(`Unknown item type: ${filterType}`);
  }
};

/**
 * Update an existing item via API
 * @param {string} id - Item ID
 * @param {Object} item - Updated item data
 * @param {string} filterType - Type of item
 * @param {Object} currentUser - Current user
 * @returns {Promise} - API response
 */
export const updateItem = async (id, item, filterType, currentUser) => {
  // Validate
  const validation = validateItemData(item, filterType);
  if (!validation.isValid) throw new Error(validation.error);

  // Prepare payload
  const payload = prepareItemPayload(item, filterType, currentUser);

  // Submit to API
  switch (filterType) {
    case 'Projects':
      return await projectAPI.updateProject(id, payload);
    case 'Events':
      return await eventAPI.updateEvent(id, payload);
    case 'Articles':
      return await blogAPI.updateBlog(id, payload);
    case 'Webinar':
      return await webinarAPI.updateWebinar(id, payload);
    default:
      throw new Error(`Unknown item type: ${filterType}`);
  }
};

/**
 * Delete an item via API
 * @param {string} id - Item ID
 * @param {string} filterType - Type of item
 * @returns {Promise} - API response
 */
export const deleteItem = async (id, filterType) => {
  switch (filterType) {
    case 'Projects':
      return await projectAPI.deleteProject(id);
    case 'Events':
      return await eventAPI.deleteEvent(id);
    case 'Articles':
      return await blogAPI.deleteBlog(id);
    case 'Webinar':
      return await webinarAPI.deleteWebinar(id);
    default:
      throw new Error(`Unknown item type: ${filterType}`);
  }
};

/**
 * Filter data based on search query
 * @param {Array} data - Data to filter
 * @param {string} query - Search query
 * @param {string} filterType - Type of item
 * @returns {Array} - Filtered data
 */
export const filterData = (data, query, filterType) => {
  if (!Array.isArray(data)) return [];
  if (!query.trim()) return data;

  const q = query.toLowerCase();

  return data.filter(item => {
    switch (filterType) {
      case 'Projects':
        return item.name?.toLowerCase().includes(q) || item.title?.toLowerCase().includes(q);
      case 'Articles':
        return item.title?.toLowerCase().includes(q) || item.author?.toLowerCase().includes(q);
      case 'Events':
        return item.event_name?.toLowerCase().includes(q) || item.name?.toLowerCase().includes(q);
      case 'Webinar':
        return item.title?.toLowerCase().includes(q) || item.host?.toLowerCase().includes(q);
      case 'Volunteers':
        return `${item.f_name} ${item.l_name}`.toLowerCase().includes(q) || item.email?.toLowerCase().includes(q);
      default:
        return true;
    }
  });
};

/**
 * Get stats for dashboard summary
 * @param {Object} data - Dashboard data
 * @returns {Object} - Stats object
 */
export const getDashboardStats = (data) => {
  return {
    eventsCount: Array.isArray(data.events) ? data.events.length : 0,
    projectsCount: Array.isArray(data.projects) ? data.projects.length : 0,
    articlesCount: Array.isArray(data.articles) ? data.articles.length : 0,
    webinarsCount: Array.isArray(data.webinars) ? data.webinars.length : 0,
    volunteersCount: Array.isArray(data.volunteers) ? data.volunteers.length : 0,
  };
};
