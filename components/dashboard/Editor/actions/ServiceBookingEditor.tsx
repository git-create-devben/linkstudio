"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Tag, 
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Link as LinkIcon,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceBooking from './ServiceBooking';

interface ServiceBookingEditorProps {
  config: {
    serviceName?: string;
    serviceImage?: string;
    description?: string;
    bookingUrl?: string;
    schedule?: string;
    location?: string;
    coupon?: string;
    price?: string;
    duration?: string;
    showAdditionalDetails?: boolean;
    isCollapsible?: boolean;
    additionalDetailsExpanded?: boolean;
  };
  onUpdate: (updates: any) => void;
}

export default function ServiceBookingEditor({ config, onUpdate }: ServiceBookingEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('serviceImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preview Toggle */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Service Booking Configuration</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2"
        >
          {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      {/* Preview */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-sm">Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ServiceBooking config={config} variant="grid" />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Basic Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon size={18} />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Service Name */}
          <div className="space-y-2">
            <Label htmlFor="serviceName">Service Name *</Label>
            <Input
              id="serviceName"
              placeholder="e.g., Personal Training Session"
              value={config.serviceName || ''}
              onChange={(e) => handleInputChange('serviceName', e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your service..."
              value={config.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          {/* Booking URL */}
          <div className="space-y-2">
            <Label htmlFor="bookingUrl">Booking URL *</Label>
            <Input
              id="bookingUrl"
              type="url"
              placeholder="https://calendly.com/your-link"
              value={config.bookingUrl || ''}
              onChange={(e) => handleInputChange('bookingUrl', e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Link where users will be redirected to book your service
            </p>
          </div>

          {/* Service Image */}
          <div className="space-y-2">
            <Label htmlFor="serviceImage">Service Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  id="serviceImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('serviceImage')?.click()}
                  className="w-full flex items-center gap-2"
                >
                  <Upload size={16} />
                  Upload Image
                </Button>
              </div>
              {config.serviceImage && (
                <div className="w-16 h-16 rounded-lg overflow-hidden border">
                  <img 
                    src={config.serviceImage} 
                    alt="Service preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar size={18} />
            Additional Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Show Additional Details Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Show Additional Details</Label>
              <p className="text-xs text-muted-foreground">
                Display extra information like schedule, location, etc.
              </p>
            </div>
            <Switch
              checked={config.showAdditionalDetails ?? true}
              onCheckedChange={(checked: boolean) => handleInputChange('showAdditionalDetails', checked)}
            />
          </div>

          <AnimatePresence>
            {config.showAdditionalDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden space-y-4"
              >
                <Separator />

                {/* Collapsible Toggle */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Make Details Collapsible</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow users to expand/collapse additional details
                    </p>
                  </div>
                  <Switch
                    checked={config.isCollapsible ?? true}
                    onCheckedChange={(checked: boolean) => handleInputChange('isCollapsible', checked)}
                  />
                </div>

                {/* Default Expanded State */}
                {config.isCollapsible && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Expanded by Default</Label>
                      <p className="text-xs text-muted-foreground">
                        Show details expanded when page loads
                      </p>
                    </div>
                    <Switch
                      checked={config.additionalDetailsExpanded ?? false}
                      onCheckedChange={(checked: boolean) => handleInputChange('additionalDetailsExpanded', checked)}
                    />
                  </div>
                )}

                <Separator />

                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign size={16} />
                    Price
                  </Label>
                  <Input
                    id="price"
                    placeholder="e.g., $50/hour, From $100"
                    value={config.price || ''}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <Label htmlFor="duration" className="flex items-center gap-2">
                    <Clock size={16} />
                    Duration
                  </Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 1 hour, 30 minutes"
                    value={config.duration || ''}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>

                {/* Schedule */}
                <div className="space-y-2">
                  <Label htmlFor="schedule" className="flex items-center gap-2">
                    <Calendar size={16} />
                    Schedule
                  </Label>
                  <Input
                    id="schedule"
                    placeholder="e.g., Mon-Fri 9AM-5PM, Weekends available"
                    value={config.schedule || ''}
                    onChange={(e) => handleInputChange('schedule', e.target.value)}
                  />
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin size={16} />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g., Online, New York City, Your location"
                    value={config.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                {/* Coupon/Offer */}
                <div className="space-y-2">
                  <Label htmlFor="coupon" className="flex items-center gap-2">
                    <Tag size={16} />
                    Special Offer
                  </Label>
                  <Input
                    id="coupon"
                    placeholder="e.g., 20% off first session, Free consultation"
                    value={config.coupon || ''}
                    onChange={(e) => handleInputChange('coupon', e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <Sparkles size={18} className="text-blue-500" />
              Pro Tips for Amazing Service Cards
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">📸 Visual Appeal</h5>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Use high-quality, professional images</li>
                  <li>• Recommended size: 400x300px or larger</li>
                  <li>• Show your service in action</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">💰 Pricing Strategy</h5>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Be transparent with pricing</li>
                  <li>• Use ranges for variable pricing</li>
                  <li>• Highlight special offers prominently</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">📝 Content Tips</h5>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Keep descriptions concise but informative</li>
                  <li>• Focus on client benefits</li>
                  <li>• Use action-oriented service names</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">🔗 Booking Links</h5>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Test your booking links regularly</li>
                  <li>• Use popular platforms (Calendly, Acuity)</li>
                  <li>• Ensure smooth booking process</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}