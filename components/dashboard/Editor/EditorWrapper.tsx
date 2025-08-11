"use client";

import { useEffect, useState } from "react";
import { useUserContentStore } from "@/stores/useContentStore";
import EditorSkeleton from "./EditorSkeleton";
import EditorSidebar from "./EditorSidebar";
import EditorSidebarMobile from "./EditorSidebarMobile";
import useExitWarning from "@/hooks/useExitWarning";

interface EditorWrapperProps {
  children: React.ReactNode;
}

const EditorWrapper: React.FC<EditorWrapperProps> = ({ children }) => {
  const { loading, setLoading, isDirty } = useUserContentStore();
  const [mounted, setMounted] = useState(false);

  // Exit warning for unsaved changes
  useExitWarning({ 
    isDirty,
    message: "You have unsaved changes that will be lost. Save your changes before leaving."
  });

  useEffect(() => {
    // Simulate loading sequence with proper timing
    const loadingSequence = async () => {
      setLoading(true);
      
      // Allow React to hydrate and components to mount
      await new Promise(resolve => setTimeout(resolve, 100));
      setMounted(true);
      
      // Simulate content loading
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setLoading(false);
    };

    loadingSequence();
  }, [setLoading]);

  // Show skeleton while loading or not mounted
  if (loading || !mounted) {
    return <EditorSkeleton />;
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-center gap-12">
        <div className="hidden md:block animate-slide-in">
          <EditorSidebar />
        </div>

        <main className="flex flex-col animate-fade-in-up">
          <section className="relative">
            {children}
          </section>
          <div className="block md:hidden">
            <EditorSidebarMobile />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditorWrapper;
