<template>
  <Layout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Ticket Management</h1>
          <p class="text-gray-600 mt-2">
            Create, view, and manage support tickets
          </p>
        </div>
        
        <Button
          @click="showForm = true"
          class="mt-4 sm:mt-0"
        >
          Create New Ticket
        </Button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filterOption in filterOptions"
            :key="filterOption.status"
            @click="filter = filterOption.status"
            :class="[
              'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
              filter === filterOption.status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ filterOption.label }} ({{ filterOption.count }})
          </button>
        </div>
      </div>

      <!-- Content -->
      <TicketForm
        v-if="showForm"
        :ticket="editingTicket"
        @submit="handleFormSubmit"
        @cancel="handleFormCancel"
      />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
        >
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
            <button
              @click="handleEdit(ticket)"
              class="px-3 py-1.5 text-sm font-medium bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Edit
            </button>
            <button
              @click="handleDelete(ticket.id)"
              class="px-3 py-1.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
        
        <div v-if="filteredTickets.length === 0" class="col-span-full text-center py-12">
          <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
          <p class="text-gray-600 mb-4">
            {{ filter === 'all' 
              ? "You haven't created any tickets yet."
              : `No ${filter.replace('_', ' ')} tickets found.`
            }}
          </p>
          <button
            @click="showForm = true"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your First Ticket
          </button>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="w-16 h-16 bg-blue-200 rounded-full opacity-20 absolute bottom-10 right-10"></div>
      <div class="w-8 h-8 bg-green-200 rounded-full opacity-20 absolute top-20 left-10"></div>
    </div>
  </Layout>
</template>

<script>
import { ref, computed, inject } from 'vue'
import { useTickets } from '../../composables/useTickets'
import Layout from '../../components/Layout/Layout.vue'
import Button from '../../components/UI/Button.vue'
import TicketForm from './TicketForm.vue'

export default {
  name: 'TicketManagement',
  components: {
    Layout,
    Button,
    TicketForm
  },
  setup() {
    const toast = inject('toast')
    const { tickets, createTicket, updateTicket, deleteTicket } = useTickets()
    
    const showForm = ref(false)
    const editingTicket = ref(null)
    const filter = ref('all')

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

    const statusCounts = computed(() => {
      return {
        all: tickets.value.length,
        open: tickets.value.filter(t => t.status === 'open').length,
        in_progress: tickets.value.filter(t => t.status === 'in_progress').length,
        closed: tickets.value.filter(t => t.status === 'closed').length
      }
    })

    const filterOptions = computed(() => [
      { status: 'all', label: 'All Tickets', count: statusCounts.value.all },
      { status: 'open', label: 'Open', count: statusCounts.value.open },
      { status: 'in_progress', label: 'In Progress', count: statusCounts.value.in_progress },
      { status: 'closed', label: 'Closed', count: statusCounts.value.closed }
    ])

    const filteredTickets = computed(() => {
      if (filter.value === 'all') return tickets.value
      return tickets.value.filter(ticket => ticket.status === filter.value)
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    const handleFormSubmit = (ticketData) => {
      if (editingTicket.value) {
        updateTicket(editingTicket.value.id, ticketData)
        toast.addToast('Ticket updated successfully!', 'success')
      } else {
        createTicket(ticketData)
        toast.addToast('Ticket created successfully!', 'success')
      }
      showForm.value = false
      editingTicket.value = null
    }

    const handleFormCancel = () => {
      showForm.value = false
      editingTicket.value = null
    }

    const handleEdit = (ticket) => {
      editingTicket.value = ticket
      showForm.value = true
    }

    const handleDelete = (ticketId) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
        deleteTicket(ticketId)
        toast.addToast('Ticket deleted successfully!', 'success')
      }
    }

    return {
      showForm,
      editingTicket,
      filter,
      filterOptions,
      statusCounts,
      filteredTickets,
      statusConfig,
      priorityConfig,
      formatDate,
      handleFormSubmit,
      handleFormCancel,
      handleEdit,
      handleDelete
    }
  }
}
</script>