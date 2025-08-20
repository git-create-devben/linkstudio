"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useUserContentStore } from "@/stores/useContentStore"
import { createActionItem } from "@/actions/editorActions"
import { toast } from "sonner"
import { getActionTypeById } from "@/lib/actions/actionTypes"
import ActionTypeSelection from "@/components/dashboard/Editor/panels/actions/ActionTypeSelection"
import { IconPicker } from "@/components/dashboard/Editor/IconPicker"

interface AddActionModalProps {
    isOpen: boolean
    onClose: () => void
}

interface CategoryConfig {
    color: string;
    bgColor: string;
    icon: string;
}

interface CategoryConfigs {
    links: CategoryConfig;
    content: CategoryConfig;
    contact: CategoryConfig;
    media: CategoryConfig;
    business: CategoryConfig;
}
interface LinkItem {
    title: string;
    url: string;
    icon: string;
}
interface ImageItem {
    url: string;
    caption: string;
}

export function AddActionModal({ isOpen, onClose }: AddActionModalProps) {
    const [selectedActionType, setSelectedActionType] = useState<string | null>(null)
    const [formState, setFormState] = useState<Record<string, any>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [hoveredAction, setHoveredAction] = useState<string | null>(null)
    const [editingActionId, setEditingActionId] = useState<string | null>(null);
    const { actionItems, addActionItem, convertTemporaryId } = useUserContentStore()

    // Handle Escape key to close modal
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown)
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    const handleActionTypeSelect = (actionTypeId: string) => {
        const actionType = getActionTypeById(actionTypeId)
        if (!actionType) return

        setSelectedActionType(actionTypeId)
        setFormState(actionType.defaultConfig || {})
    }

    const handleSubmit = async () => {
        if (!selectedActionType) return

        setIsSubmitting(true)
        try {
            const tempId = `temp_${Date.now()}`
            const payload = {
                id: tempId,
                type: selectedActionType as any,
                config: formState,
                order: actionItems.length
            }

            addActionItem(payload as any)
            const newActionFromDb = await createActionItem(payload)
            convertTemporaryId(tempId, newActionFromDb.id)

            toast.success("Action added successfully!")
            onClose()
            setSelectedActionType(null)
            setFormState({})
        } catch (error) {
            toast.error("Failed to add action")
        } finally {
            setIsSubmitting(false)
        }
    }



    const renderConfigurationForm = () => {
        const actionType = getActionTypeById(selectedActionType!);
        if (!actionType) return null;

        const isEditing = !!editingActionId;
        const categoryConfig: CategoryConfigs = {
            links: { color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', icon: '🔗' },
            content: { color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', icon: '📝' },
            contact: { color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', icon: '💬' },
            media: { color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50', icon: '🎵' },
            business: { color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-50', icon: '💼' }
        };
        const categoryStyle = categoryConfig[actionType.category];

        return (
            <div className="flex flex-col h-full text-gray-900 bg-gray-50 max-h-[90vh]">
                {/* Compact Header */}
                <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200 flex-shrink-0">
                    <button
                        onClick={() => {
                            // setCurrentView('main');
                            setEditingActionId(null);
                            setSelectedActionType(null);
                        }}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${categoryStyle?.color} flex items-center justify-center shadow-sm`}>
                            <actionType.icon size={16} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">
                                {isEditing ? `Edit ${actionType.name}` : `Add ${actionType.name}`}
                            </h2>
                            <p className="text-xs text-gray-600">{actionType.description}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
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

                            {field.type === 'select' && field.options && (
                                <select
                                    value={formState[field.key] || ''}
                                    onChange={(e) => setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                                    required={field.required}
                                >
                                    <option value="">Select an option</option>
                                    {field.options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {field.type === 'boolean' && (
                                <label className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={formState[field.key] || false}
                                        onChange={(e) => setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: e.target.checked }))}
                                        className="w-4 h-4 rounded border border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-1"
                                    />
                                    <span className="text-gray-700 font-medium text-sm">Enable this option</span>
                                </label>
                            )}

                            {field.type === 'array' && field.arrayItemType === 'link' && (
                                <div className="space-y-2">
                                    {(formState[field.key] as LinkItem[] || []).map((link: LinkItem, index: number) => (
                                        <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-shrink-0">
                                                    <IconPicker
                                                        onSelectIcon={(icon: string) => {
                                                            const updatedLinks = [...(formState[field.key] as LinkItem[] || [])];
                                                            updatedLinks[index] = { ...updatedLinks[index], icon };
                                                            setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedLinks }));
                                                        }}
                                                        selectedIcon={link.icon}
                                                    />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Link title"
                                                    value={link.title || ''}
                                                    onChange={(e) => {
                                                        const updatedLinks = [...(formState[field.key] as LinkItem[] || [])];
                                                        updatedLinks[index] = { ...updatedLinks[index], title: e.target.value };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedLinks }));
                                                    }}
                                                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <button
                                                    onClick={() => {
                                                        const updatedLinks = (formState[field.key] as LinkItem[] || []).filter((_: LinkItem, i: number) => i !== index);
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedLinks }));
                                                    }}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                                    title="Remove link"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <input
                                                type="url"
                                                placeholder="https://example.com"
                                                value={link.url || ''}
                                                onChange={(e) => {
                                                    const updatedLinks = [...(formState[field.key] as LinkItem[] || [])];
                                                    updatedLinks[index] = { ...updatedLinks[index], url: e.target.value };
                                                    setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedLinks }));
                                                }}
                                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const currentLinks = formState[field.key] as LinkItem[] || [];
                                            setFormState((prev: Record<string, any>) => ({
                                                ...prev,
                                                [field.key]: [...currentLinks, { title: '', url: '', icon: '' }]
                                            }));
                                        }}
                                        className="w-full p-2 border border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-sm"
                                    >
                                        <Plus size={16} className="inline mr-1" />
                                        Add Link
                                    </button>
                                </div>
                            )}

                            {field.type === 'array' && field.arrayItemType === 'image' && (
                                <div className="space-y-2">
                                    {(formState[field.key] as ImageItem[] || []).map((image: ImageItem, index: number) => (
                                        <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="url"
                                                    placeholder="Image URL"
                                                    value={image.url || ''}
                                                    onChange={(e) => {
                                                        const updatedImages = [...(formState[field.key] as ImageItem[] || [])];
                                                        updatedImages[index] = { ...updatedImages[index], url: e.target.value };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedImages }));
                                                    }}
                                                    className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <button
                                                    onClick={() => {
                                                        const updatedImages = (formState[field.key] as ImageItem[] || []).filter((_: ImageItem, i: number) => i !== index);
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedImages }));
                                                    }}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                placeholder="Caption (optional)"
                                                value={image.caption || ''}
                                                onChange={(e) => {
                                                    const updatedImages = [...(formState[field.key] as ImageItem[] || [])];
                                                    updatedImages[index] = { ...updatedImages[index], caption: e.target.value };
                                                    setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedImages }));
                                                }}
                                                className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const currentImages = formState[field.key] as ImageItem[] || [];
                                            setFormState((prev: Record<string, any>) => ({
                                                ...prev,
                                                [field.key]: [...currentImages, { url: '', caption: '' }]
                                            }));
                                        }}
                                        className="w-full p-2 border border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-sm"
                                    >
                                        <Plus size={16} className="inline mr-1" />
                                        Add Image
                                    </button>
                                </div>
                            )}

                            {field.type === 'array' && field.arrayItemType === 'text' && (
                                <div className="space-y-2">
                                    {(formState[field.key] as string[] || []).map((item: string, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder={`Item ${index + 1}`}
                                                value={typeof item === 'string' ? item : ''}
                                                onChange={(e) => {
                                                    const updatedItems = [...(formState[field.key] as string[] || [])];
                                                    updatedItems[index] = e.target.value;
                                                    setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedItems }));
                                                }}
                                                className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <button
                                                onClick={() => {
                                                    const updatedItems = (formState[field.key] as string[] || []).filter((_: string, i: number) => i !== index);
                                                    setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updatedItems }));
                                                }}
                                                className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const currentItems = formState[field.key] as string[] || [];
                                            setFormState((prev: Record<string, any>) => ({
                                                ...prev,
                                                [field.key]: [...currentItems, '']
                                            }));
                                        }}
                                        className="w-full p-2 border border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-sm"
                                    >
                                        <Plus size={16} className="inline mr-1" />
                                        Add Item
                                    </button>
                                </div>
                            )}

                            {field.type === 'array' && field.arrayItemType === 'product' && (
                                <div className="space-y-3 max-h-96 overflow-y-auto">
                                    {((formState[field.key] as any[]) || []).map((product: any, index: number) => (
                                        <div key={index} className="p-3 border border-gray-200 rounded-lg bg-white space-y-3">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                <input
                                                    type="url"
                                                    placeholder="Primary image URL"
                                                    value={Array.isArray(product.image) ? product.image[0] || '' : (product.image || '')}
                                                    onChange={(e) => {
                                                        const arr = Array.isArray(product.image) ? [...product.image] : (product.image ? [product.image] : []);
                                                        arr[0] = e.target.value;
                                                        const updated = [...((formState[field.key] as any[]) || [])];
                                                        updated[index] = { ...product, image: arr };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updated }));
                                                    }}
                                                    className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Product name"
                                                    value={product.name || ''}
                                                    onChange={(e) => {
                                                        const updated = [...((formState[field.key] as any[]) || [])];
                                                        updated[index] = { ...product, name: e.target.value };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updated }));
                                                    }}
                                                    className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Short description (optional)"
                                                    value={product.description || ''}
                                                    onChange={(e) => {
                                                        const updated = [...((formState[field.key] as any[]) || [])];
                                                        updated[index] = { ...product, description: e.target.value };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updated }));
                                                    }}
                                                    className="sm:col-span-2 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Price (e.g. $29.99)"
                                                    value={product.price || ''}
                                                    onChange={(e) => {
                                                        const updated = [...((formState[field.key] as any[]) || [])];
                                                        updated[index] = { ...product, price: e.target.value };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updated }));
                                                    }}
                                                    className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <input
                                                    type="number"
                                                    placeholder="Discount % (optional)"
                                                    value={product.discountPercent || ''}
                                                    min={0}
                                                    max={100}
                                                    onChange={(e) => {
                                                        const v = e.target.value === '' ? undefined : Number(e.target.value);
                                                        const updated = [...((formState[field.key] as any[]) || [])];
                                                        updated[index] = { ...product, discountPercent: v };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updated }));
                                                    }}
                                                    className="px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <input
                                                    type="url"
                                                    placeholder="Buy URL"
                                                    value={product.url || ''}
                                                    onChange={(e) => {
                                                        const updated = [...((formState[field.key] as any[]) || [])];
                                                        updated[index] = { ...product, url: e.target.value };
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updated }));
                                                    }}
                                                    className="sm:col-span-2 px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-gray-500">Image, name, price and buy URL are recommended. Description and discount are optional.</p>
                                                <button
                                                    onClick={() => {
                                                        const updated = ((formState[field.key] as any[]) || []).filter((_: any, i: number) => i !== index);
                                                        setFormState((prev: Record<string, any>) => ({ ...prev, [field.key]: updated }));
                                                    }}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const current = (formState[field.key] as any[]) || [];
                                            setFormState((prev: Record<string, any>) => ({
                                                ...prev,
                                                [field.key]: [...current, { image: '', name: '', description: '', price: '', discountPercent: 0, url: '' }]
                                            }));
                                        }}
                                        className="w-full p-2 border border-dashed border-blue-300 rounded-lg text-blue-600 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-sm"
                                    >
                                        <Plus size={16} className="inline mr-1" />
                                        Add Product
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                // setCurrentView('main');
                                // setEditingActionId(null);
                                setSelectedActionType(null);
                            }}
                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-all duration-200 text-sm ${isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : `bg-gradient-to-r ${categoryStyle?.color} hover:shadow-md`
                                }`}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    {isEditing ? 'Saving...' : 'Adding...'}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    <actionType.icon size={16} />
                                    {isEditing ? 'Save Changes' : 'Add Action'}
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        );
    };


    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 h-screen"
            onClick={(e) => {
                // Close modal when clicking the backdrop
                if (e.target === e.currentTarget) {
                    onClose()
                }
            }}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {selectedActionType ? (
                    renderConfigurationForm()
                ) : (
                    <>
                        {/* Action Type Selection */}
                        <div className="flex-1 overflow-hidden min-h-0">
                            <ActionTypeSelection
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                hoveredAction={hoveredAction}
                                onHoverAction={setHoveredAction}
                                onSelectAction={handleActionTypeSelect}
                                onBack={onClose}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}