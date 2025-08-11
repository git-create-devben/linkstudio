# Payment Integration Test Checklist

## ✅ Database Schema
- [x] User model has all required fields: `plan`, `isActive`, `billingCycle`, `subscriptionId`, `payment_gateway`
- [x] Migration is ready for production

## ✅ Payment Flow
- [x] Payment component passes correct metadata (`planId`, `billingCycle`)
- [x] Stripe API route creates session with metadata
- [x] Paystack API route creates transaction with metadata
- [x] Both webhooks update user subscription data in database

## ✅ Feature Access Control
- [x] Plan utilities properly check user subscription status
- [x] UI components respect plan limitations (design panel, analytics, etc.)
- [x] Upgrade prompts guide users to payment page

## ✅ No Simulation/Demo Code
- [x] Removed PlanSimulator component
- [x] Removed simulate-payment API endpoint
- [x] Removed demo badges from payment plans

## 🧪 Testing Steps

### 1. Test Free User Experience
```bash
# User with no plan/subscription should see:
# - Limited analytics (blurred metrics)
# - Locked premium curves in design panel
# - Social links limit warnings
# - Action item limits
```

### 2. Test Payment Flow
```bash
# For Nigerian users (Paystack):
curl -X POST http://localhost:3000/api/paystack \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "amount": 5000,
    "planId": "starter",
    "billingCycle": "monthly"
  }'

# For International users (Stripe):
curl -X POST http://localhost:3000/api/stripe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com", 
    "amount": 15.99,
    "planId": "starter",
    "billingCycle": "monthly"
  }'
```

### 3. Test Webhook Processing
After successful payment, verify user record is updated:
```sql
SELECT plan, isActive, billingCycle, subscriptionId, payment_gateway 
FROM users 
WHERE email = 'test@example.com';
```

### 4. Test Feature Access After Payment
- User should see all features for their plan
- No more locked/blurred components
- Analytics should show real data
- Design panel should show all gradients/curves

## 🚀 Production Deployment Checklist

- [ ] Environment variables set:
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET` 
  - `PAYSTACK_SECRET_KEY`
- [ ] Webhook endpoints configured in payment gateways
- [ ] Database migrated with subscription fields
- [ ] Test with real payment transactions
