import { NextRequest, NextResponse } from 'next/server';
import { getFullUserProfile } from '@/actions/userActions';

export async function GET(request: NextRequest) {
  try {
    const profile = await getFullUserProfile();
    
    return NextResponse.json({
      success: true,
      templateId: profile?.templateId || null,
      hasProfile: !!profile,
      profileId: profile?.id || null,
      design: profile?.design || null,
      content: profile?.content || null,
    });
  } catch (error) {
    console.error('Error fetching profile for debug:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      templateId: null,
    });
  }
}