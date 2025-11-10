import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Default locale if none is provided
  const resolvedLocale = locale ?? 'en';

  return {
    locale: resolvedLocale,
    defaultLocale: 'en',
    messages: (await import(`./messages/${resolvedLocale}.json`)).default,
  };
});
