<template>
  <span :class="[
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    statusConfig[status]?.color || statusConfig.open.color
  ]">
    {{ statusConfig[status]?.label || 'Open' }}
  </span>
</template>

<script>
export default {
  name: 'StatusBadge',
  props: {
    status: {
      type: String,
      required: true,
      validator: (value) => ['open', 'in_progress', 'closed'].includes(value)
    }
  },
  setup() {
    const statusConfig = {
      open: { color: 'bg-green-100 text-green-800', label: 'Open' },
      in_progress: { color: 'bg-amber-100 text-amber-800', label: 'In Progress' },
      closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed' }
    }

    return {
      statusConfig
    }
  }
}
</script>