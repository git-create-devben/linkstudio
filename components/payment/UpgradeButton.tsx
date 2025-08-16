import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { getUser } from '@/actions/authActions'
import { useRouter } from 'next/navigation'

const UpgradeButton = () => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser()
                setUser(userData)
            } catch (error) {
                console.error('Error fetching user:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    // Don't show upgrade button if user has an active subscription
    if (loading) return null
    if (user?.isActive && ['pro', 'premium'].includes(user?.plan?.toLowerCase())) {
        return (
            <Button
                onClick={() => router.push('/payment')}
                className="rounded-full bg-green-600 hover:bg-green-700 cursor-pointer text-white text-xs font-medium px-4 transition-colors duration-200"
            >
                Manage Plan
            </Button>
        )
    }

    return (
        <div>
            <Button
                onClick={() => router.push('/payment')}
                className="rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-xs font-medium px-4 transition-colors duration-200"
            >
                Upgrade
            </Button>
        </div>
    )
}

export default UpgradeButton