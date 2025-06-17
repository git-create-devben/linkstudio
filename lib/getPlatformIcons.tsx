import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandTiktok, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';

export const getPlatformIcon = (platform: string, size:number) => {
    console.log("platform name", platform)
    switch (platform?.toLowerCase()) {
      case 'instagram':
        return <IconBrandInstagram size={size} />;
      case 'twitter':
      case 'x':
        return <IconBrandTwitter size={size} />;
      case 'facebook':
        return <IconBrandFacebook size={size} />;
      case 'linkedin':
        return <IconBrandLinkedin size={size} />;
      case 'youtube':
        return <IconBrandYoutube size={size} />;
      case 'tiktok':
        return <IconBrandTiktok size={size} />;
      default:
        return <div className='h-20 w-20 bg-gray-300 rounded-md'/>;
    }
  };