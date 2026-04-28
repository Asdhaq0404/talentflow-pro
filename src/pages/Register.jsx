import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Briefcase, Mail, Lock, User, Building, Phone, ArrowRight, AlertCircle, CheckCircle, X } from 'lucide-react'
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const allowedDomains = ['@company.com', '@gmail.com', '@outlook.com', '@yourcompany.com']

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) newErrors.name = 'Full name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!formData.email.includes('@')) newErrors.email = 'Valid email required'
    else if (!allowedDomains.some(d => formData.email.toLowerCase().endsWith(d))) {
      newErrors.email = `Only corporate emails allowed: ${allowedDomains.join(', ')}`
    }
    
    if (!formData.department) newErrors.department = 'Department is required'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be 6+ characters'
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      toast.error('Please fix the errors')
      return
    }
    
    setIsLoading(true)
    
    setTimeout(() => {
      toast.success('Registration request submitted! Please wait for admin approval.')
      setTimeout(() => navigate('/login'), 2000)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #2e1065 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflowY: 'auto'
    }}>
      
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(139,92,246,0.15) 0%, transparent 50%)',
      }}></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '560px',
          width: '100%',
          backgroundColor: 'white',
          borderRadius: '32px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 10,
          margin: '40px 0'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #4c1d95 0%, #7e22ce 100%)',
            borderRadius: '20px',
            marginBottom: '20px'
          }}>
            <Briefcase style={{ width: '32px', height: '32px', color: 'white' }} />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1e1b4b', marginBottom: '8px' }}>
            Corporate Access Request
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Request enterprise account for your organization
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  border: `1.5px solid ${errors.name ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '14px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb'
                }}
              />
            </div>
            {errors.name && <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.name}</p>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Corporate Email *
            </label>
            <div style={{ position: 'relative' }}>
              <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@company.com"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  border: `1.5px solid ${errors.email ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '14px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb'
                }}
              />
            </div>
            {errors.email && <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Department *
            </label>
            <div style={{ position: 'relative' }}>
              <Building style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  border: `1.5px solid ${errors.department ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '14px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb'
                }}
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="IT">IT</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            {errors.department && <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.department}</p>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Phone Number (Optional)
            </label>
            <div style={{ position: 'relative' }}>
              <Phone style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234 567 8900"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '14px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Password *
            </label>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9ca3af' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  border: `1.5px solid ${errors.password ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '14px',
                  fontSize: '14px',
                  backgroundColor: '#f9fafb'
                }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.password}</p>}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' }}>
              Confirm Password *
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1.5px solid ${errors.confirmPassword ? '#ef4444' : '#e5e7eb'}`,
                borderRadius: '14px',
                fontSize: '14px',
                backgroundColor: '#f9fafb'
              }}
            />
            {errors.confirmPassword && <p style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>{errors.confirmPassword}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #4c1d95 0%, #7e22ce 100%)',
              color: 'white',
              padding: '14px',
              borderRadius: '16px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            {isLoading ? <div style={{ width: '20px', height: '20px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div> : <>Request Access <ArrowRight size={16} /></>}
          </motion.button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#6b7280' }}>
            Already have an account? <Link to="/login" style={{ color: '#7e22ce', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>

        <div style={{ marginTop: '20px', padding: '12px', background: '#f0fdf4', borderRadius: '12px', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#166534' }}>
            <CheckCircle size={12} style={{ display: 'inline', marginRight: '4px' }} />
            Corporate accounts require admin approval. You'll receive email confirmation within 24 hours.
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default Register