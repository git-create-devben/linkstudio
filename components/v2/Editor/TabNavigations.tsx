"use client"

import { cn } from "@/lib/utils"

const tabs = [
  { id: "actions", label: "Actions" },
  { id: "social", label: "Social Links" },
  { id: "design", label: "Design" },
]

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              activeTab === tab.id
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
