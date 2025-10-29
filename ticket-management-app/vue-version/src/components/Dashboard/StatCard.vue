<template>
  <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-2">{{ value }}</p>
      </div>
      <div :class="['w-12 h-12', color, 'rounded-lg flex items-center justify-center']">
        <component :is="iconComponent" class="w-6 h-6" :class="iconColor" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    color: {
      type: String,
      default: 'bg-blue-100'
    },
    icon: {
      type: String,
      default: 'ticket'
    }
  },
  setup(props) {
    const iconComponent = computed(() => {
      const icons = {
        ticket: 'TicketIcon',
        open: 'OpenIcon',
        progress: 'ProgressIcon',
        resolved: 'ResolvedIcon'
      }
      return icons[props.icon] || 'TicketIcon'
    })

    const iconColor = computed(() => {
      const colors = {
        'bg-blue-100': 'text-blue-600',
        'bg-green-100': 'text-green-600',
        'bg-amber-100': 'text-amber-600',
        'bg-gray-100': 'text-gray-600'
      }
      return colors[props.color] || 'text-blue-600'
    })

    const TicketIcon = {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      `
    }

    const OpenIcon = {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      `
    }

    const ProgressIcon = {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `
    }

    const ResolvedIcon = {
      template: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `
    }

    return {
      iconComponent,
      iconColor,
      TicketIcon,
      OpenIcon,
      ProgressIcon,
      ResolvedIcon
    }
  }
}
</script>