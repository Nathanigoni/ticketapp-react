import { ref, onMounted } from 'vue'

// Mock data storage
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
    }
  ]
}

const saveTickets = (tickets) => {
  localStorage.setItem('ticketapp_tickets', JSON.stringify(tickets))
}

export function useTickets() {
  const tickets = ref([])
  const loading = ref(false)

  onMounted(() => {
    tickets.value = getStoredTickets()
  })

  const createTicket = (ticketData) => {
    const newTicket = {
      id: Date.now(),
      ...ticketData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    tickets.value = [newTicket, ...tickets.value]
    saveTickets(tickets.value)
    return newTicket
  }

  const updateTicket = (ticketId, ticketData) => {
    const updatedTickets = tickets.value.map(ticket =>
      ticket.id === ticketId
        ? { ...ticket, ...ticketData, updatedAt: new Date().toISOString() }
        : ticket
    )
    
    tickets.value = updatedTickets
    saveTickets(updatedTickets)
    return updatedTickets.find(t => t.id === ticketId)
  }

  const deleteTicket = (ticketId) => {
    tickets.value = tickets.value.filter(ticket => ticket.id !== ticketId)
    saveTickets(tickets.value)
  }

  const getTicketById = (ticketId) => {
    return tickets.value.find(ticket => ticket.id === ticketId)
  }

  return {
    tickets,
    loading,
    createTicket,
    updateTicket,
    deleteTicket,
    getTicketById
  }
}