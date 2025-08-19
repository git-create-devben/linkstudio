import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const pages = [
  { id: "home", name: "Home", active: true },
  { id: "videos", name: "Videos", active: false },
  { id: "long-name", name: "Page that has very long name", active: false },
]

export function PageManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Your Pages</h2>
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
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
