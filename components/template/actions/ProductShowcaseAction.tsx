"use client";
import { ActionItemType } from "@/stores/useContentStore";
import { Theme } from "@/lib/themeSystem";
import { useUserContentStore } from "@/stores/useContentStore";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, ExternalLink, X, Percent, Eye, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductShowcaseActionProps {
  action: ActionItemType;
  theme: Theme;
}

// Product data shape reference:
// {
//   image: string | string[];
//   name: string;
//   description?: string;
//   price: string | number;
//   discountPercent?: number; // 0-100
//   url: string;
// }

const ProductShowcaseAction = ({ action, theme }: ProductShowcaseActionProps) => {
  const { design } = useUserContentStore();
  const [openProduct, setOpenProduct] = useState<any | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const featured: any[] = action.config.featuredProducts || [];
  const products: any[] = action.config.products || [];
  const allProducts = [...featured, ...products];
  const hasMultipleProducts = allProducts.length > 1;

  // Smart default: single for 1 product, carousel for 2+, but respect user's choice
  const getDefaultLayout = () => {
    if (action.config.layout) return action.config.layout; // User has chosen a layout
    return hasMultipleProducts ? 'carousel' : 'single'; // Smart default
  };

  const layout: 'carousel' | 'grid' | 'single' = getDefaultLayout();

  // Carousel navigation functions
  const nextSlide = () => {
    if (layout === 'carousel' && hasMultipleProducts) {
      setCurrentSlide((prev) => (prev + 1) % allProducts.length);
    }
  };

  const prevSlide = () => {
    if (layout === 'carousel' && hasMultipleProducts) {
      setCurrentSlide((prev) => (prev - 1 + allProducts.length) % allProducts.length);
    }
  };





  const priceWithDiscount = (price: string | number, discount?: number) => {
    const p = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : Number(price);
    if (!p || !discount) return { current: price, original: null };
    const discounted = (p * (100 - discount)) / 100;
    const fmt = (v: number) => (typeof price === 'string' && price.trim().startsWith('$') ? `$${v.toFixed(2)}` : v.toFixed(2));
    return { current: fmt(discounted), original: fmt(p) };
  };

  const Title = () => (
    action.config.title ? (
      <h2
        className="text-xl font-bold text-center mb-6 drop-shadow-md"
        style={{
          color: design.textPrimaryColor || theme.colors.textPrimary,
          fontFamily: design.font || 'Inter, system-ui, sans-serif'
        }}
      >
        {action.config.title}
      </h2>
    ) : null
  );

  const ProductCard = ({ product, index, isFeatured = false, isCarousel = false }: { product: any; index: number; isFeatured?: boolean; isCarousel?: boolean }) => {
    const priceInfo = priceWithDiscount(product.price, product.discountPercent);
    const imageSrc = Array.isArray(product.image) ? product.image[0] : product.image;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl ${
          isCarousel ? 'w-full max-w-sm mx-auto' : (isFeatured ? 'col-span-full sm:col-span-1' : '')
        }`}
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: `1px solid ${theme.colors.border}`,
        }}
      >
        {/* Product Image */}
        {imageSrc && (
          <div className={`relative overflow-hidden ${
            isCarousel ? 'h-64 sm:h-72' : (isFeatured ? 'h-48' : 'h-40')
          }`}>
            <Image
              src={imageSrc}
              alt={product.name || `Product ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Discount Badge */}
            {product.discountPercent && (
              <div className="absolute top-3 left-3">
                <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Percent size={10} />
                  -{product.discountPercent}%
                </div>
              </div>
            )}

            {/* Featured Badge */}
            {isFeatured && (
              <div className="absolute top-3 right-3">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star size={10} />
                  Featured
                </div>
              </div>
            )}

            {/* Quick View Button */}
            <button
              onClick={() => setOpenProduct(product)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/30"
            >
              <Eye size={16} />
            </button>
          </div>
        )}

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3
              className="font-semibold text-lg mb-1 line-clamp-1"
              style={{
                color: design.textPrimaryColor || theme.colors.textPrimary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              {product.name || `Product ${index + 1}`}
            </h3>

            {product.description && (
              <p
                className="text-sm opacity-80 line-clamp-2"
                style={{
                  color: design.textSecondaryColor || theme.colors.textSecondary,
                  fontFamily: design.font || 'Inter, system-ui, sans-serif'
                }}
              >
                {product.description}
              </p>
            )}
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              {priceInfo.original && (
                <span
                  className="text-sm line-through opacity-60"
                  style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}
                >
                  {priceInfo.original}
                </span>
              )}
              {product.price && (
                <span
                  className="text-xl font-bold"
                  style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
                >
                  {priceInfo.current}
                </span>
              )}
            </div>

            {/* Buy Button */}
            {product.url && (
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <ShoppingCart size={14} />
                Buy
              </a>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>
    );
  };

  const Modal = () => {
    if (!openProduct) return null;
    const imgs = Array.isArray(openProduct.image) ? openProduct.image : (openProduct.image ? [openProduct.image] : []);
    const priceInfo = priceWithDiscount(openProduct.price, openProduct.discountPercent);
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpenProduct(null)} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/20"
          >
            <button
              onClick={() => setOpenProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
            
            {imgs[0] && (
              <div className="relative w-full h-64 bg-gray-100">
                <Image src={imgs[0]} alt={openProduct.name || 'Product'} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {openProduct.discountPercent && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Percent size={12} />
                      -{openProduct.discountPercent}% OFF
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-6 space-y-4">
              <div>
                <h3 
                  className="text-2xl font-bold mb-2" 
                  style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
                >
                  {openProduct.name}
                </h3>
                {openProduct.description && (
                  <p 
                    className="text-sm leading-relaxed" 
                    style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}
                  >
                    {openProduct.description}
                  </p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  {priceInfo.original && (
                    <span 
                      className="text-lg line-through opacity-60" 
                      style={{ color: design.textSecondaryColor || theme.colors.textSecondary }}
                    >
                      {priceInfo.original}
                    </span>
                  )}
                  {openProduct.price && (
                    <span 
                      className="text-3xl font-bold" 
                      style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
                    >
                      {priceInfo.current}
                    </span>
                  )}
                </div>
                
                {openProduct.url && (
                  <a
                    href={openProduct.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <ShoppingCart size={18} />
                    Buy Now
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderCarousel = () => (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {allProducts.map((product, index) => (
            <div key={`carousel-${index}`} className="w-full flex-shrink-0 px-4">
              <ProductCard
                product={product}
                index={index}
                isFeatured={index < featured.length}
                isCarousel={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {hasMultipleProducts && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Previous product"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-all duration-300 hover:scale-110 z-10"
            aria-label="Next product"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}


    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allProducts.map((product, index) => (
        <ProductCard
          key={`grid-${index}`}
          product={product}
          index={index}
          isFeatured={index < featured.length}
        />
      ))}
    </div>
  );

  const renderSingleColumn = () => (
    <div className="space-y-6 max-w-md mx-auto">
      {allProducts.map((product, index) => (
        <ProductCard
          key={`single-${index}`}
          product={product}
          index={index}
          isFeatured={index < featured.length}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full space-y-6">
      <Title />

      <div>
        {allProducts.length > 0 ? (
          <div>
            {layout === 'carousel' && renderCarousel()}
            {layout === 'grid' && renderGrid()}
            {layout === 'single' && renderSingleColumn()}
          </div>
        ) : (
          <div className="text-center py-16 opacity-60">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <ShoppingCart size={32} className="text-white" />
            </div>
            <h3
              className="text-xl font-semibold mb-3"
              style={{ color: design.textPrimaryColor || theme.colors.textPrimary }}
            >
              Product Showcase
            </h3>
            <p
              className="text-sm max-w-md mx-auto"
              style={{
                color: design.textSecondaryColor || theme.colors.textSecondary,
                fontFamily: design.font || 'Inter, system-ui, sans-serif'
              }}
            >
              Add your products to create a beautiful showcase. Featured products will be highlighted at the top.
            </p>
          </div>
        )}
      </div>

      <Modal />
    </div>
  );
};

export default ProductShowcaseAction;