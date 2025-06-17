"use client"
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useUserContentStore } from '@/stores/useContentStore';
import { createSocialLink, updateSocialLink, deleteSocialLink, getSocialLinks } from '@/actions/editorActions';
import EmptyState from '../emptyState';
import SocialLinksList from '../socialLinkList';
import { SocialLink, SocialPlatform } from '@/types/editorTypes';
import { toast } from 'sonner';
import PlatformSelector from '../platFormSelector';

const SocialLinksPanel = ({ onClose }: { onClose: () => void }) => {
  const {socialLinks, setSocialLinks, addSocialLink, updateSocialLink: updateStoreLink, removeSocialLink } = useUserContentStore();
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform | null>(null);
  const [handle, setHandle] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);

  console.log("social links", socialLinks)
  useEffect(() => {

    
    
    if (editingLink) {
      const platformKey = editingLink.name;
      const platformData = socialPlatforms[platformKey];
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
    toast.loading('Deleting link...');
    try {
      await deleteSocialLink(linkId);
      removeSocialLink(linkId);
      toast.success('Link deleted.');
    } catch (error) {
      toast.error('Failed to delete link.');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlatform || !handle) {
      toast.error('Invalid platform or handle.');
      return;
    }

    const newUrl = selectedPlatform.baseUrl + handle;
    // toast.loading(editingLink ? 'Updating link...' : 'Adding link...');
    setIsModalOpen(false);

    try {
      if (editingLink) {
        await updateSocialLink(editingLink.id, newUrl);
        updateStoreLink(editingLink.id, newUrl);
        toast.success('Link updated successfully!');
      } else {
        const newLink = await createSocialLink({ name: selectedPlatform.name, url: newUrl });
        addSocialLink(newLink as any);
        toast.success('Link added successfully!');
      }
    } catch (error) {
      toast.error('Operation failed.');
    } finally {
      setEditingLink(null);
      setSelectedPlatform(null);
      setHandle('');
    }
  };

  return (
    <div className="p-1 h-full overflow-y-auto text-black">
      <header className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Social Links</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X size={20} />
        </button>
      </header>

      <main className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-gray-600">
            Your social profiles ({socialLinks?.length})
          </span>
          <button onClick={handleAddClick} className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium">
            Add Social Link
          </button>
        </div>

        {socialLinks?.length === 0 ? (
          <EmptyState onAddLink={handleAddClick} />
        ) : (
          <SocialLinksList
            links={socialLinks}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        )}
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 max-h-[80vh] overflow-hidden text-black">
            {selectedPlatform ? (
              <>
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold">{editingLink ? 'Edit Social Link' : 'Add Social Link'}</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      placeholder={selectedPlatform.placeholder}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!handle.trim()}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <PlatformSelector
                onClose={() => setIsModalOpen(false)}
                onSelect={(platform) => setSelectedPlatform(platform)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLinksPanel;

export const socialPlatforms: { [key: string]: SocialPlatform } = {
  instagram: { id: 'instagram', name: 'Instagram', icon: '📷', placeholder: '@username', baseUrl: 'https://instagram.com/' },
  tiktok: { id: 'tiktok', name: 'TikTok', icon: '🎵', placeholder: '@username', baseUrl: 'https://tiktok.com/@' },
  twitter: { id: 'twitter', name: 'Twitter', icon: '🐦', placeholder: '@username', baseUrl: 'https://x.com/' },
  thread: { id: 'threads', name: 'Threads', icon: '🧵', placeholder: '@username', baseUrl: 'https://thread.com/' },
};
