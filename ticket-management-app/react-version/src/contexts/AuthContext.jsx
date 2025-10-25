import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('ticketapp_session')
    if (token) {
      try {
        const userData = JSON.parse(atob(token))
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('ticketapp_session')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // Mock authentication
      if (credentials.email && credentials.password) {
        const userData = {
          email: credentials.email,
          name: credentials.email.split('@')[0],
          id: Date.now().toString()
        }
        const token = btoa(JSON.stringify(userData))
        localStorage.setItem('ticketapp_session', token)
        setUser(userData)
        setIsAuthenticated(true)
        return { success: true }
      }
      throw new Error('Invalid credentials')
    } catch (error) {
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      if (userData.email && userData.password && userData.name) {
        const token = btoa(JSON.stringify({
          email: userData.email,
          name: userData.name,
          id: Date.now().toString()
        }))
        localStorage.setItem('ticketapp_session', token)
        setUser(userData)
        setIsAuthenticated(true)
        return { success: true }
      }
      throw new Error('Please fill all fields')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}