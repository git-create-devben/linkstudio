// In '/auth/callback/route.ts'

import { handleOAuthCallback } from '@/actions/authActions';
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=Authentication failed: No code provided.`);
  }
  

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    
    try {
      const { isNew } = await handleOAuthCallback(data.user);

      const redirectTo = isNew ? '/onboarding' : '/dashboard';
      
      return NextResponse.redirect(`${origin}${redirectTo}`);

    } catch (dbError) {
      console.error('❌ [CALLBACK_ROUTE] - Database processing ERROR:', dbError);
      return NextResponse.redirect(`${origin}/login?error=Could not process user data.`);
    }
  }

  // This part should ideally not be reached
  console.warn('⚠️ [CALLBACK_ROUTE] - Fallback: No user data after successful exchange. This should not happen.');
  return NextResponse.redirect(`${origin}/login?error=An unknown authentication error occurred.`);
}