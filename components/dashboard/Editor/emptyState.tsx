import React from 'react';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
    onAddLink: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddLink }) => {
    return (
        <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No social links yet</h3>
            <p className="text-gray-600 mb-6 text-sm">
                Get more followers by adding links to your social media.
            </p>
            <button
                onClick={onAddLink}
                className=" px-4 py-2 rounded-full
          border-blue-600 border hover:border-blue-700
          text-blue-600 hover:text-blue-700
          bg-white hover:bg-blue-50
          text-sm font-medium flex items-center gap-2 mx-auto transition-colors cursor-pointer"
            >
                <Plus size={16} className="text-blue-500" />
                <span>Add Link</span>
            </button>
        </div>
    );
};

export default EmptyState;