"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme, getButtonStyle } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import Image from "next/image";

interface ProductShowcaseActionProps {
  action: ActionItemType;
  theme: Theme;
}

const ProductShowcaseAction = ({ action, theme }: ProductShowcaseActionProps) => {
  const { design } = useUserContentStore();
  const buttonStyle = getButtonStyle(design, theme);

  const products = action.config.products || [];

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
        {products.length > 0 ? (
          <div className="space-y-4">
            {products.map((product: any, index: number) => (
              <div
                key={index}
                className="group relative p-4 rounded-xl border transition-all duration-300 hover:shadow-lg"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${theme.colors.border}`,
                }}
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  {product.image && (
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name || `Product ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-semibold text-lg mb-1 truncate"
                      style={{ 
                        color: design.textPrimaryColor || theme.colors.textPrimary,
                        fontFamily: design.font || 'Inter, system-ui, sans-serif'
                      }}
                    >
                      {product.name || `Product ${index + 1}`}
                    </h3>
                    
                    {product.description && (
                      <p 
                        className="text-sm opacity-80 mb-2 line-clamp-2"
                        style={{ 
                          color: design.textSecondaryColor || theme.colors.textSecondary,
                          fontFamily: design.font || 'Inter, system-ui, sans-serif'
                        }}
                      >
                        {product.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      {product.price && (
                        <span 
                          className="text-lg font-bold"
                          style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
                        >
                          {product.price}
                        </span>
                      )}
                      
                      {product.url && (
                        <a
                          href={product.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 ${buttonStyle.className}`}
                          style={buttonStyle.style}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Buy Now
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 opacity-60">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
            >
              Product Showcase
            </h3>
            <p 
              style={{ 
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              Add your products to showcase them here...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcaseAction;