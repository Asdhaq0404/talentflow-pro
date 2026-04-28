import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, Clock, Send, LifeBuoy, BookOpen, Video } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import toast from 'react-hot-toast'

const Help = () => {
  const [user] = useState({ name: 'John Doe' })
  const [ticket, setTicket] = useState({ subject: '', message: '' })

  const handleSubmitTicket = (e) => {
    e.preventDefault()
    if (!ticket.subject || !ticket.message) {
      toast.error('Please fill in all fields')
      return
    }
    toast.success('Support ticket submitted! We\'ll respond within 24 hours.')
    setTicket({ subject: '', message: '' })
  }

  const supportOptions = [
    { icon: MessageCircle, title: 'Live Chat', description: 'Chat with support instantly', action: 'Start Chat', color: 'from-purple-500 to-pink-500' },
    { icon: Mail, title: 'Email Support', description: 'Get response within 24h', action: 'Send Email', color: 'from-blue-500 to-cyan-500' },
    { icon: Phone, title: 'Phone Support', description: 'Call us 24/7', action: 'Call Now', color: 'from-green-500 to-emerald-500' },
    { icon: BookOpen, title: 'Documentation', description: 'Read our guides', action: 'Browse Docs', color: 'from-orange-500 to-red-500' },
    { icon: Video, title: 'Video Tutorials', description: 'Watch step-by-step guides', action: 'Watch Now', color: 'from-indigo-500 to-purple-500' },
    { icon: LifeBuoy, title: 'Community Forum', description: 'Ask the community', action: 'Join Forum', color: 'from-teal-500 to-green-500' },
  ]

  return (
   <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Help & Support Center
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">How can we help you today?</p>
            </div>

            {/* Support Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center cursor-pointer"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${option.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{option.description}</p>
                  <button className="text-purple-600 font-semibold hover:text-purple-700">{option.action} →</button>
                </motion.div>
              ))}
            </div>

            {/* Submit Ticket Form */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Send className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Submit a Support Ticket</h2>
                </div>
                <form onSubmit={handleSubmitTicket}>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={ticket.subject}
                    onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                    className="w-full p-3 mb-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                  />
                  <textarea
                    placeholder="Describe your issue in detail..."
                    rows="5"
                    value={ticket.message}
                    onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                    className="w-full p-3 mb-4 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700"
                  />
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
                    Submit Ticket
                  </button>
                </form>
              </div>

              {/* Response Time */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Average response time: 2-4 hours</span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default Help