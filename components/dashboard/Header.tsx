import { MenuIcon } from 'lucide-react'
import React from 'react'
import Logo from '../logo'
import { Button } from '../ui/button'
import Image from 'next/image'
import LogoApple from '../logo-apple'
import UpgradeButton from '../payment/UpgradeButton'
import Profile from '../profile/Profile'

const Header = ({ isVisible = false, onToggle }: { isVisible: boolean; onToggle: () => void }) => {
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
                    <UpgradeButton />
                    <Profile />
                </div>
            </nav>
        </header>
    )
}

export default Header