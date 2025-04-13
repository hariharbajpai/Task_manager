import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              TaskWave
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/" className="px-3 py-2 text-gray-700 hover:text-indigo-600">
                  <FiHome className="inline mr-1" /> Home
                </Link>
                <Link to="/dashboard" className="px-3 py-2 text-gray-700 hover:text-indigo-600">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-700 hover:text-indigo-600"
                >
                  <FiLogOut className="inline mr-1" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-3 py-2 text-indigo-600">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {user ? (
              <>
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  <FiHome className="inline mr-2" /> Home
                </Link>
                <Link 
                  to="/dashboard" 
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  <FiLogOut className="inline mr-2" /> Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-4 py-2 text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}