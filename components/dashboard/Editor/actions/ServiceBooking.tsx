"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  DollarSign, 
  Tag, 
  ChevronDown, 
  ChevronUp,
  ExternalLink,
  Star,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceBookingProps {
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
  className?: string;
  variant?: 'default' | 'compact' | 'featured' | 'grid';
}

export default function ServiceBooking({ 
  config, 
  className,
  variant = 'grid'
}: ServiceBookingProps) {
  const [isExpanded, setIsExpanded] = useState(
    config.additionalDetailsExpanded ?? false
  );

  const {
    serviceName = "Service Name",
    serviceImage,
    description,
    bookingUrl = "#",
    schedule,
    location,
    coupon,
    price,
    duration,
    showAdditionalDetails = true,
    isCollapsible = true
  } = config;

  const hasAdditionalDetails = schedule || location || coupon || price || duration;
  const shouldShowDetails = showAdditionalDetails && hasAdditionalDetails;

  const handleBookNow = () => {
    if (bookingUrl && bookingUrl !== "#") {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const toggleExpanded = () => {
    if (isCollapsible) {
      setIsExpanded(!isExpanded);
    }
  };

  // New Grid Variant - Modern Card Design
  if (variant === 'grid') {
    return (
      <Card className={cn(
        "group relative overflow-hidden border-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]",
        className
      )}>
        {/* Subtle Gradient Overlay - No Blur */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/3 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Service Image */}
        {serviceImage && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={serviceImage} 
              alt={serviceName}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Price Badge */}
            {price && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 font-semibold">
                  <DollarSign size={12} className="mr-1" />
                  {price}
                </Badge>
              </div>
            )}

            {/* Special Offer Badge */}
            {coupon && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 font-semibold animate-pulse">
                  <Sparkles size={12} className="mr-1" />
                  Offer
                </Badge>
              </div>
            )}
          </div>
        )}

        <CardContent className="p-6 relative z-10">
          <div className="space-y-4">
            {/* Service Header */}
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
                {serviceName}
              </h3>
              {description && (
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                  {description}
                </p>
              )}
            </div>

            {/* Service Details Grid */}
            {shouldShowDetails && (
              <div className="space-y-3">
                {isCollapsible && (
                  <button
                    onClick={toggleExpanded}
                    className="flex items-center justify-between w-full text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors group/btn"
                  >
                    <span className="flex items-center gap-2">
                      <Star size={14} />
                      Service Details
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>
                )}
                
                <AnimatePresence>
                  {(isExpanded || !isCollapsible) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {duration && (
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-2 text-sm p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <Clock size={16} className="text-blue-400" />
                            <span className="text-gray-200 font-medium">{duration}</span>
                          </motion.div>
                        )}
                        {schedule && (
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 text-sm p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <Calendar size={16} className="text-purple-400" />
                            <span className="text-gray-200 font-medium">{schedule}</span>
                          </motion.div>
                        )}
                        {location && (
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="col-span-2 flex items-center gap-2 text-sm p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                          >
                            <MapPin size={16} className="text-red-400" />
                            <span className="text-gray-200 font-medium">{location}</span>
                          </motion.div>
                        )}
                        {coupon && (
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="col-span-2 flex items-center gap-2 text-sm p-3 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30"
                          >
                            <Tag size={16} className="text-green-400" />
                            <span className="text-green-300 font-semibold">{coupon}</span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Book Now Button */}
            <Button 
              onClick={handleBookNow}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 group/btn"
              size="lg"
            >
              <span className="flex items-center justify-center gap-2">
                Book Now
                <ExternalLink size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </CardContent>

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
             style={{ padding: '1px' }}>
          <div className="w-full h-full rounded-lg bg-black/20 backdrop-blur-sm" />
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className={cn(
        "group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm",
        className
      )}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {serviceImage && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={serviceImage} 
                  alt={serviceName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{serviceName}</h3>
              {price && (
                <p className="text-xs text-muted-foreground">{price}</p>
              )}
            </div>
            <Button 
              size="sm" 
              onClick={handleBookNow}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Book
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className={cn(
        "group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md overflow-hidden",
        className
      )}>
        {serviceImage && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={serviceImage} 
              alt={serviceName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {price && (
              <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                {price}
              </Badge>
            )}
          </div>
        )}
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2">{serviceName}</h3>
              {description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              )}
            </div>

            {shouldShowDetails && (
              <div className="space-y-3">
                {isCollapsible && (
                  <button
                    onClick={toggleExpanded}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Service Details
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                )}
                
                <AnimatePresence>
                  {(isExpanded || !isCollapsible) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-3 pt-2">
                        {duration && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock size={16} className="text-muted-foreground" />
                            <span>{duration}</span>
                          </div>
                        )}
                        {schedule && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={16} className="text-muted-foreground" />
                            <span>{schedule}</span>
                          </div>
                        )}
                        {location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin size={16} className="text-muted-foreground" />
                            <span>{location}</span>
                          </div>
                        )}
                        {coupon && (
                          <div className="flex items-center gap-2 text-sm">
                            <Tag size={16} className="text-green-500" />
                            <span className="text-green-600 font-medium">{coupon}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <Button 
              onClick={handleBookNow}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-lg"
              size="lg"
            >
              Book Now
              <ExternalLink size={16} className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm",
      className
    )}>
      <CardContent className="p-5">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            {serviceImage && (
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/20">
                <img 
                  src={serviceImage} 
                  alt={serviceName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold mb-1">{serviceName}</h3>
              {description && (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              )}
              {price && (
                <Badge variant="secondary" className="mt-2">
                  <DollarSign size={12} className="mr-1" />
                  {price}
                </Badge>
              )}
            </div>
          </div>

          {/* Additional Details */}
          {shouldShowDetails && (
            <div className="space-y-3">
              {isCollapsible && (
                <button
                  onClick={toggleExpanded}
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors w-full justify-between"
                >
                  <span>Service Details</span>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
              
              <AnimatePresence>
                {(isExpanded || !isCollapsible) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {duration && (
                        <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5">
                          <Clock size={16} className="text-blue-400" />
                          <span>{duration}</span>
                        </div>
                      )}
                      {schedule && (
                        <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5">
                          <Calendar size={16} className="text-purple-400" />
                          <span>{schedule}</span>
                        </div>
                      )}
                      {location && (
                        <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-white/5 sm:col-span-2">
                          <MapPin size={16} className="text-red-400" />
                          <span>{location}</span>
                        </div>
                      )}
                      {coupon && (
                        <div className="flex items-center gap-2 text-sm p-2 rounded-lg bg-green-500/10 border border-green-500/20 sm:col-span-2">
                          <Tag size={16} className="text-green-400" />
                          <span className="text-green-300 font-medium">{coupon}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Book Now Button */}
          <Button 
            onClick={handleBookNow}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-md group-hover:shadow-lg"
          >
            Book Now
            <ExternalLink size={16} className="ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}