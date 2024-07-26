import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import FlightStatus from './pages/FlightStatus'
import axios from "axios";

// axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/status" element={<FlightStatus />} />
    </Routes>
  )
}

export default App
