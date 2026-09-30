import { notFound } from "next/navigation";
import Link from "next/link";
import { getListingById, getAllListingIds } from "@/lib/get-listing";
import { PhotoGallery } from "@/components/listings/photo-gallery";
import { ListingsMapClient } from "@/components/map/listings-map-client";
import { Badge } from "@/components/ui/badge";
import { Home, Ruler, Bath, Bed } from "lucide-react";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllListingIds().map((id) => ({ id }));
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6">
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Back to listings
      </Link>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PhotoGallery images={listing.images} alt={listing.title} />

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">
              Property details
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium capitalize">
                  {listing.type}
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center">
                <Bed className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{listing.beds} beds</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center">
                <Bath className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {listing.baths} baths
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border p-3 text-center">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {listing.sqft.toLocaleString()} sqft
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">
              About this home
            </h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {listing.description}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="font-heading mb-3 text-lg font-semibold">
              Location
            </h2>
            <div className="h-80 w-full">
              <ListingsMapClient listings={[listing]} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="sticky top-20 rounded-xl border p-5">
            <Badge variant="secondary">{listing.type}</Badge>
            <p className="font-heading mt-2 text-3xl font-bold text-primary">
              ${listing.price.toLocaleString()}
            </p>
            <h1 className="font-heading mt-1 text-xl font-semibold">
              {listing.title}
            </h1>
            <p className="text-muted-foreground">{listing.address}</p>

            <div className="mt-4 flex gap-4 border-t pt-4 text-sm text-muted-foreground">
              <span>{listing.beds} beds</span>
              <span>{listing.baths} baths</span>
              <span>{listing.sqft.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
