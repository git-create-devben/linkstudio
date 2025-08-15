import ContentCard from '@/components/card/contentCard'
import StatsCard from '@/components/card/statsCard'
import { MoreHorizontal, Crown, Lock, TrendingUp } from 'lucide-react'
import React from 'react'
import { getUser } from '@/actions/authActions'
import { getUserPlan, canUserAccessFeature } from '@/lib/planUtils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Analytics = async () => {
    const user = await getUser();
    const userPlan = getUserPlan(user);
    const hasFullAnalytics = canUserAccessFeature(user, 'analytics');

    return (
        <main className='p-4'>
            <div className="flex items-center justify-between mb-6">
                <h1 className='text-lg font-semibold text-black'>Analytics</h1>
                {/* {!hasFullAnalytics && (
                    <div className="flex items-center gap-2 text-sm">
                        <Crown className="w-4 h-4 text-yellow-500" />
                        <span className="text-gray-600">Limited Analytics</span>
                        <Link href="/pricing">
                            <Button size="sm" variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                                Upgrade
                            </Button>
                        </Link>
                    </div>
                )} */}
            </div>

            {/* Show upgrade banner for free users */}
            {!hasFullAnalytics && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">Unlock Full Analytics Power</h3>
                            <p className="text-sm text-gray-600">Get detailed insights on clicks, traffic sources, geographic data, and conversion tracking.</p>
                        </div>
                        <Link href="/pricing">
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                Upgrade Now
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            <div className='mt-4 text-black'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-sm font-semibold'>Overview</h2>
                    <div className='flex items-center'>
                        <span className='text-sm text-black'>Last 7 days</span>
                        <button className='ml-2 p-1 hover:bg-gray-100 rounded'>
                            <MoreHorizontal size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-6 text-black'>
                <StatsCard />
                <ContentCard userPlan={userPlan} hasFullAnalytics={hasFullAnalytics} />
            </div>
        </main>
    )
}

export default Analytics