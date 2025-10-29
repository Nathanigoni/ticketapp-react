<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">
      {{ ticket ? 'Edit Ticket' : 'Create New Ticket' }}
    </h2>
    
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Title <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.title"
          type="text"
          required
          placeholder="Enter a descriptive title for the ticket"
          :class="[
            'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
            { 'border-red-500': errors.title },
            { 'border-gray-300': !errors.title }
          ]"
        />
        <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          v-model="formData.description"
          rows="4"
          placeholder="Provide detailed information about the issue or request"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
        />
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Status <span class="text-red-500">*</span>
          </label>
          <select
            v-model="formData.status"
            :class="[
              'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors',
              { 'border-red-500': errors.status },
              { 'border-gray-300': !errors.status }
            ]"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            v-model="formData.priority"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>
      
      <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="secondary"
          @click="$emit('cancel')"
          :disabled="loading"
          class="sm:w-auto w-full mb-3 sm:mb-0"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          :disabled="loading"
          class="sm:w-auto w-full"
        >
          {{ loading 
            ? (ticket ? 'Updating...' : 'Creating...') 
            : (ticket ? 'Update Ticket' : 'Create Ticket')
          }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import Button from '../../components/UI/Button.vue'

export default {
  name: 'TicketForm',
  components: {
    Button
  },
  props: {
    ticket: {
      type: Object,
      default: null
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const formData = ref({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    })

    const errors = ref({})
    const loading = ref(false)

    // Initialize form with ticket data if editing
    watch(() => props.ticket, (newTicket) => {
      if (newTicket) {
        formData.value = {
          title: newTicket.title,
          description: newTicket.description,
          status: newTicket.status,
          priority: newTicket.priority
        }
      }
    }, { immediate: true })

    const validateForm = () => {
      const newErrors = {}
      
      if (!formData.value.title.trim()) {
        newErrors.title = 'Title is required'
      } else if (formData.value.title.length < 3) {
        newErrors.title = 'Title must be at least 3 characters'
      }
      
      if (!formData.value.status) {
        newErrors.status = 'Status is required'
      } else if (!['open', 'in_progress', 'closed'].includes(formData.value.status)) {
        newErrors.status = 'Status must be open, in_progress, or closed'
      }
      
      errors.value = newErrors
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = () => {
      if (!validateForm()) return
      
      loading.value = true
      emit('submit', formData.value)
      loading.value = false
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