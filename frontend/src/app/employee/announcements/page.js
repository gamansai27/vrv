'use client'

import React, { useEffect, useState } from 'react'
import { CalendarDays, AlertTriangle, Plus, Trash2 } from 'lucide-react'
import { fetchAnnouncements, addAnnouncement, deleteAnnouncement } from '../../../../lib/utils'
import { useAuth } from '../../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

export default function Announcements() {
  const { user, token } = useAuth()
  const [announcements, setAnnouncements] = useState([])
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', description: '', importance: 'Low', date: '', visibleTo: 'manager' })
  const [error, setError] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements(token)
        setAnnouncements(data)
      } catch (err) {
        console.error('Failed to fetch announcements:', err)
        setError('Could not load announcements')
      }
    }
    if (token) loadAnnouncements()
  }, [token])

  const handleAddAnnouncement = async (e) => {
    e.preventDefault()
    try {
      const addedAnnouncement = await addAnnouncement(newAnnouncement, token)
      setAnnouncements([...announcements, addedAnnouncement])
      setNewAnnouncement({ title: '', description: '', importance: 'Low', date: '', visibleTo: 'manager' })
      setIsModalOpen(false)
    } catch (err) {
      console.error('Failed to add announcement:', err)
      setError('Could not add announcement')
    }
  }

  const handleDeleteAnnouncement = async (id) => {
    try {
      await deleteAnnouncement(id, token)
      setAnnouncements(announcements.filter((announcement) => announcement._id !== id))
    } catch (err) {
      console.error('Failed to delete announcement:', err)
      setError('Could not delete announcement')
    }
  }

  const getImportanceStyle = (importance) => {
    switch (importance) {
      case 'High':
        return 'border-l-4 border-red-500'
      case 'Medium':
        return 'border-l-4 border-yellow-500'
      default:
        return 'border-l-4 border-green-500'
    }
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-24 bg-gray-50">
      <header className="bg-white text-green-800 shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-xl font-semibold">Announcements</h1>
          {user?.role === 'admin' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md inline-flex items-center justify-center text-sm sm:text-med transition-colors duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Announcement
            </button>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p className="text-sm sm:text-base">{error}</p>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {announcements.map((announcement) => (
              <motion.div
                key={announcement._id}
                className={`bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 ${getImportanceStyle(announcement.importance)}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 sm:p-6 bg-green-50">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">{announcement.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{announcement.description}</p>
                </div>
                <div className="px-4 sm:px-6 py-3 bg-gray-50 text-xs sm:text-sm text-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                    <span>Importance: {announcement.importance}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                    {new Date(announcement.date).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                {user?.role === 'admin' && (
                  <div className="px-4 sm:px-6 py-3 bg-gray-100 flex justify-end">
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement._id)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm inline-flex items-center transition-colors duration-300"
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                      Delete
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <form onSubmit={handleAddAnnouncement}>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4" id="modal-title">
                          Add New Announcement
                        </h3>
                        <div className="mb-4">
                          <label htmlFor="title" className="block text-sm font-medium text-black">Title</label>
                          <input
                            type="text"
                            name="title"
                            id="title"
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                          />
                        </div>
                        <div className="mb-4">
                          <label htmlFor="description" className="block text-sm font-medium text-black">Description</label>
                          <textarea
                            name="description"
                            id="description"
                            required
                            rows={3}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={newAnnouncement.description}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, description: e.target.value })}
                          ></textarea>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="importance" className="block text-sm font-medium text-black">Importance</label>
                          <select
                            name="importance"
                            id="importance"
                            required
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newAnnouncement.importance}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, importance: e.target.value })}
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="visibleTo" className="block text-sm font-medium text-black">Visible To</label>
                          <select
                            name="visibleTo"
                            id="visibleTo"
                            required
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            value={newAnnouncement.visibleTo}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, visibleTo: e.target.value })}
                          >
                            <option value="manager">Manager</option>
                            <option value="employee">Employee</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="date" className="block text-sm font-medium text-black">Date</label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={newAnnouncement.date}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, date: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-300"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}