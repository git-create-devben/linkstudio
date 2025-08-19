import { MenuIcon } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import LogoApple from '../logo-apple'
import UpgradeButton from '../payment/UpgradeButton'
import Profile from '../profile/Profile'
import MultiButton from './multiButton'
import { useUser } from '@/context/userContext'

const Header = ({ onToggle }: { onToggle: () => void }) => {
    const pathname = usePathname()
    const isEditorPage = pathname === '/dashboard/editor' || pathname === '/dashboard/v2/editor'
    const isDashboardPage = pathname === '/dashboard'

    const user = useUser()

    if (!user) return null

    return (
        <header className='sticky top-0 shadow-sm bg-gradient-to-br from-purple-50 via-white to-blue-50 z-10'>
            <nav className='flex justify-between items-center py-2.5 px-5'>
                <div className='flex gap-4 items-center'>
                    <MenuIcon
                        className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                        size={25}
                        onClick={onToggle}
                    />
                    <LogoApple />
                </div>
                <div className='flex md:gap-6 gap-3'>
                    {isEditorPage ? (
                        <>
                            <MultiButton username={user?.username} />
                            <UpgradeButton />
                        </>
                    ) : (
                        <Profile />
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Header;