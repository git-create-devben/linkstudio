"use client"
import { cn } from '@/lib/utils';
import { Tabs } from '@radix-ui/react-tabs';
import { Lock, Crown, TrendingUp } from 'lucide-react';
import React, { useState } from 'react'
import { PlanType } from '@/lib/planUtils';

type ContentTabsType = "Links" | "Social" | "Shop";

interface ContentCardProps {
    userPlan?: PlanType;
    hasFullAnalytics?: boolean;
}

const ContentCard = ({ userPlan = 'free', hasFullAnalytics = false }: ContentCardProps) => {
    const [activePanel, setActivePanel] = useState<ContentTabsType | null>("Links");

    // For v1 launch - show coming soon message instead of fake data
    const showComingSoon = true;

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

    const renderContentsTabs = () => {
        if (showComingSoon) {
            return (
                <div className="mt-4">
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <TrendingUp className="w-10 h-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Analytics Coming Soon</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            We're building powerful analytics to track your {activePanel?.toLowerCase()} performance.
                            Get insights on clicks, engagement, and conversion rates.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span>Real-time click tracking</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-100"></div>
                                <span>Geographic insights</span>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                                <span>Conversion tracking</span>
                            </div>
                        </div>
                        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-800 font-medium">
                                🚀 Expected in next update - Stay tuned!
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        // Original content (kept for future use)
        return null;
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