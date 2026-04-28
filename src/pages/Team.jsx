import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Team = () => {
  const [user] = useState({ name: 'John Doe' })
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-8">Team Collaboration</h1>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <p>Team features coming soon...</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Team