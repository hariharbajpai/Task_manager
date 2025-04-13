import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export default function TaskForm({ task, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending'
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate.split('T')[0],
        status: task.status
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 relative">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FiX size={20} />
      </button>
      <h2 className="text-xl font-semibold mb-4">
        {task ? 'Edit Task' : 'Add New Task'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-3 py-2 border rounded-lg"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            className="w-full px-3 py-2 border rounded-lg"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Due Date</label>
          <input
            type="date"
            name="dueDate"
            className="w-full px-3 py-2 border rounded-lg"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Status</label>
          <select
            name="status"
            className="w-full px-3 py-2 border rounded-lg"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Save Task
          </button>
        </div>
      </form>
    </div>
  );
}