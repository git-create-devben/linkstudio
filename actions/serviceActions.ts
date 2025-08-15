"use server";

import prisma from "@/lib/prismaClient";
import { getUser } from "./authActions";
import { revalidatePath } from "next/cache";

async function getProfile() {
  const user = await getUser();
  if (!user?.profile?.id) {
    throw new Error("Profile not found. User may not be logged in.");
  }
  return user.profile;
}

export interface ServiceConfig {
  serviceName: string;
  serviceImage?: string;
  description?: string;
  bookingUrl: string;
  // Optional additional details
  schedule?: string;
  location?: string;
  coupon?: string;
  price?: string;
  duration?: string;
  // UI preferences
  showAdditionalDetails?: boolean;
  isCollapsible?: boolean;
  additionalDetailsExpanded?: boolean;
}

export async function createServiceAction(serviceData: {
  config: ServiceConfig;
  order: number;
}) {
  const profile = await getProfile();
  
  const newAction = await prisma.actionItem.create({
    data: {
      profileId: profile.id,
      type: "SERVICE_BOOKING",
      config: serviceData.config,
      order: serviceData.order,
    },
  });
  
  revalidatePath(`/${profile.displayName}`);
  return newAction;
}

export async function updateServiceAction(id: string, config: ServiceConfig) {
  const profile = await getProfile();
  
  // Verify the action belongs to the user
  const actionToUpdate = await prisma.actionItem.findUnique({ 
    where: { id },
    select: { profileId: true }
  });
  
  if (actionToUpdate?.profileId !== profile.id) {
    throw new Error("Unauthorized");
  }
  
  const updatedAction = await prisma.actionItem.update({
    where: { id },
    data: { config },
  });
  
  revalidatePath(`/${profile.displayName}`);
  return updatedAction;
}

export async function deleteServiceAction(id: string) {
  const profile = await getProfile();
  
  // Verify the action belongs to the user
  const actionToDelete = await prisma.actionItem.findUnique({ 
    where: { id },
    select: { profileId: true }
  });
  
  if (actionToDelete?.profileId !== profile.id) {
    throw new Error("Unauthorized");
  }
  
  await prisma.actionItem.delete({ where: { id } });
  
  revalidatePath(`/${profile.displayName}`);
  return { success: true };
}

export async function getServiceActions() {
  const profile = await getProfile();
  
  const serviceActions = await prisma.actionItem.findMany({
    where: { 
      profileId: profile.id,
      type: "SERVICE_BOOKING"
    },
    orderBy: { order: 'asc' }
  });
  
  return serviceActions;
}