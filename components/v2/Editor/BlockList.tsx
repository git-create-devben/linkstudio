"use client"

import { BlockItem } from "./BlockItem"
import { useUserContentStore } from "@/stores/useContentStore"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Map action types to display info
const getActionDisplayInfo = (actionItem: any) => {
  const typeMap = {
    "LINK_LIST": { icon: "🔗", color: "bg-blue-500" },
    "CONTACT_FORM": { icon: "📧", color: "bg-green-500" },
    "TEXT_BLOCK": { icon: "📝", color: "bg-gray-500" },
    "IMAGE_GALLERY": { icon: "🖼️", color: "bg-purple-500" },
    "CALENDAR_BOOKING": { icon: "📅", color: "bg-indigo-500" },
    "MUSIC_PLAYER": { icon: "🎵", color: "bg-pink-500" },
    "VIDEO_SHOWCASE": { icon: "🎥", color: "bg-red-500" },
    "PRODUCT_SHOWCASE": { icon: "📦", color: "bg-orange-500" },
    "LOCATION_MAP": { icon: "📍", color: "bg-teal-500" },
    "PHONE_CALL": { icon: "📞", color: "bg-cyan-500" },
    "SERVICE_BOOKING": { icon: "🛎️", color: "bg-yellow-500" },
    "TIP_JAR": { icon: "💰", color: "bg-emerald-500" },
    "NEWSLETTER_SIGNUP": { icon: "📧", color: "bg-blue-600" },
    "COUNTDOWN_BANNER": { icon: "⏰", color: "bg-red-600" },
    "WHATSAPP_CHAT": { icon: "💬", color: "bg-green-600" },
  }
  
  return typeMap[actionItem.type as keyof typeof typeMap] || { icon: "🔗", color: "bg-gray-500" }
}

interface BlockListProps {
  onAddAction: () => void
}

export function BlockList({ onAddAction }: BlockListProps) {
  const { actionItems } = useUserContentStore()

  const blocks = actionItems.map((item) => {
    const displayInfo = getActionDisplayInfo(item)
    return {
      id: item.id,
      title: item.config.title || item.config.serviceName || `${item.type.replace('_', ' ').toLowerCase()}`,
      icon: displayInfo.icon,
      color: displayInfo.color,
      isDraft: false, // You can add logic to determine draft status
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Actions</h2>
        <Button
          onClick={onAddAction}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Action
        </Button>
      </div>

      {blocks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <p className="text-sm">No actions added yet</p>
          <p className="text-xs text-gray-400 mt-1">Click "Add Action" to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blocks.map((block) => (
            <BlockItem key={block.id} block={block} />
          ))}
        </div>
      )}
    </div>
  )
}
