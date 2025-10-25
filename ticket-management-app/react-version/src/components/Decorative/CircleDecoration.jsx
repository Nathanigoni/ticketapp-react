import React from 'react'

function CircleDecoration({ size = 'medium', color = 'blue', className = '' }) {
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

  return (
    <div className={`${sizes[size]} ${colors[color]} ${className} rounded-full opacity-60`} />
  )
}

export default CircleDecoration