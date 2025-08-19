"use client"

import { AlertTriangle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ActionItemType } from "@/stores/useContentStore"
import { getActionTypeById } from "@/lib/actions/actionTypes"

interface DeleteActionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  action: ActionItemType | null
  isDeleting?: boolean
}

export function DeleteActionModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  action, 
  isDeleting = false 
}: DeleteActionModalProps) {
  if (!isOpen || !action) return null

  const actionType = getActionTypeById(action.type)
  const actionTitle = action.config.title || actionType?.name || 'Untitled Action'

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Delete Action</h2>
          <p className="text-gray-600 text-sm">
            Are you sure you want to delete "{actionTitle}"? This action cannot be undone.
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="flex-1"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              "Deleting..."
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}