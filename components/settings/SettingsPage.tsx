"use client"

import React, { useState } from 'react'
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Trash2,
  Settings as SettingsIcon
} from 'lucide-react'
import AccountSettings from './AccountSettings'
import PaymentSettings from './PaymentSettings'
import SecuritySettings from './SecuritySettings'
import DangerZone from './DangerZone'

type SettingsTab = 'account' | 'payment' | 'security' | 'danger'

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account')

  const tabs = [
    { id: 'account' as SettingsTab, label: 'Account', icon: User },
    { id: 'payment' as SettingsTab, label: 'Payment \u0026 Billing', icon: CreditCard },
    { id: 'security' as SettingsTab, label: 'Security', icon: Shield },
    { id: 'danger' as SettingsTab, label: 'Danger Zone', icon: Trash2 },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />
      case 'payment':
        return <PaymentSettings />
      case 'security':
        return <SecuritySettings />
      case 'danger':
        return <DangerZone />
      default:
        return <AccountSettings />
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <SettingsIcon className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage