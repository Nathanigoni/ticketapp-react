<template>
  <Layout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 mt-2">
          Welcome back, {{ auth.user?.name }}! Here's what's happening with your tickets.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tickets"
          :value="stats.total"
          color="bg-blue-100"
          icon="ticket"
        />
        <StatCard
          title="Open Tickets"
          :value="stats.open"
          color="bg-green-100"
          icon="open"
        />
        <StatCard
          title="In Progress"
          :value="stats.inProgress"
          color="bg-amber-100"
          icon="progress"
        />
        <StatCard
          title="Resolved"
          :value="stats.closed"
          color="bg-gray-100"
          icon="resolved"
        />
      </div>

      <!-- Recent Tickets & Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Tickets -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">Recent Tickets</h2>
                <router-link
                  to="/tickets"
                  class="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all
                </router-link>
              </div>
            </div>
            <div class="p-6">
              <div 
                v-for="ticket in recentTickets" 
                :key="ticket.id"
                class="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div>
                    <p class="font-medium text-gray-900">{{ ticket.title }}</p>
                    <p class="text-sm text-gray-500">Created {{ formatDate(ticket.createdAt) }}</p>
                  </div>
                </div>
                <StatusBadge :status="ticket.status" />
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="space-y-6">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <router-link
                to="/tickets?create=new"
                class="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Create New Ticket
              </router-link>
              <router-link
                to="/tickets"
                class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Manage Tickets
              </router-link>
            </div>
          </div>

          <!-- Support Status -->
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Support Status</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Average Response Time</span>
                <span class="text-sm font-medium text-gray-900">2.4 hours</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Satisfaction Rate</span>
                <span class="text-sm font-medium text-green-600">94%</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Active Cases</span>
                <span class="text-sm font-medium text-amber-600">{{ stats.open + stats.inProgress }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decorative Elements -->
      <CircleDecoration 
        size="medium" 
        color="blue" 
        class="absolute bottom-10 right-10 opacity-20" 
      />
    </div>
  </Layout>
</template>

<script>
import { ref, computed, inject, onMounted } from 'vue'
import { useTickets } from '../composables/useTickets'
import Layout from '../components/Layout/Layout.vue'
import StatCard from '../components/Dashboard/StatCard.vue'
import StatusBadge from '../components/UI/StatusBadge.vue'
import CircleDecoration from '../components/Decorative/CircleDecoration.vue'

export default {
  name: 'Dashboard',
  components: {
    Layout,
    StatCard,
    StatusBadge,
    CircleDecoration
  },
  setup() {
    const auth = inject('auth')
    const { tickets } = useTickets()

    const stats = computed(() => {
      const total = tickets.value.length
      const open = tickets.value.filter(ticket => ticket.status === 'open').length
      const inProgress = tickets.value.filter(ticket => ticket.status === 'in_progress').length
      const closed = tickets.value.filter(ticket => ticket.status === 'closed').length

      return { total, open, inProgress, closed }
    })

    const recentTickets = computed(() => {
      return tickets.value.slice(0, 4)
    })

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    return {
      auth,
      stats,
      recentTickets,
      formatDate
    }
  }
}
</script>