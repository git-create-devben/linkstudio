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

type ActionType = "actions" | "social" | "content" | "design" | "search" | "settings";

const ResponsiveEditorSidebar = () => {
  const [activePanel, setActivePanel] = useState<ActionType | null>(null);

  const sidebarItems = [
    { id: 'actions', icon: Menu, label: 'Actions' },
    { id: 'social', icon: ThumbsUp, label: 'Social Links' },
    { id: 'content', icon: FileText, label: 'Content' },
    { id: 'design', icon: Palette, label: 'Design' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'actions':
        return <ActionsPanel onClose={() => setActivePanel(null)} />;
      case 'social':
        return <SocialLinksPanel onClose={() => setActivePanel(null)} />;
      case 'content':
        return <ContentPanel onClose={() => setActivePanel(null)} />;
      case 'design':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Design</h2>
              <button onClick={() => setActivePanel(null)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <p className="text-gray-600">Design options go here...</p>
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Search</h2>
              <button onClick={() => setActivePanel(null)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <p className="text-gray-600">Search functionality goes here...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Settings</h2>
              <button onClick={() => setActivePanel(null)} className="p-1 hover:bg-gray-100 rounded">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <p className="text-gray-600">Settings panel goes here...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden">
        {/* Mobile Bottom Navigation (fixed at bottom) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
          <div className="flex justify-between items-center">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePanel === item.id;

              return (
                <Drawer key={item.id}>
                  <DrawerTrigger asChild>
                    <button
                      className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                        isActive ? 'bg-gray-100 text-blue-500' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => setActivePanel(item.id as ActionType)}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-medium">{item.label}</span>
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className='bg-white text-black pb-8'>
                    <DrawerHeader className='hidden'>
                      <DrawerTitle>{item.label}</DrawerTitle>
                    </DrawerHeader>
                    {renderPanelContent()}
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