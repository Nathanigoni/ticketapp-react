import { ref } from 'vue'

export function useToast() {
  const toasts = ref([])

  const addToast = (message, type = 'info') => {
    const id = Date.now().toString()
    toasts.value.push({ id, message, type })
    
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  return {
    toasts,
    addToast,
    removeToast
  }
}