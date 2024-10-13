import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/', '/login', '/signup', '/verify/:email', '/cart'  , '/checkout'],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl.clone();

  if (token) {

    if (['/login', '/signup','/verify/:email'].includes(url.pathname)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  const restrictedPaths = ['/checkout', '/cart',];
  if (!token && restrictedPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}