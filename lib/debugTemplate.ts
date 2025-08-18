// Debug utilities for template issues
// These functions can be called from browser console

export const debugTemplate = {
  // Check current localStorage state
  checkLocalStorage: () => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('user-content-storage');
    if (data) {
      try {
        const parsed = JSON.parse(data);
        return parsed;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  },

  // Clear localStorage
  clearStorage: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user-content-storage');
  },

  // Force reload page after clearing
  clearAndReload: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user-content-storage');
    window.location.reload();
  },

  // Check what template should be loaded from database
  checkDatabaseTemplate: async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      return data?.templateId;
    } catch (error) {
      console.error('Error fetching database template:', error);
      return null;
    }
  }
};

// Make it available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).debugTemplate = debugTemplate;
}