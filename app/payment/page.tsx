import PaymentPlansPaystackOnly from '@/components/payment/paymentPlan'
import CouponRedemption from '@/components/coupon/CouponRedemption'
import React from 'react'

const Payment = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Coupon Section */}
      <div className="mb-8">
        <CouponRedemption />
      </div>
      
      {/* Payment Plans */}
      <PaymentPlansPaystackOnly/>
    </div>
  )
}

export default Payment