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
  MoreHorizontal
} from 'lucide-react';

type ActionType = "actions" | "social" | "content" | "design" | "search" | "settings";

const EditorSidebar = () => {
  const [activePanel, setActivePanel] = useState<ActionType | null>(null);

  const sidebarItems = [
    { id: 'actions', icon: Menu, label: 'Actions' },
    { id: 'social', icon: ThumbsUp, label: 'Social Links' },
    { id: 'content', icon: FileText, label: 'Content' },
    { id: 'design', icon: Palette, label: 'Design' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleItemClick = (itemId: ActionType) => {
    setActivePanel(activePanel === itemId ? null : itemId);
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'actions':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Page Actions</h2>
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-600">Shown actions (0)</span>
                <div className="flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Add Action
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>

              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No shown actions</h3>
                <p className="text-gray-600 mb-6">
                  Adding actions to your page lets you promote links,<br />
                  share content, and more.
                </p>
                <button className="flex items-center gap-2 mx-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Plus size={16} className="text-blue-500" />
                  <span>Add Action</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Social Links</h2>
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <p className="text-gray-600">Social links content goes here...</p>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Content</h2>
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4">
              <p className="text-gray-600">Content management goes here...</p>
            </div>
          </div>
        );

      case 'design':
        return (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Design</h2>
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
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
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
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
              <button
                onClick={() => setActivePanel(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
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
    <div className="absolut left-0 top-0 p-2 flex h-[calc(85vh-1rem)]">
      {/* Sidebar */}
      <div className="pl-2 w-25 h-[30rem] rounded-2xl bg-white border-r border-gray-200 flex flex-col py-2">
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
              <Icon size={20} className={isActive ? 'text-blue-500' : 'text-gray-600'} />
              <span className={`text-xs text-center leading-tight ${isActive ? 'text-blue-500 font-medium' : 'text-gray-600'
                }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expandable Panel */}
      {activePanel && (
        <div className="w-80 h-100vh rounded-2xl bg-white border-r border-gray-200 ">
          {renderPanelContent()}
        </div>
      )}
    </div>
  );
};

export default EditorSidebar;