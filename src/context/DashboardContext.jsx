import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { fetchDashboardData } from '../utils/dashboardUtils';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const { currentUser } = useUser();
  const [data, setData] = useState({
    projects: [],
    events: [],
    articles: [],
    blogs: [],
    webinars: [],
    volunteers: [],
    courses: [],
    gallery: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const result = await fetchDashboardData();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, [currentUser]);

  return (
    <DashboardContext.Provider value={{ ...data, loading, error, refresh }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardData = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboardData must be used within DashboardProvider');
  return context;
};