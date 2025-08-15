"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ActionConfigBaseProps {
  title: string;
  description: string;
  icon: React.ElementType;
  preview?: React.ReactNode;
  children: React.ReactNode;
  tips?: string[];
  className?: string;
}

export default function ActionConfigBase({
  title,
  description,
  icon: Icon,
  preview,
  children,
  tips,
  className = ""
}: ActionConfigBaseProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Icon size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        {preview && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2"
          >
            {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        )}
      </div>

      {/* Preview */}
      <AnimatePresence>
        {showPreview && preview && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye size={16} />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                {preview}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Configuration Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={18} />
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>

      {/* Tips */}
      {tips && tips.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <Sparkles size={18} className="text-blue-500" />
                Pro Tips
              </h4>
              <ul className="space-y-2">
                {tips.map((tip, index) => (
                  <li key={index} className="text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}