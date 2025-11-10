// app/[locale]/page.tsx
import { Listing } from "@/lib/types";
import { getListings } from "@/lib/api";
import ListingCard from "@/components/ListingCard";
import { getTranslations } from "next-intl/server";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const listings: Listing[] = await getListings();

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{t("siteTitle")}</h1>

      {listings.length === 0 ? (
        <p className="text-gray-600">{t("noListings")}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </main>
  );
}
