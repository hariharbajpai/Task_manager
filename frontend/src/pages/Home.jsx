import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/api/tasks');
      setTasks(data.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      if (currentTask) {
        await api.put(`/api/tasks/${currentTask._id}`, taskData);
      } else {
        await api.post('/api/tasks', taskData);
      }
      fetchTasks();
      setShowForm(false);
      setCurrentTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Tasks</h1>
          <button
            onClick={() => {
              setCurrentTask(null);
              setShowForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center"
          >
            <FiPlus className="mr-2" /> Add Task
          </button>
        </div>

        {showForm && (
          <TaskForm
            task={currentTask}
            onSave={handleAddTask}
            onCancel={() => {
              setShowForm(false);
              setCurrentTask(null);
            }}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}