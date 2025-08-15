import { Skeleton } from "@/components/ui/skeleton";

const EditorSkeleton = () => {
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar Skeleton */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        {/* <div className="p-4 border-b border-gray-200">
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-32" />
        </div> */}
        
        {/* Navigation */}
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
        
        {/* Panel Content */}
        <div className="flex-1 p-4 space-y-6 overflow-hidden">
          {/* Section 1 */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-16" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
          
          {/* Section 2 */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20" />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          </div>
          
          {/* Section 3 */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </div>
      
      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
        
        {/* Phone Mockup Area */}
        <div className="flex-1 bg-gray-50 p-8 flex items-center justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-80 h-[680px] bg-black rounded-[2.5rem] p-2">
              {/* Screen */}
              <div className="w-full h-full bg-white rounded-[2.25rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-12 flex items-center justify-between px-6 pt-3">
                  <Skeleton className="h-4 w-8" />
                  <div className="flex items-center space-x-1">
                    <Skeleton className="h-3 w-12" />
                    <Skeleton className="h-3 w-4" />
                    <Skeleton className="h-3 w-6" />
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="px-6 pt-8 space-y-6">
                  {/* Profile Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2 text-center">
                      <Skeleton className="h-6 w-32 mx-auto" />
                      <Skeleton className="h-4 w-40 mx-auto" />
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex justify-center space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-12 w-12 rounded-2xl" />
                    ))}
                  </div>
                  
                  {/* Link Buttons */}
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-14 w-full rounded-2xl" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Loading overlay with animation */}
            <div className="absolute inset-0 bg-gray-900/20 rounded-[2.5rem] flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 shadow-lg flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
                <span className="text-sm font-medium text-gray-700">Loading your design...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorSkeleton;
