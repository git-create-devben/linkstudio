import { AddBlockButton } from "./AddBlockButton"
import { BlockItem } from "./BlockItem"

const blocks = [
  {
    id: "1",
    title: "Visit my website",
    icon: "🔗",
    color: "bg-orange-500",
    isDraft: false,
  },
  {
    id: "2",
    title: "Product - Harmonica",
    icon: "📦",
    color: "bg-blue-500",
    isDraft: false,
  },
  {
    id: "3",
    title: "Instagram Link",
    icon: "📷",
    color: "bg-pink-500",
    isDraft: false,
  },
  {
    id: "4",
    title: "Product - Digital Marketing E-Book",
    icon: "📚",
    color: "bg-orange-500",
    isDraft: false,
  },
  {
    id: "5",
    title: "Collect Email",
    icon: "📧",
    color: "bg-pink-400",
    isDraft: true,
  },
]

export function BlockList() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Block List</h2>

      <AddBlockButton />

      <div className="space-y-3">
        {blocks.map((block) => (
          <BlockItem key={block.id} block={block} />
        ))}
      </div>
    </div>
  )
}
