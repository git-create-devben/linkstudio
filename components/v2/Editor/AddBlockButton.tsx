import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function AddBlockButton() {
  return (
    <Button
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-xl text-base font-medium"
      size="lg"
    >
      <Plus className="w-5 h-5 mr-2" />
      Add New Blocks
    </Button>
  )
}
