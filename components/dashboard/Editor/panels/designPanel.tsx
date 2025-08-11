import React, { useState } from 'react';
import { X, Edit, Palette, Sun, Moon, Sparkles, Type, MousePointer, Waves, ArrowLeft, Crown, Lock } from 'lucide-react';
import { useUserContentStore } from '@/stores/useContentStore';
import { getTheme, ThemeMode, curveShapes, curveColors, buttonStyles, buttonAnimations, buttonGradients } from '@/lib/themeSystem';
import { IconColorSwatch, IconWaveSine } from '@tabler/icons-react';
import { useUser } from '@/context/userContext';
import { getUserPlan, canUserAccessFeature } from '@/lib/planUtils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type PanelView = 'main' | 'theme' | 'background' | 'curves' | 'typography' | 'buttons';

const DesignPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { design, setDesign } = useUserContentStore();
  const [currentView, setCurrentView] = useState<PanelView>('main');
  const currentTheme = getTheme(design.theme || 'dark');
  const fonts = ['Inter', 'Lora', 'Roboto', 'Open Sans', 'Montserrat', 'Playfair Display', 'Source Sans Pro', 'Poppins', 'Oswald', 'Raleway'];
  
  const user = useUser();
  const router = useRouter();
  const userPlan = getUserPlan(user);
  const hasAdvancedCustomization = canUserAccessFeature(user, 'advancedCustomization');
  const hasCustomCSS = canUserAccessFeature(user, 'customCSS');

  const handleDesignChange = (update: Partial<typeof design>) => {
    setDesign(update);
  };

  const renderMainView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <h3 className="text-base font-semibold mb-3">Live Preview</h3>
        <div 
          className="h-24 rounded-lg flex items-center justify-center text-white font-medium shadow-inner relative overflow-hidden"
          style={{ 
            background: design.customBackground || currentTheme.colors.background,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {design.curveShape && (
            <div 
              className={`absolute top-0 left-0 w-full h-full ${curveShapes.find(s => s.id === design.curveShape)?.animationClass || ''}`}
              style={{
                background: design.curveColor || curveColors[0].value,
                clipPath: curveShapes.find(s => s.id === design.curveShape)?.clipPath || 'none'
              }}
            />
          )}
          <div className="text-center relative z-10">
            <div className="w-8 h-8 bg-white/20 rounded-full mx-auto mb-2" />
            <div 
              className="text-sm opacity-90"
              style={{ color: design.textPrimaryColor || currentTheme.colors.textPrimary }}
            >
              Your Profile
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg"><Sparkles className="w-5 h-5 text-purple-600" /></div>
              <div>
                <h3 className="font-semibold text-slate-800">Theme Mode</h3>
                <p className="text-sm text-slate-500">{design.theme === 'light' ? 'Light Mode' : design.theme === 'dark' ? 'Dark Mode' : 'Glassmorphic'}</p>
              </div>
            </div>
            <button onClick={() => setCurrentView('theme')} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"><Edit className="w-4 h-4" /> Edit</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg"><IconColorSwatch className="w-5 h-5 text-blue-600" /></div>
              <div>
                <h3 className="font-semibold text-slate-800">Background</h3>
                <p className="text-sm text-slate-500">Gradient backgrounds</p>
              </div>
            </div>
            <button onClick={() => setCurrentView('background')} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"><Edit className="w-4 h-4" /> Edit</button>
          </div>
        </div>
        
        <div className={`bg-white rounded-xl p-4 shadow-sm border border-slate-200 relative ${!hasAdvancedCustomization ? 'opacity-60' : ''}`}>
          {!hasAdvancedCustomization && (
            <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-[2px] rounded-xl flex items-center justify-center z-10">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
                <Lock className="w-4 h-4 text-gray-500" />
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Pro Feature</span>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg"><IconWaveSine className="w-5 h-5 text-emerald-600" /></div>
              <div>
                <h3 className="font-semibold text-slate-800">Premium Curves</h3>
                <p className="text-sm text-slate-500">{design.curveShape ? curveShapes.find(s => s.id === design.curveShape)?.name || 'Custom shape' : 'No curve selected'}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                if (!hasAdvancedCustomization) {
                  toast.error('Upgrade to Pro to access premium curves');
                  router.push('/payment');
                  return;
                }
                setCurrentView('curves');
              }} 
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"
            >
              {!hasAdvancedCustomization ? <Lock className="w-4 h-4" /> : <Edit className="w-4 h-4" />} 
              {!hasAdvancedCustomization ? 'Locked' : 'Edit'}
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg"><Type className="w-5 h-5 text-orange-600" /></div>
              <div>
                <h3 className="font-semibold text-slate-800">Typography</h3>
                <p className="text-sm text-slate-500" style={{ fontFamily: design.font || 'Inter' }}>{design.font || 'Inter'} font family</p>
              </div>
            </div>
            <button onClick={() => setCurrentView('typography')} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"><Edit className="w-4 h-4" /> Edit</button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-100 rounded-lg"><MousePointer className="w-5 h-5 text-pink-600" /></div>
              <div>
                <h3 className="font-semibold text-slate-800">Button Design</h3>
                <p className="text-sm text-slate-500">{buttonStyles.find(s => s.id === design.buttonStyle)?.name || 'Default'} style</p>
              </div>
            </div>
            <button onClick={() => setCurrentView('buttons')} className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium"><Edit className="w-4 h-4" /> Edit</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderThemeView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setCurrentView('main')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><ArrowLeft className="w-4 h-4" /></button>
        <h3 className="text-lg font-semibold">Theme Mode</h3>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {[{ key: 'light' as ThemeMode, icon: Sun, label: 'Light Mode', desc: 'Clean and bright', bg: 'from-blue-100 to-purple-100' }, { key: 'dark' as ThemeMode, icon: Moon, label: 'Dark Mode', desc: 'Easy on the eyes', bg: 'from-slate-700 to-slate-900' }, { key: 'glassmorphic' as ThemeMode, icon: Sparkles, label: 'Glassmorphic', desc: 'Modern glass effect', bg: 'from-purple-500 to-pink-500' }].map(({ key, icon: Icon, label, desc, bg }) => {
          const isActive = design.theme === key;
          return (
            <button key={key} onClick={() => handleDesignChange({ theme: key })} className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${isActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${bg} flex items-center justify-center`}><Icon className="w-5 h-5 text-white" /></div>
                <div>
                  <div className="font-semibold text-slate-800">{label}</div>
                  <div className="text-sm text-slate-500">{desc}</div>
                </div>
                {isActive && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderBackgroundView = () => {
    const availableGradients = hasAdvancedCustomization 
      ? currentTheme.gradients 
      : currentTheme.gradients.slice(0, 2); // Only show 2 gradients for free users
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => setCurrentView('main')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><ArrowLeft className="w-4 h-4" /></button>
          <h3 className="text-lg font-semibold">Background</h3>
        </div>
        
        {!hasAdvancedCustomization && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">Limited Selection</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              Upgrade to access all {currentTheme.gradients.length} background gradients.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          {availableGradients.map((gradient, index) => (
            <button key={index} onClick={() => handleDesignChange({ customBackground: gradient })} className={`h-20 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${design.customBackground === gradient ? 'border-blue-500' : 'border-slate-200'}`} style={{ background: gradient }} title={`Gradient ${index + 1}`}>
              {design.customBackground === gradient && <div className="w-full h-full flex items-center justify-center"><div className="w-3 h-3 bg-white rounded-full shadow-lg" /></div>}
            </button>
          ))}
          
          {/* Show locked gradients for free users */}
          {!hasAdvancedCustomization && currentTheme.gradients.slice(2).slice(0, 4).map((gradient, index) => (
            <div key={`locked-${index}`} className="h-20 rounded-lg border-2 border-dashed border-gray-300 relative overflow-hidden" style={{ background: gradient }}>
              <div className="absolute inset-0 bg-gray-500/30 backdrop-blur-[1px] flex items-center justify-center">
                <div className="bg-white/90 rounded-full p-2">
                  <Lock className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!hasAdvancedCustomization && (
          <button 
            onClick={() => router.push('/payment')}
            className="w-full mt-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Upgrade for All Backgrounds
          </button>
        )}
      </div>
    );
  };

  const renderCurvesView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setCurrentView('main')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><ArrowLeft className="w-4 h-4" /></button>
        <h3 className="text-lg font-semibold">Premium Curves</h3>
      </div>
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Shape</h4>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {curveShapes.map((shape) => (
            <button key={shape.id} onClick={() => handleDesignChange({ curveShape: shape.id, bannerType: 'curve' })} className={`p-3 rounded-lg border-2 transition-all duration-200 ${design.curveShape === shape.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300 bg-white'}`} title={shape.description}>
              <div className="w-full h-6 mb-2 bg-gradient-to-r from-blue-400 to-purple-400" style={{ clipPath: shape.clipPath }} />
              <div className="text-xs font-medium text-slate-700">{shape.name}</div>
              <div className="text-xs text-slate-500">{shape.category}</div>
            </button>
          ))}
        </div>
      </div>
      {design.curveShape && (
        <div>
          <h4 className="font-medium text-slate-700 mb-3">Color</h4>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {curveColors.map((colorItem) => (
              <button key={colorItem.id} onClick={() => handleDesignChange({ curveColor: colorItem.value })} className={`p-3 rounded-lg border-2 transition-all duration-200 ${design.curveColor === colorItem.value ? 'border-blue-500' : 'border-slate-200 hover:border-blue-300'}`} title={colorItem.name}>
                <div className="w-full h-8 rounded mb-1" style={{ background: colorItem.value }} />
                <div className="text-xs font-medium text-slate-700">{colorItem.name}</div>
              </button>
            ))}
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-700">Live Animation</div>
                <div className="text-sm text-slate-500">Enable smooth curve animations</div>
              </div>
              <button onClick={() => handleDesignChange({ curveAnimated: !design.curveAnimated })} className={`w-12 h-6 rounded-full transition-colors duration-200 ${design.curveAnimated !== false ? 'bg-blue-500' : 'bg-slate-300'}`}>
                <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${design.curveAnimated !== false ? 'translate-x-7' : 'translate-x-0'} mt-0.5 ml-0.5`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderTypographyView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setCurrentView('main')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><ArrowLeft className="w-4 h-4" /></button>
        <h3 className="text-lg font-semibold">Typography</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Font Family</label>
          <div className="space-y-2">
            {fonts.map((font) => (
              <button key={font} onClick={() => handleDesignChange({ font })} className={`w-full p-3 text-left rounded-lg border-2 transition-colors ${design.font === font ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300 bg-white'}`} style={{ fontFamily: font }}>
                <div className="font-medium">{font}</div>
                <div className="text-sm text-slate-500">The quick brown fox jumps over</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderButtonsView = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <button onClick={() => setCurrentView('main')} className="p-2 hover:bg-slate-200 rounded-lg transition-colors"><ArrowLeft className="w-4 h-4" /></button>
        <h3 className="text-lg font-semibold">Button Design</h3>
      </div>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Button Style</label>
          <div className="grid grid-cols-2 gap-2">
            {buttonStyles.map((style) => (
              <button key={style.id} onClick={() => handleDesignChange({ buttonStyle: style.id as any })} className={`p-4 border-2 transition-all duration-200 text-sm font-medium ${(design.buttonStyle || 'default') === style.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'} ${style.className}`} title={style.description}>
                <div className="mb-2">{style.name}</div>
                <div className="text-xs opacity-70">{style.description}</div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Button Color Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => handleDesignChange({ buttonColor: undefined })} className={`p-4 border-2 transition-all duration-200 text-sm font-medium ${!design.buttonColor ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'}`}>Solid</button>
            <button onClick={() => handleDesignChange({ buttonColor: buttonGradients[0].value })} className={`p-4 border-2 transition-all duration-200 text-sm font-medium ${design.buttonColor && design.buttonColor.startsWith('linear-gradient') ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'}`}>Gradient</button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Button Colors</label>
          <div className="space-y-3">
            {design.buttonColor && design.buttonColor.startsWith('linear-gradient') ? (
              <div className="grid grid-cols-3 gap-2">
                {buttonGradients.map((gradient) => (
                  <button key={gradient.id} onClick={() => handleDesignChange({ buttonColor: gradient.value, buttonTextColor: gradient.textColor })} className={`h-16 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${design.buttonColor === gradient.value ? 'border-blue-500' : 'border-slate-200'}`} style={{ background: gradient.value }} title={gradient.name} />
                ))}
              </div>
            ) : (
              <div>
                <label className="text-sm text-slate-600 mb-2 block">Background Color</label>
                <input type="color" value={design.buttonColor || '#ffffff'} onChange={(e) => handleDesignChange({ buttonColor: e.target.value })} className="w-full h-10 px-1 py-1 border rounded-lg" />
              </div>
            )}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Text Color</label>
              <input type="color" value={design.buttonTextColor || '#000000'} onChange={(e) => handleDesignChange({ buttonTextColor: e.target.value })} className="w-full h-10 px-1 py-1 border rounded-lg" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">Hover Animation</label>
          <div className="grid grid-cols-2 gap-2">
            {buttonAnimations.map((animation) => (
              <button key={animation.id} onClick={() => handleDesignChange({ buttonAnimation: animation.id as any })} className={`p-3 border-2 transition-all duration-200 text-sm font-medium ${(design.buttonAnimation || 'scale') === animation.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'} ${animation.className}`} title={animation.description}>{animation.name}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      <header className="flex items-center justify-between p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold">Design Studio</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors duration-200"><X size={18} /></button>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        {currentView === 'main' && renderMainView()}
        {currentView === 'theme' && renderThemeView()}
        {currentView === 'background' && renderBackgroundView()}
        {currentView === 'curves' && renderCurvesView()}
        {currentView === 'typography' && renderTypographyView()}
        {currentView === 'buttons' && renderButtonsView()}
      </main>
    </div>
  );
};

export default DesignPanel;