"use client";

import React from 'react';
import { ShoppingBag, Package, Star, Grid3X3, Layers, Image as ImageIcon } from 'lucide-react';
import ActionConfigBase from './shared/ActionConfigBase';
import { TextField, TextAreaField, SelectField, ImageUploadField, FormField } from './shared/FormComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  price: string;
  discountPercent?: number;
  image: string;
  url: string;
}

interface ProductShowcaseEditorProps {
  config: {
    title?: string;
    featuredProducts?: Product[];
    products?: Product[];
    layout?: string;
  };
  onUpdate: (updates: any) => void;
}

export default function ProductShowcaseEditor({ config, onUpdate }: ProductShowcaseEditorProps) {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const addProduct = (type: 'featured' | 'regular') => {
    const newProduct: Product = {
      name: '',
      description: '',
      price: '',
      image: '',
      url: ''
    };

    if (type === 'featured') {
      const current = config.featuredProducts || [];
      if (current.length < 2) {
        handleInputChange('featuredProducts', [...current, newProduct]);
      }
    } else {
      const current = config.products || [];
      handleInputChange('products', [...current, newProduct]);
    }
  };

  const updateProduct = (type: 'featured' | 'regular', index: number, field: string, value: any) => {
    const arrayField = type === 'featured' ? 'featuredProducts' : 'products';
    const current = config[arrayField] || [];
    const updated = current.map((product: Product, i: number) => 
      i === index ? { ...product, [field]: value } : product
    );
    handleInputChange(arrayField, updated);
  };

  const removeProduct = (type: 'featured' | 'regular', index: number) => {
    const arrayField = type === 'featured' ? 'featuredProducts' : 'products';
    const current = config[arrayField] || [];
    handleInputChange(arrayField, current.filter((_: Product, i: number) => i !== index));
  };

  const ProductForm = ({ 
    product, 
    index, 
    type, 
    onUpdate, 
    onRemove 
  }: { 
    product: Product; 
    index: number; 
    type: 'featured' | 'regular';
    onUpdate: (field: string, value: any) => void;
    onRemove: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 border rounded-xl bg-gradient-to-br from-white/5 to-white/2 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === 'featured' ? (
            <Star size={16} className="text-yellow-500" />
          ) : (
            <Package size={16} className="text-blue-500" />
          )}
          <span className="font-medium">
            {type === 'featured' ? 'Featured' : 'Product'} {index + 1}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-red-500 hover:text-red-700"
        >
          <X size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Product Name *</Label>
            <Input
              value={product.name}
              onChange={(e) => onUpdate('name', e.target.value)}
              placeholder="Amazing Product"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Description</Label>
            <Input
              value={product.description}
              onChange={(e) => onUpdate('description', e.target.value)}
              placeholder="Brief product description..."
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-sm font-medium">Price *</Label>
              <Input
                value={product.price}
                onChange={(e) => onUpdate('price', e.target.value)}
                placeholder="$99.99"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Discount %</Label>
              <Input
                type="number"
                value={product.discountPercent || ''}
                onChange={(e) => onUpdate('discountPercent', e.target.value ? parseInt(e.target.value) : undefined)}
                placeholder="20"
                min="0"
                max="100"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">Buy Link *</Label>
            <Input
              type="url"
              value={product.url}
              onChange={(e) => onUpdate('url', e.target.value)}
              placeholder="https://store.com/product"
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Product Image</Label>
            <div className="mt-1 space-y-3">
              <Input
                type="url"
                value={product.image}
                onChange={(e) => onUpdate('image', e.target.value)}
                placeholder="https://example.com/product.jpg"
              />
              {product.image && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border">
                  <img 
                    src={product.image} 
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const tips = [
    "Use high-quality product images (recommended: 400x400px or larger)",
    "Keep product names concise but descriptive",
    "Featured products appear prominently at the top",
    "Add discount percentages to highlight sales",
    "Test your buy links to ensure they work correctly",
    "Single products take full width, 2-3 products use 2 columns, 4+ use a 4-column grid"
  ];

  return (
    <ActionConfigBase
      title="Product Showcase"
      description="Display your products with professional cards and smart layouts"
      icon={ShoppingBag}
      tips={tips}
    >
      <div className="space-y-6">
        {/* Basic Settings */}
        <div className="space-y-4">
          <TextField
            label="Showcase Title"
            value={config.title || ''}
            onChange={(value) => handleInputChange('title', value)}
            placeholder="My Products"
            description="Optional title for your product showcase"
          />

          <SelectField
            label="Layout Style"
            value={config.layout || 'featured-and-grid'}
            onChange={(value) => handleInputChange('layout', value)}
            options={[
              { value: 'featured-and-grid', label: 'Featured + Grid (Recommended)' },
              { value: 'grid', label: 'Grid Only' },
              { value: 'single', label: 'Single Column' }
            ]}
            description="How your products will be displayed"
          />
        </div>

        {/* Featured Products */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Star size={18} className="text-yellow-500" />
                    Featured Products
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Highlight up to 2 special products (optional)
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addProduct('featured')}
                  disabled={(config.featuredProducts?.length || 0) >= 2}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Featured
                </Button>
              </div>

              <AnimatePresence>
                {(config.featuredProducts || []).map((product, index) => (
                  <ProductForm
                    key={`featured-${index}`}
                    product={product}
                    index={index}
                    type="featured"
                    onUpdate={(field, value) => updateProduct('featured', index, field, value)}
                    onRemove={() => removeProduct('featured', index)}
                  />
                ))}
              </AnimatePresence>

              {(!config.featuredProducts || config.featuredProducts.length === 0) && (
                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                  <Star size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No featured products yet. Add one to highlight it at the top.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Regular Products */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Grid3X3 size={18} className="text-blue-500" />
                    Regular Products
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Add your main product catalog
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addProduct('regular')}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Product
                </Button>
              </div>

              <AnimatePresence>
                {(config.products || []).map((product, index) => (
                  <ProductForm
                    key={`product-${index}`}
                    product={product}
                    index={index}
                    type="regular"
                    onUpdate={(field, value) => updateProduct('regular', index, field, value)}
                    onRemove={() => removeProduct('regular', index)}
                  />
                ))}
              </AnimatePresence>

              {(!config.products || config.products.length === 0) && (
                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                  <Package size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No products added yet. Click "Add Product" to get started.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Layout Preview */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Layers size={18} />
                Layout Preview
              </h4>
              <div className="grid grid-cols-4 gap-2 p-4 bg-background rounded-lg">
                {/* Show layout based on total products */}
                {(() => {
                  const totalProducts = (config.featuredProducts?.length || 0) + (config.products?.length || 0);
                  
                  if (totalProducts === 0) {
                    return <div className="col-span-4 text-center text-xs text-muted-foreground py-4">Add products to see layout</div>;
                  }
                  
                  if (totalProducts === 1) {
                    return <div className="col-span-4 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">Single Product (Full Width)</div>;
                  }
                  
                  if (totalProducts <= 3) {
                    return (
                      <>
                        <div className="col-span-2 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">Product 1</div>
                        <div className="col-span-2 h-8 bg-primary/20 rounded flex items-center justify-center text-xs">Product 2</div>
                      </>
                    );
                  }
                  
                  return (
                    <>
                      <div className="h-6 bg-yellow-200 rounded flex items-center justify-center text-xs">Featured</div>
                      <div className="h-6 bg-yellow-200 rounded flex items-center justify-center text-xs">Featured</div>
                      <div className="h-6 bg-primary/20 rounded flex items-center justify-center text-xs">Product</div>
                      <div className="h-6 bg-primary/20 rounded flex items-center justify-center text-xs">Product</div>
                    </>
                  );
                })()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ActionConfigBase>
  );
}