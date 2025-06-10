import { JSX } from "react";

export type TemplateType = {
    id: string;
    name: string;
    description: string;
    preview: JSX.Element;
  };
  
  export const templates: TemplateType[] = [
    {
      id: 'minimal',
      name: 'Alex Chen',
      description: 'Content creator & designer',
      preview: (
        <div className="bg-gradient-to-br from-rose-100 to-orange-100 p-4 rounded-2xl">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-full mx-auto mb-3"></div>
            <div className="text-center">
              <div className="h-2 bg-gray-200 rounded mb-2"></div>
              <div className="h-1 bg-gray-100 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-8 bg-gray-50 rounded"></div>
                <div className="h-8 bg-gray-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'professional',
      name: 'Jordan Smith',
      description: 'Digital marketer from NYC',
      preview: (
        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-2xl">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mx-auto mb-3"></div>
            <div className="text-center">
              <div className="h-2 bg-gray-200 rounded mb-2"></div>
              <div className="h-1 bg-gray-100 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-6 bg-gray-50 rounded"></div>
                <div className="h-6 bg-gray-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Maya Rodriguez',
      description: 'Artist & musician',
      preview: (
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-2xl">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-3"></div>
            <div className="text-center">
              <div className="h-2 bg-gray-200 rounded mb-2"></div>
              <div className="h-1 bg-gray-100 rounded mb-4"></div>
              <div className="h-12 bg-gray-50 rounded mb-2"></div>
              <div className="h-6 bg-gray-50 rounded"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Sam Wilson',
      description: 'Tech entrepreneur',
      preview: (
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mx-auto mb-3"></div>
            <div className="text-center">
              <div className="h-2 bg-gray-200 rounded mb-2"></div>
              <div className="h-1 bg-gray-100 rounded mb-4"></div>
              <div className="space-y-1">
                <div className="h-6 bg-gray-50 rounded"></div>
                <div className="h-6 bg-gray-50 rounded"></div>
                <div className="h-6 bg-gray-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];