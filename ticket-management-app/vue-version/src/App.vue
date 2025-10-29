<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <RouterView />
    <ToastContainer />
  </div>
</template>

<script>
import { provide } from 'vue'
import { useAuth } from './composables/useAuth'
import { useToast } from './composables/useToast'
import ToastContainer from './components/UI/ToastContainer.vue'

export default {
  name: 'App',
  components: {
    ToastContainer
  },
  setup() {
    // Provide auth and toast to all components
    const auth = useAuth()
    const toast = useToast()
    
    provide('auth', auth)
    provide('toast', toast)
    
    return {
      auth,
      toast
    }
  }
}
</script>