"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const tabs = [
  { id: "lynk", label: "Lynk", active: true },
  { id: "appearance", label: "Appearance", active: false },
  { id: "statistic", label: "Statistic", active: false },
]

export function TabNavigation() {
  const [activeTab, setActiveTab] = useState("lynk")

  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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
