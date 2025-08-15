// hooks/useActionItems.ts
import { useUserContentStore } from "@/stores/useContentStore";
import { updateActionItem, createActionItem, deleteActionItem } from "@/actions/editorActions";
import { toast } from "sonner";

export const useActionItems = () => {
  const { 
    actionItems, 
    updateActionItem: updateActionItemInStore, 
    removeActionItem,
    convertTemporaryId,
    isTemporaryId 
  } = useUserContentStore();

  const handleUpdateActionItem = async (id: string, updates: any) => {
    try {
      // Optimistically update the store first
      updateActionItemInStore(id, updates);

      const result = await updateActionItem(id, updates);
      
      // If this was a temporary ID that got converted to a real one
      if ('isNewItem' in result && result.isNewItem && 'oldId' in result && 'newId' in result && result.newId !== result.oldId) {
        convertTemporaryId(result.oldId, result.newId);
        toast.success("Action item saved successfully!");
      } else {
        toast.success("Action item updated successfully!");
      }

      return result;
    } catch (error) {
      console.error("Failed to update action item:", error);
      toast.error("Failed to update action item");
      throw error;
    }
  };

  const handleDeleteActionItem = async (id: string) => {
    try {
      // Remove from store first for immediate feedback
      removeActionItem(id);

      const result = await deleteActionItem(id);
      
      if (result.isTemporary) {
        toast.success("Default item removed");
      } else {
        toast.success("Action item deleted successfully!");
      }

      return result;
    } catch (error) {
      console.error("Failed to delete action item:", error);
      toast.error("Failed to delete action item");
      throw error;
    }
  };

  const handleCreateActionItem = async (actionData: {
    type: string;
    config: object;
    order: number;
  }) => {
    try {
      const newAction = await createActionItem(actionData);
      toast.success("Action item created successfully!");
      return newAction;
    } catch (error) {
      console.error("Failed to create action item:", error);
      toast.error("Failed to create action item");
      throw error;
    }
  };

  return {
    actionItems,
    handleUpdateActionItem,
    handleDeleteActionItem,
    handleCreateActionItem,
    isTemporaryId,
  };
};