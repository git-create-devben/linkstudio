"use client"

import { useState, useEffect } from "react"
import { X, Save, Check, AlertCircle, Link } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { getUser } from "@/actions/authActions"

interface CustomizeURLModalProps {
  isOpen: boolean
  onClose: () => void
  currentUsername: string
}

export function CustomizeURLModal({ isOpen, onClose, currentUsername }: CustomizeURLModalProps) {
  const [username, setUsername] = useState('')
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      setUsername(currentUsername)
      setIsAvailable(null)
      setError('')
      // Get user ID
      getUser().then(user => {
        if (user?.id) {
          setUserId(user.id)
        }
      })
    }
  }, [isOpen, currentUsername])

  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (!usernameToCheck || !userId) return

    // If it's the same as current username, it's available
    if (usernameToCheck === currentUsername) {
      setIsAvailable(true)
      setError('')
      return
    }

    setIsChecking(true)
    setError('')

    try {
      const response = await fetch('/api/check-username-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: usernameToCheck }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAvailable(data.available)
        if (!data.available) {
          setError('Username is not available')
        }
      } else {
        setError(data.message || 'Failed to check username availability')
        setIsAvailable(false)
      }
    } catch (error) {
      setError('An error occurred while checking username availability')
      setIsAvailable(false)
    } finally {
      setIsChecking(false)
    }
  }

  const handleUsernameChange = (value: string) => {
    // Clean username: lowercase, alphanumeric and hyphens only
    const cleanUsername = value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setUsername(cleanUsername)
    setIsAvailable(null)
    setError('')

    // Debounce the availability check
    if (cleanUsername.length >= 3) {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(cleanUsername)
      }, 500)
      return () => clearTimeout(timeoutId)
    }
  }

  const handleSubmit = async () => {
    if (!username || !userId || !isAvailable) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/update-username', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, userId }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Username updated successfully!")
        onClose()
        // Refresh the page to update the URL display
        window.location.reload()
      } else {
        setError(data.message || 'Failed to update username')
      }
    } catch (error) {
      setError('An error occurred while updating username')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const isValidUsername = username.length >= 3 && /^[a-z0-9-]+$/.test(username)

  return (
    <div className="fixed inset-0 h-[60vh] w-full flex items-center justify-center bg-blac z-50 text-black">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-sm">
              <Link size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Customize URL</h2>
              <p className="text-xs text-gray-600">Choose your unique link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Your Link
            </label>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-center text-gray-700">
                <span className="text-sm text-gray-500">https://lynk.id/</span>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="bg-transparent border-none outline-none flex-1 text-sm font-medium ml-1"
                  maxLength={30}
                />
                {isChecking && (
                  <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full ml-2" />
                )}
                {isAvailable === true && !isChecking && (
                  <Check className="w-4 h-4 text-green-500 ml-2" />
                )}
                {isAvailable === false && !isChecking && (
                  <AlertCircle className="w-4 h-4 text-red-500 ml-2" />
                )}
              </div>
            </div>
            
            {error && (
              <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                {error}
              </p>
            )}
            
            {isAvailable === true && !error && username !== currentUsername && (
              <p className="text-green-600 text-xs mt-2 flex items-center gap-1">
                <Check size={12} />
                Username is available!
              </p>
            )}

            <div className="mt-3 text-xs text-gray-500 space-y-1">
              <p>• Must be at least 3 characters long</p>
              <p>• Only lowercase letters, numbers, and hyphens allowed</p>
              <p>• Cannot start or end with a hyphen</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="text-white" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!isValidUsername || !isAvailable || isSubmitting || username === currentUsername}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? (
                "Updating..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update URL
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}