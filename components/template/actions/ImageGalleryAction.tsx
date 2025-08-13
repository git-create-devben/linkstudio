"use client"
import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import { useState } from "react";
import Image from "next/image";

interface ImageGalleryActionProps {
  action: ActionItemType;
  theme: Theme;
}

const ImageGalleryAction = ({ action, theme }: ImageGalleryActionProps) => {
  const { design } = useUserContentStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = action.config.images || [];

  return (
    <div className="w-full space-y-4">
      {action.config.title && (
        <h2 
          className="text-xl font-bold text-center drop-shadow-md transition-all duration-300"
          style={{ 
            color: design.textPrimaryColor || theme.colors.textPrimary,
            fontFamily: design.font || 'Inter, system-ui, sans-serif'
          }}
        >
          {action.config.title}
        </h2>
      )}
      
      <div 
        className="p-4 rounded-2xl backdrop-blur-sm border transition-all duration-300"
        style={{
          background: theme.colors.cardBackground,
          border: `1px solid ${theme.colors.border}`,
          boxShadow: `0 8px 32px ${theme.colors.shadow}`
        }}
      >
        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {images.map((image: any, index: number) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105"
                onClick={() => setSelectedImage(image.url)}
              >
                <Image
                  src={image.url}
                  alt={image.caption || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-all duration-300 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Zoom icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 opacity-60">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p 
              style={{ 
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              Add images to your gallery...
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={selectedImage}
              alt="Gallery image"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryAction;