"use client"

import React, { useState } from 'react'
import { Bell, Mail, Smartphone, Globe, Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface NotificationPreferences {
  email: {
    marketing: boolean
    security: boolean
    billing: boolean
    updates: boolean
  }
  push: {
    newFollowers: boolean
    linkClicks: boolean
    weeklyReport: boolean
  }
  sms: {
    security: boolean
    billing: boolean
  }
}

const NotificationSettings = () => {
  const [saving, setSaving] = useState(false)
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email: {
      marketing: true,
      security: true,
      billing: true,
      updates: false
    },
    push: {
      newFollowers: true,
      linkClicks: false,
      weeklyReport: true
    },
    sms: {
      security: true,
      billing: false
    }
  })

  const handleToggle = (category: keyof NotificationPreferences, setting: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof typeof prev[typeof category]]
      }
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Notification preferences updated')
    } catch (error) {
      toast.error('Failed to update preferences')
    } finally {
      setSaving(false)
    }
  }

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Settings</h2>
        <p className="text-gray-600">Choose how you want to be notified about activity</p>
      </div>

      {/* Email Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
        </div>
        
        <div className="space-y-4 pl-7">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-900">Marketing & Promotions</h4>
              <p className="text-sm text-gray-600">Receive emails about new features and special offers</p>
            </div>
            <ToggleSwitch
              enabled={preferences.email.marketing}
              onChange={() => handleToggle('email', 'marketing')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-900">Security Alerts</h4>
              <p className="text-sm text-gray-600">Important security notifications and login alerts</p>
            </div>
            <ToggleSwitch
              enabled={preferences.email.security}
              onChange={() => handleToggle('email', 'security')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-900">Billing & Payments</h4>
              <p className="text-sm text-gray-600">Invoices, payment confirmations, and billing updates</p>
            </div>
            <ToggleSwitch
              enabled={preferences.email.billing}
              onChange={() => handleToggle('email', 'billing')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-900">Product Updates</h4>
              <p className="text-sm text-gray-600">New features, improvements, and platform updates</p>
            </div>
            <ToggleSwitch
              enabled={preferences.email.updates}
              onChange={() => handleToggle('email', 'updates')}
            />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
        </div>
        
        <div className="space-y-4 pl-7">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-900">New Followers</h4>
              <p className="text-sm text-gray-600">When someone follows your profile</p>
            </div>
            <ToggleSwitch
              enabled={preferences.push.newFollowers}
              onChange={() => handleToggle('push', 'newFollowers')}
            />
          </div>

          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-900">Link Clicks</h4>
              <p className="text-sm text-gray-600">Real-time notifications when someone clicks your links</p>
            </div>
            <ToggleSwitch
              enabled={preferences.push.linkClicks}
              onChange={() => handleToggle('push', 'linkClicks')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-900">Weekly Report</h4>
              <p className="text-sm text-gray-600">Weekly summary of your profile performance</p>
            </div>
            <ToggleSwitch
              enabled={preferences.push.weeklyReport}
              onChange={() => handleToggle('push', 'weeklyReport')}
            />
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">SMS Notifications</h3>
        </div>
        
        <div className="space-y-4 pl-7">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <h4 className="font-medium text-gray-900">Security Alerts</h4>
              <p className="text-sm text-gray-600">Critical security notifications via SMS</p>
            </div>
            <ToggleSwitch
              enabled={preferences.sms.security}
              onChange={() => handleToggle('sms', 'security')}
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <h4 className="font-medium text-gray-900">Billing Alerts</h4>
              <p className="text-sm text-gray-600">Payment failures and billing issues</p>
            </div>
            <ToggleSwitch
              enabled={preferences.sms.billing}
              onChange={() => handleToggle('sms', 'billing')}
            />
          </div>
        </div>
      </div>

      {/* Notification Schedule */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Schedule</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours Start</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours End</label>
            <input
              type="time"
              defaultValue="08:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          During quiet hours, you'll only receive critical security notifications
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  )
}

export default NotificationSettings