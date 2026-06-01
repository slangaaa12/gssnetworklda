import { NextResponse } from "next/server";

const locales = ['pt', 'en'];
const defaultLocale = 'pt';

function getLocale(request) {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) return cookieLocale;

  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage && acceptLanguage.includes('en')) {
    return 'en';
  }
  return defaultLocale;
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  const newPathname =
    pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(new URL(newPathname, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and public folder files
    '/((?!api|_next/static|_next/image|favicon.ico|logo\\.png|logo-horizontal\\.png|hero\\.png|hero_illustration_.*\\.png).*)',
  ],
}
