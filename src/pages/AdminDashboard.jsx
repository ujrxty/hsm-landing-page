import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Flame, LogOut, Users, Mail, Phone, Building, DollarSign, Target,
  MessageSquare, Clock, ChevronDown, Search, Filter, Download, Trash2, Eye, X
} from 'lucide-react'

export default function AdminDashboard() {
  const [applications, setApplications] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedApp, setSelectedApp] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      navigate('/admin')
      return
    }
    fetchApplications()
  }, [navigate])

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/applications', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const data = await response.json()
        setApplications(data)
      } else if (response.status === 401) {
        localStorage.removeItem('adminToken')
        navigate('/admin')
      }
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin')
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await fetch(`/api/admin/applications/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      setApplications(applications.filter(app => app.id !== id))
    } catch (error) {
      console.error('Error deleting application:', error)
    }
  }

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Business Type', 'Revenue', 'Goal', 'Challenge', 'Investment', 'Date'],
      ...applications.map(app => [
        app.name,
        app.email,
        app.phone,
        app.business_type,
        app.revenue,
        app.goal,
        app.challenge,
        app.investment,
        new Date(app.created_at).toLocaleDateString(),
      ]),
    ].map(row => row.map(cell => `"${cell || ''}"`).join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch =
      app.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.business_type?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const stats = {
    total: applications.length,
    thisWeek: applications.filter(app => {
      const date = new Date(app.created_at)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return date >= weekAgo
    }).length,
    highRevenue: applications.filter(app =>
      app.revenue?.includes('$50,000') || app.revenue?.includes('$100,000')
    ).length,
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Manage applications</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: stats.total, icon: Users, color: 'from-blue-500 to-cyan-500' },
            { label: 'This Week', value: stats.thisWeek, icon: Clock, color: 'from-green-500 to-emerald-500' },
            { label: 'High Revenue Leads', value: stats.highRevenue, icon: DollarSign, color: 'from-red-500 to-orange-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="font-display text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, or business type..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-600 focus:border-red-500 outline-none transition-colors"
            />
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-colors"
          >
            <Download className="w-5 h-5" />
            Export CSV
          </button>
        </div>

        {/* Applications Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-gray-400">Loading applications...</div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              {searchQuery ? 'No applications match your search.' : 'No applications yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Applicant</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Business</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Revenue</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Goal</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Date</th>
                    <th className="text-left text-gray-400 font-medium text-sm px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app, index) => (
                    <motion.tr
                      key={app.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-white">{app.name}</p>
                          <p className="text-sm text-gray-400">{app.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                          {app.business_type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">{app.revenue}</td>
                      <td className="px-6 py-4 text-gray-300">{app.goal}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="font-display text-xl font-bold text-white">Application Details</h3>
                <button
                  onClick={() => setSelectedApp(null)}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { icon: Users, label: 'Name', value: selectedApp.name },
                  { icon: Mail, label: 'Email', value: selectedApp.email },
                  { icon: Phone, label: 'Phone', value: selectedApp.phone },
                  { icon: Building, label: 'Business Type', value: selectedApp.business_type },
                  { icon: DollarSign, label: 'Current Revenue', value: selectedApp.revenue },
                  { icon: Target, label: 'Revenue Goal', value: selectedApp.goal },
                  { icon: MessageSquare, label: 'Biggest Challenge', value: selectedApp.challenge },
                  { icon: Clock, label: 'Investment Ready', value: selectedApp.investment },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{item.label}</p>
                      <p className="text-white">{item.value || 'Not provided'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
