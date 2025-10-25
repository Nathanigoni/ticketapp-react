import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import CircleDecoration from '../components/Decorative/CircleDecoration'

// Mock data - in real app, this would come from an API
const mockTickets = [
  { id: 1, title: 'Login issue', status: 'open', priority: 'high', createdAt: '2024-01-15' },
  { id: 2, title: 'Payment failure', status: 'in_progress', priority: 'high', createdAt: '2024-01-14' },
  { id: 3, title: 'Feature request', status: 'open', priority: 'medium', createdAt: '2024-01-13' },
  { id: 4, title: 'Bug report', status: 'closed', priority: 'low', createdAt: '2024-01-12' },
]

function Dashboard() {
  const { user } = useAuth()
  const { addToast } = useToast()
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  })

  useEffect(() => {
    // Calculate stats from mock data
    const total = mockTickets.length
    const open = mockTickets.filter(ticket => ticket.status === 'open').length
    const inProgress = mockTickets.filter(ticket => ticket.status === 'in_progress').length
    const closed = mockTickets.filter(ticket => ticket.status === 'closed').length

    setStats({ total, open, inProgress, closed })
  }, [])

  const StatCard = ({ title, value, color, icon }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  )

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      open: { color: 'bg-green-100 text-green-800', label: 'Open' },
      in_progress: { color: 'bg-amber-100 text-amber-800', label: 'In Progress' },
      closed: { color: 'bg-gray-100 text-gray-800', label: 'Closed' }
    }
    
    const config = statusConfig[status] || statusConfig.open
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Here's what's happening with your tickets.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Tickets"
          value={stats.total}
          color="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          title="Open Tickets"
          value={stats.open}
          color="bg-green-100"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          }
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          color="bg-amber-100"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          title="Resolved"
          value={stats.closed}
          color="bg-gray-100"
          icon={
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      {/* Recent Tickets & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tickets */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
                <Link
                  to="/tickets"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              {mockTickets.slice(0, 4).map((ticket) => (
                <div key={ticket.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">{ticket.title}</p>
                      <p className="text-sm text-gray-500">Created {ticket.createdAt}</p>
                    </div>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/tickets?create=new"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Create New Ticket
              </Link>
              <Link
                to="/tickets"
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Manage Tickets
              </Link>
            </div>
          </div>

          {/* Support Status */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Response Time</span>
                <span className="text-sm font-medium text-gray-900">2.4 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Satisfaction Rate</span>
                <span className="text-sm font-medium text-green-600">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Cases</span>
                <span className="text-sm font-medium text-amber-600">{stats.open + stats.inProgress}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <CircleDecoration 
        size="medium" 
        color="blue" 
        className="absolute bottom-10 right-10 opacity-20" 
      />
    </div>
  )
}

export default Dashboard