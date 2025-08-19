"use client"

import { useState } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUserContentStore } from "@/stores/useContentStore"
import { createSocialLink } from "@/actions/editorActions"
import { toast } from "sonner"
import { socialPlatforms, getPlatformIcon } from "@/lib/getPlatformIcons"

interface AddSocialLinkModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddSocialLinkModal({ isOpen, onClose }: AddSocialLinkModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null)
  const [handle, setHandle] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { addSocialLink } = useUserContentStore()

  const filteredPlatforms = socialPlatforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlatform || !handle.trim()) {
      toast.error('Please enter a valid username or handle')
      return
    }

    setIsSubmitting(true)
    const newUrl = selectedPlatform.baseUrl + handle.trim()

    try {
      const newLink = await createSocialLink({ 
        name: selectedPlatform.name, 
        url: newUrl 
      })
      addSocialLink(newLink as any)
      toast.success('Social link added successfully!')
      onClose()
      setSelectedPlatform(null)
      setHandle("")
    } catch (error) {
      toast.error('Failed to add social link')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    setSelectedPlatform(null)
    setHandle("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-hidden">
        {selectedPlatform ? (
          <>
            {/* Form Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-xl shadow-sm"
                  style={{ backgroundColor: selectedPlatform.color + '15' }}
                >
                  <div style={{ color: selectedPlatform.color }}>
                    {getPlatformIcon(selectedPlatform.id, 24)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Add {selectedPlatform.name}
                  </h3>
                  <p className="text-sm text-gray-500">Connect your profile</p>
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
                <label className="block text-sm font-semibold text-black mb-3">
                  {selectedPlatform.name} Username
                </label>
                <Input
                  type="text"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder={selectedPlatform.placeholder}
                  className="w-full text-black"
                  autoFocus
                  disabled={isSubmitting}
                />
                <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-600 mb-1">Preview URL:</p>
                  <p className="font-mono text-sm text-blue-600 break-all">
                    {selectedPlatform.baseUrl}{handle || selectedPlatform.placeholder}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={!handle.trim() || isSubmitting}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
                  {isSubmitting ? 'Adding...' : 'Add Link'}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* Platform Selection Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Add Social Link</h2>
                <p className="text-sm text-gray-500">Choose a platform to connect</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-gray-200 text-black">
              <Input
                type="text"
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            {/* Platform Grid */}
            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="grid grid-cols-2 gap-3">
                {filteredPlatforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setSelectedPlatform(platform)}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all text-left group"
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: platform.color + '15' }}
                    >
                      <div style={{ color: platform.color }}>
                        {getPlatformIcon(platform.id, 20)}
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-purple-700">
                        {platform.name}
                      </div>
                      <div className="text-xs text-gray-500">{platform.baseUrl}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}