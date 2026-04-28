import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Briefcase, Bell, LogOut, User, Settings, HelpCircle, Shield, Menu, X } from 'lucide-react'
import NotificationBell from './NotificationBell'

const Navbar = ({ userData, onLogout }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getRoleColor = () => {
    if (userData?.role === 'admin') return 'bg-red-100 text-red-600'
    if (userData?.role === 'manager') return 'bg-yellow-100 text-yellow-600'
    return 'bg-green-100 text-green-600'
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-2">
              <Briefcase className="h-6 w-6 text-white" />
            </motion.div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden sm:inline">
              TalentFlow Pro
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NotificationBell />
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{userData?.name}</p>
                <p className="text-xs text-gray-500">{userData?.role}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {userData?.avatar || userData?.name?.charAt(0) || 'U'}
              </div>
            </div>

            {/* Sign Out Button - VISIBLE */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-200 font-medium"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {userData?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{userData?.name}</p>
                  <p className="text-xs text-gray-500">{userData?.email}</p>
                </div>
              </div>
              
              <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <User size={18} /> Profile
              </Link>
              <Link to="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <Settings size={18} /> Settings
              </Link>
              <Link to="/help" className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
                <HelpCircle size={18} /> Help
              </Link>
              
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg font-medium"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar