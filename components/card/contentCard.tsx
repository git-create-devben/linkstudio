"use client"
import { cn } from '@/lib/utils';
import { Tabs } from '@radix-ui/react-tabs';
import { Lock, Crown } from 'lucide-react';
import React, { useState } from 'react'
import { PlanType } from '@/lib/planUtils';

type ContentTabsType = "Links" | "Social" | "Shop";

interface ContentCardProps {
  userPlan?: PlanType;
  hasFullAnalytics?: boolean;
}

const ContentCard = ({ userPlan = 'free', hasFullAnalytics = false }: ContentCardProps) => {
    const [activePanel, setActivePanel] = useState<ContentTabsType | null>("Links");
    const handleTabClick = (tabsId: string) => {
        setActivePanel(tabsId as ContentTabsType);
    };
    const ContentTabs = [
        {
            name: "Links",
            label: "Links",
        },
        {
            name: "Social",
            label: "Social",
        },
        {
            name: "Shop",
            label: "Shop",
        },
    ];

    // Mock data for launch - replace with real data later
    const MockLinksClick = [
        {
            name: "Portfolio Website",
            clicksCount: 121,
            percentage: 55
        },
        {
            name: "Social Media",
            clicksCount: 40,
            percentage: 18
        },
        {
            name: "Contact Form",
            clicksCount: 32,
            percentage: 15
        },
        {
            name: "Other Links",
            clicksCount: 22,
            percentage: 12
        }
    ]

    const MockSocialStats = [
        {
            platform: "Instagram",
            clicks: 85,
            percentage: 45
        },
        {
            platform: "Twitter",
            clicks: 62,
            percentage: 33
        },
        {
            platform: "LinkedIn",
            clicks: 41,
            percentage: 22
        }
    ]

    const renderContentsTabs = () => {
        switch (activePanel) {
            case "Links":
                return (
                    <div className="mt-4">
                        {/* Links Tab Content */}

                        <div className="space-y-3">
                            {
                                MockLinksClick.slice(0, hasFullAnalytics ? 4 : 2).map((item, i) => (
                                    <div key={i} className='bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between hover:bg-gray-100 transition-colors'>
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            <h3 className='font-medium text-gray-900'>{item.name}</h3>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <span className='text-sm font-semibold text-gray-700'>{item.clicksCount} clicks</span>
                                            <div className='bg-gray-200 h-2 w-20 rounded-full overflow-hidden'>
                                                <div 
                                                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                            <span className='text-xs text-gray-500 w-8'>{item.percentage}%</span>
                                        </div>
                                    </div>
                                ))
                            }
                            {!hasFullAnalytics && (
                                <>
                                    {/* Show locked content for free users */}
                                    {MockLinksClick.slice(2).map((item, i) => (
                                        <div key={`locked-${i}`} className='bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between relative overflow-hidden'>
                                            <div className='absolute inset-0 bg-gradient-to-r from-gray-100/80 to-gray-50/80 backdrop-blur-[1px] flex items-center justify-center z-10'>
                                                <div className='flex items-center gap-2 text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm border'>
                                                    <Lock className='w-3 h-3' />
                                                    <span className='text-xs font-medium'>Upgrade to unlock</span>
                                                    <Crown className='w-3 h-3 text-yellow-500' />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 blur-[1px]">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                <h3 className='font-medium text-gray-600'>{item.name}</h3>
                                            </div>
                                            <div className='flex items-center gap-4 blur-[1px]'>
                                                <span className='text-sm font-semibold text-gray-500'>{item.clicksCount} clicks</span>
                                                <div className='bg-gray-200 h-2 w-20 rounded-full overflow-hidden'>
                                                    <div 
                                                        className="bg-gray-400 h-2 rounded-full"
                                                        style={{ width: `${item.percentage}%` }}
                                                    />
                                                </div>
                                                <span className='text-xs text-gray-400 w-8'>{item.percentage}%</span>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                )
            case "Social":
                return (
                    <div className="mt-4">
                        <div className="space-y-3">
                            {MockSocialStats.slice(0, hasFullAnalytics ? 3 : 2).map((item, i) => (
                                <div key={i} className='bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between hover:bg-gray-100 transition-colors'>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <h3 className='font-medium text-gray-900'>{item.platform}</h3>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <span className='text-sm font-semibold text-gray-700'>{item.clicks} clicks</span>
                                        <div className='bg-gray-200 h-2 w-20 rounded-full overflow-hidden'>
                                            <div 
                                                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                        <span className='text-xs text-gray-500 w-8'>{item.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                            
                            {!hasFullAnalytics && (
                                <div className='bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between relative overflow-hidden'>
                                    <div className='absolute inset-0 bg-gradient-to-r from-gray-100/80 to-gray-50/80 backdrop-blur-[1px] flex items-center justify-center z-10'>
                                        <div className='flex items-center gap-2 text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm border'>
                                            <Lock className='w-3 h-3' />
                                            <span className='text-xs font-medium'>Upgrade to unlock</span>
                                            <Crown className='w-3 h-3 text-yellow-500' />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 blur-[1px]">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                        <h3 className='font-medium text-gray-600'>LinkedIn</h3>
                                    </div>
                                    <div className='flex items-center gap-4 blur-[1px]'>
                                        <span className='text-sm font-semibold text-gray-500'>41 clicks</span>
                                        <div className='bg-gray-200 h-2 w-20 rounded-full overflow-hidden'>
                                            <div className="bg-gray-400 h-2 rounded-full" style={{ width: '22%' }} />
                                        </div>
                                        <span className='text-xs text-gray-400 w-8'>22%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            case "Shop":
                return (
                    <div className="mt-4">
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Crown className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Shop Analytics Coming Soon</h3>
                            <p className="text-sm text-gray-500 mb-4">Track your product performance and sales metrics</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
                                <Crown className="w-4 h-4" />
                                Premium Feature
                            </div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <main className="mt-4 bg-white text-black rounded-lg shadow-sm p-4 md:p-6 flex flex-col gap-4 md:gap-6 w-full">
            <div className=''>
                <h1 className='text-font-bold text-lg'>Content </h1>
                <small>See how your contents are doing.</small>
            </div>
            <div className="w-full">
                <div className="border-b border-gray-200">

                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {ContentTabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => handleTabClick(tab.name)}
                                className={`${activePanel === tab.name
                                    ? "border-primary-500 text-primary-600"
                                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                                aria-current={activePanel === tab.name ? "page" : undefined}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {
                    activePanel && (
                        renderContentsTabs()
                    )
                }
            </div>
        </main>
    )
}

export default ContentCard