"use client"
import React, { useState } from 'react';
import {
  Menu,
  ThumbsUp,
  FileText,
  Palette,
  X
} from 'lucide-react';
import ContentPanel from './panels/contentPanel';
import SocialLinksPanel from './panels/socialLink';
import DesignPanel from './panels/designPanel';
import { IconRobot } from '@tabler/icons-react';
import EnhancedActionsPanel from './panels/enhancedActionsPanel';

type ActionType = "actions" | "social" | "content" | "design" | "AI" | "settings";

const EditorSidebar = () => {
  const [activePanel, setActivePanel] = useState<ActionType | null>(null);

  const sidebarItems = [
    { id: 'actions', icon: Menu, label: 'Actions' },
    { id: 'social', icon: ThumbsUp, label: 'Social Links' },
    { id: 'content', icon: FileText, label: 'Content' },
    { id: 'design', icon: Palette, label: 'Design' },
    { id: 'AI', icon: IconRobot, label: 'AI Suggestion' },
    // { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleItemClick = (itemId: ActionType) => {
    setActivePanel(activePanel === itemId ? null : itemId);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'actions':
        return <EnhancedActionsPanel onClose={() => setActivePanel(null)} />;

      case 'social':
        return <SocialLinksPanel onClose={() => setActivePanel(null)} />

      case 'content':
        return <ContentPanel onClose={() => setActivePanel(null)} />;
      case 'design':
        return <DesignPanel onClose={() => setActivePanel(null)} />;

      case 'AI':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 bg-gray-100">
              <h2 className="text-lg font-semibold text-black">AI Suggestion</h2>
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center p-4 space-y-4">
              <div className="w-full max-w-md mt-8 text-black">
                <h1 className="text-1xl font-bold text-center">Coming Soon...</h1>
                <p className="text-md text-center">We are working on AI Suggestion feature. It will be available soon.</p>
              </div>
              {/* <div className="w-full h-1 bg-gray-200 rounded-full">
                <div className="h-1 bg-brand-500 rounded-full" style={{ width: "50%" }} />
              </div> */}
            </div>
          </div>
        );

      // case 'settings':
      //   return (
      //     <div className="flex flex-col h-full">
      //       <div className="flex items-center justify-between p-4 border-b">
      //         <h2 className="text-lg font-semibold">Settings</h2>
      //         <button
      //           onClick={() => setActivePanel(null)}
      //           className="p-1 hover:bg-gray-100 rounded"
      //         >
      //           <X size={20} />
      //         </button>
      //       </div>
      //       <div className="flex-1 p-4">
      //         <p className="text-gray-600">Settings panel goes here...</p>
      //       </div>
      //     </div>
      //   );

      default:
        return null;
    }
  };

  return (
    <div className="absolut left-0 top-0 p-2 flex h-[calc(75vh-1rem)]">
      {/* Sidebar */}
      <div className="pl-2 w-25 h-[calc(50vh-1rem)] rounded-2xl bg-white border-r border-gray-200 flex flex-col py-2 overflow-y-scroll">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id as ActionType)}
                className={`flex flex-col items-center gap-2 py-4 px-2 hover:bg-gray-50 rounded-l-md transition-colors ${isActive ? 'bg-gray-100 border-r-2 border-blue-500' : ''
                  }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-500' : 'text-gray-600'} />
                <span className={`text-xs text-center leading-tight font-medium ${isActive ? 'text-blue-500 font-medium' : 'text-gray-600'
                  }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

      {/* Expandable Panel */}
      {activePanel && (
        <div className="w-80 h-100vh rounded-2xl ">
          {renderPanelContent()}
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;

