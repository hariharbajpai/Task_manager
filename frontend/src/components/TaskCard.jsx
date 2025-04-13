import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-lg shadow-lg p-6 m-4 transform transition-all duration-200 hover:shadow-xl"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.status}
        </span>
      </div>
      <p className="text-gray-600 mt-2">{task.description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(task)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <FiEdit2 />
          </button>
          <button 
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-800"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </motion.div>
  );
}