"use client"

import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Globe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { getUser, logout } from '@/actions/authActions'
import UpgradeButton from '../payment/UpgradeButton'

const Profile = () => {
    const router = useRouter()
    const link = "mylinks"
    const language = "english"

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

    if (loading) {
        return (
            <div className="flex items-center gap-2">
                <div className="rounded-full bg-gray-200 w-10 h-10 animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div>
            <Popover>
                <PopoverTrigger className='flex gap-2 items-center'>
                    <div className='rounded-full bg-black w-10 h-10 overflow-hidden'>
                        {user.profile?.profileImageUrl && (
                            <Image
                                src={user.profile?.profileImageUrl}
                                alt="profile picture"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                            {user.profile?.displayName || 'Guest'}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='bg-white w-full -ml-4 p-2'>
                    <div>
                        <div className='flex gap-2 md:p-2 px-5 text-black items-center'>
                            <div className='rounded-full bg-black w-12 h-12 overflow-hidden'>
                                {user.profile?.profileImageUrl && (
                                    <Image
                                        src={user.profile.profileImageUrl}
                                        alt="profile picture"
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                        unoptimized
                                    />
                                )}
                            </div>

                            <div className='flex flex-col'>
                                <h2>{user.profile?.displayName}</h2>
                                <Link href={`${window.origin}/${user.username}`} className="text-blue-600 hover:underline">{link}/{user.username}</Link>
                            </div>
                        </div>
                        <div className='p-5'>
                            <UpgradeButton />
                        </div>
                        <div className="border-t border-gray-200"></div>

                        <div className='bg-gray-200 rounded-lg mt-2 py-3'>
                            <div className='flex justify-between p-4 items-center'>
                                <span className='text-black'>{user?.email}</span>
                                <div className='flex gap-2 text-blue-600'>
                                    <Button
                                        variant="ghost"
                                        className='cursor-pointer hover:bg-gray-300'
                                        onClick={async () => {
                                            try {
                                                await logout()
                                                router.push('/login')
                                            } catch (error) {
                                                toast.error('Failed to logout')
                                            }
                                        }}
                                    >
                                        Sign out
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className='cursor-pointer hover:bg-gray-300'
                                        onClick={() => router.push('/dashboard/settings')}
                                    >
                                        Settings
                                    </Button>
                                </div>
                            </div>
                            <div className="border-t border-gray-500 mb-3"></div>
                            <span className='flex justify-center items-center gap-2 text-sm text-center text-blue-500'>
                                <Globe size={16} /> {language}
                            </span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Profile
