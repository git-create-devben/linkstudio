import { NextRequest, NextResponse } from 'next/server';
import { incrementLinkClick } from '@/actions/analyticsActions';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const actionItemId = searchParams.get('actionId');
  const destinationUrl = searchParams.get('url');

  if (!actionItemId || !destinationUrl) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // Record the click in the background (don't wait for it to complete)
  incrementLinkClick(actionItemId);

  // Immediately redirect the user to the final destination
  return NextResponse.redirect(destinationUrl);
}