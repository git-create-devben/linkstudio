"use client"

import React, { useState } from 'react'
import { Shield, Key, Smartphone, Eye, EyeOff, Save, Loader2, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

const SecuritySettings = () => {
  const [saving, setSaving] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordUpdate = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Password updated successfully')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      toast.error('Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  const handleTwoFactorToggle = async () => {
    setSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setTwoFactorEnabled(!twoFactorEnabled)
      toast.success(twoFactorEnabled ? '2FA disabled' : '2FA enabled')
    } catch (error) {
      toast.error('Failed to update 2FA settings')
    } finally {
      setSaving(false)
    }
  }

  const PasswordInput = ({ 
    name, 
    value, 
    placeholder, 
    show, 
    onToggle, 
    onChange 
  }: {
    name: string
    value: string
    placeholder: string
    show: boolean
    onToggle: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }) => (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  )

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Settings</h2>
        <p className="text-gray-600">Manage your account security and authentication</p>
      </div>

      {/* Change Password */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        </div>
        
        <div className="space-y-4 pl-7">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <PasswordInput
              name="currentPassword"
              value={passwordForm.currentPassword}
              placeholder="Enter current password"
              show={showCurrentPassword}
              onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
              onChange={handlePasswordChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <PasswordInput
              name="newPassword"
              value={passwordForm.newPassword}
              placeholder="Enter new password"
              show={showNewPassword}
              onToggle={() => setShowNewPassword(!showNewPassword)}
              onChange={handlePasswordChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Password must be at least 8 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <PasswordInput
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              placeholder="Confirm new password"
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              onChange={handlePasswordChange}
            />
          </div>

          <button
            onClick={handlePasswordUpdate}
            disabled={saving || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
        </div>
        
        <div className="pl-7">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-2">Authenticator App</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Add an extra layer of security to your account using an authenticator app like Google Authenticator or Authy.
                </p>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${twoFactorEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm font-medium text-gray-900">
                    {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleTwoFactorToggle}
                disabled={saving}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  twoFactorEnabled
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Active Sessions</h3>
        </div>
        
        <div className="pl-7 space-y-3">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Current Session</span>
                </div>
                <p className="text-sm text-gray-600">Chrome on macOS • San Francisco, CA</p>
                <p className="text-xs text-gray-500">Last active: Now</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Current
              </span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="font-medium text-gray-900">Mobile App</span>
                </div>
                <p className="text-sm text-gray-600">iPhone • San Francisco, CA</p>
                <p className="text-xs text-gray-500">Last active: 2 hours ago</p>
              </div>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Security Recommendations */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-900 mb-2">Security Recommendations</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Enable two-factor authentication for better security</li>
              <li>• Use a strong, unique password for your account</li>
              <li>• Regularly review your active sessions</li>
              <li>• Keep your recovery email up to date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecuritySettings