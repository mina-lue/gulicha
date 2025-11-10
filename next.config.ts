import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  // Add your normal Next.js config here
   images: {
    domains: ['images.pexels.com'], // ✅ add any external image hosts here remotePatterns: [new URL('https://images.pexels.com/**')],
  },
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
