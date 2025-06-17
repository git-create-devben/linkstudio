"use client";
import React, { useState } from 'react';
import { X, ArrowLeft, Edit, List, Plus, Trash2 } from 'lucide-react';
import { ActionItemType, useUserContentStore } from '@/stores/useContentStore'; // Adjust path
import { createActionItem, deleteActionItem, updateActionItem } from '@/actions/editorActions'; // Adjust path
import { toast } from 'sonner';

type LinkListFormState = {
    title?: string; // Title is now optional
    links: { title: string; url: string }[];
};

const ActionsPanel = ({ onClose }: { onClose: () => void }) => {
    // --- STATE MANAGEMENT ---
    const [currentView, setCurrentView] = useState('main');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteCandidateId, setDeleteCandidateId] = useState<string | null>(null);
    
    // **NEW**: State to track if we are adding or editing
    const [editingActionId, setEditingActionId] = useState<string | null>(null);

    const [formState, setFormState] = useState<LinkListFormState>({
        title: '',
        links: [{ title: '', url: '' }],
    });

    const { actionItems, addActionItem, removeActionItem, updateActionItem: updateStoreAction } = useUserContentStore();

    // --- HELPER FUNCTIONS ---
    const handleFormLinkChange = (index: number, field: 'title' | 'url', value: string) => {
        const updatedLinks = [...formState.links];
        updatedLinks[index][field] = value;
        setFormState(prev => ({ ...prev, links: updatedLinks }));
    };

    const addLinkToForm = () => setFormState(prev => ({ ...prev, links: [...prev.links, { title: '', url: '' }] }));
    
    const removeLinkFromForm = (index: number) => {
        if (formState.links.length <= 1) { toast.error("You must have at least one link."); return; }
        const updatedLinks = formState.links.filter((_, i) => i !== index);
        setFormState(prev => ({ ...prev, links: updatedLinks }));
    };

    // **NEW**: Function to open the form for editing
    const handleEditClick = (action: ActionItemType) => {
        setEditingActionId(action.id);
        // Pre-fill the form with the existing action's data
        setFormState(action.config as LinkListFormState);
        setCurrentView('link-list-edit'); // Use a new view key to differentiate
    };

    // --- CORE CRUD HANDLERS ---
    const handleSubmit = () => {
        // If we have an editing ID, call update. Otherwise, call add.
        if (editingActionId) {
            handleUpdateAction();
        } else {
            handleAddAction();
        }
    };

    const handleAddAction = async () => {
        // **MODIFIED**: Removed the required title check
        setIsSubmitting(true);
        try {
            const payload = { type: 'LINK_LIST', config: formState, order: actionItems.length };
            const newActionFromDb = await createActionItem(payload);
            addActionItem(newActionFromDb as ActionItemType);
            toast.success("Action added successfully!");
            setCurrentView('main');
        } catch (error) {
            toast.error("Failed to add action.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // **NEW**: Function to handle updating an existing action
    const handleUpdateAction = async () => {
        if (!editingActionId) return;
        setIsSubmitting(true);
        try {
            await updateActionItem(editingActionId, formState);
            // Update the item in our global store
            updateStoreAction(editingActionId, formState);
            toast.success("Action updated successfully!");
            setCurrentView('main');
            setEditingActionId(null); // Reset editing mode
        } catch (error) {
            toast.error("Failed to update action.");
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
    
    const actionTypes = [
        {
            id: 'link-list-add', // Use a specific key for adding
            icon: List,
            title: 'Link List',
            description: 'Add a list of links, with or without a heading.',
            preview: (
                 <div className="bg-gray-100 p-4 rounded-lg text-black">
                    <h3 className="font-bold text-center mb-2">My Links</h3>
                    <div className="space-y-2 w-56 m-auto">
                        <div className="bg-black p-2 text-sm rounded-md border text-center text-white">Website</div>
                        <div className="bg-black p-2 text-sm rounded-md border text-center text-white border-white ">Social Media</div>
                    </div>
                </div>
            )
        },
    ];
    
    // --- RENDER FUNCTIONS ---
    const renderActionForm = () => {
        const isEditing = !!editingActionId;
        return (
            <div className="flex flex-col h-full text-black">
                <div className="flex items-center gap-4 p-6 border-b">
                    <button onClick={() => { setCurrentView('main'); setEditingActionId(null); }} className="p-2 hover:bg-gray-100 rounded-lg"><ArrowLeft size={20} /></button>
                    <h2 className="text-xl font-semibold">{isEditing ? 'Edit Link List' : 'Add Link List'}</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">List Title (Optional)</label>
                        <input type="text" placeholder="e.g., My Projects, Socials" value={formState.title || ''} onChange={(e) => setFormState(prev => ({...prev, title: e.target.value}))} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Links</label>
                        {formState.links.map((link, index) => (
                        <div key={index} className="space-y-2 mb-2 p-3 border rounded-md">
                             <div className="flex gap-2 items-center">
                                <input type="text" placeholder="Link title" value={link.title} onChange={(e) => handleFormLinkChange(index, 'title', e.target.value)} className="flex-1 px-3 py-2 border rounded-lg" />
                                <button onClick={() => removeLinkFromForm(index)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                            </div>
                            <input type="url" placeholder="https://example.com" value={link.url} onChange={(e) => handleFormLinkChange(index, 'url', e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                        </div>
                        ))}
                        <button onClick={addLinkToForm} className="text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1"><Plus size={16} /> Add Link</button>
                    </div>
                </div>
                <div className="p-6 border-t bg-gray-50">
                    <div className="flex gap-3">
                        <button onClick={() => { setCurrentView('main'); setEditingActionId(null); }} className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-lg">Cancel</button>
                        <button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 px-4 py-2 text-white bg-blue-500 rounded-lg disabled:bg-blue-300">
                           {isSubmitting ? (isEditing ? 'Saving...' : 'Adding...') : (isEditing ? 'Save Changes' : 'Add Action')}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const renderMainView = () => (
        <div className="flex flex-col h-full text-black">
            <header className="flex items-center justify-between p-6 border-b"><h2 className="text-xl font-semibold">Page Actions</h2><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X size={20} /></button></header>
            <main className="flex-1 overflow-y-auto p-6">
                 <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Shown actions ({actionItems.length})</h3>
                    {actionItems.length > 0 ? (
                        <div className="space-y-3">
                            {actionItems.map((action) => (
                                <div key={action.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><List size={20} className="text-blue-500" /></div>
                                    <div className="flex-1"><h4 className="font-medium">{action.config.title || 'Untitled List'}</h4><p className="text-sm text-gray-500">Link List</p></div>
                                    {/* -- NEW: Edit and Delete Buttons -- */}
                                    <button onClick={() => handleEditClick(action)} className="p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-800 rounded-lg"><Edit size={18} /></button>
                                    <button onClick={() => setDeleteCandidateId(action.id)} className="p-2 text-gray-500 hover:bg-red-100 hover:text-red-600 rounded-lg"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    ) : <div className="text-center py-8"><h3 className="text-lg font-medium mb-2">No actions added</h3><p className="text-gray-500">Add an action to get started.</p></div>}
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-4">Choose Action Type</h3>
                    {actionTypes.map((actionType) => (
                        <div key={actionType.id} onClick={() => { setFormState({ title: '', links: [{ title: '', url: '' }] }); setCurrentView('link-list-add'); }} className="text-left p-4 border rounded-lg hover:border-blue-300 cursor-pointer">
                            <div className="flex gap-4 items-center"><div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0"><List size={20} className="text-gray-600" /></div><div className="flex-1"><h4 className="font-medium mb-1">{actionType.title}</h4><p className="text-sm text-gray-600">{actionType.description}</p></div></div>
                            <div className="mt-4">{actionType.preview}</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
    
    // --- MAIN RETURN & DIALOGS ---
    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-4xl h-full max-h-[90vh] rounded-lg overflow-hidden relative">
                {currentView.startsWith('link-list') ? renderActionForm() : renderMainView()}
                {deleteCandidateId && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-20">
                        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
                            <h3 className="text-lg font-bold text-gray-900">Delete Action</h3><p className="text-sm text-gray-600 mt-2">Are you sure? This cannot be undone.</p>
                            <div className="flex gap-3 mt-6">
                                <button onClick={() => setDeleteCandidateId(null)} disabled={isSubmitting} className="flex-1 px-4 py-2 text-gray-700 bg-white border rounded-lg">Cancel</button>
                                <button onClick={handleDeleteAction} disabled={isSubmitting} className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg disabled:bg-red-400">{isSubmitting ? 'Deleting...' : 'Confirm Delete'}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActionsPanel;