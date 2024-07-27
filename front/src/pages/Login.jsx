import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        '/login',
        new URLSearchParams({ username, password }), // Send form data
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } // Set content type
      );
      localStorage.setItem('token', response.data.access_token);
      navigate('/status');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please check your username and password.');
    }
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="login-form w-full max-w-md p-8 rounded-md shadow-md bg-white flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <div className="image-container flex justify-center mb-4">
          <img src={'/Login.jpeg'} alt="Login" className="h-auto w-auto max-w-full max-h-48 object-cover rounded" />
        </div>
        <form onSubmit={handleLogin} className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-center bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
