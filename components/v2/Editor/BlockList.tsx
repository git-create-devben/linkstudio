"use client"

import { useUserContentStore } from "@/stores/useContentStore"
import { getAllCategories } from "@/lib/actions/actionTypes"
import MainView from "@/components/dashboard/Editor/panels/actions/MainView"
import { ActionItemType } from "@/stores/useContentStore"

interface BlockListProps {
  onAddAction: () => void
  onEditAction: (action: ActionItemType) => void
  onDeleteAction: (action: ActionItemType) => void
}

export function BlockList({ onAddAction, onEditAction, onDeleteAction }: BlockListProps) {
  const { actionItems } = useUserContentStore()
  const categories = getAllCategories()

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <MainView
        actionItems={actionItems}
        categories={categories}
        onClose={() => {}} // No close needed in v2 editor
        onAddNew={onAddAction}
        onEditAction={onEditAction}
        onDeleteAction={onDeleteAction}
      />
    </div>
  )
}
