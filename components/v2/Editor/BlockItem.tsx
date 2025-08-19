"use client"

import { Button } from "@/components/ui/button"
import { GripVertical, Settings, Trash2, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { useUserContentStore } from "@/stores/useContentStore"

interface Block {
  id: string
  title: string
  icon: string
  color: string
  isDraft: boolean
}

interface BlockItemProps {
  block: Block
}

export function BlockItem({ block }: BlockItemProps) {
  const { removeActionItem, isTemporaryId } = useUserContentStore()

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this action?')) {
      removeActionItem(block.id)
    }
  }

  const isTemp = isTemporaryId(block.id)

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <button className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1">
        <GripVertical className="w-5 h-5" />
      </button>

      <div
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center text-white text-lg font-medium",
          block.color,
        )}
      >
        {block.icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 truncate text-base">{block.title}</h3>
          {(block.isDraft || isTemp) && (
            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full font-medium">
              {isTemp ? 'New' : 'Draft'}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {isTemp ? 'Click settings to configure' : 'Ready to use'}
        </p>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Toggle visibility">
          <Eye className="w-4 h-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit settings">
          <Settings className="w-4 h-4 text-gray-500" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
          onClick={handleDelete}
          title="Delete action"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
