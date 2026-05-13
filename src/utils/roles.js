// Role hierarchy and permissions

export const ROLES = {
  ADMIN: 'admin',
  VOLUNTEER: 'volunteer',
  MEMBER: 'member',
  SUPERADMIN: 'superadmin',
};

// Permissions map
const PERMISSIONS = {
  [ROLES.SUPERADMIN]: [
    'view_user_stats',
    'manage_roles',
    'view_activity_logs',
    'manage_content',
    'view_all_dashboard',
  ],
  [ROLES.ADMIN]: [
    'view_user_stats',
    'manage_roles',
    'view_activity_logs',
    'manage_content',
    'view_all_dashboard',
  ],
  [ROLES.VOLUNTEER]: [
    'view_assigned_tasks',
    'view_events',
    'participate_events',
    'view_basic_stats',
  ],
  [ROLES.MEMBER]: [
    'view_profile',
    'view_general_content',
    'attend_events',
  ],
};

export const hasPermission = (role, permission) => {
  return PERMISSIONS[role]?.includes(permission) || false;
};

export const can = (user, permission) => {
  if (!user) return false;
  return hasPermission(user.role, permission);
};