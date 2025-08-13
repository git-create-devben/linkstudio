"use client";
import React, { useState } from 'react';
import { X, ArrowLeft, Edit, List, Plus, Trash2, Crown, Lock } from 'lucide-react';
import { ActionItemType, useUserContentStore } from '@/stores/useContentStore';
import { createActionItem, deleteActionItem } from '@/actions/editorActions';
import { updateActionItemSafely, getActionTypeFromId } from '@/lib/actionItemHelpers';
import { toast } from 'sonner';
import { IconPicker } from '../IconPicker';
import { useUser } from '@/context/userContext';
import { canUserAddAction, getUserPlan, getPlanDisplayName, getUpgradeMessage, getMinimumPlanForFeature } from '@/lib/planUtils';
import { UpgradePrompt } from '@/components/ui/upgrade-prompt';
import { useRouter } from 'next/navigation';

type LinkListFormState = {
    title?: string;
    links: { title: string; url: string; icon?: string }[];
};

const ActionsPanel = ({ onClose }: { onClose: () => void }) => {
    const [currentView, setCurrentView] = useState('main');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
    const [editingActionId, setEditingActionId] = useState<string | null>(null);

    const [formState, setFormState] = useState<LinkListFormState>({
        title: '',
        links: [{ title: '', url: '', icon: undefined }],
    });

    const { actionItems, addActionItem, removeActionItem, updateActionItem: updateStoreAction, convertTemporaryId } = useUserContentStore();
    const user = useUser();
    const router = useRouter();
    
    // Check if user can add more actions
    const canAddAction = canUserAddAction(user, actionItems.length);
    const userPlan = getUserPlan(user);
    const planDisplayName = getPlanDisplayName(userPlan);

    const handleFormLinkChange = (index: number, field: 'title' | 'url', value: string) => {
        const updatedLinks = [...formState.links];
        updatedLinks[index][field] = value;
        setFormState(prev => ({ ...prev, links: updatedLinks }));
    };

    const handleFormLinkIconChange = (index: number, icon: string) => {
        const updatedLinks = [...formState.links];
        updatedLinks[index].icon = icon;
        setFormState(prev => ({ ...prev, links: updatedLinks }));
    };

    const addLinkToForm = () => {
        const lastLink = formState.links[formState.links.length - 1];
        if (lastLink.title.trim() !== '' && lastLink.url.trim() !== '') {
            setFormState(prev => ({ ...prev, links: [...prev.links, { title: '', url: '', icon: undefined }] }));
        } else {
            toast.error("Please fill the last link before adding a new one.");
        }
    };

    const removeLinkFromForm = (index: number) => {
        if (formState.links.length <= 1) { toast.error("You must have at least one link."); return; }
        const updatedLinks = formState.links.filter((_, i) => i !== index);
        setFormState(prev => ({ ...prev, links: updatedLinks }));
    };

    const handleEditClick = (action: ActionItemType) => {
        setEditingActionId(action.id);
        setFormState(action.config as LinkListFormState);
        setCurrentView('link-list-edit');
    };

    const handleSubmit = async () => {
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
                const payload = { id: tempId, type: 'LINK_LIST', config: formState, order: actionItems.length };
                addActionItem(payload as ActionItemType);
                const newActionFromDb = await createActionItem(payload);
                convertTemporaryId(tempId, newActionFromDb.id);
                toast.success("Action added successfully!");
            }
            setCurrentView('main');
            setEditingActionId(null);
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

    const renderActionForm = () => {
        const isEditing = !!editingActionId;
        return (
            <div className="flex flex-col h-full text-gray-900 bg-gray-50">
                <div className="flex items-center justify-between gap-4 p-4 bg-white/90 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => { setCurrentView('main'); setEditingActionId(null); }}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            aria-label="Back"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h2 className="text-lg font-semibold leading-tight">
                                {isEditing ? 'Edit Link List' : 'Add Link List'}
                            </h2>
                            <p className="text-sm text-gray-500">Create a list of links with optional icons.</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">List Title (optional)</label>
                        <input
                            type="text"
                            placeholder="e.g. My Projects, Socials"
                            value={formState.title || ''}
                            onChange={(e) => setFormState(prev => ({...prev, title: e.target.value}))}
                            className="w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">Shown above the links. Leave blank to hide.</p>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Links</label>
                            <button
                                type="button"
                                onClick={addLinkToForm}
                                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-md"
                            >
                                <Plus size={16} /> Add another link
                            </button>
                        </div>
                        {formState.links.map((link, index) => (
                            <div key={index} className="space-y-3 mb-3 p-4 rounded-lg bg-white shadow-sm">
                                <div className="flex items-center border-b border-gray-200 pb-3">
                                    <IconPicker onSelectIcon={(icon) => handleFormLinkIconChange(index, icon)} selectedIcon={link.icon} />
                                    <input
                                        type="text"
                                        placeholder="Link title"
                                        value={link.title}
                                        onChange={(e) => handleFormLinkChange(index, 'title', e.target.value)}
                                        className="flex-1 px-4 py-2.5 rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeLinkFromForm(index)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                                        aria-label={`Remove link ${index + 1}`}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <input
                                        type="url"
                                        placeholder="https://example.com"
                                        value={link.url}
                                        onChange={(e) => handleFormLinkChange(index, 'url', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-lg"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">Use a full URL including https://</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t bg-white">
                    <div className="flex gap-3">
                        <button
                            onClick={() => { setCurrentView('main'); setEditingActionId(null); }}
                            className="flex-1 px-4 py-3 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:bg-blue-400 font-semibold transition-colors"
                        >
                           {isSubmitting ? (isEditing ? 'Saving Changes...' : 'Adding Action...') : (isEditing ? 'Save Changes' : 'Add Action')}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderMainView = () => (
        <div className="flex flex-col h-full text-gray-900 bg-gray-50">
            <header className="flex items-center justify-between p-4 border-b bg-white/90 backdrop-blur">
                <div>
                    <h2 className="text-lg font-semibold leading-tight">Page Actions</h2>
                    <p className="text-sm text-gray-500">Manage and create reusable link lists for your page.</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full" aria-label="Close panel">
                    <X size={20} />
                </button>
            </header>
            <main className="flex-1 overflow-y-auto p-6">
                <div className="mb-8">
                    <h3 className="text-base font-semibold mb-4 text-gray-800">Your Actions</h3>
                    {actionItems.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {actionItems.map((action) => (
                                <div key={action.id} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <List size={20} className="text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-gray-900 truncate">{action.config.title || 'Untitled List'}</h4>
                                        <p className="text-sm text-gray-500">Link List</p>
                                    </div>
                                    <button onClick={() => handleEditClick(action)} className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 rounded-full" aria-label="Edit action">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => setDeleteCandidateId(action.id)} className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-full" aria-label="Delete action">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 border-2 border-dashed rounded-xl bg-white">
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">No actions yet</h3>
                            <p className="text-gray-500">Create your first action using the card below.</p>
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-base font-semibold mb-4 text-gray-800">Add New Action</h3>
                    <div
                        onClick={() => {
                            if (!canAddAction) {
                                toast.error(getUpgradeMessage('maxActions'));
                                router.push('/payment');
                                return;
                            }
                            setFormState({ title: '', links: [{ title: '', url: '', icon: undefined }] });
                            setCurrentView('link-list-add');
                        }}
                        className={`text-left p-5 border-2 border-dashed rounded-xl transition-colors bg-white ${
                            canAddAction
                                ? 'hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
                                : 'opacity-60 cursor-not-allowed'
                        }`}
                        role="button"
                        tabIndex={canAddAction ? 0 : -1}
                        onKeyDown={(e) => {
                            if (canAddAction && (e.key === 'Enter' || e.key === ' ')) {
                                setFormState({ title: '', links: [{ title: '', url: '', icon: undefined }] });
                                setCurrentView('link-list-add');
                            }
                        }}
                        aria-label="Add new Link List action"
                        aria-disabled={!canAddAction}
                    >
                        <div className="flex gap-4 items-center">
                            <div className={`w-12 h-12 ${canAddAction ? 'bg-gray-100' : 'bg-gray-200'} rounded-lg flex items-center justify-center flex-shrink-0 relative`}>
                                <List size={24} className={`${canAddAction ? 'text-gray-600' : 'text-gray-400'}`} />
                                {!canAddAction && (
                                    <Lock size={12} className="absolute top-1 right-1 text-gray-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-semibold text-lg text-gray-900">Link List</h4>
                                    {!canAddAction && (
                                        <Crown size={16} className="text-yellow-500" />
                                    )}
                                </div>
                                <p className={`${canAddAction ? 'text-gray-600' : 'text-gray-500'}`}>
                                    {canAddAction 
                                        ? 'A list of links to your websites, social media, or any other URL.'
                                        : `Upgrade to ${getPlanDisplayName(getMinimumPlanForFeature('maxActions'))} to add more actions (${actionItems.length} used)`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-4xl h-[90vh] bg-white rounded-2xl overflow-auto shadow-2xl">
                {currentView.startsWith('link-list') ? renderActionForm() : renderMainView()}
                {deleteCandidateId && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
                        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm m-4">
                            <h3 className="text-xl font-bold text-gray-900">Delete Action</h3>
                            <p className="text-gray-600 mt-2">Are you sure you want to delete this action? This cannot be undone.</p>
                            <div className="flex gap-4 mt-6">
                                <button onClick={() => setDeleteCandidateId(null)} disabled={isSubmitting} className="flex-1 px-4 py-3 text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition-colors">Cancel</button>
                                <button onClick={handleDeleteAction} disabled={isSubmitting} className="flex-1 px-4 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:bg-red-400 font-semibold transition-colors">{isSubmitting ? 'Deleting...' : 'Confirm Delete'}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActionsPanel;
