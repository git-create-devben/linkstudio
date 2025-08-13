'use server';

import  prisma  from '@/lib/prismaClient';
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
    // Import template data and defaults
    const { templates } = await import('@/components/template/templateData');
    const { getTemplateDefaults } = await import('@/components/template/templateDefault');
    
    const templateData = templates.find(t => t.id === templateId);
    const templateDefaults = getTemplateDefaults(templateId);
    
    if (!templateData) {
      throw new Error('Template not found');
    }

    // Check if the template exists in DB
    let template = await prisma.template.findUnique({
      where: { id: templateId },
    });

    // If template doesn't exist, create one
    if (!template) {
      template = await prisma.template.create({
        data: {
          id: templateId,
          name: templateData.name,
          description: templateData.description,
        },
      });
    }

    // Get or create profile
    let profile = await prisma.profile.findUnique({
      where: { userId },
      include: { content: true, design: true }
    });

    if (!profile) {
      // Create profile with template data
      profile = await prisma.profile.create({
        data: {
          userId,
          templateId: template.id,
          content: {
            create: {
              profileName: templateDefaults.content.profileName,
              profileBio: templateDefaults.content.profileBio,
              profileVerified: templateDefaults.content.profileVerified,
            }
          },
          design: {
            create: {
              theme: templateDefaults.design.theme,
              font: templateDefaults.design.font,
              buttonColor: templateDefaults.design.buttonColor,
              buttonTextColor: templateDefaults.design.buttonTextColor,
              buttonStyle: templateDefaults.design.buttonStyle,
              customBackground: templateDefaults.design.customBackground,
              bannerType: templateDefaults.design.bannerType,
              curveShape: templateDefaults.design.curveShape,
              curveColor: templateDefaults.design.curveColor,
              curveAnimated: templateDefaults.design.curveAnimated,
            }
          }
        },
        include: { content: true, design: true }
      });
    } else {
      // Update existing profile with template data
      await prisma.profile.update({
        where: { userId },
        data: {
          templateId: template.id,
          content: {
            upsert: {
              create: {
                profileName: templateDefaults.content.profileName,
                profileBio: templateDefaults.content.profileBio,
                profileVerified: templateDefaults.content.profileVerified,
              },
              update: {
                profileName: templateDefaults.content.profileName,
                profileBio: templateDefaults.content.profileBio,
                profileVerified: templateDefaults.content.profileVerified,
              }
            }
          },
          design: {
            upsert: {
              create: {
                theme: templateDefaults.design.theme,
                font: templateDefaults.design.font,
                buttonColor: templateDefaults.design.buttonColor,
                buttonTextColor: templateDefaults.design.buttonTextColor,
                buttonStyle: templateDefaults.design.buttonStyle,
                customBackground: templateDefaults.design.customBackground,
                bannerType: templateDefaults.design.bannerType,
                curveShape: templateDefaults.design.curveShape,
                curveColor: templateDefaults.design.curveColor,
                curveAnimated: templateDefaults.design.curveAnimated,
              },
              update: {
                theme: templateDefaults.design.theme,
                font: templateDefaults.design.font,
                buttonColor: templateDefaults.design.buttonColor,
                buttonTextColor: templateDefaults.design.buttonTextColor,
                buttonStyle: templateDefaults.design.buttonStyle,
                customBackground: templateDefaults.design.customBackground,
                bannerType: templateDefaults.design.bannerType,
                curveShape: templateDefaults.design.curveShape,
                curveColor: templateDefaults.design.curveColor,
                curveAnimated: templateDefaults.design.curveAnimated,
              }
            }
          }
        }
      });
    }

    // Create default actions for the template
    if (templateDefaults.actionItems && templateDefaults.actionItems.length > 0) {
      // First, delete existing actions
      await prisma.actionItem.deleteMany({
        where: { profileId: profile.id }
      });

      // Create new actions from template defaults
      for (let i = 0; i < templateDefaults.actionItems.length; i++) {
        const action = templateDefaults.actionItems[i];
        await prisma.actionItem.create({
          data: {
            profileId: profile.id,
            type: action.type,
            config: action.config,
            order: action.order || i,
          }
        });
      }
    }

    // Update onboarding status
    await updateOnboardingStatus(supabaseId, 3);

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