import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, CheckCircle, Calendar, Award } from 'lucide-react'

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Interview Tomorrow', message: 'Google interview at 2:00 PM', time: '1 hour ago', read: false, icon: Calendar },
    { id: 2, title: 'Application Viewed', message: 'Your Amazon application was viewed', time: '3 hours ago', read: false, icon: CheckCircle },
    { id: 3, title: 'New Job Match', message: 'Senior React Developer position matches your profile', time: '1 day ago', read: true, icon: Award },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map(notification => {
                  const Icon = notification.icon
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!notification.read ? 'bg-purple-50 dark:bg-purple-900/10' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3">
                        <div className={`p-2 rounded-lg ${!notification.read ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                          <Icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{notification.title}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                <button className="text-sm text-purple-600 hover:text-purple-700">View all notifications</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default NotificationBell