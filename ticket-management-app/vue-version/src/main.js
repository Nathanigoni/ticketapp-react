import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

// Import components
import Landing from './pages/Landing.vue'
import Login from './pages/auth/Login.vue'
import Signup from './pages/auth/Signup.vue'
import Dashboard from './pages/Dashboard.vue'
import TicketManagement from './pages/tickets/TicketManagement.vue'

// Router configuration
const routes = [
  { path: '/', component: Landing },
  { path: '/auth/login', component: Login },
  { path: '/auth/signup', component: Signup },
  { 
    path: '/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  { 
    path: '/tickets', 
    component: TicketManagement,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('ticketapp_session')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})

createApp(App).use(router).mount('#app')