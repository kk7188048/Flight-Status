import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/image.png" alt="Logo" className="w-10 h-10 mr-2 rounded-full" />
        <h1 className="text-xl font-bold">Indigo Airlines</h1>
      </div>
      <div className="flex space-x-4">
        <Link to="/status" className="hover:text-gray-200">Flights</Link>
        <Link to="/offers" className="hover:text-gray-200">Offers</Link>
        <Link to="/contact" className="hover:text-gray-200">Contact Us</Link>
      </div>
      <div className="flex space-x-4">
        {!token ? (
          <>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to = "/register">
                Sign Up
                </Link></button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to = "/login">
                Sign In
                </Link></button>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
