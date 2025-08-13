import { 
  IconBrandFacebook, 
  IconBrandInstagram, 
  IconBrandLinkedin, 
  IconBrandTiktok, 
  IconBrandTwitter, 
  IconBrandYoutube,
  IconBrandGithub,
  IconBrandDiscord,
  IconBrandTwitch,
  IconBrandSpotify,
  IconBrandWhatsapp,
  IconBrandTelegram,
  IconBrandSnapchat,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandThreads,
  IconBrandApple,
  IconBrandSoundcloud,
  IconBrandBandcamp,
  IconBrandVimeo,
  IconBrandDribbble,
  IconBrandBehance,
  IconBrandMedium,
  IconBrandPaypal,
  IconBrandPatreon,
  IconWorld,
  IconMail,
  IconPhone,
  IconCalendar,
  IconBrandZoom
} from '@tabler/icons-react';

export const getPlatformIcon = (platform: string, size: number) => {
  const iconProps = { size, className: 'transition-all duration-200' };
  
  switch (platform?.toLowerCase()) {
    case 'instagram':
      return <IconBrandInstagram {...iconProps} />;
    case 'twitter':
    case 'x':
      return <IconBrandTwitter {...iconProps} />;
    case 'facebook':
      return <IconBrandFacebook {...iconProps} />;
    case 'linkedin':
      return <IconBrandLinkedin {...iconProps} />;
    case 'youtube':
      return <IconBrandYoutube {...iconProps} />;
    case 'tiktok':
      return <IconBrandTiktok {...iconProps} />;
    case 'github':
      return <IconBrandGithub {...iconProps} />;
    case 'discord':
      return <IconBrandDiscord {...iconProps} />;
    case 'twitch':
      return <IconBrandTwitch {...iconProps} />;
    case 'spotify':
      return <IconBrandSpotify {...iconProps} />;
    case 'whatsapp':
      return <IconBrandWhatsapp {...iconProps} />;
    case 'telegram':
      return <IconBrandTelegram {...iconProps} />;
    case 'website':
    case 'web':
      return <IconWorld {...iconProps} />;
    case 'email':
    case 'mail':
      return <IconMail {...iconProps} />;
    case 'phone':
    case 'tel':
      return <IconPhone {...iconProps} />;
    case 'snapchat':
      return <IconBrandSnapchat {...iconProps} />;
    case 'pinterest':
      return <IconBrandPinterest {...iconProps} />;
    case 'reddit':
      return <IconBrandReddit {...iconProps} />;
    case 'threads':
      return <IconBrandThreads {...iconProps} />;
    case 'apple':
    case 'apple music':
      return <IconBrandApple {...iconProps} />;
    case 'soundcloud':
      return <IconBrandSoundcloud {...iconProps} />;
    case 'bandcamp':
      return <IconBrandBandcamp {...iconProps} />;
    case 'vimeo':
      return <IconBrandVimeo {...iconProps} />;
    case 'dribbble':
      return <IconBrandDribbble {...iconProps} />;
    case 'behance':
      return <IconBrandBehance {...iconProps} />;
    case 'medium':
      return <IconBrandMedium {...iconProps} />;
    case 'paypal':
      return <IconBrandPaypal {...iconProps} />;
    case 'patreon':
      return <IconBrandPatreon {...iconProps} />;
    case 'calendly':
    case 'calendar':
      return <IconCalendar {...iconProps} />;
    case 'zoom':
      return <IconBrandZoom {...iconProps} />;
    default:
      return (
        <div 
          className='bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center transition-all duration-200'
          style={{ width: size, height: size }}
        >
          <IconWorld size={size * 0.6} className='text-gray-600' />
        </div>
      );
  }
};

