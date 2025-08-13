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
        console.log('Current localStorage data:', parsed);
        return parsed;
      } catch (e) {
        console.log('Invalid localStorage data:', data);
        return null;
      }
    } else {
      console.log('No localStorage data found');
      return null;
    }
  },

  // Clear localStorage
  clearStorage: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user-content-storage');
    console.log('localStorage cleared');
  },

  // Force reload page after clearing
  clearAndReload: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('user-content-storage');
    console.log('localStorage cleared, reloading page...');
    window.location.reload();
  },

  // Check what template should be loaded from database
  checkDatabaseTemplate: async () => {
    try {
      const response = await fetch('/api/user/profile');
      const data = await response.json();
      console.log('Database template ID:', data?.templateId);
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