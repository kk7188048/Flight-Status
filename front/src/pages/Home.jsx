import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Flight Status</h1>
        <Link to="/status" className="text-blue-500 underline">
          Check Flight Status
        </Link>
      </div>
    </div>
  )
}

export default Home
