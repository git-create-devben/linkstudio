"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormFieldProps {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

export function FormField({ label, description, required, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  description?: string;
  type?: 'text' | 'url' | 'email';
}

export function TextField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required, 
  description,
  type = 'text'
}: TextFieldProps) {
  return (
    <FormField label={label} description={description} required={required}>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full"
      />
    </FormField>
  );
}

interface TextAreaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  description?: string;
  rows?: number;
}

export function TextAreaField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required, 
  description,
  rows = 3
}: TextAreaFieldProps) {
  return (
    <FormField label={label} description={description} required={required}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none"
      />
    </FormField>
  );
}

interface SwitchFieldProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}

export function SwitchField({ label, value, onChange, description }: SwitchFieldProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
      <div className="space-y-1">
        <Label className="text-sm font-medium">{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  description?: string;
}

export function SelectField({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder, 
  required, 
  description 
}: SelectFieldProps) {
  return (
    <FormField label={label} description={description} required={required}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  required?: boolean;
}

export function ImageUploadField({ 
  label, 
  value, 
  onChange, 
  description, 
  required 
}: ImageUploadFieldProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField label={label} description={description} required={required}>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('image-upload')?.click()}
            className="flex items-center gap-2"
          >
            <Upload size={16} />
            Upload Image
          </Button>
          
          <span className="text-sm text-muted-foreground">or</span>
          
          <Input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1"
          />
        </div>
        
        {value && (
          <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
            <img 
              src={value} 
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => onChange('')}
              className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        )}
      </div>
    </FormField>
  );
}

interface LinkListFieldProps {
  label: string;
  value: { title: string; url: string; icon?: string }[];
  onChange: (value: { title: string; url: string; icon?: string }[]) => void;
  description?: string;
  required?: boolean;
}

export function LinkListField({ 
  label, 
  value, 
  onChange, 
  description, 
  required 
}: LinkListFieldProps) {
  const addLink = () => {
    onChange([...value, { title: '', url: '', icon: '' }]);
  };

  const updateLink = (index: number, field: string, newValue: string) => {
    const updated = value.map((link, i) => 
      i === index ? { ...link, [field]: newValue } : link
    );
    onChange(updated);
  };

  const removeLink = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <FormField label={label} description={description} required={required}>
      <div className="space-y-3">
        <AnimatePresence>
          {value.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 border rounded-lg bg-muted/20 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Link {index + 1}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeLink(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Link title"
                  value={link.title}
                  onChange={(e) => updateLink(index, 'title', e.target.value)}
                />
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        <Button
          type="button"
          variant="outline"
          onClick={addLink}
          className="w-full flex items-center gap-2 border-dashed"
        >
          <Plus size={16} />
          Add Link
        </Button>
      </div>
    </FormField>
  );
}