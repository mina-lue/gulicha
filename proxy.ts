import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['en', 'am'];
const defaultLocale = 'am';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore API routes, _next, and public assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Already has a locale
  const hasLocale = locales.some((locale) => pathname.startsWith(`/${locale}`));
  if (hasLocale) return;

  // Otherwise redirect to default locale
  const locale = defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}
