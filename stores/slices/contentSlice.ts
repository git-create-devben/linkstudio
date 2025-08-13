// Content-related utilities and types
import defaultImage from "@/public/Devben Portfolio.webp";

export type ContentType = {
  coverImage: string | null;
  id: string;
  profileId: string;
  profilePicture: string;
  profileName: string;
  profileBio: string;
  profileVerified: boolean;
};

export const defaultContent: ContentType = {
  id: "",
  profileId: "",
  profileName: "Ben",
  profileBio: "Content Creator",
  profilePicture: defaultImage.src,
  coverImage: null,
  profileVerified: false,
};

// Content validation utilities
export function isValidProfileName(name: string): boolean {
  return name.length > 0 && name.length <= 50;
}

export function isValidBio(bio: string): boolean {
  return bio.length <= 160;
}

export function isValidImageUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}