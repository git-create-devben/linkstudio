"use server";
import  prisma  from "@/lib/prismaClient";
import { getUser } from "./authActions";

export async function incrementPageView(profileId: string) {
  if (!profileId) return;

  await prisma.profile.update({
    where: { id: profileId },
    data: {
      pageViews: {
        increment: 1,
      },
    },
  });
}

export async function incrementLinkClick(actionItemId: string) {
  if (!actionItemId) return;

  await prisma.actionItem.update({
    where: { id: actionItemId },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });
}

export async function getAnalyticsData() {
    const user = await getUser();
    if (!user?.profile) throw new Error("Profile not found.");
  
    const profile = await prisma.profile.findUnique({
      where: { id: user.profile.id },
      select: {
        pageViews: true,
      },
    });
  
    const actionItems = await prisma.actionItem.findMany({
      where: { profileId: user.profile.id },
      select: {
        id: true,
        config: true, // To get the title
        clicks: true,
      },
      orderBy: {
        clicks: 'desc',
      },
    });
  
    const totalLinkClicks = actionItems.reduce((sum, item) => sum + item.clicks, 0);
  
    return {
      pageViews: profile?.pageViews ?? 0,
      totalLinkClicks,
      links: actionItems.map(item => ({
          id: item.id,
          title: (item.config as any)?.title || 'Untitled List',
          clicks: item.clicks
      })),
    };
  }
  