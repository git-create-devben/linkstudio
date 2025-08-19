"use client"

import { useState } from "react"
import { X, Copy, Check, Share2, MessageCircle, Mail, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  shareUrl: string
  profileName: string
  profileBio?: string
}

export function ShareModal({ isOpen, onClose, shareUrl, profileName, profileBio }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleNativeShare = async () => {
    const shareData = {
      title: `${profileName} - My Links`,
      text: profileBio || `Check out ${profileName}'s links`,
      url: shareUrl
    }

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast.success('Shared successfully!')
        onClose()
      } else {
        handleCopyLink()
      }
    } catch (error) {
      handleCopyLink()
    }
  }

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`Check out ${profileName}'s links: ${shareUrl}`)}`
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-blue-400 hover:bg-blue-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out ${profileName}'s links`)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodeURIComponent(`Check out ${profileName}'s links`)}&body=${encodeURIComponent(`I thought you might be interested in ${profileName}'s links: ${shareUrl}`)}`
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-sm">
              <Share2 size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Share Your Profile</h2>
              <p className="text-xs text-gray-600">Let others discover your links</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* URL Display and Copy */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-900">
              Your Profile Link
            </label>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <span className="text-sm text-gray-600 flex-1 truncate">{shareUrl}</span>
              <Button
                onClick={handleCopyLink}
                size="sm"
                variant="outline"
                className="flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-1 text-green-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Native Share Button */}
          <div>
            <Button
              onClick={handleNativeShare}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>

          {/* Social Share Options */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-900">
              Share on Social Media
            </label>
            <div className="grid grid-cols-3 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  onClick={() => {
                    window.open(option.url, '_blank', 'width=600,height=400')
                  }}
                  className={`${option.color} text-white p-3 rounded-lg transition-colors flex flex-col items-center gap-1 hover:scale-105 transform transition-transform`}
                >
                  <option.icon size={20} />
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}