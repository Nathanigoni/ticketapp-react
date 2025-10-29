<template>
  <div 
    :class="[
      sizes[size],
      colors[color],
      className,
      'rounded-full opacity-60'
    ]" 
  />
</template>

<script>
export default {
  name: 'CircleDecoration',
  props: {
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large', 'xlarge'].includes(value)
    },
    color: {
      type: String,
      default: 'blue',
      validator: (value) => ['blue', 'green', 'amber', 'gray'].includes(value)
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup() {
    const sizes = {
      small: 'w-8 h-8',
      medium: 'w-16 h-16',
      large: 'w-24 h-24',
      xlarge: 'w-32 h-32'
    }

    const colors = {
      blue: 'bg-blue-200',
      green: 'bg-green-200',
      amber: 'bg-amber-200',
      gray: 'bg-gray-200'
    }

    return {
      sizes,
      colors
    }
  }
}
</script>