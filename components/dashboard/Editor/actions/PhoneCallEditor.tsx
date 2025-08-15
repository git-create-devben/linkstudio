"use client";

import React from 'react';
import { Phone, Plus, X, Clock, MapPin } from 'lucide-react';
import ActionConfigBase from './shared/ActionConfigBase';
import { TextField, FormField } from './shared/FormComponents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface PhoneNumber {
  number: string;
  label: string;
  description?: string;
  hours?: string;
  location?: string;
}

interface PhoneCallEditorProps {
  config: {
    title?: string;
    phoneNumbers?: PhoneNumber[];
    phoneNumber?: string; // Legacy support
    description?: string; // Legacy support
  };
  onUpdate: (updates: any) => void;
}

export default function PhoneCallEditor({ config, onUpdate }: PhoneCallEditorProps) {
  // Convert legacy format to new format
  const phoneNumbers: PhoneNumber[] = config.phoneNumbers || 
    (config.phoneNumber ? [{
      number: config.phoneNumber,
      label: 'Call Now',
      description: config.description
    }] : []);

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const addPhoneNumber = () => {
    const newNumber: PhoneNumber = {
      number: '',
      label: 'Call Now',
      description: '',
      hours: '',
      location: ''
    };
    handleInputChange('phoneNumbers', [...phoneNumbers, newNumber]);
  };

  const updatePhoneNumber = (index: number, field: string, value: string) => {
    const updated = phoneNumbers.map((phone, i) => 
      i === index ? { ...phone, [field]: value } : phone
    );
    handleInputChange('phoneNumbers', updated);
  };

  const removePhoneNumber = (index: number) => {
    const updated = phoneNumbers.filter((_, i) => i !== index);
    handleInputChange('phoneNumbers', updated);
  };

  const formatPhonePreview = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    } else if (cleaned.length === 11 && cleaned[0] === '1') {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const PhoneNumberForm = ({ 
    phoneData, 
    index, 
    onUpdate, 
    onRemove 
  }: { 
    phoneData: PhoneNumber; 
    index: number;
    onUpdate: (field: string, value: string) => void;
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
          <Phone size={16} className="text-green-500" />
          <span className="font-medium">Phone {index + 1}</span>
          {phoneData.number && (
            <span className="text-sm text-muted-foreground">
              {formatPhonePreview(phoneData.number)}
            </span>
          )}
        </div>
        {phoneNumbers.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Phone Number *</Label>
            <Input
              value={phoneData.number}
              onChange={(e) => onUpdate('number', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Button Label</Label>
            <Input
              value={phoneData.label}
              onChange={(e) => onUpdate('label', e.target.value)}
              placeholder="Call Now"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Description</Label>
            <Input
              value={phoneData.description || ''}
              onChange={(e) => onUpdate('description', e.target.value)}
              placeholder="Available for support"
              className="mt-1"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock size={14} />
              Business Hours
            </Label>
            <Input
              value={phoneData.hours || ''}
              onChange={(e) => onUpdate('hours', e.target.value)}
              placeholder="Mon-Fri 9AM-5PM"
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin size={14} />
              Location/Department
            </Label>
            <Input
              value={phoneData.location || ''}
              onChange={(e) => onUpdate('location', e.target.value)}
              placeholder="Main Office, Support"
              className="mt-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const tips = [
    "Use international format for better compatibility (+1 555-123-4567)",
    "Add multiple numbers for different departments or locations",
    "Include business hours to set expectations",
    "Use clear labels like 'Sales', 'Support', or 'Emergency'",
    "Test your phone numbers to ensure they work correctly",
    "Consider adding WhatsApp numbers for international users"
  ];

  return (
    <ActionConfigBase
      title="Phone Call"
      description="Add clickable phone numbers with professional call-to-action buttons"
      icon={Phone}
      tips={tips}
    >
      <div className="space-y-6">
        {/* Title */}
        <TextField
          label="Section Title"
          value={config.title || ''}
          onChange={(value) => handleInputChange('title', value)}
          placeholder="Contact Us"
          description="Optional title when you have multiple phone numbers"
        />

        {/* Phone Numbers */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    <Phone size={18} className="text-green-500" />
                    Phone Numbers
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Add one or more phone numbers for different purposes
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addPhoneNumber}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Number
                </Button>
              </div>

              <AnimatePresence>
                {phoneNumbers.map((phoneData, index) => (
                  <PhoneNumberForm
                    key={index}
                    phoneData={phoneData}
                    index={index}
                    onUpdate={(field, value) => updatePhoneNumber(index, field, value)}
                    onRemove={() => removePhoneNumber(index)}
                  />
                ))}
              </AnimatePresence>

              {phoneNumbers.length === 0 && (
                <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                  <Phone size={32} className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No phone numbers added yet. Click "Add Number" to get started.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Templates */}
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <Phone size={18} />
              Quick Setup Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('phoneNumbers', [{
                    number: '',
                    label: 'Call Sales',
                    description: 'Get product information',
                    hours: 'Mon-Fri 9AM-6PM',
                    location: 'Sales Department'
                  }]);
                }}
                className="justify-start"
              >
                📞 Sales Line
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('phoneNumbers', [{
                    number: '',
                    label: 'Get Support',
                    description: 'Technical assistance',
                    hours: '24/7 Available',
                    location: 'Support Team'
                  }]);
                }}
                className="justify-start"
              >
                🛠️ Support Line
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('phoneNumbers', [
                    {
                      number: '',
                      label: 'Main Office',
                      description: 'General inquiries',
                      hours: 'Mon-Fri 9AM-5PM',
                      location: 'Headquarters'
                    },
                    {
                      number: '',
                      label: 'Emergency',
                      description: 'Urgent matters only',
                      hours: '24/7 Available',
                      location: 'Emergency Line'
                    }
                  ]);
                }}
                className="justify-start"
              >
                🏢 Business Setup
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('phoneNumbers', [{
                    number: '',
                    label: 'Book Appointment',
                    description: 'Schedule a consultation',
                    hours: 'Mon-Sat 8AM-6PM',
                    location: 'Booking Line'
                  }]);
                }}
                className="justify-start"
              >
                📅 Appointment Line
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ActionConfigBase>
  );
}