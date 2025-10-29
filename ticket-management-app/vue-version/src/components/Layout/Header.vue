<template>
  <header class="bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">T</span>
          </div>
          <span class="text-xl font-bold text-gray-900">TicketFlow</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <template v-if="auth.isAuthenticated">
            <router-link 
              to="/dashboard" 
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                $route.path === '/dashboard' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              ]"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/tickets" 
              :class="[
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                $route.path === '/tickets' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              ]"
            >
              Tickets
            </router-link>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-700">Hello, {{ auth.user?.name }}</span>
              <button
                @click="handleLogout"
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </template>
          <template v-else>
            <div class="flex items-center space-x-4">
              <router-link 
                to="/auth/login" 
                class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Login
              </router-link>
              <router-link 
                to="/auth/signup" 
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Get Started
              </router-link>
            </div>
          </template>
        </nav>

        <!-- Mobile menu button -->
        <button
          class="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t">
        <template v-if="auth.isAuthenticated">
          <div class="space-y-2">
            <router-link 
              to="/dashboard" 
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              @click="isMobileMenuOpen = false"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/tickets" 
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              @click="isMobileMenuOpen = false"
            >
              Tickets
            </router-link>
            <div class="pt-2 border-t">
              <span class="block px-3 py-2 text-sm text-gray-500">Hello, {{ auth.user?.name }}</span>
              <button
                @click="handleLogout"
                class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="space-y-2">
            <router-link 
              to="/auth/login" 
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              @click="isMobileMenuOpen = false"
            >
              Login
            </router-link>
            <router-link 
              to="/auth/signup" 
              class="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              @click="isMobileMenuOpen = false"
            >
              Get Started
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Header',
  setup() {
    const auth = inject('auth')
    const router = useRouter()
    const isMobileMenuOpen = ref(false)

    const handleLogout = () => {
      auth.logout()
      isMobileMenuOpen.value = false
    }

    return {
      auth,
      isMobileMenuOpen,
      handleLogout
    }
  }
}
</script>