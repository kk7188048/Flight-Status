import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function FlightStatus() {
  const [flightId, setFlightId] = useState('')
  const [status, setStatus] = useState('')
  const [gate, setGate] = useState('')
  const [delay, setDelay] = useState('')
  const [flightInfo, setFlightInfo] = useState(null)
  const [error, setError] = useState('')
  const [realTimeUpdate, setRealTimeUpdate] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws')

    ws.onopen = () => {
      console.log('WebSocket connection opened')
    }

    ws.onmessage = (event) => {
      console.log('Received message:', event.data)
      setRealTimeUpdate(event.data)
    }

    ws.onclose = (event) => {
      console.log('WebSocket connection closed', event)
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      console.log('Error event details:', error)
    }

    return () => {
      ws.close()
    }
  }, [])

  const handleGetFlightStatus = async () => {
    if (!flightId) {
      setError('Please enter a Flight ID.')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8000/status/${flightId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setFlightInfo(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching flight status:', error)
      setError('Error fetching flight status. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddOrUpdateFlightStatus = async (e) => {
    e.preventDefault()
    if (!flightId) {
      setError('Please enter a Flight ID.')
      return
    }

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      const response = await axios.post(
        'http://localhost:8000/status/',
        { flight_id: flightId, status, gate, delay },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      )
      setFlightInfo(response.data)
      setError('')
    } catch (error) {
      console.error('Error adding or updating flight status:', error)
      setError('Error adding or updating flight status. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Flight Status</h1>
      {realTimeUpdate && <p className="text-blue-500 text-lg mb-4">{realTimeUpdate}</p>}
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4">Add/Update Flight Status</h2>
        <form onSubmit={handleAddOrUpdateFlightStatus}>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Flight ID</label>
              <input
                type="text"
                placeholder="Enter Flight ID"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gate</label>
              <input
                type="text"
                value={gate}
                onChange={(e) => setGate(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Delay (minutes)</label>
              <input
                type="number"
                value={delay}
                onChange={(e) => setDelay(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Add/Update Flight Status'}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Check Flight Status</h2>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Enter Flight ID"
            value={flightId}
            onChange={(e) => setFlightId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <button
            onClick={handleGetFlightStatus}
            className="py-3 px-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Flight Status'}
          </button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {flightInfo && (
          <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold mb-2">Flight Information</h3>
            <p><strong>Flight ID:</strong> {flightInfo.flight_id}</p>
            <p><strong>Status:</strong> {flightInfo.status}</p>
            <p><strong>Gate:</strong> {flightInfo.gate}</p>
            <p><strong>Delay:</strong> {flightInfo.delay} minutes</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlightStatus
