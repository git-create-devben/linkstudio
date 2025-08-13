import { z } from "zod";

// Common validation schemas
export const emailSchema = z.string().email("Invalid email address");
export const passwordSchema = z.string().min(8, "Password must be at least 8 characters");
export const usernameSchema = z.string().min(3, "Username must be at least 3 characters").max(20, "Username must be less than 20 characters");

// Form validation schemas
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: z.string().min(1, "Full name is required"),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const profileSchema = z.object({
  displayName: z.string().min(1, "Display name is required"),
  bio: z.string().max(160, "Bio must be less than 160 characters"),
  profileImage: z.string().url().optional(),
});

// URL validation
export const urlSchema = z.string().url("Invalid URL format");

// Social link validation
export const socialLinkSchema = z.object({
  name: z.string().min(1, "Platform name is required"),
  url: urlSchema,
});

// Validation helper functions
export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function validatePassword(password: string): boolean {
  return passwordSchema.safeParse(password).success;
}

export function validateUrl(url: string): boolean {
  return urlSchema.safeParse(url).success;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}