import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, Sparkles, Zap, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated')
    if (isAuth === 'true') {
      navigate('/')
    }
  }, [navigate])

  const validUsers = [
    { email: 'admin@company.com', password: 'admin123', name: 'Admin User', role: 'admin', department: 'IT', avatar: 'A' },
    { email: 'john@company.com', password: 'john123', name: 'John Doe', role: 'user', department: 'Engineering', avatar: 'J' },
    { email: 'sarah@company.com', password: 'sarah123', name: 'Sarah Wilson', role: 'manager', department: 'Product', avatar: 'S' },
    { email: 'demo@gmail.com', password: 'demo123', name: 'Demo User', role: 'user', department: 'Sales', avatar: 'D' },
  ]

  const loadingMessages = [
    { icon: <Shield size={16} />, text: 'Verifying credentials...' },
    { icon: <Zap size={16} />, text: 'Establishing secure connection...' },
    { icon: <Sparkles size={16} />, text: 'Loading your workspace...' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password')
      return
    }
    
    setIsLoading(true)
    
    for (let i = 0; i < loadingMessages.length; i++) {
      setLoadingStep(i)
      await new Promise(resolve => setTimeout(resolve, 800))
    }
    
    setTimeout(() => {
      const user = validUsers.find(u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password)
      
      if (user) {
        setShowSuccess(true)
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          name: user.name,
          role: user.role,
          department: user.department,
          avatar: user.avatar,
          loginTime: new Date().toISOString()
        }))
        
        setTimeout(() => {
          toast.success(`Welcome back, ${user.name}!`)
          navigate('/')
        }, 500)
      } else {
        toast.error('Invalid email or password')
        setIsLoading(false)
        setLoadingStep(0)
      }
    }, 500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated Floating Shapes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 100 + 20,
            height: Math.random() * 100 + 20,
            background: `rgba(255,255,255,${Math.random() * 0.1})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() * 1.5 + 0.5],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 25 }}
        style={{
          maxWidth: '480px',
          width: '100%',
          background: 'rgba(255,255,255,0.98)',
          borderRadius: '40px',
          padding: '48px',
          boxShadow: '0 50px 70px -30px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 10,
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Animated Logo */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            position: 'absolute', 
            top: -30, 
            right: -20, 
            width: 100, 
            height: 100, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.1
          }}
        />

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring" }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '24px',
              marginBottom: '24px',
              boxShadow: '0 20px 35px -10px rgba(102,126,234,0.4)'
            }}
          >
            <Briefcase style={{ width: '40px', height: '40px', color: 'white' }} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}
          >
            TalentFlow Pro
          </motion.h1>
          <p style={{ color: '#6b7280' }}>Enterprise Job Tracking Platform</p>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && !showSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
                backdropFilter: 'blur(8px)'
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: 60,
                  height: 60,
                  border: '3px solid #e5e7eb',
                  borderTopColor: '#764ba2',
                  borderRadius: '50%',
                  marginBottom: 24
                }}
              />
              <div style={{ textAlign: 'center' }}>
                {loadingMessages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: loadingStep >= idx ? 1 : 0.3, y: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                      color: loadingStep >= idx ? '#764ba2' : '#9ca3af'
                    }}
                  >
                    {msg.icon}
                    <span>{msg.text}</span>
                    {loadingStep > idx && <CheckCircle size={14} style={{ color: '#10b981' }} />}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(16,185,129,0.95)',
                borderRadius: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 30,
                flexDirection: 'column'
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle size={60} color="white" />
              </motion.div>
              <p style={{ color: 'white', marginTop: 16, fontWeight: 'bold' }}>Login Successful!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit}>
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ marginBottom: '20px' }}
          >
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Corporate Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="yourname@company.com"
              style={{
                width: '100%',
                padding: '14px 18px',
                fontSize: '14px',
                border: '2px solid #e5e7eb',
                borderRadius: '20px',
                outline: 'none',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#764ba2'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              required
            />
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ marginBottom: '24px' }}
          >
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '14px 50px 14px 18px',
                  fontSize: '14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '20px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#764ba2'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ width: '16px', height: '16px', accentColor: '#764ba2' }} />
              <span style={{ fontSize: '13px', color: '#6b7280' }}>Remember me</span>
            </label>
            <a href="#" style={{ fontSize: '13px', color: '#764ba2', textDecoration: 'none' }}>Forgot password?</a>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '16px',
              fontSize: '16px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? 'Authenticating...' : 'Sign In →'}
          </motion.button>
        </form>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginTop: '24px', textAlign: 'center' }}
        >
          <p style={{ fontSize: '12px', color: '#9ca3af' }}>
            <CheckCircle size={12} style={{ display: 'inline', marginRight: '4px', color: '#10b981' }} />
            Enterprise-grade security • SSO Ready • 99.9% Uptime
          </p>
        </motion.div>

        {/* Demo Credentials Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '28px',
            padding: '16px',
            background: 'linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)',
            borderRadius: '20px'
          }}
        >
          <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#764ba2', marginBottom: '8px' }}>🎯 Demo Access</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '11px', color: '#4c1d95' }}>
            <span>admin@company.com / admin123</span>
            <span>•</span>
            <span>john@company.com / john123</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login