"use client"

import React, { useState } from 'react'
import { Trash2, AlertTriangle, Download, Loader2 } from 'lucide-react'
import { exportUserData, deleteUserAccount } from '@/actions/settingsActions'
import { toast } from 'sonner'

const DangerZone = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const result = await exportUserData()
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      // Create and download file
      const blob = new Blob([JSON.stringify(result.data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `linkstudio-data-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast.success('Data exported successfully')
    } catch (error) {
      toast.error('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type DELETE to confirm')
      return
    }

    setIsDeleting(true)
    try {
      const result = await deleteUserAccount()
      
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Account deleted successfully')
        // Redirect to home page after successful deletion
        window.location.href = '/'
      }
    } catch (error) {
      toast.error('Failed to delete account')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Danger Zone</h2>
        <p className="text-gray-600">Irreversible and destructive actions</p>
      </div>

      {/* Export Data */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Download className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Your Data</h3>
            <p className="text-gray-600 mb-4">
              Download a copy of all your data including profile information, links, and analytics. 
              This may take a few minutes to prepare.
            </p>
            <button
              onClick={handleExportData}
              disabled={isExporting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isExporting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isExporting ? 'Preparing Export...' : 'Export Data'}
            </button>
          </div>
        </div>
      </div>

      {/* Deactivate Account */}
      <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Deactivate Account</h3>
            <p className="text-gray-600 mb-4">
              Temporarily deactivate your account. Your profile will be hidden but your data will be preserved. 
              You can reactivate anytime by logging in.
            </p>
            <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
              Deactivate Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div className="border border-red-200 bg-red-50 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 rounded-lg">
            <Trash2 className="w-5 h-5 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Account</h3>
            <p className="text-gray-600 mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            
            <div className="bg-red-100 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-1">This will permanently:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Delete your profile and all links</li>
                    <li>Remove all analytics data</li>
                    <li>Cancel any active subscriptions</li>
                    <li>Make your username available to others</li>
                  </ul>
                </div>
              </div>
            </div>

            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="font-mono bg-gray-100 px-1 rounded">DELETE</span> to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Type DELETE here"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || deleteConfirmText !== 'DELETE'}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    {isDeleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false)
                      setDeleteConfirmText('')
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
        <p className="text-gray-600 mb-4">
          If you're having issues with your account or need assistance with any of these actions, 
          our support team is here to help.
        </p>
        <button
          onClick={() => window.open('/contact', '_blank')}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Contact Support
        </button>
      </div>
    </div>
  )
}

export default DangerZone