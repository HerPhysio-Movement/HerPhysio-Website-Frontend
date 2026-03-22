import React, { createContext, useContext, useState, useEffect } from "react";

const initialUsers = [
  {
    id: 1,
    name: "Antonia Abraham",
    email: "antonia@hpm.org",
    role: "admin",
    joined: "2024-01-15",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "member",
    joined: "2024-02-10",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "volunteer",
    joined: "2024-03-05",
  },
  {
    id: 4,
    name: "Michael Okonkwo",
    email: "michael@example.com",
    role: "member",
    joined: "2024-04-20",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "volunteer",
    joined: "2024-05-12",
  },
  {
    id: 6,
    name: "David Chen",
    email: "david@example.com",
    role: "admin",
    joined: "2024-06-01",
  },
];

const initialLogs = [
  {
    id: 1,
    action: "User registered",
    user: "John Doe",
    timestamp: "2024-10-01 09:30",
    performedBy: "System",
  },
  {
    id: 2,
    action: "Role changed",
    user: "Jane Smith",
    details: "Member → Volunteer",
    timestamp: "2024-10-02 14:15",
    performedBy: "Antonia Abraham",
  },
  {
    id: 3,
    action: "User registered",
    user: "Michael Okonkwo",
    timestamp: "2024-10-03 11:20",
    performedBy: "System",
  },
];

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : initialUsers;
  });
  const [activityLogs, setActivityLogs] = useState(() => {
    const saved = localStorage.getItem("activityLogs");
    return saved ? JSON.parse(saved) : initialLogs;
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("activityLogs", JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  const updateUserRole = (userId, newRole, performedBy) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    const oldRole = user.role;
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));

    const log = {
      id: Date.now(),
      action: "Role changed",
      user: user.name,
      details: `${oldRole} → ${newRole}`,
      timestamp: new Date().toLocaleString(),
      performedBy: performedBy || currentUser?.name,
    };
    setActivityLogs([log, ...activityLogs]);
  };

  const addUserLog = (action, userName, details = "") => {
    const log = {
      id: Date.now(),
      action,
      user: userName,
      details,
      timestamp: new Date().toLocaleString(),
      performedBy: currentUser?.name,
    };
    setActivityLogs([log, ...activityLogs]);
  };

  const login = (email, password) => {
    // Dummy validation – in real app, verify with backend
    const user = users.find((u) => u.email === email);
    if (user && password === "demo") {
      setCurrentUser(user);
      addUserLog("User logged in", user.name);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      addUserLog("User logged out", currentUser.name);
    }
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        activityLogs,
        updateUserRole,
        addUserLog,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
