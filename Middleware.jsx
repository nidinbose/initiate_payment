import { NextResponse } from 'next/server';


const ALLOWED_ORIGIN = 'https://initiate-payment-gamma.vercel.app';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api')) {
    const origin = request.headers.get('origin') || request.headers.get('referer');

    if (!origin || !origin.startsWith(ALLOWED_ORIGIN)) {
      return NextResponse.json(
        { success: false, message: 'Access denied: Invalid origin' },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};