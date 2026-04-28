import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import FAQ from './pages/FAQ'
import Help from './pages/Help'
import Profile from './pages/Profile'
import Team from './pages/Team'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/jobs" element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        } />
        <Route path="/faq" element={
          <ProtectedRoute>
            <FAQ />
          </ProtectedRoute>
        } />
        <Route path="/help" element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/team" element={
          <ProtectedRoute>
            <Team />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App