import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    let intervalId;

    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/tasks/stats');
        setStats(data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    if (user) {
      fetchStats(); // initial fetch
      intervalId = setInterval(fetchStats, 5000); // fetch every 5 seconds
    }

    return () => clearInterval(intervalId); // clear interval on unmount
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Total Tasks</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{stats.totalTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Completed</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{stats.completedTasks}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">Pending</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">{stats.pendingTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
