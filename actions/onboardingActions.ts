'use server';

import { prisma } from '@/lib/prismaClient';
import { createClient } from '@/lib/supabase/client';

export async function saveUserGoal(userId: string, goal: string) {
    try {
        await prisma.user.update({
            where: {
                supabaseId: userId,
            },
            data: {
                goal,
                onboardingStep:2,
            },
        });

        return { success: true };
    } catch (error) {
        return { success: false, message: 'Failed to save goal, please try again' };
    }
}

export async function saveUserTemplate(userId: string, template: string) {
    try {
        await prisma.user.update({
            where: {
                supabaseId: userId,
            },
            data: {
                template,
                onboardingStep:3,
            },
        });

        return { success: true };
    } catch (error) {
        return { success: false, message: 'Failed to get template' };
    }
}

export async function saveUserPlatform(userId: string, platforms: string[]) {
    try {
        await prisma.user.update({
            where: {
                supabaseId: userId,
            },
            data: {
                platforms,
                onboardingStep:4,
            },
        });

        return { success: true };
    } catch (error) {
        return { success: false, message: 'Failed to get template, please try again' };
    }
}

export async function saveUserLinks(userId: string, links: string[]) {
    console.log('userId:', userId);
    console.log('links:', links);
    const filteredLinks = links.filter(link => link.trim() !== '');
    try {
        await prisma.user.update({
            where: {
                supabaseId: userId,
            },
            data: {
                web: filteredLinks,

            },
        });

        return { success: true };
    } catch (error) {
        console.log(JSON.stringify(error));
        return { success: false, message: error };
    }
}



export async function saveUserProfile(
    userId: string,
    bio: string,
    displayName: string,
    profileImage: File | null
) {
    console.log('profileImage:', profileImage);

    try {
        let profileImageUrl: string | undefined;

        if (profileImage && profileImage.size > 0) {
            // Try uploading image; throw if fails
            profileImageUrl = await uploadImage(profileImage);
            if (!profileImageUrl) throw new Error('Image upload failed, no URL returned');
        }

        // Only proceed to update if no image or a valid image URL is returned
        await prisma.user.update({
            where: {
                supabaseId: userId,
            },
            data: {
                bio,
                displayName,
                ...(profileImageUrl && { profileImageUrl }), 
                onboardingCompleted: true, 
            },
        });

        return { success: true };
    } catch (error) {
        console.error('Error saving profile:', error);
        return { success: false, message: 'Failed to save profile, please try again' };
    }
}

const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('profilepicture')
        .upload(filePath, file);

    if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error('Failed to upload image, please try again');
    }

    const { data } = supabase.storage
        .from('profilePicture')
        .getPublicUrl(filePath);

    if (!data?.publicUrl) {
        throw new Error('Public URL generation failed');
    }

    return data.publicUrl;
};

export async function updateOnboardingStatus(userId: string, currentStep: number, isComplete: boolean = false) {
    try {
      await prisma.user.update({
        where: {
          supabaseId: userId,
        },
        data: {
          onboardingStep: currentStep,
          onboardingCompleted: isComplete,
        },
      });
  
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to update onboarding status' };
    }
  }

  export async function fetchOnboardingStatus(userId: string): Promise<{
    onboardingStep: number;
    onboardingCompleted: boolean;
  }> {
    try {
      const user = await prisma.user.findUnique({
        where: { supabaseId: userId },
        select: {
          onboardingStep: true,
          onboardingCompleted: true,
        },
      });
  
      return {
        onboardingStep: user?.onboardingStep ?? 0,
        onboardingCompleted: user?.onboardingCompleted ?? false,
      };
    } catch (error) {
      return {
        onboardingStep: 0,
        onboardingCompleted: false,
      };
    }
  }