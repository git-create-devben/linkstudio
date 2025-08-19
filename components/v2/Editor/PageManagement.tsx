"use client"

import { cn } from "@/lib/utils"
import { Settings, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserContentStore } from "@/stores/useContentStore"

export function PageManagement() {
  const { content } = useUserContentStore()

  // For now, we'll show the main page. In the future, this could support multiple pages
  const pages = [
    { id: "main", name: content.profileName || "Main Page", active: true },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your Pages</h2>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Page
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <button
            key={page.id}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              page.active ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {page.name}
          </button>
        ))}
      </div>
    </div>
  )
}
