import {
  Link,
  MessageSquare,
  FileText,
  Image,
  Calendar,
  Music,
  Video,
  ShoppingBag,
  MapPin,
  Phone,
  Briefcase
} from "lucide-react";

export interface ActionTypeConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'links' | 'content' | 'contact' | 'media' | 'business';
  defaultConfig: any;
  configFields: ActionConfigField[];
}

export interface ActionConfigField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'email' | 'number' | 'select' | 'boolean' | 'color' | 'image' | 'array';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  arrayItemType?: 'link' | 'image' | 'text' | 'product';
}

export const actionTypes: ActionTypeConfig[] = [
  {
    id: 'LINK_LIST',
    name: 'Link List',
    description: 'A collection of clickable links to your content',
    icon: Link,
    category: 'links',
    defaultConfig: {
      title: 'My Links',
      links: [
        { title: 'Link 1', url: '', icon: '' },
        { title: 'Link 2', url: '', icon: '' }
      ]
    },
    configFields: [
      {
        key: 'title',
        label: 'Section Title',
        type: 'text',
        placeholder: 'My Links'
      },
      {
        key: 'links',
        label: 'Links',
        type: 'array',
        arrayItemType: 'link',
        required: true
      }
    ]
  },
  {
    id: 'CONTACT_FORM',
    name: 'Contact Form',
    description: 'A form for visitors to send you messages',
    icon: MessageSquare,
    category: 'contact',
    defaultConfig: {
      title: 'Get In Touch',
      email: '',
      successMessage: 'Thank you for your message! I\'ll get back to you soon.',
      fields: ['name', 'email', 'message']
    },
    configFields: [
      {
        key: 'title',
        label: 'Form Title',
        type: 'text',
        placeholder: 'Get In Touch'
      },
      {
        key: 'email',
        label: 'Your Email (to receive messages)',
        type: 'email',
        required: true,
        placeholder: 'your@email.com'
      },
      {
        key: 'successMessage',
        label: 'Success Message',
        type: 'textarea',
        placeholder: 'Thank you for your message!'
      }
    ]
  },
  {
    id: 'TEXT_BLOCK',
    name: 'Text Block',
    description: 'Rich text content, announcements, or descriptions',
    icon: FileText,
    category: 'content',
    defaultConfig: {
      title: 'About Me',
      content: '<p>Add your content here...</p>'
    },
    configFields: [
      {
        key: 'title',
        label: 'Section Title',
        type: 'text',
        placeholder: 'About Me'
      },
      {
        key: 'content',
        label: 'Content',
        type: 'textarea',
        required: true,
        placeholder: 'Write your content here...'
      }
    ]
  },
  {
    id: 'IMAGE_GALLERY',
    name: 'Image Gallery',
    description: 'Showcase your photos, artwork, or portfolio',
    icon: Image,
    category: 'media',
    defaultConfig: {
      title: 'My Gallery',
      images: [],
      layout: 'grid'
    },
    configFields: [
      {
        key: 'title',
        label: 'Gallery Title',
        type: 'text',
        placeholder: 'My Gallery'
      },
      {
        key: 'layout',
        label: 'Layout Style',
        type: 'select',
        options: [
          { value: 'grid', label: 'Grid' },
          { value: 'masonry', label: 'Masonry' },
          { value: 'carousel', label: 'Carousel' }
        ]
      },
      {
        key: 'images',
        label: 'Images',
        type: 'array',
        arrayItemType: 'image'
      }
    ]
  },
  {
    id: 'CALENDAR_BOOKING',
    name: 'Calendar Booking',
    description: 'Let visitors book appointments or meetings',
    icon: Calendar,
    category: 'business',
    defaultConfig: {
      title: 'Book a Meeting',
      calendarUrl: '',
      description: 'Schedule a time that works for both of us'
    },
    configFields: [
      {
        key: 'title',
        label: 'Section Title',
        type: 'text',
        placeholder: 'Book a Meeting'
      },
      {
        key: 'calendarUrl',
        label: 'Calendar URL (Calendly, etc.)',
        type: 'url',
        required: true,
        placeholder: 'https://calendly.com/your-link'
      },
      {
        key: 'description',
        label: 'Description',
        type: 'textarea',
        placeholder: 'Schedule a time that works for both of us'
      }
    ]
  },
  {
    id: 'MUSIC_PLAYER',
    name: 'Music Player',
    description: 'Embed your music tracks or playlists',
    icon: Music,
    category: 'media',
    defaultConfig: {
      title: 'My Music',
      tracks: [],
      autoplay: false
    },
    configFields: [
      {
        key: 'title',
        label: 'Player Title',
        type: 'text',
        placeholder: 'My Music'
      },
      {
        key: 'spotifyUrl',
        label: 'Spotify Embed URL',
        type: 'url',
        placeholder: 'https://open.spotify.com/embed/...' 
      },
      {
        key: 'soundcloudUrl',
        label: 'SoundCloud Embed URL',
        type: 'url',
        placeholder: 'https://soundcloud.com/...' 
      }
    ]
  },
  {
    id: 'VIDEO_SHOWCASE',
    name: 'Video Showcase',
    description: 'Feature your videos or video content',
    icon: Video,
    category: 'media',
    defaultConfig: {
      title: 'My Videos',
      videos: []
    },
    configFields: [
      {
        key: 'title',
        label: 'Section Title',
        type: 'text',
        placeholder: 'My Videos'
      },
      {
        key: 'youtubeUrl',
        label: 'YouTube Video URL',
        type: 'url',
        placeholder: 'https://youtube.com/watch?v=...'
      },
      {
        key: 'vimeoUrl',
        label: 'Vimeo Video URL',
        type: 'url',
        placeholder: 'https://vimeo.com/...' 
      }
    ]
  },
  {
    id: 'PRODUCT_SHOWCASE',
    name: 'Product Showcase',
    description: 'Professional product gallery with featured items and grid layout',
    icon: ShoppingBag,
    category: 'business',
    defaultConfig: {
      title: 'My Products',
      featuredProducts: [],
      products: [],
      layout: 'carousel'
    },
    configFields: [
      {
        key: 'title',
        label: 'Showcase Title',
        type: 'text',
        placeholder: 'My Products',
        required: false
      },
      {
        key: 'featuredProducts',
        label: 'Featured Products (Up to 2)',
        type: 'array',
        arrayItemType: 'product',
        required: false
      },
      {
        key: 'products',
        label: 'Regular Products',
        type: 'array',
        arrayItemType: 'product',
        required: false
      },
      {
        key: 'layout',
        label: 'Display Layout',
        type: 'select',
        options: [
          { value: 'carousel', label: 'Carousel (Recommended)' },
          { value: 'grid', label: 'Grid Layout' },
          { value: 'single', label: 'Single Column' }
        ],
        required: false
      }
    ]
  },
  {
    id: 'LOCATION_MAP',
    name: 'Location Map',
    description: 'Show your location or business address',
    icon: MapPin,
    category: 'contact',
    defaultConfig: {
      title: 'Find Me',
      address: '',
      showMap: true
    },
    configFields: [
      {
        key: 'title',
        label: 'Section Title',
        type: 'text',
        placeholder: 'Find Me'
      },
      {
        key: 'address',
        label: 'Address',
        type: 'textarea',
        required: true,
        placeholder: '123 Main St, City, State 12345'
      },
      {
        key: 'showMap',
        label: 'Show Interactive Map',
        type: 'boolean'
      }
    ]
  },
  {
    id: 'PHONE_CALL',
    name: 'Phone Call',
    description: 'Add a click-to-call button',
    icon: Phone,
    category: 'contact',
    defaultConfig: {
      title: 'Call Me',
      phoneNumber: '',
      description: 'Available Monday-Friday, 9AM-5PM'
    },
    configFields: [
      {
        key: 'title',
        label: 'Button Text',
        type: 'text',
        placeholder: 'Call Me'
      },
      {
        key: 'phoneNumber',
        label: 'Phone Number',
        type: 'text',
        required: true,
        placeholder: '+1 (555) 123-4567'
      },
      {
        key: 'description',
        label: 'Description',
        type: 'text',
        placeholder: 'Available Monday-Friday, 9AM-5PM'
      }
    ]
  },
  {
    id: 'TIP_JAR',
    name: 'Tip Jar',
    description: 'Add donation links (Ko-fi, BuyMeACoffee, PayPal)',
    icon: ShoppingBag,
    category: 'business',
    defaultConfig: {
      title: 'Support My Work',
      links: []
    },
    configFields: [
      { key: 'title', label: 'Section Title', type: 'text', placeholder: 'Support My Work' },
      { key: 'links', label: 'Donation Links', type: 'array', arrayItemType: 'link' }
    ]
  },
  {
    id: 'NEWSLETTER_SIGNUP',
    name: 'Newsletter Signup',
    description: 'Collect emails or forward to your subscribe page',
    icon: MessageSquare,
    category: 'business',
    defaultConfig: {
      title: 'Join My Newsletter',
      description: 'Get updates in your inbox',
      provider: 'custom',
      actionUrl: '',
      placeholder: 'you@example.com',
      buttonText: 'Subscribe'
    },
    configFields: [
      { key: 'title', label: 'Title', type: 'text', placeholder: 'Join My Newsletter' },
      { key: 'description', label: 'Description', type: 'text', placeholder: 'Get updates in your inbox' },
      {
        key: 'provider', label: 'Provider', type: 'select', options: [
          { value: 'custom', label: 'Custom URL' },
          { value: 'mailchimp', label: 'Mailchimp' },
          { value: 'convertkit', label: 'ConvertKit' },
          { value: 'beehiiv', label: 'Beehiiv' }
        ]
      },
      { key: 'actionUrl', label: 'Subscribe URL', type: 'url', placeholder: 'https://your-newsletter/subscribe' },
      { key: 'placeholder', label: 'Email Placeholder', type: 'text', placeholder: 'you@example.com' },
      { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Subscribe' }
    ]
  },
  {
    id: 'COUNTDOWN_BANNER',
    name: 'Countdown',
    description: 'Countdown to a launch or event',
    icon: Calendar,
    category: 'business',
    defaultConfig: {
      title: 'Launching Soon',
      targetDate: '',
      url: ''
    },
    configFields: [
      { key: 'title', label: 'Heading', type: 'text', placeholder: 'Launching Soon' },
      { key: 'targetDate', label: 'Target DateTime (ISO)', type: 'text', placeholder: '2025-12-31T23:59:59Z' },
      { key: 'url', label: 'CTA URL (optional)', type: 'url', placeholder: 'https://your-site.com' }
    ]
  },
  {
    id: 'WHATSAPP_CHAT',
    name: 'WhatsApp Chat',
    description: 'Open WhatsApp chat with a prefilled message',
    icon: Phone,
    category: 'contact',
    defaultConfig: {
      title: 'Chat on WhatsApp',
      phoneNumber: '',
      message: 'Hi! I came from your link in bio.'
    },
    configFields: [
      { key: 'title', label: 'Button Text', type: 'text', placeholder: 'Chat on WhatsApp' },
      { key: 'phoneNumber', label: 'Phone Number (international)', type: 'text', required: true, placeholder: '+15551234567' },
      { key: 'message', label: 'Prefilled Message', type: 'text', placeholder: 'Hi! I came from your link in bio.' }
    ]
  },
  {
    id: 'SERVICE_BOOKING',
    name: 'Service Booking',
    description: 'Modern service cards with professional booking system',
    icon: Briefcase,
    category: 'business',
    defaultConfig: {
      serviceName: 'My Service',
      serviceImage: '',
      description: 'Professional service description',
      bookingUrl: '',
      schedule: '',
      location: '',
      coupon: '',
      price: '',
      duration: '',
      showAdditionalDetails: true,
      isCollapsible: true,
      additionalDetailsExpanded: false
    },
    configFields: [
      {
        key: 'serviceName',
        label: 'Service Name *',
        type: 'text',
        required: true,
        placeholder: 'Personal Training Session'
      },
      {
        key: 'bookingUrl',
        label: 'Booking Link *',
        type: 'url',
        required: true,
        placeholder: 'https://calendly.com/your-link'
      },
      {
        key: 'description',
        label: 'Service Description',
        type: 'textarea',
        placeholder: 'Brief description of what you offer...', 
        required: false
      },
      {
        key: 'serviceImage',
        label: 'Service Image URL',
        type: 'url',
        placeholder: 'https://example.com/service-image.jpg',
        required: false
      },
      {
        key: 'price',
        label: 'Pricing',
        type: 'text',
        placeholder: '$50/hour or From $100',
        required: false
      },
      {
        key: 'duration',
        label: 'Session Duration',
        type: 'text',
        placeholder: '1 hour or 30 minutes',
        required: false
      },
      {
        key: 'schedule',
        label: 'Availability',
        type: 'text',
        placeholder: 'Mon-Fri 9AM-5PM',
        required: false
      },
      {
        key: 'location',
        label: 'Location/Format',
        type: 'text',
        placeholder: 'Online, New York City, or Your Location',
        required: false
      },
      {
        key: 'coupon',
        label: 'Special Offer (Optional)',
        type: 'text',
        placeholder: '20% off first session',
        required: false
      },
      {
        key: 'showAdditionalDetails',
        label: 'Display Extra Details',
        type: 'boolean'
      },
      {
        key: 'isCollapsible',
        label: 'Allow Collapsing Details',
        type: 'boolean'
      },
      {
        key: 'additionalDetailsExpanded',
        label: 'Show Details Expanded by Default',
        type: 'boolean'
      }
    ]
  },
  {
    id: 'COMMUNITY_POST',
    name: 'Community Post',
    description: 'Share a rich post with your audience',
    icon: FileText,
    category: 'content',
    defaultConfig: {
      title: 'My Latest Post',
      content: 'This is a sample post. Share your thoughts, updates, or stories here.',
      imageUrl: '',
      likes: 0,
      comments: 0,
    },
    configFields: [
      { key: 'title', label: 'Post Title', type: 'text', placeholder: 'Post Title', required: true },
      { key: 'content', label: 'Content', type: 'textarea', placeholder: 'Share something interesting...', required: true },
      { key: 'imageUrl', label: 'Image URL (Optional)', type: 'url', placeholder: 'https://example.com/image.png' },
    ],
  },
  {
    id: 'EVENT_CARD',
    name: 'Event Card',
    description: 'Promote an upcoming event',
    icon: Calendar,
    category: 'business',
    defaultConfig: {
      title: 'My Upcoming Event',
      description: 'Join us for an exciting event. Learn more and register below.',
      date: '2025-12-31T19:00:00',
      location: 'Online',
      url: 'https://example.com/register',
      buttonText: 'Register Now',
    },
    configFields: [
      { key: 'title', label: 'Event Title', type: 'text', placeholder: 'Event Title', required: true },
      { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Event details...' },
      { key: 'date', label: 'Event Date & Time', type: 'text', placeholder: 'e.g., January 1, 2024 at 7:00 PM' },
      { key: 'location', label: 'Location', type: 'text', placeholder: 'e.g., Online or City, State' },
      { key: 'url', label: 'Registration URL', type: 'url', placeholder: 'https://example.com/register', required: true },
      { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Register Now' },
    ],
  },
];

export const getActionTypeById = (id: string): ActionTypeConfig | undefined => {
  return actionTypes.find(type => type.id === id);
};

export const getActionTypesByCategory = (category: string): ActionTypeConfig[] => {
  return actionTypes.filter(type => type.category === category);
};

export const getAllCategories = (): string[] => {
  return [...new Set(actionTypes.map(type => type.category))];
};
