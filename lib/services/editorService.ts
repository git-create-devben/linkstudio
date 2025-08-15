// Editor service layer
import prisma from '@/lib/prismaClient';
import { createClient } from '@/lib/supabase/server';
import { AuthService } from './authService';
import { DesignType, ContentType, ActionItemType } from '@/stores/useContentStore';

export interface SaveAllData {
  design: DesignType;
  content: ContentType;
  actionItems: ActionItemType[];
  templateId: string;
}

export class EditorService {
  private static async getProfile() {
    const user = await AuthService.getCurrentUser();
    if (!user?.profile?.id) {
      throw new Error("Profile not found. User may not be logged in.");
    }
    return user.profile;
  }

  static async saveAll(data: SaveAllData) {
    const profile = await this.getProfile();

    const { id: designId, profileId: designProfileId, ...designData } = data.design as any;
    const { id: contentId, profileId: contentProfileId, ...contentData } = data.content as any;

    // Save Design
    await prisma.design.update({
      where: { profileId: profile.id },
      data: designData,
    });

    // Save Content
    await prisma.content.update({
      where: { profileId: profile.id },
      data: contentData,
    });

    // Save Action Items
    for (const item of data.actionItems) {
      if (item.id === "default" || item.id.startsWith("temp_")) {
        await prisma.actionItem.create({
          data: {
            profileId: profile.id,
            type: item.type,
            config: item.config,
            order: item.order,
          },
        });
      } else {
        await prisma.actionItem.update({
          where: { id: item.id },
          data: {
            config: item.config,
            order: item.order,
          },
        });
      }
    }

    // Save Template
    await prisma.profile.update({
      where: { id: profile.id },
      data: { templateId: data.templateId },
    });

    return { success: true };
  }

  static async uploadImage(file: File, type: 'cover' | 'profile') {
    const supabase = await createClient();
    const user = await AuthService.getCurrentUser();
    
    if (!user) {
      throw new Error("Unauthorized");
    }

    const bucket = type === 'cover' ? 'covers' : 'profilepicture';
    const filePath = `${bucket}/${user.id}/${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);
      
    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    // Update database
    const updateData = type === 'cover' 
      ? { coverImage: publicUrl }
      : { profilePicture: publicUrl };

    await prisma.content.update({
      where: { profileId: user.profile?.id },
      data: updateData
    });

    return publicUrl;
  }

  static async createSocialLink(data: { name: string; url: string }) {
    const user = await AuthService.getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    return await prisma.socialLinks.create({
      data: {
        userId: user.id,
        name: data.name,
        url: data.url,
      },
    });
  }

  static async updateSocialLink(id: string, newUrl: string) {
    return await prisma.socialLinks.update({
      where: { id },
      data: { url: newUrl },
    });
  }

  static async deleteSocialLink(id: string) {
    await prisma.socialLinks.delete({
      where: { id },
    });
    return { success: true };
  }

  static async getSocialLinks() {
    const user = await AuthService.getCurrentUser();
    if (!user) throw new Error("Unauthorized");

    return await prisma.socialLinks.findMany({
      where: { userId: user.id },
      orderBy: { id: "desc" },
    });
  }
}