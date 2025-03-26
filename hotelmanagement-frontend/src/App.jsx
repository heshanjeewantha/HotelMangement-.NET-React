import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar'; // Adjust the path as needed
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import './index.css';  // Import the CSS file


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={isAuthenticated} userRole={userRole} handleLogout={handleLogout} />
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar userRole={userRole} />}
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} /> : <Navigate to="/" />} />
            <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
            <Route path="/admin-dashboard" element={isAuthenticated && userRole === 'Admin' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/user-dashboard" element={isAuthenticated && userRole === 'User' ? <UserDashboard /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;