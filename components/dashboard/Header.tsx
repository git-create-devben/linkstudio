import { MenuIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import LogoApple from '../logo-apple'
import UpgradeButton from '../payment/UpgradeButton'
import Profile from '../profile/Profile'
import MultiButton from './multiButton'
import { getUser } from '@/actions/authActions'
import { toast } from 'sonner'

const Header = ({ isVisible = false, onToggle }: { isVisible: boolean; onToggle: () => void }) => {
    const pathname = usePathname()
    const isEditorPage = pathname === '/dashboard/editor'
    const isDashboardPage = pathname === '/dashboard'

    const [user, setUser] = useState<UserProps | null>(null)
    console.log("user", user)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser()
                setUser(userData as any)
            } catch (error) {
                toast.error('Failed to load user profile')
            }
        }

        fetchUser()
    }, [])

    if (!user) return null

    return (
        <header className='sticky top-0 shadow-sm bg-white/40 z-10'>
            <nav className='flex justify-between items-center py-2.5 px-5'>
                <div className='flex gap-4 items-center'>
                    <MenuIcon
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        size={25}
                        onClick={onToggle}
                    />
                    <LogoApple />
                </div>
                <div className='flex gap-6'>
                    {isEditorPage && (
                        <>
                            <MultiButton username={user.username} />
                            <div className='hidden md:flex'>
                                <UpgradeButton />
                            </div>
                        </>
                    )}
                    {!isDashboardPage && !isEditorPage && (
                        <>
                            <MultiButton username={user.username} />
                            <div className='hidden md:flex'>
                                <UpgradeButton />
                            </div>

                            <Profile />
                        </>
                    )}
                    {isDashboardPage && (
                        <>
                            <UpgradeButton />
                            <Profile />
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header;