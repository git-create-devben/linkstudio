"use client";

import React from 'react';
import { Mail, Send, Users, Zap } from 'lucide-react';
import ActionConfigBase from './shared/ActionConfigBase';
import { TextField, TextAreaField, SelectField, SwitchField } from './shared/FormComponents';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NewsletterSignupEditorProps {
  config: {
    title?: string;
    description?: string;
    provider?: string;
    actionUrl?: string;
    placeholder?: string;
    buttonText?: string;
    showSubscriberCount?: boolean;
    subscriberCount?: string;
    incentive?: string;
    frequency?: string;
  };
  onUpdate: (updates: any) => void;
}

export default function NewsletterSignupEditor({ config, onUpdate }: NewsletterSignupEditorProps) {
  const handleInputChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const providerOptions = [
    { value: 'custom', label: 'Custom URL' },
    { value: 'mailchimp', label: 'Mailchimp' },
    { value: 'convertkit', label: 'ConvertKit' },
    { value: 'beehiiv', label: 'Beehiiv' },
    { value: 'substack', label: 'Substack' },
    { value: 'buttondown', label: 'Buttondown' },
    { value: 'revue', label: 'Revue' },
    { value: 'tinyletter', label: 'TinyLetter' }
  ];

  const frequencyOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'occasional', label: 'Occasional' },
    { value: 'daily', label: 'Daily' }
  ];

  const NewsletterPreview = () => (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
          <Mail size={24} className="text-white" />
        </div>
        
        <div>
          <h3 className="text-lg font-bold mb-2">
            {config.title || 'Join My Newsletter'}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {config.description || 'Get updates in your inbox'}
          </p>
          
          {config.incentive && (
            <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                🎁 {config.incentive}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <input
            type="email"
            placeholder={config.placeholder || 'your@email.com'}
            className="w-full px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 text-sm"
            disabled
          />
          <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm">
            {config.buttonText || 'Subscribe'}
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          {config.showSubscriberCount && config.subscriberCount && (
            <div className="flex items-center gap-1">
              <Users size={12} />
              <span>{config.subscriberCount} subscribers</span>
            </div>
          )}
          {config.frequency && (
            <div className="flex items-center gap-1">
              <Send size={12} />
              <span>{config.frequency}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const tips = [
    "Use compelling incentives like free guides or exclusive content",
    "Keep your description short and benefit-focused",
    "Test your signup URL to ensure it works correctly",
    "Consider showing subscriber count for social proof",
    "Be clear about email frequency to set expectations",
    "Use action-oriented button text like 'Get Updates' or 'Join Now'"
  ];

  return (
    <ActionConfigBase
      title="Newsletter Signup"
      description="Grow your email list with beautiful signup forms"
      icon={Mail}
      preview={<NewsletterPreview />}
      tips={tips}
    >
      <div className="space-y-6">
        {/* Basic Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Mail size={18} />
              Basic Settings
            </h4>

            <TextField
              label="Newsletter Title"
              value={config.title || ''}
              onChange={(value) => handleInputChange('title', value)}
              placeholder="Join My Newsletter"
              description="Compelling headline for your signup form"
              required
            />

            <TextAreaField
              label="Description"
              value={config.description || ''}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Get exclusive updates, tips, and insights delivered to your inbox"
              description="Explain the value subscribers will get"
              rows={2}
            />

            <TextField
              label="Email Placeholder"
              value={config.placeholder || ''}
              onChange={(value) => handleInputChange('placeholder', value)}
              placeholder="your@email.com"
              description="Placeholder text for the email input field"
            />

            <TextField
              label="Button Text"
              value={config.buttonText || ''}
              onChange={(value) => handleInputChange('buttonText', value)}
              placeholder="Subscribe"
              description="Text for your subscribe button"
            />
          </CardContent>
        </Card>

        {/* Provider Settings */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap size={18} />
              Integration Settings
            </h4>

            <SelectField
              label="Email Provider"
              value={config.provider || 'custom'}
              onChange={(value) => handleInputChange('provider', value)}
              options={providerOptions}
              description="Choose your email marketing platform"
            />

            <TextField
              label="Signup URL"
              value={config.actionUrl || ''}
              onChange={(value) => handleInputChange('actionUrl', value)}
              placeholder="https://your-provider.com/subscribe"
              description="The URL where email signups will be sent"
              type="url"
              required
            />
          </CardContent>
        </Card>

        {/* Enhancement Options */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Users size={18} />
              Enhancement Options
            </h4>

            <TextField
              label="Sign-up Incentive"
              value={config.incentive || ''}
              onChange={(value) => handleInputChange('incentive', value)}
              placeholder="Free PDF guide when you subscribe"
              description="Offer something valuable to encourage signups"
            />

            <SelectField
              label="Email Frequency"
              value={config.frequency || ''}
              onChange={(value) => handleInputChange('frequency', value)}
              options={[
                { value: '', label: 'Not specified' },
                ...frequencyOptions
              ]}
              description="How often you'll send emails"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SwitchField
                label="Show Subscriber Count"
                value={config.showSubscriberCount || false}
                onChange={(value) => handleInputChange('showSubscriberCount', value)}
                description="Display number of subscribers for social proof"
              />

              {config.showSubscriberCount && (
                <TextField
                  label="Subscriber Count"
                  value={config.subscriberCount || ''}
                  onChange={(value) => handleInputChange('subscriberCount', value)}
                  placeholder="1,200+"
                  description="Number to display (can be approximate)"
                />
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Setup Templates */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardContent className="pt-6">
            <h4 className="font-semibold flex items-center gap-2 mb-4">
              <Send size={18} />
              Quick Setup Templates
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Weekly Insights');
                  handleInputChange('description', 'Get my best tips and insights delivered every week');
                  handleInputChange('buttonText', 'Get Weekly Tips');
                  handleInputChange('frequency', 'weekly');
                  handleInputChange('incentive', 'Free productivity guide when you join');
                }}
                className="justify-start"
              >
                📧 Weekly Newsletter
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Product Updates');
                  handleInputChange('description', 'Be the first to know about new features and releases');
                  handleInputChange('buttonText', 'Get Updates');
                  handleInputChange('frequency', 'occasional');
                }}
                className="justify-start"
              >
                🚀 Product Updates
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Exclusive Content');
                  handleInputChange('description', 'Join our VIP list for exclusive content and early access');
                  handleInputChange('buttonText', 'Join VIP List');
                  handleInputChange('incentive', 'Exclusive content not available anywhere else');
                }}
                className="justify-start"
              >
                ⭐ VIP List
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  handleInputChange('title', 'Free Course');
                  handleInputChange('description', 'Get my 7-day email course absolutely free');
                  handleInputChange('buttonText', 'Start Free Course');
                  handleInputChange('incentive', '7-day email course worth $97');
                }}
                className="justify-start"
              >
                🎓 Email Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ActionConfigBase>
  );
}