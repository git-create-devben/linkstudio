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
  Phone
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
  arrayItemType?: 'link' | 'image' | 'text';
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
    description: 'Display your products or services',
    icon: ShoppingBag,
    category: 'business',
    defaultConfig: {
      title: 'My Products',
      products: []
    },
    configFields: [
      {
        key: 'title',
        label: 'Section Title',
        type: 'text',
        placeholder: 'My Products'
      },
      {
        key: 'products',
        label: 'Products',
        type: 'array',
        arrayItemType: 'text'
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
  }
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