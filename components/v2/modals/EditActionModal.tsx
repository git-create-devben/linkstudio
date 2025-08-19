"use client"

import { useState, useEffect } from "react"
import { X, Save, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUserContentStore, ActionItemType } from "@/stores/useContentStore"
import { updateActionItem } from "@/actions/editorActions"
import { toast } from "sonner"
import { getActionTypeById } from "@/lib/actions/actionTypes"

interface EditActionModalProps {
  isOpen: boolean
  onClose: () => void
  action: ActionItemType | null
}

export function EditActionModal({ isOpen, onClose, action }: EditActionModalProps) {
  const [formState, setFormState] = useState<any>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { updateActionItem: updateStoreAction } = useUserContentStore()

  useEffect(() => {
    if (action) {
      setFormState(action.config)
    }
  }, [action])

  const handleSubmit = async () => {
    if (!action) return

    setIsSubmitting(true)
    try {
      await updateActionItem(action.id, formState)
      updateStoreAction(action.id, formState)
      toast.success("Action updated successfully!")
      onClose()
    } catch (error) {
      toast.error("Failed to update action")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !action) return null

  const actionType = getActionTypeById(action.type)
  if (!actionType) return null

  const categoryConfig = {
    links: { color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', icon: '🔗' },
    content: { color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', icon: '📝' },
    contact: { color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', icon: '💬' },
    media: { color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', icon: '🎵' },
    business: { color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50', icon: '💼' }
  }
  const categoryStyle = categoryConfig[actionType.category as keyof typeof categoryConfig]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryStyle?.color} flex items-center justify-center shadow-sm`}>
              <actionType.icon size={16} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Edit {actionType.name}</h2>
              <p className="text-xs text-gray-600">{actionType.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {actionType.configFields.map((field) => (
            <div key={field.key} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <label className="block text-sm font-semibold mb-2 text-gray-900">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'text' && (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={formState[field.key] || ''}
                  onChange={(e) => setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                  required={field.required}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  placeholder={field.placeholder}
                  value={formState[field.key] || ''}
                  onChange={(e) => setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent min-h-[80px] resize-none transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                  required={field.required}
                />
              )}

              {field.type === 'url' && (
                <input
                  type="url"
                  placeholder={field.placeholder}
                  value={formState[field.key] || ''}
                  onChange={(e) => setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                  required={field.required}
                />
              )}

              {field.type === 'email' && (
                <input
                  type="email"
                  placeholder={field.placeholder}
                  value={formState[field.key] || ''}
                  onChange={(e) => setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                  required={field.required}
                />
              )}

              {field.type === 'number' && (
                <input
                  type="tel"
                  placeholder={field.placeholder}
                  value={formState[field.key] || ''}
                  onChange={(e) => setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                  required={field.required}
                />
              )}

              {field.type === "textarea" && (
                <p className="text-xs text-gray-500 mt-1">{field.label}</p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}