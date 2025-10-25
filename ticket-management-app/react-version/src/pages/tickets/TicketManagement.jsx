import React, { useState, useEffect } from 'react'
import { useToast } from '../../contexts/ToastContext'
import TicketForm from './TicketForm'
import TicketCard from './TicketCard'
import Button from '../../components/UI/Button'
import CircleDecoration from '../../components/Decorative/CircleDecoration'

// Mock data storage - in real app, this would be an API
const getStoredTickets = () => {
  const stored = localStorage.getItem('ticketapp_tickets')
  return stored ? JSON.parse(stored) : [
    {
      id: 1,
      title: 'Login issue on mobile app',
      description: 'Users are unable to login through the mobile application. Error message shows "Invalid credentials" even with correct details.',
      status: 'open',
      priority: 'high',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      title: 'Payment gateway integration',
      description: 'Integrate new payment gateway for international transactions.',
      status: 'in_progress',
      priority: 'high',
      createdAt: '2024-01-14T14:20:00Z',
      updatedAt: '2024-01-15T09:15:00Z'
    },
    {
      id: 3,
      title: 'Update user dashboard UI',
      description: 'Redesign the user dashboard to improve usability and add new metrics.',
      status: 'open',
      priority: 'medium',
      createdAt: '2024-01-13T11:45:00Z',
      updatedAt: '2024-01-13T11:45:00Z'
    },
    {
      id: 4,
      title: 'Fix email notification bug',
      description: 'Users are not receiving email notifications for completed actions.',
      status: 'closed',
      priority: 'low',
      createdAt: '2024-01-12T16:10:00Z',
      updatedAt: '2024-01-14T08:30:00Z'
    }
  ]
}

const saveTickets = (tickets) => {
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
}

function TicketManagement() {
  const [tickets, setTickets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [filter, setFilter] = useState('all')
  const { addToast } = useToast()

  useEffect(() => {
    setTickets(getStoredTickets())
  }, [])

  const createTicket = (ticketData) => {
    const newTicket = {
      id: Date.now(),
      ...ticketData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    const updatedTickets = [newTicket, ...tickets]
    setTickets(updatedTickets)
    saveTickets(updatedTickets)
    addToast('Ticket created successfully!', 'success')
    setShowForm(false)
  }

  const updateTicket = (ticketData) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === editingTicket.id
        ? { ...ticketData, updatedAt: new Date().toISOString() }
        : ticket
    )
    
    setTickets(updatedTickets)
    saveTickets(updatedTickets)
    addToast('Ticket updated successfully!', 'success')
    setEditingTicket(null)
    setShowForm(false)
  }

  const deleteTicket = (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      const updatedTickets = tickets.filter(ticket => ticket.id !== ticketId)
      setTickets(updatedTickets)
      saveTickets(updatedTickets)
      addToast('Ticket deleted successfully!', 'success')
    }
  }

  const handleEdit = (ticket) => {
    setEditingTicket(ticket)
    setShowForm(true)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTicket(null)
  }

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true
    return ticket.status === filter
  })

  const statusCounts = {
    all: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    closed: tickets.filter(t => t.status === 'closed').length
  }

  const FilterButton = ({ status, label }) => (
    <button
      onClick={() => setFilter(status)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        filter === status
          ? 'bg-blue-600 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label} ({statusCounts[status]})
    </button>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ticket Management</h1>
          <p className="text-gray-600 mt-2">
            Create, view, and manage support tickets
          </p>
        </div>
        
        <Button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0"
        >
          Create New Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
        <div className="flex flex-wrap gap-2">
          <FilterButton status="all" label="All Tickets" />
          <FilterButton status="open" label="Open" />
          <FilterButton status="in_progress" label="In Progress" />
          <FilterButton status="closed" label="Closed" />
        </div>
      </div>

      {/* Content */}
      {showForm ? (
        <TicketForm
          ticket={editingTicket}
          onSubmit={editingTicket ? updateTicket : createTicket}
          onCancel={handleCancel}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={handleEdit}
              onDelete={deleteTicket}
            />
          ))}
          
          {filteredTickets.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't created any tickets yet."
                  : `No ${filter.replace('_', ' ')} tickets found.`
                }
              </p>
              <Button onClick={() => setShowForm(true)}>
                Create Your First Ticket
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Decorative Elements */}
      <CircleDecoration 
        size="medium" 
        color="blue" 
        className="absolute bottom-10 right-10 opacity-20" 
      />
      <CircleDecoration 
        size="small" 
        color="green" 
        className="absolute top-20 left-10 opacity-20" 
      />
    </div>
  )
}

export default TicketManagement