'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'Amharic' },
];

export default function Navbar() {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Get current locale from path (e.g., /en/... or /am/...)
  const currentLocale = pathname.split('/')[1] || 'en';
  const { theme, toggleTheme } = useTheme();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    const restOfPath = pathname.replace(`/${currentLocale}`, '');
    router.push(`/${newLocale}${restOfPath}`);
  };

  return (
    <nav className="w-full bg-gray-100 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href={`/${currentLocale}`} className="flex items-center gap-2">
        {/* Logo 
          <Image
            src="/logo.png"
            alt="Gulicha Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          */}
          <span className="font-semibold text-lg text-gray-800">
            {t("title")}
          </span>
         </Link> 

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
            {!pathname.startsWith(`/${currentLocale}/admin`) && <Link
            href={`/${currentLocale}/admin/login`}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            {t('login')}
          </Link>}
          <Link
            href={`/${currentLocale}/contact`}
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            {t('contact')}
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>

          <div className="relative">
            <select
              value={currentLocale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.75h16.5M3.75 12h16.5m-16.5 6.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-sm">
          <div className="flex flex-col px-6 py-3 space-y-2">
            <Link
              href={`/${currentLocale}/contact`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-indigo-600 font-medium"
            >
              {t('contact')}
            </Link>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-600" />
              <select
                value={currentLocale}
                onChange={(e) => {
                  handleLocaleChange(e.target.value);
                  setMenuOpen(false);
                }}
                className="bg-gray-100 border border-gray-300 rounded-md px-2 py-1 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
