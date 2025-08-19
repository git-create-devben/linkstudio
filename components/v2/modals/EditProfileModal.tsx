"use client"

import { useState, useEffect } from "react"
import { X, Save, Upload, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserContentStore } from "@/stores/useContentStore"
import { uploadProfilePicture, uploadCoverImage } from "@/actions/editorActions"
import { toast } from "sonner"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { content, setContent } = useUserContentStore()
  const [formState, setFormState] = useState({
    profileName: '',
    profileBio: '',
    profilePicture: '',
    coverImage: '',
    profileVerified: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingProfile, setUploadingProfile] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)

  useEffect(() => {
    if (isOpen && content) {
      setFormState({
        profileName: content.profileName || '',
        profileBio: content.profileBio || '',
        profilePicture: content.profilePicture || '',
        coverImage: content.coverImage || '',
        profileVerified: content.profileVerified || false
      })
    }
  }, [isOpen, content])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      setContent(formState)
      toast.success("Profile updated successfully!")
      onClose()
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProfilePictureUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingProfile(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const url = await uploadProfilePicture(formData)
      setFormState(prev => ({ ...prev, profilePicture: url }))
      toast.success("Profile picture uploaded!")
    } catch (error) {
      toast.error("Failed to upload profile picture")
    } finally {
      setUploadingProfile(false)
    }
  }

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingCover(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const url = await uploadCoverImage(formData)
      setFormState(prev => ({ ...prev, coverImage: url }))
      toast.success("Cover image uploaded!")
    } catch (error) {
      toast.error("Failed to upload cover image")
    } finally {
      setUploadingCover(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-sm">
              <User size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Edit Profile</h2>
              <p className="text-xs text-gray-600">Update your profile information</p>
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile Picture */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <label className="block text-sm font-semibold mb-3 text-gray-900">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                {formState.profilePicture ? (
                  <img 
                    src={formState.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <User size={24} />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureUpload}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm"
                >
                  <Upload size={14} />
                  {uploadingProfile ? "Uploading..." : "Upload Image"}
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <label className="block text-sm font-semibold mb-3 text-gray-900">
              Cover Image
            </label>
            <div className="space-y-3">
              <div className="w-full h-24 rounded-lg bg-gray-100 overflow-hidden">
                {formState.coverImage ? (
                  <img 
                    src={formState.coverImage} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Upload size={20} />
                      <p className="text-xs mt-1">No cover image</p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageUpload}
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors text-sm"
                >
                  <Upload size={14} />
                  {uploadingCover ? "Uploading..." : "Upload Cover"}
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1200x400px or similar aspect ratio
                </p>
              </div>
            </div>
          </div>

          {/* Profile Name */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Display Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              placeholder="Your display name"
              value={formState.profileName}
              onChange={(e) => setFormState(prev => ({ ...prev, profileName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              required
            />
          </div>

          {/* Bio */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Bio
            </label>
            <textarea
              placeholder="Tell people about yourself..."
              value={formState.profileBio}
              onChange={(e) => setFormState(prev => ({ ...prev, profileBio: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent min-h-[80px] resize-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formState.profileBio.length}/160 characters
            </p>
          </div>

          {/* Verified Badge */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formState.profileVerified}
                onChange={(e) => setFormState(prev => ({ ...prev, profileVerified: e.target.checked }))}
                className="w-4 h-4 rounded border border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-1"
              />
              <div>
                <span className="text-sm font-semibold text-gray-900">Show Verified Badge</span>
                <p className="text-xs text-gray-500">Display a verification checkmark on your profile</p>
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !formState.profileName.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}