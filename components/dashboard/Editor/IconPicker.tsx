"use client";
import React from 'react';
import { iconLibrary, getIconCategories } from '@/lib/themeSystem';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Smile } from 'lucide-react';

interface IconPickerProps {
  onSelectIcon: (iconId: string) => void;
  selectedIcon?: string;
}

export const IconPicker = ({ onSelectIcon, selectedIcon }: IconPickerProps) => {
  const categories = getIconCategories();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-12 h-12 p-0 bg-gradient-to-br from-blue-200 via-white to-purple-200 group-hover:bg-blue-600 transition-colors duration-300 text-black hover:bg-indigo-700">
          {selectedIcon ? (
            <span className="text-2xl">{iconLibrary.find(icon => icon.id === selectedIcon)?.emoji}</span>
          ) : (
            <Smile />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-96 overflow-y-auto bg-gradient-to-br from-blue-200 via-white to-purple-200 group-hover:bg-blue-600 transition-colors duration-300 text-black hover:bg-indigo-700">
        <div className="grid grid-cols-6 gap-2">
          {iconLibrary.map((icon) => (
            <Button
              key={icon.id}
              variant={selectedIcon === icon.id ? 'default' : 'ghost'}
              className="cursor-pointer w-12 h-12 p-0 text-2xl"
              onClick={() => onSelectIcon(icon.id)}
            >
              {icon.emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
