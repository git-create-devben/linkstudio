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

            <div className="space-y-6 p-4">
                {/* Profile Image - Placeholder for upload logic */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Image</label>
                    {/* <div className="relative w-24 h-24">
                        <img
                            src={content.profilePicture || `https://avatar.vercel.sh/${content.profileName}.svg`}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover bg-gray-200"
                        />
                        <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white hover:bg-blue-600">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                            <Camera size={16} className="text-white" />
                        </button>
                    </div> */}
                    <div
                    className="group relative h-24 w-24 rounded-full border-2 bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${content.profilePicture})`, backgroundColor: '#f0f0f0' }}
                >
                    <div className="absolute inset-0 group-hover:bg-bla transition-colors rounded-lg" />
                    <label htmlFor="cover-upload" className="relative z-10 flex flex-col items-center text-white bg-bla p-4 rounded-lg cursor-pointer">
                        <UploadCloud size={20} />
                        <span className="text-xs text-center font-medium mt-1">
                            {content.profilePicture ? 'Change Image' : 'Upload Image'}
                        </span>
                    </label>
                    <input id="cover-upload" type="file" className="hidden" accept="image/*,video/*" onChange={handleUploadProfilePicture} />
                </div>
                </div>

                {/* Cover Image - Placeholder for upload logic */}
                <div
                    className="group relative h-32 rounded-lg border-2 border-dashed border-gray-300 bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${content.coverImage})`, backgroundColor: '#f0f0f0' }}
                >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg" />
                    <label htmlFor="cover-upload" className="relative z-10 flex flex-col items-center text-white bg-black/30 p-4 rounded-lg cursor-pointer">
                        <UploadCloud size={24} />
                        <span className="text-sm font-medium mt-1">
                            {content.coverImage ? 'Change Image' : 'Upload Image'}
                        </span>
                    </label>
                    <input id="cover-upload" type="file" className="hidden" accept="image/*,video/*" onChange={handleCoverImageUpload} />
                </div>

                {/* Profile Name */}
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Profile Name</label>
                    <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            id="profileName"
                            name="profileName" // The 'name' attribute must match the state key
                            type="text"
                            value={content.profileName || ''}
                            onChange={handleInputChange}
                            onBlur={() => handleSave('profileName')} // Save when user clicks away
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                            placeholder="Enter your name"
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                    <textarea
                        id="profileBio"
                        name="profileBio" // The 'name' attribute must match the state key
                        value={content.profileBio || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg resize-none"
                        rows={4}
                        placeholder="Tell people about yourself..."
                    />
                    <button
                        onClick={() => handleSave('profileBio')}
                        disabled={savingField === 'bio'}
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 flex items-center space-x-2"
                    >
                        <Save size={16} />
                        <span>{savingField === 'bio' ? 'Saving...' : 'Save Bio'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentPanel;