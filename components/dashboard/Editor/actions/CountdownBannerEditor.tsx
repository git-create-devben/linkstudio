"use client";

import React, { useState } from 'react';
import { Calendar, Clock, Rocket, Target, Zap } from 'lucide-react';
import ActionConfigBase from './shared/ActionConfigBase';
import { TextField, SwitchField, SelectField } from './shared/FormComponents';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CountdownBannerEditorProps {
  config: {
    title?: string;
    targetDate?: string;
    url?: string;
    style?: string;
    showDays?: boolean;
    showHours?: boolean;
    showMinutes?: boolean;
    showSeconds?: boolean;
    buttonText?: string;
  };
  onUpdate: (updates: any) => void;
}

export default function CountdownBannerEditor({ config, onUpdate }: CountdownBannerEditorProps) {
  const [dateInput, setDateInput] = useState(() => {
    if (config.targetDate) {
      try {
        const date = new Date(config.targetDate);
        return date.toISOString().slice(0, 16); // Format for datetime-local input
      } catch {
        return '';
      }
    }
    return '';
  });

  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const handleDateChange = (value: string) => {
    setDateInput(value);
    if (value) {
      const isoDate = new Date(value).toISOString();
      handleInputChange('targetDate', isoDate);
    } else {
      handleInputChange('targetDate', '');
    }
  };

  const getPreviewDate = () => {
    if (!config.targetDate) return null;
    try {
      return new Date(config.targetDate);
    } catch {
      return null;
    }
  };

  const previewDate = getPreviewDate();
  const isValidDate = previewDate && previewDate > new Date();

  const CountdownPreview = () => {
    if (!isValidDate) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <Clock size={32} className="mx-auto mb-2" />
          <p>Set a future date to see countdown preview</p>
        </div>
      );
    }

    const now = new Date();
    const diff = previewDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return (
      <div className="text-center space-y-4">
        <h3 className="text-lg font-bold">{config.title || 'Launching Soon'}</h3>
        <div className="flex justify-center gap-4">
          {config.showDays !== false && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{days}</div>
              <div className="text-xs text-muted-foreground">Days</div>
            </div>
          )}
          {config.showHours !== false && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{hours}</div>
              <div className="text-xs text-muted-foreground">Hours</div>
            </div>
          )}
          {config.showMinutes !== false && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{minutes}</div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
          )}
          {config.showSeconds !== false && (
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{seconds}</div>
              <div className="text-xs text-muted-foreground">Seconds</div>
            </div>
          )}
        </div>
        {config.url && (
          <Button className="mt-4">
            {config.buttonText || 'Get Notified'}
          </Button>
        )}
      </div>
    );
  };

  const tips = [
    "Use countdown timers for product launches, events, or special offers",
    "Set a realistic target date in the future",
    "Add a call-to-action URL to capture interest before launch",
    "Keep your title short and exciting",
    "Test your target URL to ensure it works",
    "Consider your timezone when setting the date"
  ];

  return (
    <ActionConfigBase
      title="Countdown Banner"
      description="Create urgency with a countdown timer to your launch or event"
      icon={Calendar}
      preview={<CountdownPreview />}
      tips={tips}
    >
      <div className="space-y-6">
        {/* Basic Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Target size={18} />
              Basic Settings
            </h4>

            <TextField
              label="Countdown Title"
              value={config.title || ''}
              onChange={(value) => handleInputChange('title', value)}
              placeholder="Launching Soon"
              description="Exciting title for your countdown"
              required
            />

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Target Date & Time *
              </Label>
              <p className="text-xs text-muted-foreground">
                When should the countdown end?
              </p>
              <Input
                type="datetime-local"
                value={dateInput}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full"
              />
              {previewDate && (
                <p className="text-xs text-muted-foreground">
                  Countdown ends: {previewDate.toLocaleString()}
                </p>
              )}
            </div>

            <TextField
              label="Call-to-Action URL"
              value={config.url || ''}
              onChange={(value) => handleInputChange('url', value)}
              placeholder="https://your-website.com/notify"
              description="Where users go when they click the button (optional)"
              type="url"
            />

            {config.url && (
              <TextField
                label="Button Text"
                value={config.buttonText || ''}
                onChange={(value) => handleInputChange('buttonText', value)}
                placeholder="Get Notified"
                description="Text for your call-to-action button"
              />
            )}
          </CardContent>
        </Card>

        {/* Display Options */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap size={18} />
              Display Options
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <SwitchField
                label="Show Days"
                value={config.showDays !== false}
                onChange={(value) => handleInputChange('showDays', value)}
                description="Display days in countdown"
              />

              <SwitchField
                label="Show Hours"
                value={config.showHours !== false}
                onChange={(value) => handleInputChange('showHours', value)}
                description="Display hours in countdown"
              />

              <SwitchField
                label="Show Minutes"
                value={config.showMinutes !== false}
                onChange={(value) => handleInputChange('showMinutes', value)}
                description="Display minutes in countdown"
              />

              <SwitchField
                label="Show Seconds"
                value={config.showSeconds !== false}
                onChange={(value) => handleInputChange('showSeconds', value)}
                description="Display seconds in countdown"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Templates */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <Rocket size={18} />
              Quick Setup Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  const nextWeek = new Date();
                  nextWeek.setDate(nextWeek.getDate() + 7);
                  handleDateChange(nextWeek.toISOString().slice(0, 16));
                  handleInputChange('title', 'Product Launch');
                  handleInputChange('buttonText', 'Get Early Access');
                }}
                className="justify-start"
              >
                📦 Product Launch (1 week)
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  const nextMonth = new Date();
                  nextMonth.setMonth(nextMonth.getMonth() + 1);
                  handleDateChange(nextMonth.toISOString().slice(0, 16));
                  handleInputChange('title', 'Event Registration');
                  handleInputChange('buttonText', 'Register Now');
                }}
                className="justify-start"
              >
                🎉 Event (1 month)
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  handleDateChange(tomorrow.toISOString().slice(0, 16));
                  handleInputChange('title', 'Flash Sale Ends');
                  handleInputChange('buttonText', 'Shop Now');
                }}
                className="justify-start"
              >
                ⚡ Flash Sale (24 hours)
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  const newYear = new Date();
                  newYear.setFullYear(newYear.getFullYear() + 1, 0, 1);
                  newYear.setHours(0, 0, 0, 0);
                  handleDateChange(newYear.toISOString().slice(0, 16));
                  handleInputChange('title', 'New Year Countdown');
                  handleInputChange('buttonText', 'Celebrate');
                }}
                className="justify-start"
              >
                🎊 New Year
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ActionConfigBase>
  );
}