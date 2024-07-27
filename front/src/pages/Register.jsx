import React, { useState } from 'react';
import api from '../api'; // Assuming you have an API client named 'api'
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/register/', {
        username,
        email,
        password,
      });
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed. Please try again.');
      setSuccess('');
    }
};

  return (
    <div className="register-container flex items-center justify-center h-screen bg-gray-100">
      <div className="register-form w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="image-container flex justify-center mb-4">
          <img src={'/Login.jpeg'} alt="Registration" className="h-auto w-auto max-w-full max-h-48 object-cover rounded" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Register
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </div>
    </div>

  );
}

export default Register;
