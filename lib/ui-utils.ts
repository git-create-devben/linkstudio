export type ColorScheme = 'gray' | 'blue' | 'purple' | 'gold';

export interface ColorClasses {
  border: string;
  button: string;
  icon: string;
  accent: string;
}

export const getColorClasses = (color: ColorScheme, isSelected = false): ColorClasses => {
  const colors = {
    gray: {
      border: isSelected ? 'border-gray-400 ring-2 ring-gray-200' : 'border-gray-200',
      button: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300',
      icon: 'text-gray-600',
      accent: 'text-gray-900'
    },
    blue: {
      border: isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200',
      button: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300',
      icon: 'text-blue-600',
      accent: 'text-blue-600'
    },
    purple: {
      border: isSelected ? 'border-purple-500 ring-2 ring-purple-100' : 'border-gray-200',
      button: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-300',
      icon: 'text-purple-600',
      accent: 'text-purple-600'
    },
    gold: {
      border: isSelected ? 'border-yellow-500 ring-2 ring-yellow-100' : 'border-gray-200',
      button: 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-300',
      icon: 'text-yellow-600',
      accent: 'text-yellow-600'
    }
  };
  
  return colors[color];
};

// Accessibility helper for plan selection announcements
export const announceToScreenReader = (message: string): void => {
  const announcer = document.createElement('div');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.textContent = message;
  document.body.appendChild(announcer);
  setTimeout(() => document.body.removeChild(announcer), 1000);
};