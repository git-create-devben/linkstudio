"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share2, ArrowRight, Edit } from "lucide-react"
import { useUserContentStore } from "@/stores/useContentStore"
import { EditProfileModal } from "@/components/v2/modals/EditProfileModal"
import ContentPanel from "@/components/dashboard/Editor/panels/contentPanel"

export function ProfileHeader() {
    const { content } = useUserContentStore()
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)

    // Generate username from profile name (simple slug)
    const username = content.profileName.toLowerCase().replace(/\s+/g, '')

    return (
        <div className="text-black backdrop-blur-sm rounded-2xl -m-5 mb-4">
            <div className="flex flex-col">
                {/* Background */}
                <div className="h-50 bg-gradient-to-r from-purple-600 to-blue-600 w-full"></div>
                <div className="flex items-center justify-between bg-white text-black -mt-[6.5rem] rounded-2xl p-6 mx-6 shadow-lg">

                    {/* Left Side - Profile Info */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Avatar className="w-30 h-30 -mt-14 border-4 border-white shadow-lg">
                                <AvatarImage src={content.profilePicture} alt={content.profileName} />
                                <AvatarFallback className="text-2xl">
                                    {content.profileName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {/* <Button 
                                size="sm" 
                                variant="outline" 
                                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white"
                            >
                                <Edit className="w-3 h-3" />
                            </Button> */}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                    🌍 Global
                                </span>
                                {content.profileVerified && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-bold">{content.profileName}</h1>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="p-1"
                                    onClick={() => setShowEditProfileModal(true)}
                                >
                                    <Edit className="w-3 h-3" />
                                </Button>
                            </div>
                            <p className="text-gray-600 text-sm max-w-md">{content.profileBio}</p>
                        </div>
                    </div>

                    {/* Right Side - Link Info and Actions */}
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-1">Your Link</p>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                                <span className="text-purple-600">🔗</span>
                                <span className="text-sm font-medium">https://lynk.id/{username}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs">
                                Customize URL <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share URL
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <EditProfileModal
                isOpen={showEditProfileModal}
                onClose={() => setShowEditProfileModal(false)}
            /> */}

            {
                showEditProfileModal && (
                    <div className="p-8">
                        <ContentPanel onClose={() => setShowEditProfileModal(false)} />

                    </div>
                )
            }
        </div>
    )
}
