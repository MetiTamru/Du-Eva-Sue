import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';


function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setUser } = useAuth();

  const handleLogout = () => {
    
    
      setUser({ email: '', role: '', name: '' });
      localStorage.removeItem('user');
      window.location.href= "/log-in"
   console.log(email)
  
    // Remove tokens and user data from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('name');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Log out button */}
      <button
        onClick={handleLogout}
        className="w-1/4 bg-red-500 text-white py-2 rounded-full text-lg font-semibold hover:bg-red-700 transition"
      >
        Log Out
      </button>
    </div>
  );
}

export default HomePage;
