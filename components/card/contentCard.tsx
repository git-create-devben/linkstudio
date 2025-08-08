"use client"
import { cn } from '@/lib/utils';
import { Tabs } from '@radix-ui/react-tabs';
import React, { useState } from 'react'

type ContentTabsType = "Links" | "Social" | "Shop";

const ContentCard = () => {
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

    const MockLinksClick = [
        {
            name: "portfolio",
            clicksCount: 121
        },
        {
            name: "social",
            clicksCount: 40
        },
        {
            name: "shop",
            clicksCount: 32
        },
        {
            name: "other",
            clicksCount: 22
        }
    ]

    const renderContentsTabs = () => {
        switch (activePanel) {
            case "Links":
                return (
                    <div className="mt-4">
                        {/* Links Tab Content */}

                        <div className="space-y-4">
                            {
                                MockLinksClick.map((item, i) => (
                                    <div key={i} className='bg-gray-50/10 p-4 rounded-lg shadow-sm flex items-center justify-between'>
                                        <h3 className='text-font-medium'>{item.name}</h3>
                                        <div className='flex items-center gap-5'>
                                            <p className='text-font-bold text-gray-500'>{item.clicksCount} clicks</p>
                                            {/* <input type="range" name="" id="" className='w-12' disabled /> */}
                                            <div className='bg-blue-200 h-3 w-24 rounded-full'>
                                                <div className={cn(`bg-blue-400 transition-colors duration-300 w-[${item.clicksCount}px] h-3 rounded-full`)} />
                                            </div>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            case "Social":
                return (
                    <div className="mt-4">
                        {/* Social Tab Content */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium">Social Media</h3>
                                <p className="text-sm text-gray-500">Manage your social media links here</p>
                            </div>
                        </div>
                    </div>
                )
            case "Shop":
                return (
                    <div className="mt-4">
                        {/* Shop Tab Content */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium">Shop</h3>
                                <p className="text-sm text-gray-500">Manage your shop settings here</p>
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