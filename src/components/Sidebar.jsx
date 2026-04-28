import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Briefcase, HelpCircle, Users, Settings, FileQuestion, MessageCircle, LogOut } from 'lucide-react'
import toast from 'react-hot-toast'

const Sidebar = ({ userRole }) => {
  const navigate = useNavigate()

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'manager', 'user'] },
    { path: '/jobs', icon: Briefcase, label: 'Job Tracker', roles: ['admin', 'manager', 'user'] },
    { path: '/team', icon: Users, label: 'Team', roles: ['admin', 'manager'] },
    { path: '/faq', icon: FileQuestion, label: 'FAQ', roles: ['admin', 'manager', 'user'] },
    { path: '/help', icon: MessageCircle, label: 'Support', roles: ['admin', 'manager', 'user'] },
    { path: '/profile', icon: Settings, label: 'Settings', roles: ['admin', 'manager', 'user'] },
  ]

  const filteredMenu = menuItems.filter(item => item.roles.includes(userRole || 'user'))

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen sticky top-16 flex flex-col">
      <nav className="p-4 space-y-2 flex-1">
        {filteredMenu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Logout Button at Bottom of Sidebar */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar