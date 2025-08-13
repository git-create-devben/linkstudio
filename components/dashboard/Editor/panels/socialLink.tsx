"use client"
import React, { useEffect, useState } from 'react';
import { X, Crown, Lock, Plus, Loader2, Sparkles, Users, ArrowUpRight, Edit3, Trash2, ExternalLink } from 'lucide-react';
import { useUserContentStore } from '@/stores/useContentStore';
import { createSocialLink, updateSocialLink, deleteSocialLink, getSocialLinks } from '@/actions/editorActions';
import { SocialLink, SocialPlatform } from '@/types/editorTypes';
import { toast } from 'sonner';
import { useUser } from '@/context/userContext';
import { canUserAddSocialLink, getUserPlan, getPlanLimits, getUpgradeMessage } from '@/lib/planUtils';
import { useRouter } from 'next/navigation';
import { socialPlatforms, getPlatformIcon } from '@/lib/getPlatformIcons';

const SocialLinksPanel = ({ onClose }: { onClose: () => void }) => {
  const {socialLinks, setSocialLinks, addSocialLink, updateSocialLink: updateStoreLink, removeSocialLink } = useUserContentStore();
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [handle, setHandle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const user = useUser();
  const router = useRouter();
  const userPlan = getUserPlan(user);
  const planLimits = getPlanLimits(userPlan);
  const canAddMoreLinks = canUserAddSocialLink(user, socialLinks?.length || 0);
  const maxSocialLinks = planLimits.socialLinks;

  useEffect(() => {
    if (editingLink) {
      const platformKey = editingLink.name.toLowerCase();
      const platformData = socialPlatforms.find(p => p.name.toLowerCase() === platformKey || p.id === platformKey);
      if (platformData) {
        setSelectedPlatform(platformData);
        const handleValue = editingLink.url.replace(platformData.baseUrl, '');
        setHandle(handleValue);
      }
    } else {
      setSelectedPlatform(null);
      setHandle('');
    }
  }, [editingLink]);

  const handleAddClick = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (linkId: string) => {
    const link = socialLinks.find((l) => l.id === linkId);
    if (link) {
      setEditingLink(link);
      setIsModalOpen(true);
    }
  };

  const handleDelete = async (linkId: string) => {
    setDeletingId(linkId);
    try {
      await deleteSocialLink(linkId);
      removeSocialLink(linkId);
      toast.success('Social link deleted successfully');
    } catch (error) {
      toast.error('Failed to delete social link');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !handle.trim()) {
      toast.error('Please enter a valid username or handle');
      return;
    }

    setIsLoading(true);
    const newUrl = selectedPlatform.baseUrl + handle.trim();

    try {
      if (editingLink) {
        await updateSocialLink(editingLink.id, newUrl);
        updateStoreLink(editingLink.id, newUrl);
        toast.success('Social link updated successfully!');
      } else {
        const newLink = await createSocialLink({ name: selectedPlatform.name, url: newUrl });
        addSocialLink(newLink as any);
        toast.success('Social link added successfully!');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error(editingLink ? 'Failed to update social link' : 'Failed to add social link');
    } finally {
      setIsLoading(false);
      setEditingLink(null);
      setSelectedPlatform(null);
      setHandle('');
    }
  };

  const filteredPlatforms = socialPlatforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        onClick={handleAddClick}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Plus className="w-5 h-5" />
        Add Your First Link
      </button>
    </div>
  );

  const SocialLinkCard = ({ link }: { link: SocialLink }) => {
    const platform = socialPlatforms.find(p => p.name.toLowerCase() === link.name.toLowerCase());
    const isDeleting = deletingId === link.id;

    return (
      <div className="group bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
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
              onClick={() => handleEditClick(link.id)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Edit link"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(link.id)}
              disabled={isDeleting}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
              title="Delete link"
            >
              {isDeleting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PlatformGrid = () => (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose a Platform</h3>
        <input
          type="text"
          placeholder="Search platforms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
        {filteredPlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setSelectedPlatform(platform)}
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all text-left"
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
              <div className="font-medium text-gray-900">{platform.name}</div>
              <div className="text-xs text-gray-500">{platform.baseUrl}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-white to-gray-50/50 text-black">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
            <p className="text-sm text-gray-500">Connect your social profiles</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <X size={20} className="text-gray-500" />
        </button>
      </header>

      {/* Stats Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{socialLinks?.length || 0}</span>
              <span className="text-sm text-gray-600">
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
            onClick={() => {
              if (!canAddMoreLinks) {
                toast.error(getUpgradeMessage('socialLinks'));
                router.push('/payment');
                return;
              }
              handleAddClick();
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm ${
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
              <button 
                onClick={() => router.push('/payment')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg text-xs font-medium hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
              >
                <Crown size={12} />
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {socialLinks?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <SocialLinkCard key={link.id} link={link} />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden text-black shadow-2xl border border-gray-100">
            {selectedPlatform ? (
              <>
                {/* Form Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50/50">
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
                        {editingLink ? 'Edit' : 'Add'} {selectedPlatform.name}
                      </h3>
                      <p className="text-sm text-gray-500">Connect your profile</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    disabled={isLoading}
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSave} className="p-6">
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-800 mb-3">
                      {selectedPlatform.name} Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder={selectedPlatform.placeholder}
                        className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 bg-gray-50/50 hover:bg-white hover:border-gray-300 text-base"
                        autoFocus
                        disabled={isLoading}
                      />
                      {isLoading && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <Loader2 size={20} className="animate-spin text-blue-500" />
                        </div>
                      )}
                    </div>
                    <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Preview URL:</p>
                      <p className="font-mono text-sm text-blue-600 break-all">
                        {selectedPlatform.baseUrl}{handle || selectedPlatform.placeholder}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200 font-medium"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!handle.trim() || isLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          {editingLink ? 'Updating...' : 'Adding...'}
                        </>
                      ) : (
                        editingLink ? 'Update Link' : 'Add Link'
                      )}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <PlatformGrid />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinksPanel;