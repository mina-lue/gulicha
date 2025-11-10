import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { i18n } from '@/i18n/config';

export default async function LocaleLayout({
  children,
  params: paramsPromise,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await paramsPromise;
  const { locale } = params;

  if (!i18n.locales.includes(locale)) notFound();

  // ✅ Load static JSON messages
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default;

  return (
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
  );
}
