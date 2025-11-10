'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Listing } from '@/lib/types';

interface Props {
  listing: Listing;
}

export default function ListingCard({ listing }: Props) {
  const t = useTranslations(); 

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Image
        src={listing.images[0]}
        alt={listing.title}
        width={400}
        height={250}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <h2 className="font-semibold text-lg">{listing.title}</h2>
        <p className="text-sm text-gray-500">{listing.location}</p>
        <p className="font-medium mt-2 text-indigo-600">
          {t('price')}: {listing.price.toLocaleString()} ETB
        </p>
        <span
          className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
            listing.status === 'available'
              ? 'bg-green-100 text-green-700'
              : listing.status === 'rented'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {t(listing.status)}
        </span>
      </div>
    </div>
  );
}
