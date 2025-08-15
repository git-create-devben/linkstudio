"use client";
import React, { useCallback, useMemo, useState } from 'react';
import { X, Plus, Sparkles, GripVertical, ArrowUp, ArrowDown, CheckCircle2 } from 'lucide-react';
import { ActionItemType, useUserContentStore } from '@/stores/useContentStore';
import ActionCard from './ActionCard';
import StatsOverview from './StatsOverview';
import { toast } from 'sonner';

interface MainViewProps {
  actionItems: ActionItemType[];
  categories: string[];
  onClose: () => void;
  onAddNew: () => void;
  onEditAction: (action: ActionItemType) => void;
  onDeleteAction: (id: string) => void;
}

const MainView: React.FC<MainViewProps> = ({
  actionItems,
  categories,
  onClose,
  onAddNew,
  onEditAction,
  onDeleteAction
}) => {
  const configuredActions = actionItems.filter(a => a.config.title).length;

  const { setActionItems, saveAllChanges } = useUserContentStore();
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);

  const orderedItems = useMemo(() => {
    return [...actionItems].sort((a, b) => a.order - b.order);
  }, [actionItems]);

  const handleReorder = useCallback(async (from: number, to: number) => {
    if (from === to || from == null || to == null) return;
    const items = [...orderedItems];
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    const normalized = items.map((item, idx) => ({ ...item, order: idx }));
    setActionItems(normalized);

    // Fast, batched server update for order only
    try {
      setIsSavingOrder(true);
      const payload = normalized.map(it => ({ id: it.id, order: it.order }));
      const { reorderActionItems } = await import('@/actions/editorActions');
      await reorderActionItems(payload);
      toast.success('Order updated', { duration: 1200 });
    } catch (e) {
      console.error('Reorder failed', e);
      toast.error('Could not update order');
    } finally {
      setIsSavingOrder(false);
    }
  }, [orderedItems, setActionItems]);

  return (
    <div className="flex flex-col h-full text-gray-900 bg-gray-50">
      {/* Compact Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Actions</h2>
            <p className="text-xs text-gray-600">Manage interactive elements</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:block hidden"
        >
          <X size={16} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {/* Stats Overview */}
        <StatsOverview 
          totalActions={actionItems.length}
          configuredActions={configuredActions}
          totalCategories={categories.length}
        />

        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-900">Your Actions</h3>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {actionItems.length}
              </span>
            </div>
            <button
              onClick={onAddNew}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-medium text-sm"
            >
              <Plus size={14} />
              Add New
            </button>
          </div>
          
          {orderedItems.length > 0 ? (
            <div className="grid gap-3">
              {orderedItems.map((action, index) => (
                <div
                  key={action.id}
                  className={`relative rounded-lg transition-shadow ${overIndex === index ? 'ring-2 ring-blue-300 shadow-sm' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setOverIndex(index); }}
                  onDrop={(e) => { e.preventDefault(); if (dragIndex !== null) { handleReorder(dragIndex, index); } setDragIndex(null); setOverIndex(null); }}
                  onDragLeave={() => setOverIndex(null)}
                >
                  <ActionCard
                    action={action}
                    onEdit={onEditAction}
                    onDelete={onDeleteAction}
                  />

                  {/* Reorder toolbar (below card) */}
                  <div className="mt-2 flex items-center justify-between px-2">
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] cursor-grab select-none
                                  ${dragIndex === index ? 'cursor-grabbing' : ''}
                                  ${overIndex === index ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-600'}`}
                      title="Drag to reorder"
                      draggable
                      onDragStart={() => setDragIndex(index)}
                      onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
                    >
                      <GripVertical size={14} className="opacity-80" />
                      <span className="uppercase tracking-wide">Drag</span>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => index > 0 && handleReorder(index, index - 1)}
                        className={`p-1.5 rounded-md border text-gray-600 hover:bg-gray-50 ${index === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
                        title="Move up"
                        disabled={index === 0}
                      >
                        <ArrowUp size={12} />
                      </button>
                      <button
                        onClick={() => index < orderedItems.length - 1 && handleReorder(index, index + 1)}
                        className={`p-1.5 rounded-md border text-gray-600 hover:bg-gray-50 ${index === orderedItems.length - 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
                        title="Move down"
                        disabled={index === orderedItems.length - 1}
                      >
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-white">
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Sparkles size={20} className="text-white" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-gray-900">Ready to start?</h3>
              <p className="text-sm text-gray-600 mb-6 max-w-sm mx-auto">
                Add interactive elements to make your page engaging.
              </p>
              <button
                onClick={onAddNew}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-md hover:scale-105 transition-all duration-200 font-semibold text-sm"
              >
                <Plus size={16} />
                Create First Action
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Saving indicator (non-blocking) */}
      {isSavingOrder && (
        <div className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-gray-200 shadow-sm text-xs text-gray-700">
          <CheckCircle2 size={14} className="text-emerald-600" />
          Updating order...
        </div>
      )}
    </div>
  );
};

export default MainView;