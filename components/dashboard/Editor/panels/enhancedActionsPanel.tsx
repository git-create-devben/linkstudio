"use client";
import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { ActionItemType, useUserContentStore } from '@/stores/useContentStore';
import { createActionItem, deleteActionItem } from '@/actions/editorActions';
import { updateActionItemSafely, getActionTypeFromId } from '@/lib/actionItemHelpers';
import { toast } from 'sonner';
import { IconPicker } from '../IconPicker';
import { useUser } from '@/context/userContext';
import { canUserAddAction, getUserPlan, getPlanDisplayName, getUpgradeMessage, getMinimumPlanForFeature } from '@/lib/planUtils';
import { useRouter } from 'next/navigation';
import { getActionTypeById, getAllCategories } from '@/lib/actions/actionTypes';
import MainView from './actions/MainView';
import ActionTypeSelection from './actions/ActionTypeSelection';

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

const EnhancedActionsPanel = ({ onClose }: { onClose: () => void }) => {
    const [currentView, setCurrentView] = useState('main');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedActionType, setSelectedActionType] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
    const [editingActionId, setEditingActionId] = useState<string | null>(null);
    const [formState, setFormState] = useState<Record<string, any>>({});
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredAction, setHoveredAction] = useState<string | null>(null);

    const { actionItems, addActionItem, removeActionItem, updateActionItem: updateStoreAction, convertTemporaryId } = useUserContentStore();
    const user = useUser();
    const router = useRouter();

    const canAddAction = canUserAddAction(user, actionItems.length);
    const userPlan = getUserPlan(user);
    const categories = getAllCategories();

    const handleActionTypeSelect = (actionTypeId: string) => {
        const actionType = getActionTypeById(actionTypeId);
        if (!actionType) return;

        setSelectedActionType(actionTypeId);
        setFormState(actionType.defaultConfig);
        setCurrentView('configure');
    };

    const handleEditClick = (action: ActionItemType) => {
        setEditingActionId(action.id);
        setSelectedActionType(action.type);
        setFormState(action.config);
        setCurrentView('configure');
    };

    const handleSubmit = async () => {
        if (!selectedActionType) return;

        setIsSubmitting(true);
        try {
            if (editingActionId) {
                const actionType = getActionTypeFromId(editingActionId, formState);
                const result = await updateActionItemSafely(editingActionId, formState, actionType);
                
                // If ID was converted, use the new ID
                const finalId = (result as any).newId || editingActionId;
                updateStoreAction(finalId, formState);
                
                toast.success("Action updated successfully!");
            } else {
                const tempId = `temp_${Date.now()}`;
                const payload = {
                    id: tempId,
                    type: selectedActionType as any,
                    config: formState,
                    order: actionItems.length
                };
                addActionItem(payload as ActionItemType);
                const newActionFromDb = await createActionItem(payload);
                convertTemporaryId(tempId, newActionFromDb.id);
                toast.success("Action added successfully!");
            }
            setCurrentView('main');
            setEditingActionId(null);
            setSelectedActionType(null);
        } catch (error) {
            toast.error("Failed to save action.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteAction = async () => {
        if (!deleteCandidateId) return;
        setIsSubmitting(true);
        try {
            await deleteActionItem(deleteCandidateId);
            removeActionItem(deleteCandidateId);
            toast.success("Action deleted.");
        } catch (error) {
            toast.error("Failed to delete action.");
        } finally {
            setIsSubmitting(false);
            setDeleteCandidateId(null);
        }
    };

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
            <div className="flex flex-col h-full text-gray-900 bg-gray-50">
                {/* Compact Header */}
                <div className="flex items-center gap-3 p-4 bg-white border-b border-gray-200">
                    <button
                        onClick={() => {
                            setCurrentView('main');
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

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setCurrentView('main');
                                setEditingActionId(null);
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

    const renderMainView = () => (
        <MainView
            actionItems={actionItems}
            categories={categories}
            onClose={onClose}
            onAddNew={() => setCurrentView('select-type')}
            onEditAction={handleEditClick}
            onDeleteAction={setDeleteCandidateId}
        />
    );

    const renderActionTypeSelection = () => (
        <ActionTypeSelection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            hoveredAction={hoveredAction}
            onHoverAction={setHoveredAction}
            onSelectAction={handleActionTypeSelect}
            onBack={() => setCurrentView('main')}
        />
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                {currentView === 'main' && renderMainView()}
                {currentView === 'select-type' && renderActionTypeSelection()}
                {currentView === 'configure' && renderConfigurationForm()}

                {deleteCandidateId && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
                        <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-sm m-4 border border-gray-200">
                            <div className="text-center mb-4">
                                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-100 flex items-center justify-center">
                                    <Trash2 size={20} className="text-red-600" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Action</h3>
                                <p className="text-sm text-gray-600">Are you sure? This cannot be undone.</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleteCandidateId(null)}
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteAction}
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:bg-red-400 font-medium transition-colors text-sm"
                                >
                                    {isSubmitting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedActionsPanel;