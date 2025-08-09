import React, { useState } from 'react';
import { X, Edit, UploadCloud, Palette, Sun, Moon, Sparkles, Image, } from 'lucide-react';
import { updateDesign, uploadCoverImage } from '@/actions/editorActions';
import { useUserContentStore } from '@/stores/useContentStore';
import { getTheme, ThemeMode, bannerGradients } from '@/lib/themeSystem';
import { toast } from 'sonner';
import { IconColorFilter } from '@tabler/icons-react';

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

  const presetGradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)'
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

  const [bannerTab, setBannerTab] = useState<'none' | 'image' | 'gradient'>(
    design.banner?.type || 'none'
  );
  
  const currentTheme = getTheme(design.theme || 'dark');
  
  const handleThemeChange = (newTheme: ThemeMode) => {
    handleDesignChange({ theme: newTheme });
  };
  
  const handleBannerChange = (type: 'none' | 'image' | 'gradient', value?: string) => {
    handleDesignChange({ 
      banner: { 
        ...design.banner, 
        type, 
        value: value || design.banner?.value 
      } 
    });
    setBannerTab(type);
  };

  const handleBannerImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    toast.loading("Uploading banner image...");
    try {
        const newUrl = await uploadCoverImage(formData);
        handleBannerChange('image', newUrl);
        toast.success("Banner image updated!");
    } catch (error) {
        toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold">Design Studio</h2>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-slate-200 rounded-lg transition-colors duration-200"
        > 
          <X size={18} /> 
        </button>
      </header>
      
      <main className="flex-1 p-4 space-y-6 overflow-y-auto">
         {/* Preview Card */}
         <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold mb-3">Preview</h3>
          <div 
            className="h-24 rounded-lg flex items-center justify-center text-white font-medium shadow-inner"
            style={{ background: design.customBackground || currentTheme.colors.background }}
          >
            <div className="text-center">
              <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2" />
              <div className="text-sm opacity-90">Your Profile</div>
            </div>
          </div>
        </div>
        
        {/* Theme Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Theme Mode
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: 'light' as ThemeMode, icon: Sun, label: 'Light', bg: 'from-blue-100 to-purple-100' },
              { key: 'dark' as ThemeMode, icon: Moon, label: 'Dark', bg: 'from-slate-700 to-slate-900' },
              { key: 'glassmorphic' as ThemeMode, icon: Sparkles, label: 'Glass', bg: 'from-purple-500 to-pink-500' }
            ].map(({ key, icon: Icon, label, bg }) => {
              const isActive = design.theme === key;
              return (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? 'border-blue-500 shadow-lg' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-full h-8 rounded bg-gradient-to-r ${bg} mb-2`} />
                  <div className="flex items-center justify-center gap-1">
                    <Icon className="w-3 h-3" />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Gradients */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <IconColorFilter className="w-4 h-4" />
            Background
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {currentTheme.gradients.map((gradient, index) => (
              <button
                key={index}
                onClick={() => handleDesignChange({ customBackground: gradient })}
                className="w-full h-12 rounded-lg border-2 border-slate-200 hover:border-blue-400 transition-all duration-200 hover:scale-105 shadow-sm"
                style={{ background: gradient }}
                title={`Gradient ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Banner Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold mb-4 flex items-center gap-2">
            <Image className="w-4 h-4" />
            Banner
          </h3>
          
          {/* Banner Type Selector */}
          <div className="flex gap-2 mb-4">
            {[
              { key: 'none', label: 'None', icon: X },
              { key: 'image', label: 'Image', icon: Image },
              { key: 'gradient', label: 'Gradient', icon:IconColorFilter  }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleBannerChange(key as any)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  bannerTab === key
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Banner Content */}
          {bannerTab === 'image' && (
            <div>
              <div 
                className="relative h-24 rounded-lg border-2 border-dashed border-slate-300 bg-cover bg-center flex items-center justify-center hover:border-blue-400 transition-colors duration-200"
                style={{ 
                  backgroundImage: design.banner?.value ? `url(${design.banner.value})` : 'none',
                  backgroundColor: '#f8fafc' 
                }}
              >
                <label htmlFor="banner-upload" className="flex flex-col items-center text-slate-600 cursor-pointer">
                  <UploadCloud size={20}/>
                  <span className="text-xs font-medium mt-1">
                    {design.banner?.value ? 'Change Banner' : 'Upload Banner'}
                  </span>
                </label>
                <input 
                  id="banner-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleBannerImageUpload}
                />
              </div>
            </div>
          )}

          {bannerTab === 'gradient' && (
            <div className="grid grid-cols-2 gap-2">
              {bannerGradients.slice(0, 8).map((gradient, index) => (
                <button
                  key={index}
                  onClick={() => handleBannerChange('gradient', gradient)}
                  className="w-full h-10 rounded-lg border-2 border-slate-200 hover:border-blue-400 transition-all duration-200 hover:scale-105"
                  style={{ background: gradient }}
                  title={`Banner Gradient ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Font Section */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <h3 className="text-base font-semibold mb-4">Typography</h3>
          <select
            value={design.font}
            onChange={(e) => handleDesignChange({ font: e.target.value })}
            className="w-full p-3 border border-slate-300 rounded-lg bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
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


