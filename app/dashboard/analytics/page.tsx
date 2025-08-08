import ContentCard from '@/components/card/contentCard'
import StatsCard from '@/components/card/statsCard'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

const Analytics = () => {
    return (
        <main className='p-4'>
            <h1 className='text-lg font-semibold text-black'>Analytics</h1>
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
                {/* <h2 className='text-lg font-semibold'>Traffic</h2> */}
                <StatsCard/>
                <ContentCard/>
            </div>
        </main>
    )
}

export default Analytics