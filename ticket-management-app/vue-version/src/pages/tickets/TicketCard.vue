<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
    <!-- Header -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {{ ticket.title }}
        </h3>
        <div class="flex flex-wrap gap-2">
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            statusConfig[ticket.status]?.color || statusConfig.open.color
          ]">
            {{ statusConfig[ticket.status]?.label || 'Open' }}
          </span>
          <span :class="[
            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
            priorityConfig[ticket.priority]?.color || priorityConfig.medium.color
          ]">
            {{ priorityConfig[ticket.priority]?.label || 'Medium' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p v-if="ticket.description" class="text-gray-600 text-sm mb-4 line-clamp-3">
      {{ ticket.description }}
    </p>

    <!-- Dates -->
    <div class="text-xs text-gray-500 space-y-1 mb-4">
      <div>Created: {{ formatDate(ticket.createdAt) }}</div>
      <div v-if="ticket.updatedAt !== ticket.createdAt">
        Updated: {{ formatDate(ticket.updatedAt) }}
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-between items-center pt-4 border-t border-gray-200">
      <Button
        variant="secondary"
        size="small"
        @click="$emit('edit', ticket)"
      >
        Edit
      </Button>
      <Button
        variant="danger"
        size="small"
        @click="$emit('delete', ticket.id)"
      >
        Delete
      </Button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import Button from '../../components/UI/Button.vue'

export default {
  name: 'TicketCard',
  components: {
    Button
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete'],
  setup(props) {
    const statusConfig = {
      open: { color: 'bg-green-100 text-green-800', label: 'Open' },
      in_progress: { color: 'bg-amber-100 text-amber-800', label: 'In Progress' },
      closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed' }
    }

    const priorityConfig = {
      low: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
      medium: { color: 'bg-blue-100 text-blue-800', label: 'Medium' },
      high: { color: 'bg-amber-100 text-amber-800', label: 'High' },
      critical: { color: 'bg-red-100 text-red-800', label: 'Critical' }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    return {
      statusConfig,
      priorityConfig,
      formatDate
    }
  }
}
</script>