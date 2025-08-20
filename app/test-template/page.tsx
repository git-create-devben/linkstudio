import ProductShowcaseAction from "@/components/template/actions/ProductShowcaseAction";
import { getTheme } from "@/lib/themeSystem";

export default function TestTemplatePage() {
  const theme = getTheme('dark');

  // Test data for product showcase
  const testAction = {
    id: 'test-product-showcase',
    type: 'PRODUCT_SHOWCASE' as const,
    config: {
      title: 'My Products',
      layout: 'carousel',
      featuredProducts: [
        {
          name: 'Premium Course',
          description: 'Learn advanced techniques with this comprehensive course',
          price: '$99.99',
          discountPercent: 20,
          image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
          url: 'https://example.com/course'
        }
      ],
      products: [
        {
          name: 'Starter Pack',
          description: 'Perfect for beginners getting started',
          price: '$29.99',
          image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
          url: 'https://example.com/starter'
        },
        {
          name: 'Pro Tools',
          description: 'Advanced tools for professionals',
          price: '$149.99',
          discountPercent: 15,
          image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
          url: 'https://example.com/pro'
        },
        {
          name: 'Ultimate Bundle',
          description: 'Everything you need in one package',
          price: '$199.99',
          discountPercent: 25,
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
          url: 'https://example.com/bundle'
        }
      ]
    },
    order: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Product Showcase Carousel Test</h1>

        <div className="space-y-12">
          {/* Carousel Layout */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Carousel Layout (Default)</h2>
            <ProductShowcaseAction
              action={{...testAction, config: {...testAction.config, layout: 'carousel'}}}
              theme={theme}
            />
          </div>

          {/* Grid Layout */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Grid Layout</h2>
            <ProductShowcaseAction
              action={{...testAction, config: {...testAction.config, layout: 'grid'}}}
              theme={theme}
            />
          </div>

          {/* Single Column Layout */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Single Column Layout</h2>
            <ProductShowcaseAction
              action={{...testAction, config: {...testAction.config, layout: 'single'}}}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}