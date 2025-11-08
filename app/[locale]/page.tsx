// app/[locale]/page.tsx
import { use } from 'react'; // 👈 New React hook for unwrapping promises

export default function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params); // 👈 Correct way per Next.js 16

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        {locale === 'en'
          ? 'Welcome to Gulicha Real Estate'
          : 'እንኳን ወደ ጉሊቻ የንብረት ፕላትፎርም በደህና መጡ'}
      </h1>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'am' }];
}
