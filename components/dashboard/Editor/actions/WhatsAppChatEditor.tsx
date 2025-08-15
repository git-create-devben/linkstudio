"use client";

import React from 'react';
import { MessageCircle, Phone, Globe, Zap } from 'lucide-react';
import ActionConfigBase from './shared/ActionConfigBase';
import { TextField, TextAreaField, SelectField } from './shared/FormComponents';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WhatsAppChatEditorProps {
  config: {
    title?: string;
    phoneNumber?: string;
    message?: string;
    buttonStyle?: string;
    showPhoneNumber?: boolean;
    description?: string;
  };
  onUpdate: (updates: any) => void;
}

export default function WhatsAppChatEditor({ config, onUpdate }: WhatsAppChatEditorProps) {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format for display
    if (cleaned.length === 10) {
      return `+1 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+${cleaned[0]} ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else if (cleaned.length > 7) {
      // International format
      return `+${cleaned}`;
    }
    return phone;
  };

  const validatePhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
  };

  const buttonStyleOptions = [
    { value: 'default', label: 'Default Button' },
    { value: 'whatsapp', label: 'WhatsApp Green' },
    { value: 'minimal', label: 'Minimal Style' },
    { value: 'gradient', label: 'Gradient Style' }
  ];

  const WhatsAppPreview = () => {
    const isValidPhone = config.phoneNumber && validatePhoneNumber(config.phoneNumber);
    
    return (
      <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <MessageCircle size={24} className="text-white" />
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-2">
              {config.title || 'Chat on WhatsApp'}
            </h3>
            
            {config.description && (
              <p className="text-sm text-muted-foreground mb-3">
                {config.description}
              </p>
            )}
            
            {config.showPhoneNumber && config.phoneNumber && (
              <p className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">
                {formatPhoneNumber(config.phoneNumber)}
              </p>
            )}
          </div>

          {isValidPhone ? (
            <button 
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                config.buttonStyle === 'whatsapp' ? 'bg-green-500 hover:bg-green-600 text-white' :
                config.buttonStyle === 'minimal' ? 'bg-white border-2 border-green-500 text-green-500 hover:bg-green-50' :
                config.buttonStyle === 'gradient' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                'bg-green-600 hover:bg-green-700 text-white'
              }`}
              disabled
            >
              <div className="flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                <span>{config.title || 'Start Chat'}</span>
              </div>
            </button>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              <Phone size={24} className="mx-auto mb-2" />
              <p className="text-sm">Add a valid phone number to enable chat</p>
            </div>
          )}

          {config.message && (
            <div className="mt-4 p-3 bg-white/50 rounded-lg text-left">
              <p className="text-xs text-muted-foreground mb-1">Pre-filled message:</p>
              <p className="text-sm italic">"{config.message}"</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const tips = [
    "Use international format for phone numbers (+1 555-123-4567)",
    "Pre-fill messages to make it easier for users to start conversations",
    "Keep messages friendly and professional",
    "Test your WhatsApp link to ensure it opens correctly",
    "Consider different button styles to match your brand",
    "WhatsApp works best for customer support and quick questions"
  ];

  return (
    <ActionConfigBase
      title="WhatsApp Chat"
      description="Enable direct WhatsApp conversations with pre-filled messages"
      icon={MessageCircle}
      preview={<WhatsAppPreview />}
      tips={tips}
    >
      <div className="space-y-6">
        {/* Basic Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <MessageCircle size={18} />
              Basic Settings
            </h4>

            <TextField
              label="Button Text"
              value={config.title || ''}
              onChange={(value) => handleInputChange('title', value)}
              placeholder="Chat on WhatsApp"
              description="Text displayed on the WhatsApp button"
              required
            />

            <TextField
              label="WhatsApp Number"
              value={config.phoneNumber || ''}
              onChange={(value) => handleInputChange('phoneNumber', value)}
              placeholder="+1 555 123 4567"
              description="Your WhatsApp number in international format"
              required
            />

            {config.phoneNumber && !validatePhoneNumber(config.phoneNumber) && (
              <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-700 dark:text-red-300">
                  ⚠️ Please enter a valid phone number with country code (e.g., +1 555 123 4567)
                </p>
              </div>
            )}

            <TextField
              label="Description"
              value={config.description || ''}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Get instant support via WhatsApp"
              description="Optional description shown above the button"
            />
          </CardContent>
        </Card>

        {/* Message Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Globe size={18} />
              Message Settings
            </h4>

            <TextAreaField
              label="Pre-filled Message"
              value={config.message || ''}
              onChange={(value) => handleInputChange('message', value)}
              placeholder="Hi! I came from your link in bio and I'm interested in..."
              description="Message that will be pre-filled when users open WhatsApp"
              rows={3}
            />

            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Message Tips</h5>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Mention where they found you (e.g., "from your Instagram")</li>
                <li>• Include their specific interest or question</li>
                <li>• Keep it friendly and conversational</li>
                <li>• Make it easy for you to understand the context</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap size={18} />
              Appearance Settings
            </h4>

            <SelectField
              label="Button Style"
              value={config.buttonStyle || 'default'}
              onChange={(value) => handleInputChange('buttonStyle', value)}
              options={buttonStyleOptions}
              description="Choose the visual style for your WhatsApp button"
            />

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
              <div className="space-y-1">
                <label className="text-sm font-medium">Show Phone Number</label>
                <p className="text-xs text-muted-foreground">Display your WhatsApp number above the button</p>
              </div>
              <input
                type="checkbox"
                checked={config.showPhoneNumber || false}
                onChange={(e) => handleInputChange('showPhoneNumber', e.target.checked)}
                className="w-4 h-4 rounded border border-gray-300 text-green-600 focus:ring-green-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Templates */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <MessageCircle size={18} />
              Quick Setup Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Get Support');
                  handleInputChange('message', 'Hi! I need help with...');
                  handleInputChange('description', 'Get instant support via WhatsApp');
                }}
                className="justify-start"
              >
                🛠️ Customer Support
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Place Order');
                  handleInputChange('message', 'Hi! I\'d like to place an order for...');
                  handleInputChange('description', 'Order directly via WhatsApp');
                }}
                className="justify-start"
              >
                🛒 Sales & Orders
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Book Consultation');
                  handleInputChange('message', 'Hi! I\'m interested in booking a consultation about...');
                  handleInputChange('description', 'Schedule a free consultation');
                }}
                className="justify-start"
              >
                📅 Consultation
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Ask Questions');
                  handleInputChange('message', 'Hi! I have a question about...');
                  handleInputChange('description', 'Ask me anything');
                }}
                className="justify-start"
              >
                ❓ General Inquiries
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ActionConfigBase>
  );
}