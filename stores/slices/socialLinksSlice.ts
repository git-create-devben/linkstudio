// Social links utilities and types
import { SocialLink } from "@/types/editorTypes";

// Social link utilities
export function isValidSocialLink(link: SocialLink): boolean {
  return (
    typeof link.id === 'string' &&
    link.id.length > 0 &&
    typeof link.name === 'string' &&
    link.name.length > 0 &&
    typeof link.url === 'string' &&
    isValidUrl(link.url)
  );
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return url;
  }
}

export function sortSocialLinks(links: SocialLink[]): SocialLink[] {
  return [...links].sort((a, b) => a.name.localeCompare(b.name));
}

// Popular social platforms for validation/suggestions
export const POPULAR_PLATFORMS = [
  'twitter',
  'instagram', 
  'facebook',
  'linkedin',
  'youtube',
  'tiktok',
  'github',
  'discord',
  'twitch',
  'spotify'
] as const;

export function isPlatformSupported(platform: string): boolean {
  return POPULAR_PLATFORMS.includes(platform.toLowerCase() as any);
}