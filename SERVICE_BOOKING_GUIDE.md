# Service Booking Feature Guide

## Overview
The Service Booking feature allows users to create beautiful, modern service cards with booking functionality. Users can showcase their services with images, descriptions, pricing, and additional details, all with a "Book Now" button that redirects to their booking platform.

## Features

### Core Features
- **Service Name**: Clear, descriptive service title
- **Service Image**: Visual representation of the service
- **Description**: Brief description of what the service offers
- **Booking URL**: Direct link to booking platform (Calendly, Acuity, etc.)
- **Book Now Button**: Prominent call-to-action button

### Additional Details (Optional)
- **Price**: Service pricing information
- **Duration**: How long the service takes
- **Schedule**: Availability information
- **Location**: Where the service is provided
- **Special Offers**: Coupons or promotional information

### UI Customization
- **Show Additional Details**: Toggle to display extra information
- **Collapsible Details**: Allow users to expand/collapse additional info
- **Default Expanded State**: Control whether details are shown by default

## Visual Variants

### Default Variant
- Clean card layout with service image
- Organized additional details in a grid
- Smooth animations for collapsible content
- Modern glassmorphism design

### Compact Variant
- Minimal horizontal layout
- Perfect for mobile or space-constrained areas
- Shows only essential information

### Featured Variant
- Large hero image
- Prominent pricing badge
- Enhanced visual appeal for premium services

## How to Use

### Adding a Service Booking
1. Open the Actions Panel in the editor
2. Click "Add New Action"
3. Select "Service Booking" from the Business category
4. Configure your service details:
   - Enter service name (required)
   - Add booking URL (required)
   - Upload service image (optional)
   - Add description (optional)
   - Configure additional details as needed

### Configuration Options

#### Basic Information
- **Service Name**: The main title for your service
- **Description**: Brief explanation of what you offer
- **Booking URL**: Where users will be redirected to book
- **Service Image**: Visual representation (supports file upload or URL)

#### Additional Details
- **Price**: Display pricing information (e.g., "$50/hour", "From $100")
- **Duration**: Service length (e.g., "1 hour", "30 minutes")
- **Schedule**: Your availability (e.g., "Mon-Fri 9AM-5PM")
- **Location**: Where service is provided (e.g., "Online", "New York City")
- **Special Offer**: Promotions or coupons (e.g., "20% off first session")

#### Display Options
- **Show Additional Details**: Toggle to display extra information
- **Make Details Collapsible**: Allow users to expand/collapse details
- **Expanded by Default**: Show details expanded when page loads

## Best Practices

### Service Names
- Keep them clear and descriptive
- Use action-oriented language
- Examples: "Personal Training Session", "Web Design Consultation", "Photography Shoot"

### Images
- Use high-quality, relevant images
- Recommended size: 400x300px or larger
- Ensure images represent your service accurately

### Pricing
- Be transparent with pricing
- Use ranges if pricing varies (e.g., "From $50")
- Include currency symbols

### Descriptions
- Keep them concise but informative
- Focus on benefits to the client
- Use professional language

### Booking URLs
- Test your booking links regularly
- Use popular platforms like Calendly, Acuity Scheduling, or Bookly
- Ensure the booking process is smooth

## Technical Implementation

### Database Schema
The service booking data is stored in the `ActionItem` table with type `SERVICE_BOOKING` and configuration stored as JSON in the `config` field.

### Action Type Configuration
```typescript
{
  id: 'SERVICE_BOOKING',
  name: 'Service Booking',
  description: 'Beautiful service cards with booking functionality',
  icon: Briefcase,
  category: 'business',
  // ... configuration fields
}
```

### Component Structure
- `ServiceBooking.tsx`: Main display component with variants
- `ServiceBookingEditor.tsx`: Configuration interface
- `ServiceBookingAction.tsx`: Template integration component

## Troubleshooting

### Common Issues
1. **Booking button not working**: Check that the booking URL is valid and accessible
2. **Image not displaying**: Verify image URL is correct and publicly accessible
3. **Details not collapsing**: Ensure `isCollapsible` is set to true

### Support
For additional support or feature requests, please refer to the main documentation or contact support.