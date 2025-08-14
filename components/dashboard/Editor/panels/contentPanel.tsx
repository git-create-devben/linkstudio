"use client"
import React, { ChangeEvent } from 'react';
import { Camera, X, Upload, AlertCircle, Shield, Crown, Lock } from 'lucide-react';
import { useUserContentStore } from '@/stores/useContentStore';
import { uploadCoverImage, uploadProfilePicture } from '@/actions/editorActions';
import { toast } from 'sonner';
import { useUser } from '@/context/userContext';
import { canUserAccessFeature, getUserPlan } from '@/lib/planUtils';
import { useRouter } from 'next/navigation';

const VerifiedBadgeSection = () => {
    const { content, setContent } = useUserContentStore();
    const user = useUser();
    const router = useRouter();
    const userPlan = getUserPlan(user);
    const hasVerifiedBadge = canUserAccessFeature(user, 'verifiedBadge');

    const handleVerifiedToggle = () => {
        setContent({ profileVerified: !content.profileVerified });
        toast.success(content.profileVerified ? 'Verified badge removed' : 'Verified badge added!');
        
        if (!hasVerifiedBadge) {
            toast.info('Pro feature - upgrade to save verified badge changes');
        }
    };

    return (
        <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
                Verified Badge
            </label>
            <div className="p-4 rounded-lg border-2 transition-all border-blue-200 bg-blue-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-800">Verified Badge</span>
                                {!hasVerifiedBadge && <Crown className="w-4 h-4 text-amber-500" />}
                                {content.profileVerified && (
                                    <Shield className="w-4 h-4 text-blue-600 fill-current" />
                                )}
                            </div>
                            <p className="text-sm text-slate-600">
                                Show a verification checkmark on your profile
                                {!hasVerifiedBadge && (
                                    <span className="text-amber-600 ml-2">
                                        (Pro feature - upgrade to save)
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleVerifiedToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            content.profileVerified ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                content.profileVerified ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                    </button>
                </div>
                
                {!hasVerifiedBadge && (
                    <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2 text-amber-800">
                            <Crown className="w-3 h-3" />
                            <span className="text-xs font-medium">Pro Feature</span>
                        </div>
                        <p className="text-xs text-amber-700 mt-1">
                            You can try the verified badge now, but upgrade to save your changes.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ContentPanel = ({ onClose }: { onClose: () => void }) => {
    const { content, setContent, loading, isDirty } = useUserContentStore();

    // Handle input changes for instant live preview (no database calls)
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setContent({ [name]: value });
    };

    const handleCoverImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        toast.loading("Uploading cover image...");
        try {
            const newUrl = await uploadCoverImage(formData);
            setContent({ coverImage: newUrl });
            toast.success("✨ Cover image updated!");
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        }
    };

    const handleUploadProfilePicture = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        // toast.loading("Uploading profile picture...");
        try {
            const newUrl = await uploadProfilePicture(formData);
            setContent({ profilePicture: newUrl });
            toast.success("✨ Profile picture updated!");
        } catch (error) {
            toast.error("Upload failed. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-transparent rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-800">Profile Content</h2>
                </div>
                <div className="flex items-center gap-2">
                    {isDirty && (
                        <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs font-medium">
                            <AlertCircle className="w-3 h-3" />
                            <span>Unsaved</span>
                        </div>
                    )}
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-slate-200 text-black rounded-lg transition-colors duration-200"
                    > 
                        <X size={18} /> 
                    </button>
                </div>
            </header>
            
            <main className="flex-1  space-y-6 overflow-y-auto text-black">
                {/* Profile Preview Card */}
                <div className="p-2">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4">
                            <img
                                src={content.profilePicture || `https://avatar.vercel.sh/${content.profileName}.svg`}
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-2 border-slate-200 shadow-lg object-cover bg-slate-100"
                            />
                            <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full p-2 cursor-pointer shadow-md border-2 border-white">
                                <Camera size={14} className="text-white" />
                                <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleUploadProfilePicture} />
                            </label>
                        </div>
                        <p className="text-xs text-slate-500 text-center max-w-48">Click the camera icon to upload a new profile picture</p>
                    </div>

                    {/* Name Section */}
                    <div className="mt-6">
                        <label htmlFor="profileName" className="block text-sm font-medium text-slate-700">
                            Display Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="profileName"
                                name="profileName"
                                type="text"
                                value={content.profileName || ''}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-base font-medium"
                                placeholder="Enter your display name"
                            />
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="mt-6">
                        <label htmlFor="profileBio" className="block text-sm font-medium text-slate-700">
                            Bio
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="profileBio"
                                name="profileBio"
                                value={content.profileBio || ''}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 rounded-lg border border-slate-300 bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all duration-200 text-base resize-none min-h-[100px]"
                                rows={4}
                                placeholder="Tell people about yourself in a few words..."
                            />
                        </div>
                    </div>

                    {/* Verified Badge Section */}
                    <VerifiedBadgeSection />

                    {/* Cover Image Section */}
                    {/* <div className="mt-6">
                        <label htmlFor="cover-upload" className="block text-sm font-medium text-slate-700">
                            Cover Image
                        </label>
                        <div className="mt-1">
                            <div 
                                className="relative h-32 rounded-lg border-2 border-dashed border-slate-300 bg-cover bg-center flex items-center justify-center hover:border-blue-400 transition-colors duration-200 overflow-hidden"
                                style={{
                                    backgroundImage: content.coverImage ? `url(${content.coverImage})` : 'none',
                                    backgroundColor: '#f8fafc'
                                }}
                            >
                                {!content.coverImage && (
                                    <div className="text-center text-slate-500">
                                        <Upload className="w-8 h-8 mx-auto mb-2" />
                                        <p className="text-sm font-medium">Upload Cover Image</p>
                                        <p className="text-xs">Recommended: 800x200px</p>
                                    </div>
                                )}
                                
                                <label htmlFor="cover-upload" className="absolute inset-0 cursor-pointer">
                                    <input 
                                        id="cover-upload" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*" 
                                        onChange={handleCoverImageUpload} 
                                    />
                                </label>
                                
                                {content.coverImage && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <div className="text-white text-center">
                                            <Upload className="w-6 h-6 mx-auto mb-1" />
                                            <p className="text-sm font-medium">Change Cover</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div> */}
                </div>
            </main>
        </div>
    );
};

export default ContentPanel;