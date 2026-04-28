import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, Target, Calendar, Award, LogOut, User, Mail, Building, 
  TrendingUp, Clock, Plus, Trash2, CheckCircle, XCircle,
  BarChart3, PieChart, Activity, Zap, Users, Eye, ThumbsUp,
  Sparkles, Rocket, Gift, Bell, MessageCircle, HelpCircle,
  FileText, Settings, LifeBuoy, ChevronRight, DollarSign, MapPin,
  Linkedin, Github, Twitter, ExternalLink, Filter, Search,
  Star, TrendingDown, AlertCircle, CreditCard, Home, Layers
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ name: '', email: '', role: '', department: '', avatar: '' })
  const [jobs, setJobs] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showJobDetails, setShowJobDetails] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showStatsModal, setShowStatsModal] = useState(null)
  const [selectedStat, setSelectedStat] = useState(null)
  const [newJob, setNewJob] = useState({ title: '', company: '', status: 'wishlist', date: '', notes: '', salary: '', location: '' })
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeApplications: 0,
    interviews: 0,
    offers: 0,
    rejected: 0,
    responseRate: 0
  })

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
    
    const savedJobs = localStorage.getItem('jobs')
    if (savedJobs) {
      const parsedJobs = JSON.parse(savedJobs)
      setJobs(parsedJobs)
      updateStats(parsedJobs)
    } else {
      const sampleJobs = [
        { id: 1, title: 'Senior Frontend Developer', company: 'Google', status: 'interview', date: '2024-01-15', notes: 'Technical round scheduled with hiring manager', appliedDate: '2024-01-10', salary: '$150k - $180k', location: 'Mountain View, CA (Remote)', logo: 'G', interviewDate: '2024-01-20', contact: 'recruiter@google.com' },
        { id: 2, title: 'Full Stack Engineer', company: 'Microsoft', status: 'applied', date: '2024-01-18', notes: 'Application submitted via LinkedIn. Waiting for response.', appliedDate: '2024-01-18', salary: '$140k - $170k', location: 'Redmond, WA', logo: 'M', contact: 'careers@microsoft.com' },
        { id: 3, title: 'React Developer', company: 'Meta', status: 'offer', date: '2024-01-20', notes: 'Received offer letter! 30 days to accept.', appliedDate: '2024-01-05', salary: '$160k - $190k + RSU', location: 'Menlo Park, CA', logo: 'F', offerDetails: '$165k base + 200k RSU', contact: 'hiring@meta.com' },
        { id: 4, title: 'Software Engineer', company: 'Amazon', status: 'rejected', date: '2024-01-12', notes: 'Did not proceed after Online Assessment', appliedDate: '2024-01-08', salary: '$130k - $160k', location: 'Seattle, WA', logo: 'A', rejectionReason: 'Position filled internally' },
        { id: 5, title: 'UI Engineer', company: 'Apple', status: 'wishlist', date: '2024-01-22', notes: 'Researching team culture and tech stack', appliedDate: '2024-01-22', salary: '$155k - $185k', location: 'Cupertino, CA', logo: 'A' },
        { id: 6, title: 'DevOps Engineer', company: 'Netflix', status: 'applied', date: '2024-01-19', notes: 'Application under review', appliedDate: '2024-01-19', salary: '$170k - $200k', location: 'Los Gatos, CA', logo: 'N' },
        { id: 7, title: 'Technical Lead', company: 'Spotify', status: 'interview', date: '2024-01-21', notes: 'First round with engineering manager tomorrow', appliedDate: '2024-01-15', salary: '$145k - $175k', location: 'New York, NY', logo: 'S', interviewDate: '2024-01-25' },
        { id: 8, title: 'Backend Developer', company: 'Stripe', status: 'applied', date: '2024-01-23', notes: 'Coding challenge received - due in 5 days', appliedDate: '2024-01-23', salary: '$160k - $195k', location: 'Remote (US)', logo: 'S' },
        { id: 9, title: 'Frontend Lead', company: 'Airbnb', status: 'interview', date: '2024-01-24', notes: 'Hiring manager round scheduled', appliedDate: '2024-01-20', salary: '$155k - $185k', location: 'San Francisco, CA', logo: 'A', interviewDate: '2024-01-28' },
        { id: 10, title: 'Product Engineer', company: 'Notion', status: 'wishlist', date: '2024-01-25', notes: 'Research product and team before applying', appliedDate: '2024-01-25', salary: '$140k - $170k', location: 'Remote', logo: 'N' },
        { id: 11, title: 'Cloud Architect', company: 'AWS', status: 'offer', date: '2024-01-26', notes: 'Received verbal offer!', appliedDate: '2024-01-14', salary: '$175k - $210k', location: 'Remote', logo: 'A', offerDetails: '$180k base + 50k sign-on' },
        { id: 12, title: 'Security Engineer', company: 'Cloudflare', status: 'applied', date: '2024-01-27', notes: 'Application sent', appliedDate: '2024-01-27', salary: '$150k - $180k', location: 'Remote', logo: 'C' },
      ]
      setJobs(sampleJobs)
      localStorage.setItem('jobs', JSON.stringify(sampleJobs))
      updateStats(sampleJobs)
    }
  }, [navigate])

  const updateStats = (jobList) => {
    setStats({
      totalJobs: jobList.length,
      activeApplications: jobList.filter(j => j.status === 'applied').length,
      interviews: jobList.filter(j => j.status === 'interview').length,
      offers: jobList.filter(j => j.status === 'offer').length,
      rejected: jobList.filter(j => j.status === 'rejected').length,
      responseRate: jobList.length ? Math.round((jobList.filter(j => j.status !== 'wishlist' && j.status !== 'rejected').length / jobList.length) * 100) : 0
    })
  }

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
    updateStats(updatedJobs)
    setNewJob({ title: '', company: '', status: 'wishlist', date: '', notes: '', salary: '', location: '' })
    setShowAddModal(false)
    toast.success('Job added successfully!')
  }

  const deleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id)
    setJobs(updatedJobs)
    localStorage.setItem('jobs', JSON.stringify(updatedJobs))
    updateStats(updatedJobs)
    toast.success('Job deleted')
    setShowJobDetails(null)
  }

  const updateJobStatus = (id, newStatus) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? { ...job, status: newStatus } : job
    )
    setJobs(updatedJobs)
    localStorage.setItem('jobs', JSON.stringify(updatedJobs))
    updateStats(updatedJobs)
    toast.success(`Job moved to ${newStatus}`)
    setShowJobDetails(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    toast.success('Logged out successfully')
    navigate('/login')
  }

  const getStatusColor = (status) => {
    const colors = {
      wishlist: { bg: '#f3e8ff', text: '#9333ea', icon: '⭐', border: '#e9d5ff', gradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)' },
      applied: { bg: '#dbeafe', text: '#2563eb', icon: '📧', border: '#bfdbfe', gradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)' },
      interview: { bg: '#fef3c7', text: '#d97706', icon: '🎯', border: '#fde68a', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)' },
      offer: { bg: '#d1fae5', text: '#059669', icon: '🎉', border: '#a7f3d0', gradient: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' },
      rejected: { bg: '#fee2e2', text: '#dc2626', icon: '❌', border: '#fecaca', gradient: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)' }
    }
    return colors[status] || colors.applied
  }

  // STAT CARDS WITH CLICK HANDLERS
  const statCards = [
    { 
      title: 'Total Applications', 
      value: stats.totalJobs, 
      icon: Briefcase, 
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      change: '+12%', 
      page: '/jobs', 
      description: 'All applications tracked',
      details: `You have submitted ${stats.totalJobs} applications so far. Keep up the momentum!`,
      chart: 'bar'
    },
    { 
      title: 'Active Applications', 
      value: stats.activeApplications, 
      icon: Target, 
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      change: '+5%', 
      page: '/jobs?status=applied', 
      description: 'Waiting for response',
      details: `${stats.activeApplications} applications are currently active and under review.`,
      chart: 'line'
    },
    { 
      title: 'Interviews', 
      value: stats.interviews, 
      icon: Calendar, 
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      change: '+2', 
      page: '/jobs?status=interview', 
      description: 'Scheduled interviews',
      details: `You have ${stats.interviews} interviews scheduled. Prepare well!`,
      chart: 'pie'
    },
    { 
      title: 'Offers Received', 
      value: stats.offers, 
      icon: Award, 
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      change: '+1', 
      page: '/jobs?status=offer', 
      description: 'Success rate',
      details: `Congratulations! You've received ${stats.offers} job offers.`,
      chart: 'area'
    },
  ]

  const handleStatClick = (stat) => {
    setSelectedStat(stat)
    setShowStatsModal(stat)
    toast.info(`Viewing details for ${stat.title}`)
  }

  // Weekly data for charts
  const weeklyData = [
    { day: 'Mon', applications: 4, interviews: 2, offers: 0 },
    { day: 'Tue', applications: 6, interviews: 1, offers: 0 },
    { day: 'Wed', applications: 8, interviews: 3, offers: 1 },
    { day: 'Thu', applications: 5, interviews: 2, offers: 0 },
    { day: 'Fri', applications: 7, interviews: 4, offers: 1 },
    { day: 'Sat', applications: 3, interviews: 1, offers: 0 },
    { day: 'Sun', applications: 2, interviews: 0, offers: 0 },
  ]

  const monthlyData = [
    { month: 'Week 1', applications: 12, interviews: 5, offers: 1 },
    { month: 'Week 2', applications: 18, interviews: 7, offers: 2 },
    { month: 'Week 3', applications: 15, interviews: 6, offers: 1 },
    { month: 'Week 4', applications: 20, interviews: 8, offers: 2 },
  ]

  const statusData = [
    { name: 'Applied', value: stats.activeApplications, color: '#3b82f6' },
    { name: 'Interviews', value: stats.interviews, color: '#f59e0b' },
    { name: 'Offers', value: stats.offers, color: '#10b981' },
    { name: 'Rejected', value: stats.rejected, color: '#ef4444' },
  ]

  const recentJobs = jobs.slice(0, 6)

  // Activity timeline
  const activities = [
    { id: 1, text: 'Applied to Google', time: '2 hours ago', icon: '📧', color: '#3b82f6' },
    { id: 2, text: 'Interview scheduled with Microsoft', time: '5 hours ago', icon: '🎯', color: '#f59e0b' },
    { id: 3, text: 'Received offer from Meta', time: '1 day ago', icon: '🎉', color: '#10b981' },
    { id: 4, text: 'Application viewed by Amazon', time: '2 days ago', icon: '👁️', color: '#6b7280' },
    { id: 5, text: 'Rejected from Apple', time: '3 days ago', icon: '❌', color: '#ef4444' },
  ]

  // Recommendations
  const recommendations = [
    { title: 'Complete your profile', description: 'Add skills and experience', progress: 75, action: 'Update' },
    { title: 'Apply to 5 more jobs', description: 'Weekly goal: 10 applications', progress: 60, action: 'Browse' },
    { title: 'Prepare for interviews', description: 'Practice common questions', progress: 40, action: 'Practice' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #f3e8ff 0%, #e0e7ff 50%, #fce7f3 100%)',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Animated Background Pattern */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}>
        <defs>
          <pattern id="hexagons" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 L60 17.3 L60 42.7 L30 60 L0 42.7 L0 17.3 Z" fill="none" stroke="#764ba2" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      {/* Animated Gradient Orbs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />

      {/* Floating Particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: `rgba(118, 75, 162, ${Math.random() * 0.3})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, Math.random() * 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
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
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '10px',
              borderRadius: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(102,126,234,0.3)'
            }}
            onClick={() => navigate('/')}
          >
            <Briefcase style={{ color: 'white', width: '24px', height: '24px' }} />
          </motion.div>
          <div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TalentFlow Pro
            </span>
            <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Enterprise Edition</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '8px 12px 8px 36px',
                border: '1px solid #e5e7eb',
                borderRadius: '20px',
                fontSize: '13px',
                width: '200px',
                outline: 'none'
              }}
            />
          </div>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
            >
              <Bell size={20} color="#6b7280" />
              <span style={{
                position: 'absolute',
                top: -5,
                right: -5,
                background: '#ef4444',
                color: 'white',
                fontSize: '10px',
                padding: '2px 5px',
                borderRadius: '10px',
                fontWeight: 'bold'
              }}>3</span>
            </motion.button>
            
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    position: 'absolute',
                    top: 40,
                    right: -100,
                    width: 300,
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 20px 35px -10px rgba(0,0,0,0.2)',
                    zIndex: 200,
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <p style={{ fontWeight: 'bold' }}>Notifications</p>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>🎯 Google interview tomorrow</p>
                      <p style={{ fontSize: '11px', color: '#9ca3af' }}>2 hours ago</p>
                    </div>
                    <div style={{ padding: '12px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>👁️ Microsoft viewed your application</p>
                      <p style={{ fontSize: '11px', color: '#9ca3af' }}>5 hours ago</p>
                    </div>
                    <div style={{ padding: '12px', cursor: 'pointer' }}>
                      <p style={{ fontSize: '13px', fontWeight: '500' }}>🎉 New job match: Senior React Developer</p>
                      <p style={{ fontSize: '11px', color: '#9ca3af' }}>1 day ago</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: 'bold', margin: 0, color: '#1f2937', fontSize: '14px' }}>{userData.name}</p>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: 0, textTransform: 'capitalize' }}>{userData.role}</p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              {userData.avatar || userData.name?.charAt(0) || 'U'}
            </motion.div>
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
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              <LogOut size={16} /> Exit
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div style={{ padding: '32px', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Welcome Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '32px',
            padding: '32px 40px',
            marginBottom: '32px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', right: 0, top: 0, opacity: 0.1 }}>
            <svg width="300" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="white" />
            </svg>
          </div>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}
            >
              Welcome back, {userData.name}! 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              style={{ opacity: 0.9, fontSize: '16px' }}
            >
              Your job search journey is ${stats.responseRate}% complete. ${stats.totalJobs} applications submitted, ${stats.interviews} interviews scheduled.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', gap: '16px', marginTop: '24px', flexWrap: 'wrap' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '30px' }}>
                <Sparkles size={14} /> {stats.responseRate}% Response Rate
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '30px' }}>
                <Rocket size={14} /> Top 15% of Job Seekers
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '30px' }}>
                <Gift size={14} /> ${stats.offers > 0 ? 'Offers Received!' : 'Keep Applying!'}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* STAT CARDS - CLICKABLE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleStatClick(card)}
              style={{
                background: 'white',
                borderRadius: '24px',
                padding: '24px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>{card.title}</p>
                  <p style={{ fontSize: '42px', fontWeight: 'bold', color: '#1f2937', marginTop: '8px' }}>{card.value}</p>
                  <p style={{ color: '#10b981', fontSize: '13px', marginTop: '4px' }}>{card.change} from last week</p>
                  <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>{card.description}</p>
                </div>
                <div style={{ 
                  background: card.gradient, 
                  padding: '14px', 
                  borderRadius: '20px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <card.icon style={{ color: 'white', width: '28px', height: '28px' }} />
                </div>
              </div>
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '4px', color: '#764ba2' }}>
                <span style={{ fontSize: '13px' }}>Click to view details</span>
                <ChevronRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Weekly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            style={{
              background: 'white',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Weekly Activity</h3>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Applications submitted per day</p>
              </div>
              <Activity size={24} style={{ color: '#764ba2' }} />
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#764ba2" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#764ba2" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="applications" stroke="#764ba2" fillOpacity={1} fill="url(#colorApps)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Response Rate Circle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -5 }}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '28px',
              padding: '24px',
              color: 'white',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Response Rate</h3>
                <p style={{ fontSize: '12px', opacity: 0.8 }}>Applications that received responses</p>
              </div>
              <ThumbsUp size={24} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', width: '160px', height: '160px' }}>
                <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" />
                  <circle 
                    cx="80" cy="80" r="70" 
                    fill="none" 
                    stroke="white" 
                    strokeWidth="12" 
                    strokeDasharray={`${stats.responseRate * 4.4} 440`}
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '36px', fontWeight: 'bold' }}>{stats.responseRate}%</span>
                  <p style={{ fontSize: '10px', opacity: 0.8 }}>Success Rate</p>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '3px' }}></div>
                  <span style={{ fontSize: '13px' }}>{stats.activeApplications + stats.interviews + stats.offers} Responded</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '12px', height: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}></div>
                  <span style={{ fontSize: '13px' }}>{stats.totalJobs - (stats.activeApplications + stats.interviews + stats.offers)} Pending</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Row - Pie Chart and Recent Jobs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -5 }}
            style={{
              background: 'white',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Application Status</h3>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Distribution of your applications</p>
              </div>
              <PieChart size={24} style={{ color: '#764ba2' }} />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={statusData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusData.filter(d => d.value > 0).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
              {statusData.map(item => (
                <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', background: item.color, borderRadius: '2px' }}></div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Jobs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -5 }}
            style={{
              background: 'white',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Recent Applications</h3>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Your latest job applications</p>
              </div>
              <button 
                onClick={() => navigate('/jobs')}
                style={{ background: 'none', border: 'none', color: '#764ba2', cursor: 'pointer', fontSize: '13px' }}
              >
                View All →
              </button>
            </div>
            <div style={{ maxHeight: 300, overflowY: 'auto' }}>
              {recentJobs.map((job, idx) => {
                const statusStyle = getStatusColor(job.status)
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ x: 5, background: '#f9fafb' }}
                    onClick={() => setShowJobDetails(job)}
                    style={{
                      padding: '12px',
                      borderRadius: '16px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      borderBottom: '1px solid #f0f0f0'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: statusStyle.gradient,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '18px'
                        }}>
                          {job.logo}
                        </div>
                        <div>
                          <p style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '14px' }}>{job.title}</p>
                          <p style={{ fontSize: '12px', color: '#6b7280' }}>{job.company}</p>
                        </div>
                      </div>
                      <span style={{
                        background: statusStyle.bg,
                        color: statusStyle.text,
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}>
                        {statusStyle.icon} {job.status}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Activity Timeline and Recommendations */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Activity Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{
              background: 'white',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Clock size={24} style={{ color: '#764ba2' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Activity Timeline</h3>
            </div>
            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              <div style={{ position: 'absolute', left: 6, top: 0, bottom: 0, width: '2px', background: '#e5e7eb' }}></div>
              {activities.map((activity, idx) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  style={{ position: 'relative', marginBottom: '20px' }}
                >
                  <div style={{
                    position: 'absolute',
                    left: -26,
                    top: 0,
                    width: '10px',
                    height: '10px',
                    background: activity.color,
                    borderRadius: '50%',
                    border: '2px solid white',
                    boxShadow: '0 0 0 2px #e5e7eb'
                  }}></div>
                  <div style={{ padding: '8px 0' }}>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{activity.text}</p>
                    <p style={{ fontSize: '11px', color: '#9ca3af' }}>{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
              background: 'white',
              borderRadius: '28px',
              padding: '24px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Rocket size={24} style={{ color: '#764ba2' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>Recommendations</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recommendations.map((rec, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + idx * 0.1 }}
                  style={{
                    padding: '16px',
                    background: '#f9fafb',
                    borderRadius: '20px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontWeight: 'bold', color: '#1f2937' }}>{rec.title}</p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>{rec.description}</p>
                    </div>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      color: '#764ba2',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>
                      {rec.action} →
                    </button>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: '#e5e7eb',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${rec.progress}%`,
                      height: '100%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '3px'
                    }}></div>
                  </div>
                  <p style={{ fontSize: '10px', color: '#9ca3af', marginTop: '6px' }}>{rec.progress}% complete</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '14px 20px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} /> Add New Job
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/jobs')}
            style={{
              background: 'white',
              padding: '14px 20px',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              color: '#374151',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Eye size={18} /> View All Jobs
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/faq')}
            style={{
              background: 'white',
              padding: '14px 20px',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              color: '#374151',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <HelpCircle size={18} /> Help Center
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open('https://linkedin.com', '_blank')}
            style={{
              background: 'white',
              padding: '14px 20px',
              borderRadius: '20px',
              border: '1px solid #e5e7eb',
              cursor: 'pointer',
              color: '#374151',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Linkedin size={18} /> LinkedIn Tips
          </motion.button>
        </motion.div>
      </div>

      {/* STAT DETAILS MODAL - Opens when clicking stat cards */}
      <AnimatePresence>
        {showStatsModal && selectedStat && (
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
            onClick={() => setShowStatsModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              style={{
                background: 'white',
                borderRadius: '32px',
                maxWidth: '500px',
                width: '100%',
                maxHeight: '80vh',
                overflow: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                background: selectedStat.gradient,
                padding: '24px',
                color: 'white',
                borderTopLeftRadius: '32px',
                borderTopRightRadius: '32px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <selectedStat.icon size={32} />
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{selectedStat.title}</h2>
                  </div>
                  <button onClick={() => setShowStatsModal(null)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer' }}>×</button>
                </div>
                <p style={{ marginTop: '8px', opacity: 0.9 }}>{selectedStat.details}</p>
              </div>
              
              <div style={{ padding: '24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <p style={{ fontSize: '56px', fontWeight: 'bold', color: '#1f2937' }}>{selectedStat.value}</p>
                  <p style={{ color: '#10b981' }}>{selectedStat.change} from last week</p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Quick Actions</h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => {
                        navigate(selectedStat.page)
                        setShowStatsModal(null)
                      }}
                      style={{
                        background: selectedStat.gradient,
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      View All {selectedStat.title}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddModal(true)
                        setShowStatsModal(null)
                      }}
                      style={{
                        background: '#f3f4f6',
                        color: '#374151',
                        padding: '10px 20px',
                        borderRadius: '30px',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Add New Application
                    </button>
                  </div>
                </div>

                <div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '12px' }}>Related Tips</h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={14} color="#764ba2" /> Keep tracking all your applications in one place
                    </li>
                    <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Rocket size={14} color="#764ba2" /> Update your application status regularly
                    </li>
                    <li style={{ padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Gift size={14} color="#764ba2" /> Set daily/weekly application goals
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <p><strong style={{ color: '#4b5563' }}>Company:</strong> {showJobDetails.company}</p>
                  <p style={{ marginTop: '8px' }}><strong style={{ color: '#4b5563' }}>Status:</strong> <span style={{ background: getStatusColor(showJobDetails.status).bg, padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{showJobDetails.status}</span></p>
                  {showJobDetails.salary && <p style={{ marginTop: '8px' }}><strong style={{ color: '#4b5563' }}>Salary:</strong> {showJobDetails.salary}</p>}
                  {showJobDetails.location && <p style={{ marginTop: '8px' }}><strong style={{ color: '#4b5563' }}>Location:</strong> {showJobDetails.location}</p>}
                  <p style={{ marginTop: '8px' }}><strong style={{ color: '#4b5563' }}>Applied Date:</strong> {showJobDetails.appliedDate}</p>
                  {showJobDetails.notes && <p style={{ marginTop: '8px' }}><strong style={{ color: '#4b5563' }}>Notes:</strong> {showJobDetails.notes}</p>}
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

export default Dashboard