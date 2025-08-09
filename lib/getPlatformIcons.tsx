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
  IconWorld,
  IconMail,
  IconPhone
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
  { id: 'instagram', name: 'Instagram', color: '#E4405F', baseUrl: 'https://instagram.com/' },
  { id: 'twitter', name: 'Twitter/X', color: '#1DA1F2', baseUrl: 'https://twitter.com/' },
  { id: 'facebook', name: 'Facebook', color: '#1877F2', baseUrl: 'https://facebook.com/' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', baseUrl: 'https://linkedin.com/in/' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000', baseUrl: 'https://youtube.com/@' },
  { id: 'tiktok', name: 'TikTok', color: '#000000', baseUrl: 'https://tiktok.com/@' },
  { id: 'github', name: 'GitHub', color: '#181717', baseUrl: 'https://github.com/' },
  { id: 'discord', name: 'Discord', color: '#5865F2', baseUrl: 'https://discord.gg/' },
  { id: 'twitch', name: 'Twitch', color: '#9146FF', baseUrl: 'https://twitch.tv/' },
  { id: 'spotify', name: 'Spotify', color: '#1DB954', baseUrl: 'https://open.spotify.com/artist/' },
  { id: 'whatsapp', name: 'WhatsApp', color: '#25D366', baseUrl: 'https://wa.me/' },
  { id: 'telegram', name: 'Telegram', color: '#0088CC', baseUrl: 'https://t.me/' },
  { id: 'website', name: 'Website', color: '#6B7280', baseUrl: 'https://' },
  { id: 'email', name: 'Email', color: '#EA4335', baseUrl: 'mailto:' },
];
