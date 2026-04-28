import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, Mail, Building, Shield, Save, Edit2, Lock, Bell,
  Moon, Sun, Globe, Phone, MapPin, Calendar, Briefcase,
  LogOut, ArrowLeft, CheckCircle, AlertCircle, Upload, Camera
} from 'lucide-react'
import toast from 'react-hot-toast'

const Profile = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({ 
    name: '', email: '', role: '', department: '', avatar: '', 
    phone: '', location: '', joinDate: '', bio: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ 
    name: '', department: '', phone: '', location: '', bio: ''
  })
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    interviewReminders: true,
    marketingEmails: false
  })
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated')
    if (!isAuth || isAuth !== 'true') {
      navigate('/login')
      return
    }
    
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      setUserData({
        ...parsed,
        phone: parsed.phone || '+1 (555) 123-4567',
        location: parsed.location || 'San Francisco, CA',
        joinDate: parsed.joinDate || 'January 15, 2024',
        bio: parsed.bio || 'Senior Software Engineer passionate about building great products.'
      })
      setFormData({
        name: parsed.name,
        department: parsed.department || 'Engineering',
        phone: parsed.phone || '+1 (555) 123-4567',
        location: parsed.location || 'San Francisco, CA',
        bio: parsed.bio || 'Senior Software Engineer passionate about building great products.'
      })
    }
    
    // Load theme preference
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme === 'true') {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [navigate])

  const handleSave = () => {
    const updatedUser = { 
      ...userData, 
      name: formData.name, 
      department: formData.department,
      phone: formData.phone,
      location: formData.location,
      bio: formData.bio
    }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUserData(updatedUser)
    setIsEditing(false)
    toast.success('Profile updated successfully!')
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('user')
    toast.success('Logged out')
    navigate('/login')
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    toast.success(`${newDarkMode ? 'Dark' : 'Light'} mode enabled`)
  }

  const getRoleBadge = () => {
    const role = userData.role
    if (role === 'admin') return { bg: '#fee2e2', text: '#dc2626', label: 'Administrator', icon: '👑' }
    if (role === 'manager') return { bg: '#fef3c7', text: '#d97706', label: 'Manager', icon: '⭐' }
    return { bg: '#d1fae5', text: '#059669', label: 'Team Member', icon: '👤' }
  }

  const roleBadge = getRoleBadge()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #f3e8ff 0%, #e0e7ff 50%, #fce7f3 100%)',
      position: 'relative'
    }}>
      {/* Animated Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(25)].map((_, i) => (
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
            <p style={{ fontSize: '10px', color: '#6b7280', margin: 0 }}>Profile Settings</p>
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
            <LogOut size={16} /> Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: '32px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Profile Settings
              </h1>
              <p style={{ color: '#6b7280', marginTop: '4px' }}>Manage your account information and preferences</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEditing(true)}
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 24px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  <Edit2 size={16} /> Edit Profile
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={handleSave}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    <Save size={16} /> Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        name: userData.name,
                        department: userData.department,
                        phone: userData.phone,
                        location: userData.location,
                        bio: userData.bio
                      })
                    }}
                    style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    Cancel
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'white',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
            }}
          >
            {/* Cover Image */}
            <div style={{
              height: '120px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              position: 'relative'
            }}></div>
            
            {/* Avatar Section */}
            <div style={{ padding: '0 32px 32px 32px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginTop: '-40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '40px',
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: '0 10px 25px -5px rgba(102,126,234,0.4)'
                    }}>
                      {userData.avatar || userData.name?.charAt(0) || 'U'}
                    </div>
                    {isEditing && (
                      <button style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        background: 'white',
                        borderRadius: '50%',
                        padding: '8px',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer'
                      }}>
                        <Camera size={16} color="#764ba2" />
                      </button>
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          fontSize: '24px',
                          fontWeight: 'bold',
                          border: '2px solid #e5e7eb',
                          borderRadius: '16px',
                          padding: '8px 16px',
                          width: '250px'
                        }}
                      />
                    ) : (
                      <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{userData.name}</h2>
                    )}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <span style={{
                        background: roleBadge.bg,
                        color: roleBadge.text,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {roleBadge.icon} {roleBadge.label}
                      </span>
                      <span style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} /> Joined {userData.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <User size={20} color="#764ba2" /> Personal Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '14px', fontSize: '14px' }}
                  />
                ) : (
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{userData.name}</p>
                )}
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="#764ba2" /> {userData.email}
                </p>
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Department</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '14px', fontSize: '14px' }}
                  />
                ) : (
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937' }}>{userData.department}</p>
                )}
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '14px', fontSize: '14px' }}
                  />
                ) : (
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="#764ba2" /> {userData.phone}
                  </p>
                )}
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '14px', fontSize: '14px' }}
                  />
                ) : (
                  <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} color="#764ba2" /> {userData.location}
                  </p>
                )}
              </div>
              <div>
                <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Role</label>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#1f2937', textTransform: 'capitalize' }}>{userData.role}</p>
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={{ fontSize: '13px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Bio</label>
              {isEditing ? (
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows="3"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '14px', fontSize: '14px' }}
                />
              ) : (
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>{userData.bio}</p>
              )}
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={20} color="#764ba2" /> Notification Preferences
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: '500', color: '#1f2937' }}>Email Alerts</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Receive job application updates via email</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, emailAlerts: !notifications.emailAlerts })}
                  style={{
                    width: '50px',
                    height: '28px',
                    background: notifications.emailAlerts ? '#10b981' : '#e5e7eb',
                    borderRadius: '30px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    left: notifications.emailAlerts ? '25px' : '3px',
                    transition: 'left 0.2s'
                  }}></div>
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <p style={{ fontWeight: '500', color: '#1f2937' }}>Interview Reminders</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Get notified before upcoming interviews</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, interviewReminders: !notifications.interviewReminders })}
                  style={{
                    width: '50px',
                    height: '28px',
                    background: notifications.interviewReminders ? '#10b981' : '#e5e7eb',
                    borderRadius: '30px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    left: notifications.interviewReminders ? '25px' : '3px',
                    transition: 'left 0.2s'
                  }}></div>
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '12px 0' }}>
                <div>
                  <p style={{ fontWeight: '500', color: '#1f2937' }}>Marketing Emails</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Receive tips and job recommendations</p>
                </div>
                <button
                  onClick={() => setNotifications({ ...notifications, marketingEmails: !notifications.marketingEmails })}
                  style={{
                    width: '50px',
                    height: '28px',
                    background: notifications.marketingEmails ? '#10b981' : '#e5e7eb',
                    borderRadius: '30px',
                    border: 'none',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '3px',
                    left: notifications.marketingEmails ? '25px' : '3px',
                    transition: 'left 0.2s'
                  }}></div>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={20} color="#764ba2" /> Appearance
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937' }}>Dark Mode</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Switch between light and dark theme</p>
              </div>
              <button
                onClick={toggleDarkMode}
                style={{
                  background: darkMode ? '#1f2937' : '#f3f4f6',
                  color: darkMode ? '#f9fafb' : '#374151',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>

          {/* Security Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '28px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
              marginBottom: '32px'
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={20} color="#764ba2" /> Security
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontWeight: '500', color: '#1f2937' }}>Change Password</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Update your password regularly</p>
              </div>
              <button
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500'
                }}
              >
                Change Password
              </button>
            </div>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={16} color="#10b981" />
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Last login: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Back to Dashboard Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(255,255,255,0.9)',
              border: '1px solid #e5e7eb',
              padding: '12px 24px',
              borderRadius: '30px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#374151',
              fontSize: '14px',
              width: 'fit-content',
              marginTop: '16px'
            }}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Profile