import { ref, computed } from 'vue'

export function useAuth() {
  const user = ref(null)
  const loading = ref(true)

  // Check if user is authenticated on init
  const token = localStorage.getItem('ticketapp_session')
  if (token) {
    try {
      user.value = JSON.parse(atob(token))
    } catch (error) {
      localStorage.removeItem('ticketapp_session')
    }
  }
  loading.value = false

  const isAuthenticated = computed(() => !!user.value)

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
        user.value = userData
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
        user.value = userData
        return { success: true }
      }
      throw new Error('Please fill all fields')
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('ticketapp_session')
    user.value = null
    window.location.href = '/'
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout
  }
}