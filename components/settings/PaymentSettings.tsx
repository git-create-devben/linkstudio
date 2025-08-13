"use client"

import React, { useState, useEffect } from 'react'
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  Download, 
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight
} from 'lucide-react'
import { usePlanAccess } from '@/hooks/usePlanAccess'
import { getUser } from '@/actions/authActions'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface PaymentHistory {
  id: string
  date: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  description: string
  invoice_url?: string
}

const PaymentSettings = () => {
  const { subscription, loading } = usePlanAccess()
  const [user, setUser] = useState<any>(null)
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUser()
      setUser(userData)
    }
    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch('/api/payments/history')
        const data = await response.json()
        
        if (data.payments) {
          setPaymentHistory(data.payments)
        }
      } catch (error) {
        console.error('Failed to fetch payment history:', error)
        // Fallback to empty array
        setPaymentHistory([])
      } finally {
        setLoadingHistory(false)
      }
    }

    fetchPaymentHistory()
  }, [])

  const handleUpgrade = () => {
    router.push('/payment')
  }

  const handleManageSubscription = async () => {
    try {
      // Create customer portal session
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email
        })
      })

      const data = await response.json()
      
      if (data.url) {
        window.open(data.url, '_blank')
      } else {
        toast.error('Unable to access billing portal')
      }
    } catch (error) {
      toast.error('Failed to open billing portal')
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features.')) {
      return
    }

    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      
      if (data.success) {
        toast.success('Subscription cancelled successfully')
        // Refresh the page to update subscription status
        window.location.reload()
      } else {
        toast.error(data.error || 'Failed to cancel subscription')
      }
    } catch (error) {
      toast.error('Failed to cancel subscription')
    }
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50'
      case 'pending':
        return 'text-yellow-700 bg-yellow-50'
      case 'failed':
        return 'text-red-700 bg-red-50'
      default:
        return 'text-gray-700 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment & Billing</h2>
        <p className="text-gray-600">Manage your subscription and billing information</p>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 capitalize">
                  {subscription.plan}
                </span>
                {subscription.isActive && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Active
                  </span>
                )}
              </div>
              <p className="text-gray-600">
                Billed {subscription.billingCycle} • 
                {subscription.plan === 'free' ? ' No payment required' : ` Next billing: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {subscription.plan === 'free' ? (
              <button
                onClick={handleUpgrade}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ArrowUpRight className="w-4 h-4" />
                Upgrade Plan
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleManageSubscription}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Manage Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="px-4 py-2 bg-red-100 border border-red-300 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleUpgrade}
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
        >
          <ArrowUpRight className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="font-medium text-gray-900">Upgrade Plan</h4>
          <p className="text-sm text-gray-600">Get access to premium features</p>
        </button>

        <button
          onClick={handleManageSubscription}
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
        >
          <CreditCard className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="font-medium text-gray-900">Update Payment Method</h4>
          <p className="text-sm text-gray-600">Change your billing information</p>
        </button>

        <button
          onClick={() => window.open('/contact', '_blank')}
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
        >
          <DollarSign className="w-5 h-5 text-blue-600 mb-2" />
          <h4 className="font-medium text-gray-900">Billing Support</h4>
          <p className="text-sm text-gray-600">Get help with billing issues</p>
        </button>
      </div>

      {/* Payment History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
            <Download className="w-4 h-4" />
            Download All
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {loadingHistory ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : paymentHistory.length === 0 ? (
            <div className="p-8 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No payment history</h4>
              <p className="text-gray-600">Your payment history will appear here once you make your first payment.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(payment.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{payment.description}</p>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(payment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-gray-900">
                      {formatPrice(payment.amount)}
                    </span>
                    {payment.invoice_url && (
                      <button
                        onClick={() => window.open(payment.invoice_url, '_blank')}
                        className="text-blue-600 hover:text-blue-700 p-1"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Billing Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <p className="text-gray-900">{user?.email || 'Loading...'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
            <p className="text-gray-900 capitalize">{subscription.plan !== 'free' ? 'Stripe' : 'None'}</p>
          </div>
        </div>
        
        {subscription.plan !== 'free' && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={handleManageSubscription}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Update billing information →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentSettings