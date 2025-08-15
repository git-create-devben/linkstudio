"use client"
import React, { useState } from 'react';
import {
  Menu,
  ThumbsUp,
  FileText,
  Palette,
  Search,
  Settings,
  X,
  Plus,
  MoreHorizontal,
  Crown
} from 'lucide-react';
import ContentPanel from './panels/contentPanel';
import ActionsPanel from './panels/actionsPanel';
import SocialLinksPanel from './panels/socialLink';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import DesignPanel from './panels/designPanel';
import EnhancedActionsPanel from './panels/enhancedActionsPanel';

type ActionType = "actions" | "social" | "content" | "design" | "search" | "settings";

const ResponsiveEditorSidebar = () => {
  const [activePanel, setActivePanel] = useState<ActionType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sidebarItems = [
    { id: 'actions', icon: Menu, label: 'Actions' },
    { id: 'social', icon: ThumbsUp, label: 'Social Links' },
    { id: 'content', icon: FileText, label: 'Content' },
    { id: 'design', icon: Palette, label: 'Design' },
  ];

  const handlePanelOpen = (panelId: ActionType) => {
    setActivePanel(panelId);
    setIsDrawerOpen(true);
  };

  const handlePanelClose = () => {
    setActivePanel(null);
    setIsDrawerOpen(false);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'actions':
        return <EnhancedActionsPanel onClose={handlePanelClose} />;
      case 'social':
        return <SocialLinksPanel onClose={handlePanelClose} />;
      case 'content':
        return <ContentPanel onClose={handlePanelClose} />;
      case 'design':
        return <DesignPanel onClose={handlePanelClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        {/* Mobile Bottom Navigation (fixed at bottom) */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-blue-50 fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-50">
          <div className="flex justify-between items-center">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePanel === item.id;

              return (
                <Drawer key={item.id} open={isDrawerOpen && activePanel === item.id} onOpenChange={(open) => {
                  if (!open) {
                    handlePanelClose();
                  }
                }}>
                  <DrawerTrigger asChild>
                    <button
                      className={`flex flex-col items-center gap-1 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-900' 
                          : 'text-gray-600 hover:bg-gradient-to-br from-blue-200 via-white to-purple-200'
                      }`}
                      onClick={() => handlePanelOpen(item.id as ActionType)}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="bg-white text-black pb-0 max-h-[90vh] flex flex-col">
                    {/* Custom close button */}
                    <div className="flex justify-end px-4 flex-shrink-0">
                      <DrawerClose asChild>
                        <button
                          onClick={handlePanelClose}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <X size={20} className="text-gray-600" />
                        </button>
                      </DrawerClose>
                    </div>
                    
                    <DrawerHeader className="hidden">
                      <DrawerTitle>{item.label}</DrawerTitle>
                    </DrawerHeader>
                    
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto min-h-0">
                      {renderPanelContent()}
                    </div>
                  </DrawerContent>
                </Drawer>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveEditorSidebar;