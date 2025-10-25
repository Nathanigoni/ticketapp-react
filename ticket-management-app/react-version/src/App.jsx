import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import Layout from './components/Layout/Layout'
import Landing from './pages/Landing'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Dashboard from './pages/Dashboard'
import TicketManagement from './pages/tickets/TicketManagement'
import Toast from './components/UI/Toast'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/auth/login" />
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Layout><Landing /></Layout>} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tickets" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <TicketManagement />
                  </Layout>
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Toast />
        </div>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App