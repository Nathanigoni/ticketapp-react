<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="[
        'p-4 rounded-lg shadow-lg border-l-4 max-w-sm transform transition-all duration-300',
        toast.type === 'error' 
          ? 'bg-red-50 border-red-500 text-red-700' 
          : toast.type === 'success'
          ? 'bg-green-50 border-green-500 text-green-700'
          : 'bg-blue-50 border-blue-500 text-blue-700'
      ]"
    >
      <div class="flex items-start justify-between">
        <p class="text-sm font-medium">{{ toast.message }}</p>
        <button
          @click="removeToast(toast.id)"
          class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'ToastContainer',
  setup() {
    const toast = inject('toast')

    return {
      toasts: toast.toasts,
      removeToast: toast.removeToast
    }
  }
}
</script>
