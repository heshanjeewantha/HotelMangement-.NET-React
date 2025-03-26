import { Link } from 'react-router-dom';
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

function Navbar({ isAuthenticated, userRole, handleLogout }) {
  return (
    <nav className="bg-amber-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ARALU</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link> 
          {isAuthenticated ? (
            <>
              {userRole === 'Admin' && <Link to="/admin-dashboard" className="hover:text-gray-300">Admin Dashboard</Link>}
              {userRole === 'User' && <Link to="/user-dashboard" className="hover:text-gray-300">User Dashboard</Link>}
              <button onClick={handleLogout} className="flex items-center hover:text-gray-300">
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;