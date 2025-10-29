<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <CircleDecoration 
      size="xlarge" 
      color="blue" 
      class="absolute top-10 left-10 opacity-20" 
    />
    <CircleDecoration 
      size="large" 
      color="blue" 
      class="absolute bottom-20 right-20 opacity-30" 
    />
    
    <div class="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8 relative z-10">
      <div>
        <router-link to="/" class="flex items-center justify-center space-x-2">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">T</span>
          </div>
          <span class="text-2xl font-bold text-gray-900">TicketFlow</span>
        </router-link>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <router-link
            to="/auth/signup"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            create a new account
          </router-link>
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <Input
            label="Email address"
            type="email"
            required
            v-model="formData.email"
            :error="errors.email"
            placeholder="Enter your email"
          />
          
          <Input
            label="Password"
            type="password"
            required
            v-model="formData.password"
            :error="errors.password"
            placeholder="Enter your password"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="large"
          :disabled="loading"
          class="w-full"
        >
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </Button>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Demo credentials: <br />
            <span class="font-mono">email: demo@ticketflow.com</span>
            <br />
            <span class="font-mono">password: demo123</span>
          </p>
        </div>
      </form>
    </div>
    
    <WaveBackground />
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import Input from '../../components/UI/Input.vue'
import Button from '../../components/UI/Button.vue'
import WaveBackground from '../../components/Decorative/WaveBackground.vue'
import CircleDecoration from '../../components/Decorative/CircleDecoration.vue'

export default {
  name: 'Login',
  components: {
    Input,
    Button,
    WaveBackground,
    CircleDecoration
  },
  setup() {
    const auth = inject('auth')
    const toast = inject('toast')
    const router = useRouter()
    
    const formData = ref({
      email: '',
      password: ''
    })
    const errors = ref({})
    const loading = ref(false)

    const validateForm = () => {
      const newErrors = {}
      
      if (!formData.value.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
        newErrors.email = 'Email is invalid'
      }
      
      if (!formData.value.password) {
        newErrors.password = 'Password is required'
      } else if (formData.value.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
      if (!validateForm()) return
      
      loading.value = true
      
      try {
        await auth.login(formData.value)
        toast.addToast('Login successful!', 'success')
        router.push('/dashboard')
      } catch (error) {
        toast.addToast(error.message || 'Login failed. Please try again.', 'error')
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      errors,
      loading,
      handleSubmit
    }
  }
}
</script>