import React from 'react'
import Button from '../../components/UI/Button'

function TicketCard({ ticket, onEdit, onDelete }) {
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

  const status = statusConfig[ticket.status] || statusConfig.open
  const priority = priorityConfig[ticket.priority] || priorityConfig.medium

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {ticket.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
              {status.label}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priority.color}`}>
              {priority.label}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      {ticket.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {ticket.description}
        </p>
      )}

      {/* Dates */}
      <div className="text-xs text-gray-500 space-y-1 mb-4">
        <div>Created: {formatDate(ticket.createdAt)}</div>
        {ticket.updatedAt !== ticket.createdAt && (
          <div>Updated: {formatDate(ticket.updatedAt)}</div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <Button
          variant="secondary"
          size="small"
          onClick={() => onEdit(ticket)}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          size="small"
          onClick={() => onDelete(ticket.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default TicketCard