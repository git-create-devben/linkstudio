"use client"

import { useUserContentStore } from "@/stores/useContentStore"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, ExternalLink, Users, Sparkles, Crown, Lock } from "lucide-react"
import { socialPlatforms, getPlatformIcon } from "@/lib/getPlatformIcons"
import { deleteSocialLink } from "@/actions/editorActions"
import { toast } from "sonner"
import { useState } from "react"
import { useUser } from "@/context/userContext"
import { canUserAddSocialLink, getUserPlan, getPlanLimits } from "@/lib/planUtils"
import { SocialLink } from "@/types/editorTypes"

interface SocialLinksMainViewProps {
  onAddSocialLink: () => void
  onEditSocialLink: (linkId: string) => void
}

export function SocialLinksMainView({ onAddSocialLink, onEditSocialLink }: SocialLinksMainViewProps) {
  const { socialLinks, removeSocialLink } = useUserContentStore()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const user = useUser()
  const userPlan = getUserPlan(user)
  const planLimits = getPlanLimits(userPlan)
  const canAddMoreLinks = canUserAddSocialLink(user, socialLinks?.length || 0)
  const maxSocialLinks = planLimits.socialLinks

  const handleDelete = async (linkId: string) => {
    if (!confirm('Are you sure you want to delete this social link?')) return
    
    setDeletingId(linkId)
    try {
      await deleteSocialLink(linkId)
      removeSocialLink(linkId)
      toast.success('Social link deleted successfully')
    } catch (error) {
      toast.error('Failed to delete social link')
    } finally {
      setDeletingId(null)
    }
  }

  const SocialLinkCard = ({ link }: { link: SocialLink }) => {
    const platform = socialPlatforms.find(p => p.name.toLowerCase() === link.name.toLowerCase())
    const isDeleting = deletingId === link.id

    return (
      <div className="group bg-white  rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: platform?.color + '15' }}
          >
            <div style={{ color: platform?.color }}>
              {platform ? getPlatformIcon(platform.id, 24) : <Users className="w-6 h-6" />}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 capitalize">{link.name}</h3>
            <p className="text-sm text-gray-500 truncate">{link.url}</p>
          </div>
          
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => window.open(link.url, '_blank')}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Visit link"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEditSocialLink(link.id)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Edit link"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(link.id)}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete link"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
        <Users className="w-10 h-10 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Your Social Profiles</h3>
      <p className="text-gray-600 mb-6 max-w-sm">
        Add your social media profiles to help visitors connect with you across platforms.
      </p>
      <button
        onClick={onAddSocialLink}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Plus className="w-5 h-5" />
        Add Your First Link
      </button>
    </div>
  )

  return (
    <div className="flex flex-col bg-gradient-to-br from-white to-gray-50/50 text-black">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-100 bg-whit flex-shrink-0">
        <div className="flex items-center gap-3 ">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
            <p className="text-sm text-gray-500">Connect your social profiles</p>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{socialLinks?.length || 0}</span>
              <span className="text-xs text-gray-600">
                {socialLinks?.length === 1 ? 'profile connected' : 'profiles connected'}
              </span>
            </div>
            {maxSocialLinks !== -1 && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                <Sparkles size={14} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {maxSocialLinks - (socialLinks?.length || 0)} remaining
                </span>
              </div>
            )}
          </div>
          
          <button 
            onClick={onAddSocialLink}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
              canAddMoreLinks 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-blue-200/50 hover:shadow-lg hover:shadow-blue-300/50 transform hover:scale-105 active:scale-95' 
                : 'bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200'
            }`}
            disabled={!canAddMoreLinks}
          >
            {canAddMoreLinks ? (
              <>
                <Plus size={16} />
                Add Link
              </>
            ) : (
              <>
                <Lock size={16} />
                Upgrade to Add More
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Plan Limitation Warning */}
      {!canAddMoreLinks && userPlan === 'free' && (
        <div className="mx-6 mt-4 bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-sm">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-amber-900">Free Plan Limit Reached</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                  {maxSocialLinks} max
                </span>
              </div>
              <p className="text-xs text-amber-700/80 leading-relaxed mb-3">
                You've connected the maximum number of social profiles for the free plan. 
                Upgrade to connect unlimited social links and unlock more features.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto min-h-0">
        {socialLinks?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((link) => (
              <SocialLinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}