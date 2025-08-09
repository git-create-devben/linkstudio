"use client"
import React, { useState, ChangeEvent, useMemo } from 'react';
import { User, Camera, Save, X, UploadCloud } from 'lucide-react';
import { useUserContentStore } from '@/stores/useContentStore'; // <-- Use the new store
import { updateContent, uploadCoverImage, uploadProfilePicture } from '@/actions/editorActions'; // <-- Import your server action
import { toast } from 'sonner';
import { TemplateProps } from '@/types/editorTypes';

const STATIC_TOGGLES = Object.freeze({
    profileImage: true,
    profileName: true,
    verifiedBadge: true,
    bio: true,
    heading: true,
});

const ContentPanel = ({ onClose }: { onClose: () => void }) => {
    // 1. Select the correct state slices from our robust store
    const content = useUserContentStore((state) => state.content);
    const design = useUserContentStore((state) => state.design);
    const actionItems = useUserContentStore((state) => state.actionItems);
    const setContent = useUserContentStore((state) => state.setContent);
    const loading = useUserContentStore((state) => state.loading);


    const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        // toast.loading("Uploading cover image...");
        try {
            const newUrl = await uploadCoverImage(formData);
            // Update the content slice of our store
            setContent({ coverImage: newUrl });
            toast.success("Cover image updated!");
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        }
    };

    const handleUploadProfilePicture = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        // toast.loading("Uploading cover image...");
        try {
            const newUrl = await uploadProfilePicture(formData);
            // Update the content slice of our store
            setContent({ profilePicture: newUrl });
            toast.success("Profile picture updated!");
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        }
    }

    // Local state to track which field is being saved
    const [savingField, setSavingField] = useState<string | null>(null);

    // 2. Handle input changes for live preview
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Update the local store for instant preview
        setContent({ [name]: value });
    };

    // 3. Handle saving data to the database
    const handleSave = async (fieldName: keyof typeof content) => {
        setSavingField(fieldName);
        const value = content[fieldName];

        // toast.loading(`Saving ${fieldName}...`);

        try {
            // Call the server action with only the data that changed
            await updateContent({ [fieldName]: value });
            toast.success(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} saved!`);
        } catch (error) {
            toast.error(`Failed to save ${fieldName}.`);
            console.error(error);
        } finally {
            setSavingField(null);
        }
    };

    // NOTE: Toggles are not included here as they are often part of the 'design' or a separate model.
    // If you need to save toggles, you'd follow the same pattern with an `updateDesign` action.

    if (loading) {
        return <div className="p-4 text-center text-gray-500">Loading...</div>;
    }

    return (
        <div className="p-1 h-full overflow-y-auto text-black">
            <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Edit Content</h2>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                    <X size={20} />
                </button>
            </div>

            <div className="space-y-8 p-4">
                {/* Modern Profile Card */}
                <div className="relative flex flex-col items-center">
                    {/* Cover Image with floating FAB */}
                    <div className="relative w-full h-32 rounded-xl overflow-hidden mb-[-2.5rem] flex items-center justify-center">
                        {content.coverImage ? (
                            <img
                                src={content.coverImage}
                                alt="Cover"
                                className="w-full h-full object-cover object-center"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-200 via-white to-purple-200" />
                        )}
                        {/* FAB for cover upload */}
                        <label htmlFor="cover-upload" className="absolute bottom-3 right-3 bg-black/60 hover:bg-blue-600 transition-colors rounded-full p-2 cursor-pointer shadow-lg z-20">
                            <UploadCloud size={20} className="text-white" />
                            <input id="cover-upload" type="file" className="hidden" accept="image/*,video/*" onChange={handleCoverImageUpload} />
                        </label>
                        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                    </div>
                    {/* Avatar floating over cover */}
                    <div className="relative -mt-12 z-10">
                        <div className="relative w-24 h-24">
                            <img
                                src={content.profilePicture || `https://avatar.vercel.sh/${content.profileName}.svg`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover bg-gray-100"
                            />
                            {/* FAB for avatar upload */}
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full p-1.5 cursor-pointer shadow-md border-2 border-white">
                                <Camera size={16} className="text-white" />
                                <input id="avatar-upload" type="file" className="hidden" accept="image/*,video/*" onChange={handleUploadProfilePicture} />
                            </label>
                        </div>
                    </div>
                    {/* Name field with edit icon */}
                    <div className="w-full flex flex-col items-center mt-4">
                        <label htmlFor="profileName" className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">Name</label>
                        <div className="relative w-full">
                            <input
                                id="profileName"
                                name="profileName"
                                type="text"
                                value={content.profileName || ''}
                                onChange={handleInputChange}
                                onBlur={() => handleSave('profileName')}
                                className="w-full text-center px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-lg font-semibold focus:ring-2 focus:ring-blue-300 outline-none transition-all"
                                placeholder="Enter your name"
                            />
                            <User size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    {/* Bio field with edit icon */}
                    <div className="w-full mt-3 flex flex-col items-center">
                        <label htmlFor="profileBio" className="text-xs font-semibold text-gray-600 mb-1 flex items-center gap-1">Bio</label>
                        <div className="relative w-full">
                            <textarea
                                id="profileBio"
                                name="profileBio"
                                value={content.profileBio || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-base resize-none focus:ring-2 focus:ring-blue-300 outline-none transition-all min-h-[80px]"
                                rows={3}
                                placeholder="Tell people about yourself..."
                            />
                        </div>
                        <button
                            onClick={() => handleSave('profileBio')}
                            disabled={savingField === 'bio'}
                            className="mt-2 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center space-x-2"
                        >
                            <Save size={16} />
                            <span>{savingField === 'bio' ? 'Saving...' : 'Save Bio'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentPanel;