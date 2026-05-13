/**
 * Application-wide constants
 */

// Color Palette
export const COLORS = {
  PRIMARY: '#FD90A7',
  PRIMARY_DARK: '#f77997',
  PRIMARY_LIGHT: '#FD90A7',
  TEXT_PRIMARY: '#1D2130',
  TEXT_SECONDARY: '#525560',
  TEXT_TERTIARY: '#9B9CA3',
  BG_LIGHT: '#F5F5F5',
  BG_WHITE: '#FFFFFF',
  BORDER: '#E8E8EB',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
};

// Status Badges
export const STATUS_CONFIG = {
  active: { label: 'Active', className: 'bg-green-100 text-green-700' },
  completed: { label: 'Completed', className: 'bg-blue-100 text-blue-700' },
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-700' },
  postponed: { label: 'Postponed', className: 'bg-orange-100 text-orange-700' },
  draft: { label: 'Draft', className: 'bg-gray-100 text-gray-600' },
  published: { label: 'Published', className: 'bg-purple-100 text-purple-700' },
  approved: { label: 'Approved', className: 'bg-green-100 text-green-700' },
  rejected: { label: 'Rejected', className: 'bg-red-100 text-red-700' },
};

// Pagination
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  DASHBOARD_ITEMS_PER_PAGE: 5,
  PREVIEW_ITEMS: 3,
};

// API Endpoints (relative to base URL)
export const API_ENDPOINTS = {
  // Auth
  ADMIN_LOGIN: '/auth/admin/signin',
  USER_LOGIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  
  // Admin/User Info
  ADMIN_ME: '/admin/me',
  USER_ME: '/auth/me',
  
  // Resources
  PROJECTS: '/projects',
  EVENTS: '/events',
  BLOGS: '/blogs',
  WEBINARS: '/webinars',
  VOLUNTEERS: '/volunteers',
  GALLERY: '/gallery',
  
  // Admin
  USERS: '/roles/users',
  ROLES: '/roles',
};

// Toast Messages
export const TOAST_MESSAGES = {
  SUCCESS: {
    CREATE: 'Created successfully!',
    UPDATE: 'Updated successfully!',
    DELETE: 'Deleted successfully!',
    SAVED: 'Changes saved!',
  },
  ERROR: {
    CREATE: 'Failed to create. Please try again.',
    UPDATE: 'Failed to update. Please try again.',
    DELETE: 'Failed to delete. Please try again.',
    LOAD: 'Failed to load data. Please refresh.',
    VALIDATION: 'Please check your input and try again.',
  },
};

// Form Validation Rules
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_CONTENT_LENGTH: 10,
  MIN_DESCRIPTION_LENGTH: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
};

// Loading States
export const LOADING_STATE = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
};

// Data Table Columns Configuration
export const TABLE_COLUMNS = {
  PROJECTS: ['Name', 'Status', 'Date', 'Actions'],
  ARTICLES: ['Title', 'Author', 'Date', 'Actions'],
  EVENTS: ['Name', 'Date', 'Location', 'Actions'],
  WEBINARS: ['Title', 'Host', 'Date', 'Actions'],
  VOLUNTEERS: ['Name', 'Email', 'Phone', 'Status', 'Actions'],
};
