import { Button } from "@/components/ui/button"
import { GripVertical, Settings, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

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
          {block.isDraft && (
            <span className="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-full font-medium">Draft</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Settings className="w-4 h-4 text-gray-500" />
        </Button>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-red-500">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
