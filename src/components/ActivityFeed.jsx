import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, FileText, Calendar, Award, Clock } from 'lucide-react'

const ActivityFeed = () => {
  const activities = [
    { id: 1, type: 'applied', title: 'Applied to Google', description: 'Senior Frontend Developer', time: '2 hours ago', icon: FileText, color: 'blue' },
    { id: 2, type: 'interview', title: 'Interview Scheduled', description: 'Microsoft - Technical Round', time: '5 hours ago', icon: Calendar, color: 'yellow' },
    { id: 3, type: 'offer', title: 'Offer Received!', description: 'Amazon - Frontend Engineer', time: '1 day ago', icon: Award, color: 'green' },
    { id: 4, type: 'status', title: 'Status Updated', description: 'Apple application moved to Interview', time: '2 days ago', icon: CheckCircle, color: 'purple' },
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      yellow: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div className={`p-2 rounded-xl ${getColorClasses(activity.color)}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 dark:text-white">{activity.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default ActivityFeed