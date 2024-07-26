import React, { useState } from 'react'
import api from '../api'

function FlightStatus() {
  const [flightId, setFlightId] = useState('')
  const [flightStatus, setFlightStatus] = useState(null)
  const [error, setError] = useState('')

  const fetchFlightStatus = async () => {
    try {
      const response = await api.get(`/status/${flightId}`)
      setFlightStatus(response.data)
      setError('')
    } catch (error) {
      console.error('Error fetching flight status:', error)
      setError('Failed to fetch flight status. Please try again.')
      setFlightStatus(null)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Check Flight Status</h2>
        <input
          type="text"
          placeholder="Enter Flight ID"
          value={flightId}
          onChange={(e) => setFlightId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={fetchFlightStatus}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Check Status
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {flightStatus && (
          <div className="mt-4">
            <p><strong>Status:</strong> {flightStatus.status}</p>
            <p><strong>Gate:</strong> {flightStatus.gate}</p>
            <p><strong>Delay:</strong> {flightStatus.delay} minutes</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FlightStatus
