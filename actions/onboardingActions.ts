'use server';

import { prisma } from '@/lib/prismaClient';
import { createClient } from '@/lib/supabase/server';
import { getUserId } from './userActions';

export async function saveUserGoal(userId: string, goal: string) {
  try {
    await prisma.user.update({
      where: {
        supabaseId: userId,
      },
      data: {
        goal,
      },
    });

    await updateOnboardingStatus(userId, 4);

    return { success: true };
  } catch (error) {
    console.error('Failed to save goal:', error);
    return { success: false, message: 'Failed to save goal, please try again' };
  }
}


export async function saveUserTemplate(supabaseId: string, templateId: string) {
  const userId = await getUserId(supabaseId);
  if (!userId) throw new Error('No user found for supabaseId');

  try {
    // Check if the template exists
    let template = await prisma.template.findUnique({
      where: { id: templateId },
    });

    // If template doesn't exist, create one
    if (!template) {
      template = await prisma.template.create({
        data: {
          id: templateId,
          name: 'Untitled',
        },
      });
    }

    // Now update the profile with the template
    await prisma.profile.update({
      where: {
        userId: userId,
      },
      data: {
        templateId: template.id,
      },
    });

    // Update onboarding status
    await updateOnboardingStatus(userId, 3);

    return { success: true };
  } catch (error) {
    console.error('Failed to save template:', error);
    return { success: false, message: 'Failed to save template' };
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
      },
    });

    await updateOnboardingStatus(userId, 5);

    return { success: true };
  } catch (error) {
    console.error('Failed to save platforms:', error);
    return { success: false, message: 'Failed to save platforms, please try again' };
  }
}


// export async function saveUserLinks(userId: string, links: string[]) {
//     console.log('userId:', userId);
//     console.log('links:', links);
//     const filteredLinks = links.filter(link => link.trim() !== '');
//     try {
//         await prisma.user.update({
//             where: {
//                 supabaseId: userId,
//             },
//             data: {
//                 web: filteredLinks,

//             },
//         });

//         return { success: true };
//     } catch (error) {
//         console.log(JSON.stringify(error));
//         return { success: false, message: error };
//     }
// }



export async function saveUserProfile(
  supabaseId: string,
  bio: string,
  displayName: string,
  profileImage: File | null
) {
  try {
    let profileImageUrl: string | undefined;

    if (profileImage && profileImage.size > 0) {
      profileImageUrl = await uploadImage(profileImage);
      if (!profileImageUrl) throw new Error('Image upload failed, no URL returned');
    }

    //   get userId using supabaseId
    const userId = await getUserId(supabaseId)
    if (!userId) throw new Error('No user found for supabaseId')

    // First, check if profile exists for this user
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    // If no profile exists, create it first
    if (!existingProfile) {
      await prisma.profile.create({
        data: {
          userId,
          bio,
          displayName,
          ...(profileImageUrl && { profileImageUrl }),
          content: {
            create: {
              profileBio: bio,
              profileName: displayName,
            },
          },
        },
      });
    } else {
      // If it exists, update + upsert content
      await prisma.profile.update({
        where: { userId },
        data: {
          bio,
          displayName,
          ...(profileImageUrl && { profileImageUrl }),
          content: {
            upsert: {
              create: {
                profileBio: bio,
                profileName: displayName,
              },
              update: {
                profileBio: bio,
                profileName: displayName,
              },
            },
          },
        },
      });
    }

    await updateOnboardingStatus(userId, 2, true);

    return { success: true };
  } catch (error) {
    console.error('Error saving profile:', JSON.stringify(error));
    return { success: false, message: 'Failed to save profile, please try again' };
  }
}

const uploadImage = async (file: File): Promise<string> => {
  const supabase = await createClient();
  // const fileExt = file.name.split('.').pop();
  // const fileName = `${Math.random()}.${fileExt}`;
  const { data: { user } } = await supabase.auth.getUser()
  // const filePath = `${fileName}`;

  const filePath = `profilepicture/${user?.id}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage.from('profilepicture').upload(filePath, file);
  if (uploadError) throw new Error(uploadError.message);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    throw new Error('Failed to upload image, please try again');
  }

  const { data: { publicUrl } } = supabase.storage.from('profilepicture').getPublicUrl(filePath);
  console.log("publick url", publicUrl)

  if (!publicUrl) {
    throw new Error('Public URL generation failed');
  }

  return publicUrl;
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