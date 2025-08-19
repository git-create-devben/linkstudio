"use client"

import { useState, useEffect } from "react"
import { X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserContentStore } from "@/stores/useContentStore"
import { updateSocialLink } from "@/actions/editorActions"
import { toast } from "sonner"
import { socialPlatforms, getPlatformIcon } from "@/lib/getPlatformIcons"
import { SocialLink } from "@/types/editorTypes"

interface EditSocialLinkModalProps {
  isOpen: boolean
  onClose: () => void
  socialLink: SocialLink | null
}

export function EditSocialLinkModal({ isOpen, onClose, socialLink }: EditSocialLinkModalProps) {
  const [handle, setHandle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { updateSocialLink: updateStoreLink } = useUserContentStore()

  const platform = socialLink ? socialPlatforms.find(p => 
    p.name.toLowerCase() === socialLink.name.toLowerCase() || 
    p.id === socialLink.name.toLowerCase()
  ) : null

  useEffect(() => {
    if (socialLink && platform) {
      const handleValue = socialLink.url.replace(platform.baseUrl, '')
      setHandle(handleValue)
    }
  }, [socialLink, platform])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!socialLink || !platform || !handle.trim()) {
      toast.error('Please enter a valid username or handle')
      return
    }

    setIsSubmitting(true)
    const newUrl = platform.baseUrl + handle.trim()

    try {
      await updateSocialLink(socialLink.id, newUrl)
      updateStoreLink(socialLink.id, newUrl)
      toast.success('Social link updated successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to update social link')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !socialLink || !platform) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div 
              className="p-3 rounded-xl shadow-sm"
              style={{ backgroundColor: platform.color + '15' }}
            >
              <div style={{ color: platform.color }}>
                {getPlatformIcon(platform.id, 24)}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Edit {platform.name}
              </h3>
              <p className="text-sm text-gray-500">Update your profile link</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              {platform.name} Username
            </label>
            <Input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder={platform.placeholder}
              className="w-full text-black"
              autoFocus
              disabled={isSubmitting}
            />
            <div className="mt-3 p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-1">Preview URL:</p>
              <p className="font-mono text-sm text-blue-600 break-all">
                {platform.baseUrl}{handle || platform.placeholder}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!handle.trim() || isSubmitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                'Updating...'
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Update Link
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}