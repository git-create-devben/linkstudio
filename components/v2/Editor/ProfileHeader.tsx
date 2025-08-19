"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Share2, ArrowRight, Edit, Monitor } from "lucide-react"
import { useUserContentStore } from "@/stores/useContentStore"
import { CustomizeURLModal } from "@/components/v2/modals/CustomizeURLModal"
import { ShareModal } from "@/components/v2/modals/ShareModal"
import ContentPanel from "@/components/dashboard/Editor/panels/contentPanel"
import { getUser } from "@/actions/authActions"
import { toast } from "sonner"

interface ProfileHeaderProps {
    onSwitchToV1?: () => void;
}

export function ProfileHeader({ onSwitchToV1 }: ProfileHeaderProps) {
    const { content, design } = useUserContentStore()
    const [showEditProfileModal, setShowEditProfileModal] = useState(false)
    const [showCustomizeURLModal, setShowCustomizeURLModal] = useState(false)
    const [showShareModal, setShowShareModal] = useState(false)

    const [user, setUser] = useState<UserProps | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser()
                setUser(userData as any)
            } catch (error) {
                toast.error('Failed to load user profile')
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    const handleShare = () => {
        if (!user?.username) {
            toast.error('Username not available')
            return
        }
        setShowShareModal(true)
    }

    // Generate username from profile name (simple slug)

    return (
        <div className="text-black backdrop-blur-sm rounded-2xl -m-5 mb-4">
            <div className="flex flex-col">
                {/* Background */}
                <div className="h-50 bg-gradient-to-r from-purple-600 to-blue-600 w-full" style={{ background: design.customBackground }}></div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-white text-black -mt-[6.5rem] rounded-2xl p-4 lg:p-6 mx-4 lg:mx-6 shadow-lg gap-4 lg:gap-0">

                    {/* Left Side - Profile Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        <div className="relative -mt-16 sm:-mt-20">
                            <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white shadow-lg">
                                <AvatarImage src={content.profilePicture} alt={content.profileName} />
                                <AvatarFallback className="text-xl sm:text-2xl">
                                    {content.profileName.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </AvatarFallback>
                            </Avatar>

                        </div>
                        <div className="space-y-2 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full flex items-center gap-1">
                                    🌍 Global
                                </span>
                                {content.profileVerified && (
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                                        ✓ Verified
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <h1 className="text-xl sm:text-2xl font-bold">{content.profileName}</h1>
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
                    <div className="flex flex-col items-center lg:items-end gap-4 w-full lg:w-auto">
                        <div className="text-center item-center flex flex-col  lg:text-right">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 text-xs w-full lg:w-auto text-center"
                                onClick={() => setShowCustomizeURLModal(true)}
                            >
                                Customize URL <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                            <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 max-w-full overflow-hidden">
                                <span className="text-purple-600">🔗</span>
                                <span className="text-xs sm:text-sm font-medium truncate">
                                    {typeof window !== 'undefined' ? `${window.origin}/${loading ? "....." : user?.username}` : `lynk.id/${loading ? "....." : user?.username}`}
                                </span>
                            </div>
                        </div>


                        <div className="flex item-center gap-2 w-full lg:w-auto">
                            <Button
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 flex-1 lg:flex-initial"
                                onClick={handleShare}
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share URL
                            </Button>
                            {onSwitchToV1 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={onSwitchToV1}
                                    className="px-3 text-white"
                                    title="Switch to V1 Editor"
                                >
                                    <Monitor className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>



            {showEditProfileModal && (
                <div className="p-8">
                    <ContentPanel onClose={() => setShowEditProfileModal(false)} />
                </div>
            )}

            <CustomizeURLModal
                isOpen={showCustomizeURLModal}
                onClose={() => setShowCustomizeURLModal(false)}
                currentUsername={user?.username || ''}
            />

            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                shareUrl={typeof window !== 'undefined' ? `${window.origin}/${user?.username}` : `https://lynk.id/${user?.username}`}
                profileName={content.profileName}
                profileBio={content.profileBio}
            />
        </div>
    )
}
