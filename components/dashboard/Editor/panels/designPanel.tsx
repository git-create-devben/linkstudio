import React, { useState } from 'react';
import { X, Edit, UploadCloud } from 'lucide-react';
import { updateDesign, uploadCoverImage } from '@/actions/editorActions';
import { useUserContentStore } from '@/stores/useContentStore';
import { toast } from 'sonner';

interface DesignPanelProps {
  onClose: () => void;
}

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const presetColors = [
    '#E5E7EB', '#6B7280', '#374151', '#1F2937',
    '#FEF3C7', '#F59E0B', '#D97706', '#92400E',
    '#DBEAFE', '#3B82F6', '#1D4ED8', '#1E3A8A',
    '#D1FAE5', '#10B981', '#047857', '#064E3B',
    '#FCE7F3', '#EC4899', '#BE185D', '#831843',
    '#EDE9FE', '#8B5CF6', '#7C3AED', '#5B21B6'
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-10 rounded-lg border border-gray-200 flex items-center justify-between px-3 hover:border-gray-300 transition-colors"
        style={{ backgroundColor: color }}
      >
        <span className="text-sm font-medium" style={{ color: color === '#FFFFFF' ? '#000' : '#FFF' }}>
          {label}
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-12 left-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-64">
          <div className="grid grid-cols-6 gap-2 mb-3">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => {
                  onChange(presetColor);
                  setIsOpen(false);
                }}
                className="w-8 h-8 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: presetColor }}
              />
            ))}
          </div>
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-8 rounded border border-gray-200"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full text-sm text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};


const DesignPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // Connect to the global store
  const { design, setDesign, content, setContent } = useUserContentStore();

  // A single, powerful function to handle any design change
  const handleDesignChange = async (update: Partial<typeof design>) => {
    // 1. Update the local state for instant UI feedback (live preview)
    setDesign(update);
    // 2. Save the change to the database in the background
    try {
      await updateDesign(update);
      // Optional: show a subtle success toast, or only show errors
    } catch (error) {
      toast.error("Failed to save design change.");
    }
  };
  
  // Handler for the cover image upload
  const handleCoverImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      
      // toast.loading("Uploading cover image...");
      try {
          const newUrl = await uploadCoverImage(formData);
          // Update the content slice of our store
          setContent({ coverImage: newUrl });
          toast.success("Cover image updated!");
      } catch (error) {
          toast.error("Upload failed. Please try again.");
      }
  };

  const fonts = ['Inter', 'Lora', 'Roboto', 'Open Sans', 'Montserrat'];

  return  (
    <div className="flex flex-col h-full bg-white text-black">
      <header className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Design</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded"> <X size={20} /> </button>
      </header>
      
      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Cover Image Section - Now Functional */}
        <div>
          <h3 className="text-base font-medium mb-3">Cover</h3>
          <div 
            className="group relative h-32 rounded-lg border-2 border-dashed border-gray-300 bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${content.coverImage})`, backgroundColor: '#f0f0f0' }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-lg"/>
            <label htmlFor="cover-upload" className="relative z-10 flex flex-col items-center text-white bg-black/30 p-4 rounded-lg cursor-pointer">
                <UploadCloud size={24}/>
                <span className="text-sm font-medium mt-1">
                    {content.coverImage ? 'Change Image' : 'Upload Image'}
                </span>
            </label>
            <input id="cover-upload" type="file" className="hidden" accept="image/*,video/*" onChange={handleCoverImageUpload}/>
          </div>
        </div>
        
        {/* Background Color Section */}
        <div>
          <h3 className="text-base font-medium mb-3">Background Color</h3>
          <ColorPicker
            label="Background"
            color={design.background as string}
            onChange={(color) => handleDesignChange({ background: color })}
          />
        </div>

        {/* Colors Section (Buttons & Text) */}
        <div>
          <h3 className="text-base font-medium mb-3">Accent Colors</h3>
          <div className="grid grid-cols-2 gap-3">
            <ColorPicker
              label="Buttons"
              color={design.buttonColor as string}
              onChange={(color) => handleDesignChange({ buttonColor: color })}
            />
            <ColorPicker
              label="Text"
              color={design.color as string}
              onChange={(color) => handleDesignChange({ color })}
            />
          </div>
        </div>

        {/* Font Section */}
        <div>
          <h3 className="text-base font-medium mb-3">Font</h3>
           <select
            value={design.font}
            onChange={(e) => handleDesignChange({ font: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white appearance-none"
            style={{ fontFamily: design.font }}
          >
            {fonts.map((font) => (
              <option key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
      </main>
    </div>
  );

};

export default DesignPanel;


