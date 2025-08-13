// App state utilities and types

export interface AppState {
  loading: boolean;
  isDirty: boolean;
  lastSaved: Date | null;
  isSaving: boolean;
  saveError: string | null;
  templateId: string;
}

export const defaultAppState: AppState = {
  loading: true,
  isDirty: false,
  lastSaved: null,
  isSaving: false,
  saveError: null,
  templateId: "minimal",
};

// App state utilities
export function formatLastSaved(date: Date | null): string {
  if (!date) return 'Never saved';
  
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Saved just now';
  if (diffInSeconds < 3600) return `Saved ${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `Saved ${Math.floor(diffInSeconds / 3600)}h ago`;
  
  return `Saved on ${date.toLocaleDateString()}`;
}

export function getSaveStatus(isSaving: boolean, isDirty: boolean, saveError: string | null): string {
  if (saveError) return 'Error saving';
  if (isSaving) return 'Saving...';
  if (isDirty) return 'Unsaved changes';
  return 'All changes saved';
}

export function canSave(isSaving: boolean, isDirty: boolean): boolean {
  return !isSaving && isDirty;
}