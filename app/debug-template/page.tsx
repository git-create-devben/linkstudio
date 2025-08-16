"use client";

import { useUserContentStore } from "@/stores/useContentStore";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { debugTemplate } from "@/lib/debugTemplate";

export default function DebugTemplatePage() {
  const { templateId, clearLocalStorage, forceResetToTemplate } = useUserContentStore();
  const [selectedTemplate, setSelectedTemplate] = useState("modernMusic");
  const [localStorageData, setLocalStorageData] = useState<any>(null);
  const [databaseData, setDatabaseData] = useState<any>(null);

  useEffect(() => {
    // Load current localStorage data
    setLocalStorageData(debugTemplate.checkLocalStorage());
    
    // Load database data
    fetch('/api/debug/template')
      .then(res => res.json())
      .then(data => setDatabaseData(data))
      .catch(err => console.error('Error fetching database data:', err));
  }, []);

  const templates = [
    { id: "minimal", name: "Minimal" },
    { id: "professional", name: "Professional" },
    { id: "creative", name: "Creative" },
    { id: "modernMusic", name: "Modern Music" },
    { id: "traveler", name: "Traveler" },
  ];

  const handleClearStorage = () => {
    clearLocalStorage();
    window.location.reload();
  };

  const handleResetToTemplate = () => {
    forceResetToTemplate(selectedTemplate);
    alert(`Reset to ${selectedTemplate} template! You can now go to the editor.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Template Debug Tool</h1>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Current Status</h2>
            <p><strong>Store Template ID:</strong> {templateId}</p>
            <p><strong>LocalStorage Template:</strong> {localStorageData?.state?.templateId || 'None'}</p>
            <p><strong>Database Template:</strong> {databaseData?.templateId || 'Loading...'}</p>
            
            {databaseData?.templateId && localStorageData?.state?.templateId && 
             databaseData.templateId !== localStorageData.state.templateId && (
              <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-sm">
                <strong>⚠️ Mismatch detected!</strong> Database has "{databaseData.templateId}" but localStorage has "{localStorageData.state.templateId}"
              </div>
            )}
            <p className="text-sm text-gray-600 mt-2">
              If you're seeing old template styling even after selecting a new template, 
              use the tools below to fix the issue.
            </p>
            
            {localStorageData && (
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium">View LocalStorage Data</summary>
                <pre className="text-xs bg-gray-100 p-2 mt-2 rounded overflow-auto max-h-32">
                  {JSON.stringify(localStorageData, null, 2)}
                </pre>
              </details>
            )}
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Quick Fix: Clear LocalStorage</h2>
            <p className="text-sm text-gray-600 mb-4">
              This will clear all cached template data and force a fresh load from the database.
            </p>
            <Button onClick={handleClearStorage} variant="outline" className="cursor-pointer">
              Clear LocalStorage & Reload
            </Button>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Force Reset to Template</h2>
            <p className="text-sm text-gray-600 mb-4">
              This will force reset your editor to a specific template with all default styling.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Template:</label>
                <select 
                  value={selectedTemplate} 
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button onClick={handleResetToTemplate} className=" cursor-pointer bg-green-600 hover:bg-green-700">
                Reset to {templates.find(t => t.id === selectedTemplate)?.name} Template
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              <li>If you selected a new template but still see old styling, try "Clear LocalStorage & Reload" first.</li>
              <li>If that doesn't work, use "Force Reset to Template" to completely reset to your desired template.</li>
              <li>After using either option, go to the editor to see your template with proper styling.</li>
              <li>The template should now show all default styling including curves, animations, and proper colors.</li>
            </ol>
          </div>

          <div className="text-center">
            <a href="/dashboard/editor" className=" cursor-pointer text-blue-600 hover:underline">
              Go to Editor →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}