// Popular social platforms for selection
export const socialPlatforms = [
  // Social Media
  { id: 'instagram', name: 'Instagram', color: '#E4405F', baseUrl: 'https://instagram.com/', placeholder: '@username' },
  { id: 'twitter', name: 'Twitter/X', color: '#1DA1F2', baseUrl: 'https://twitter.com/', placeholder: '@username' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2', baseUrl: 'https://facebook.com/', placeholder: 'username' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', baseUrl: 'https://linkedin.com/in/', placeholder: 'username' },
  { id: 'tiktok', name: 'TikTok', color: '#000000', baseUrl: 'https://tiktok.com/@', placeholder: 'username' },
  { id: 'threads', name: 'Threads', color: '#000000', baseUrl: 'https://threads.net/@', placeholder: '@username' },
  { id: 'snapchat', name: 'Snapchat', color: '#FFFC00', baseUrl: 'https://snapchat.com/add/', placeholder: 'username' },
  { id: 'pinterest', name: 'Pinterest', color: '#BD081C', baseUrl: 'https://pinterest.com/', placeholder: 'username' },
  { id: 'reddit', name: 'Reddit', color: '#FF4500', baseUrl: 'https://reddit.com/u/', placeholder: 'username' },
  
  // Video & Content
  { id: 'youtube', name: 'YouTube', color: '#FF0000', baseUrl: 'https://youtube.com/@', placeholder: 'username' },
  { id: 'vimeo', name: 'Vimeo', color: '#1AB7EA', baseUrl: 'https://vimeo.com/', placeholder: 'username' },
  { id: 'twitch', name: 'Twitch', color: '#9146FF', baseUrl: 'https://twitch.tv/', placeholder: 'username' },
  
  // Music & Audio
  { id: 'spotify', name: 'Spotify', color: '#1DB954', baseUrl: 'https://open.spotify.com/artist/', placeholder: 'artist-id' },
  { id: 'apple', name: 'Apple Music', color: '#FA243C', baseUrl: 'https://music.apple.com/artist/', placeholder: 'artist-id' },
  { id: 'soundcloud', name: 'SoundCloud', color: '#FF3300', baseUrl: 'https://soundcloud.com/', placeholder: 'username' },
  { id: 'bandcamp', name: 'Bandcamp', color: '#629AA0', baseUrl: 'https://bandcamp.com/', placeholder: 'username' },
  
  // Professional & Creative
  { id: 'github', name: 'GitHub', color: '#181717', baseUrl: 'https://github.com/', placeholder: 'username' },
  { id: 'dribbble', name: 'Dribbble', color: '#EA4C89', baseUrl: 'https://dribbble.com/', placeholder: 'username' },
  { id: 'behance', name: 'Behance', color: '#1769FF', baseUrl: 'https://behance.net/', placeholder: 'username' },
  { id: 'medium', name: 'Medium', color: '#00AB6C', baseUrl: 'https://medium.com/@', placeholder: 'username' },
  
  // Communication & Gaming
  { id: 'discord', name: 'Discord', color: '#5865F2', baseUrl: 'https://discord.gg/', placeholder: 'invite-code' },
  { id: 'whatsapp', name: 'WhatsApp', color: '#25D366', baseUrl: 'https://wa.me/', placeholder: 'phone-number' },
  { id: 'telegram', name: 'Telegram', color: '#0088CC', baseUrl: 'https://t.me/', placeholder: 'username' },
  { id: 'zoom', name: 'Zoom', color: '#2D8CFF', baseUrl: 'https://zoom.us/j/', placeholder: 'meeting-id' },
  
  // Business & Support
  { id: 'calendly', name: 'Calendly', color: '#006BFF', baseUrl: 'https://calendly.com/', placeholder: 'username' },
  { id: 'paypal', name: 'PayPal', color: '#00457C', baseUrl: 'https://paypal.me/', placeholder: 'username' },
  { id: 'patreon', name: 'Patreon', color: '#F96854', baseUrl: 'https://patreon.com/', placeholder: 'username' },
  
  // General
  { id: 'website', name: 'Website', color: '#6B7280', baseUrl: 'https://', placeholder: 'example.com' },
  { id: 'email', name: 'Email', color: '#EA4335', baseUrl: 'mailto:', placeholder: 'email@example.com' },
];
