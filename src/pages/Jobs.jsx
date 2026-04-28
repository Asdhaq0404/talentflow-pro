import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, Plus, Search, Filter, Trash2, Edit2, Eye, X,
  Calendar, Building, MapPin, DollarSign, Star, Clock,
  CheckCircle, XCircle, AlertCircle, ChevronRight, ArrowLeft
} from 'lucide-react'
import toast from 'react-hot-toast'

const Jobs = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [userData, setUserData] = useState({ name: '', role: '' })
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showJobDetails, setShowJobDetails] = useState(null)
  const [newJob, setNewJob] = useState({ title: '', company: '', status: 'applied', date: '', notes: '', salary: '', location: '' })

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated')
    if (!isAuth || isAuth !== 'true') {
      navigate('/login')
      return
    }
    
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }
    
    // Get status filter from URL if present
    const params = new URLSearchParams(location.search)
    const statusParam = params.get('status')
    if (statusParam && ['wishlist', 'applied', 'interview', 'offer', 'rejected'].includes(statusParam)) {
      setStatusFilter(statusParam)
    }
    
    const savedJobs = localStorage.getItem('jobs')
    if (savedJobs) {
      const parsed = JSON.parse(savedJobs)
      setJobs(parsed)
      applyFilters(parsed, searchTerm, statusParam || statusFilter)
    } else {
      // Sample jobs
      const sampleJobs = [
        { id: 1, title: 'Senior Frontend Developer', company: 'Google', status: 'interview', date: '2024-01-15', notes: 'Technical round scheduled', appliedDate: '2024-01-10', salary: '$150k - $180k', location: 'Mountain View, CA', logo: 'G' },
        { id: 2, title: 'Full Stack Engineer', company: 'Microsoft', status: 'applied', date: '2024-01-18', notes: 'Application submitted', appliedDate: '2024-01-18', salary: '$140k - $170k', location: 'Redmond, WA', logo: 'M' },
        { id: 3, title: 'React Developer', company: 'Meta', status: 'offer', date: '2024-01-20', notes: 'Received offer!', appliedDate: '2024-01-05', salary: '$160k - $190k', location: 'Menlo Park, CA', logo: 'M' },
        { id: 4, title: 'Software Engineer', company: 'Amazon', status: 'rejected', date: '2024-01-12', notes: 'Rejected after OA', appliedDate: '2024-01-08', salary: '$130k - $160k', location: 'Seattle, WA', logo: 'A' },
        { id: 5, title: 'UI Engineer', company: 'Apple', status: 'wishlist', date: '2024-01-22', notes: 'Researching', appliedDate: '2024-01-22', salary: '$155k - $185k', location: 'Cupertino, CA', logo: 'A' },
        { id: 6, title: 'DevOps Engineer', company: 'Netflix', status: 'applied', date: '2024-01-19', notes: 'Under review', appliedDate: '2024-01-19', salary: '$170k - $200k', location: 'Los Gatos, CA', logo: 'N' },
        { id: 7, title: 'Technical Lead', company: 'Spotify', status: 'interview', date: '2024-01-21', notes: 'First round tomorrow', appliedDate: '2024-01-15', salary: '$145k - $175k', location: 'New York, NY', logo: 'S' },
      ]
      setJobs(sampleJobs)
      localStorage.setItem('jobs', JSON.stringify(sampleJobs))
      applyFilters(sampleJobs, searchTerm, statusParam || statusFilter)
    }
  }, [navigate, location])

  const applyFilters = (jobList, search, status) => {
    let filtered = [...jobList]
    if (search) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (status && status !== 'all') {
      filtered = filtered.filter(job => job.status === status)
    }
    setFilteredJobs(filtered)
  }

  useEffect(() => {
    applyFilters(jobs, searchTerm, statusFilter)
  }, [searchTerm, statusFilter, jobs])

  const handleAddJob = () => {
    if (!newJob.title || !newJob.company) {
      toast.error('Please fill in title and company')
      return
    }
    const jobWithId = { 
      ...newJob, 
      id: Date.now(), 
      appliedDate: new Date().toISOString().split('T')[0],
      logo: newJob.company.charAt(0)
    }
    const updatedJobs = [jobWithId, ...jobs]
    setJobs(updatedJobs)
    localStorage.setItem('jobs', JSON.stringify(updatedJobs))
    setNewJob({ title: '', company: '', status: 'applied', date: '', notes: '', salary: '', location: '' })
    setShowAddModal(false)
    toast.success('Job added successfully!')
  }

  const deleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      const updatedJobs = jobs.filter(job => job.id !== id)
      setJobs(updatedJobs)
      localStorage.setItem('jobs', JSON.stringify(updatedJobs))
      toast.success('Job deleted')
      setShowJobDetails(null)
    }
  }

  const updateJobStatus = (id, newStatus) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    )
    setJobs(updatedJobs)
    localStorage.setItem('jobs', JSON.stringify(updatedJobs))
    toast.success(`Job moved to ${newStatus}`)
    setShowJobDetails(null)
  }

  const getStatusColor = (status) => {
    const colors = {
      wishlist: { bg: '#f3e8ff', text: '#9333ea', icon: '⭐', border: '#e9d5ff' },
      applied: { bg: '#dbeafe', text: '#2563eb', icon: '📧', border: '#bfdbfe' },
      interview: { bg: '#fef3c7', text: '#d97706', icon: '🎯', border: '#fde68a' },
      offer: { bg: '#d1fae5', text: '#059669', icon: '🎉', border: '#a7f3d0' },
      rejected: { bg: '#fee2e2', text: '#dc2626', icon: '❌', border: '#fecaca' }
    }
    return colors[status] || colors.applied
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    toast.success('Logged out')
    navigate('/login')
  }

  const statusOptions = [
    { value: 'all', label: 'All Jobs', icon: '📋' },
    { value: 'wishlist', label: 'Wishlist', icon: '⭐' },
    { value: 'applied', label: 'Applied', icon: '📧' },
    { value: 'interview', label: 'Interview', icon: '🎯' },
    { value: 'offer', label: 'Offer', icon: '🎉' },
    { value: 'rejected', label: 'Rejected', icon: '❌' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #f3e8ff 0%, #e0e7ff 50%, #fce7f3 100%)',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              background: `rgba(118, 75, 162, ${Math.random() * 0.2})`,
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.5, 0] }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          padding: '16px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          borderBottom: '1px solid rgba(118,75,162,0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <motion.div 
            whileHover={{ rotate: 360 }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '10px',
              borderRadius: '14px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            <Briefcase style={{ color: 'white', width: '24px', height: '24px' }} />
          </motion.div>
          <div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TalentFlow Pro
            </span>
            <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Job Tracker</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: 'bold', margin: 0, color: '#1f2937' }}>{userData.name}</p>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>{userData.role}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px'
            }}
          >
            Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Job Applications
              </h1>
              <p style={{ color: '#6b7280', marginTop: '4px' }}>Track and manage all your job applications</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102,126,234,0.3)'
              }}
            >
              <Plus size={18} /> Add New Job
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            padding: '20px',
            marginBottom: '24px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '16px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#764ba2'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {statusOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '30px',
                    border: statusFilter === opt.value ? 'none' : '1px solid #e5e7eb',
                    background: statusFilter === opt.value ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
                    color: statusFilter === opt.value ? 'white' : '#374151',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{opt.icon}</span> {opt.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'white',
              borderRadius: '28px',
              padding: '60px 20px',
              textAlign: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>📭</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>No jobs found</h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              {searchTerm ? 'Try a different search term' : 'Click "Add New Job" to get started'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '30px',
                  cursor: 'pointer'
                }}
              >
                + Add Your First Job
              </button>
            )}
          </motion.div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredJobs.map((job, index) => {
              const statusStyle = getStatusColor(job.status)
              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  onClick={() => setShowJobDetails(job)}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '20px 24px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: '1px solid rgba(0,0,0,0.03)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        background: statusStyle.bg,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '22px',
                        fontWeight: 'bold'
                      }}>
                        {job.logo}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{job.title}</h3>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Building size={14} /> {job.company}
                          </span>
                          {job.location && (
                            <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={14} /> {job.location}
                            </span>
                          )}
                          {job.salary && (
                            <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <DollarSign size={14} /> {job.salary}
                            </span>
                          )}
                          <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} /> Applied: {job.appliedDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{
                        background: statusStyle.bg,
                        color: statusStyle.text,
                        padding: '6px 14px',
                        borderRadius: '30px',
                        fontSize: '12px',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        {statusStyle.icon} {job.status}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteJob(job.id)
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#9ca3af',
                          padding: '6px'
                        }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  {job.notes && (
                    <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '12px', paddingLeft: '66px' }}>
                      📝 {job.notes}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Back to Dashboard Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => navigate('/')}
          style={{
            marginTop: '32px',
            background: 'rgba(255,255,255,0.9)',
            border: '1px solid #e5e7eb',
            padding: '10px 20px',
            borderRadius: '30px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#374151',
            fontSize: '14px'
          }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </motion.button>
      </div>

      {/* Add Job Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'white',
                borderRadius: '32px',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '85vh',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Add New Job</h2>
                  <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
                </div>
                
                <input
                  type="text"
                  placeholder="Job Title *"
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  style={{ width: '100%', padding: '14px', marginBottom: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Company *"
                  value={newJob.company}
                  onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                  style={{ width: '100%', padding: '14px', marginBottom: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '14px' }}
                />
                <select
                  value={newJob.status}
                  onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                  style={{ width: '100%', padding: '14px', marginBottom: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '14px', background: 'white' }}
                >
                  <option value="wishlist">⭐ Wishlist</option>
                  <option value="applied">📧 Applied</option>
                  <option value="interview">🎯 Interview</option>
                  <option value="offer">🎉 Offer</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
                <input
                  type="text"
                  placeholder="Salary Range (e.g., $120k - $150k)"
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  style={{ width: '100%', padding: '14px', marginBottom: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newJob.location}
                  onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                  style={{ width: '100%', padding: '14px', marginBottom: '16px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '14px' }}
                />
                <textarea
                  placeholder="Notes"
                  value={newJob.notes}
                  onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
                  rows="3"
                  style={{ width: '100%', padding: '14px', marginBottom: '24px', border: '2px solid #e5e7eb', borderRadius: '16px', fontSize: '14px' }}
                />
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={handleAddJob}
                    style={{ flex: 1, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '14px', borderRadius: '16px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Add Job
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    style={{ flex: 1, background: '#f3f4f6', color: '#374151', padding: '14px', borderRadius: '16px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Job Details Modal */}
      <AnimatePresence>
        {showJobDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setShowJobDetails(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'white',
                borderRadius: '32px',
                maxWidth: '450px',
                width: '100%'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ padding: '28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{showJobDetails.title}</h2>
                  <button onClick={() => setShowJobDetails(null)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <p><strong>Company:</strong> {showJobDetails.company}</p>
                  <p style={{ marginTop: '8px' }}><strong>Status:</strong> <span style={{ background: getStatusColor(showJobDetails.status).bg, padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{showJobDetails.status}</span></p>
                  {showJobDetails.salary && <p style={{ marginTop: '8px' }}><strong>Salary:</strong> {showJobDetails.salary}</p>}
                  {showJobDetails.location && <p style={{ marginTop: '8px' }}><strong>Location:</strong> {showJobDetails.location}</p>}
                  <p style={{ marginTop: '8px' }}><strong>Applied Date:</strong> {showJobDetails.appliedDate}</p>
                  {showJobDetails.notes && <p style={{ marginTop: '8px' }}><strong>Notes:</strong> {showJobDetails.notes}</p>}
                </div>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
                  {['applied', 'interview', 'offer', 'rejected'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateJobStatus(showJobDetails.id, status)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '12px',
                        border: 'none',
                        background: getStatusColor(status).bg,
                        color: getStatusColor(status).text,
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '12px'
                      }}
                    >
                      Move to {status}
                    </button>
                  ))}
                  <button
                    onClick={() => deleteJob(showJobDetails.id)}
                    style={{ padding: '8px 16px', borderRadius: '12px', border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontWeight: '500', fontSize: '12px' }}
                  >
                    Delete Job
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Jobs