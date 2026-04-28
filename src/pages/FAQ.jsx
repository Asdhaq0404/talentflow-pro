import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [openIndex, setOpenIndex] = useState(null)
  const [user] = useState({ name: 'John Doe' })

  const faqs = [
    {
      question: "How do I add a new job application?",
      answer: "Click on the 'Job Tracker' tab in the sidebar, then click the 'Add Job' button. Fill in the job details including title, company, status, and any notes. The job will appear in your Kanban board."
    },
    {
      question: "How does the AI Resume Tailoring work?",
      answer: "Our AI analyzes job descriptions and your resume to suggest keywords and formatting improvements. Paste both texts into the AI Tool section, and our algorithm will provide tailored suggestions."
    },
    {
      question: "Can I collaborate with team members?",
      answer: "Yes! The Team feature allows you to invite colleagues, share job applications, and assign tasks. Upgrade to the Team plan for collaboration features."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely! We use industry-standard encryption for all data. Your information is stored locally in your browser by default, with optional cloud backup available."
    },
    {
      question: "How do I export my application data?",
      answer: "Go to Settings → Data Export. You can export your job tracking data as CSV, JSON, or PDF format for reporting purposes."
    },
    {
      question: "What's the difference between statuses?",
      answer: "Wishlist (jobs you're interested in), Applied (applications sent), Interview (scheduled interviews), Offer (received offers), Rejected (applications that didn't proceed)."
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar user={user} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Find answers to common questions about TalentFlow Pro</p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* FAQ Cards */}
            <div className="max-w-3xl mx-auto space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white text-left">
                      {faq.question}
                    </span>
                    {openIndex === index ? <ChevronUp className="w-5 h-5 text-purple-500" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-4"
                      >
                        <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Help Section */}
            <div className="max-w-3xl mx-auto mt-12 p-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl text-center">
              <HelpCircle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Still have questions?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Can't find what you're looking for? Our support team is here to help.</p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition">
                Contact Support
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default FAQ