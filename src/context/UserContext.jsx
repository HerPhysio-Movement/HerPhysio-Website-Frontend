import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken, removeAuthToken, getAuthToken } from '../services/authAPI';
import { roleAPI } from '../services/roleAPI';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activityLogs, setActivityLogs] = useState([]);
  const [users, setUsers] = useState([]); // for admin overview

  // Load user on mount
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const loadUser = async () => {
        try {
          // Try to fetch as admin first, then as regular user
          let userData;
          try {
            userData = await authAPI.getAdminMe();
          } catch (adminErr) {
            try {
              userData = await authAPI.getUserMe();
            } catch (userErr) {
              console.error('Failed to load user data:', userErr);
              removeAuthToken();
              setIsLoading(false);
              return;
            }
          }
          setCurrentUser(userData);
          // If admin, fetch all users
          if (userData.role === 'admin' || userData.role === 'superadmin') {
            const allUsers = await roleAPI.getAllUsers();
            setUsers(allUsers.users || allUsers || []);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          removeAuthToken();
        } finally {
          setIsLoading(false);
        }
      };
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const addActivityLog = (action, details = '') => {
    const newLog = {
      id: Date.now(),
      action,
      details,
      user: currentUser?.email || 'Unknown',
      timestamp: new Date().toLocaleString(),
      performedBy: currentUser?.email || 'System',
    };
    setActivityLogs((prev) => [newLog, ...prev].slice(0, 50));
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.userLogin({ email, password });
      const token = response.access_token;
      if (token) {
        setAuthToken(token);
        const userData = await authAPI.getUserMe();
        setCurrentUser(userData);
        addActivityLog('User logged in', email);
        return userData;
      }
      throw new Error('No access token received');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const adminLogin = async (email, password) => {
    try {
      const response = await authAPI.adminLogin({ email, password });
      // Backend returns { idToken, refreshToken, expiresIn, admin, message }
      const token = response.idToken || response.access_token;
      if (token) {
        setAuthToken(token);
        // Fetch admin user data
        const adminData = await authAPI.getAdminMe();
        setCurrentUser(adminData);
        // Fetch all users for admin dashboard
        const allUsers = await roleAPI.getAllUsers();
        setUsers(allUsers.users || allUsers || []);
        addActivityLog('Admin logged in', email);
        return adminData;
      }
      throw new Error('No token received from server');
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      await authAPI.userSignup(userData);
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const adminSignup = async (payload) => {
    try {
      const response = await authAPI.adminSignup(payload);
      addActivityLog('Admin account created', payload.email);
      return response;
    } catch (error) {
      console.error('Admin signup failed:', error);
      throw error;
    }
  };

  const promoteUserToAdmin = async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }
    try {
      await roleAPI.promoteUserToAdmin(userId);
      // Refresh users list after promotion
      const allUsers = await roleAPI.getAllUsers();
      setUsers(allUsers.users || allUsers || []);
      addActivityLog('User promoted to admin', `User ID: ${userId}`);
      return true;
    } catch (error) {
      console.error('Promotion failed:', error);
      throw new Error(`Promotion failed: ${error.message}`);
    }
  };

  const logout = () => {
    removeAuthToken();
    setCurrentUser(null);
    setUsers([]);
    setActivityLogs([]);
    addActivityLog('User logged out');
  };

  const value = {
    currentUser,
    isLoading,
    users,
    activityLogs,
    login,
    adminLogin,
    signup,
    adminSignup,
    promoteUserToAdmin,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
