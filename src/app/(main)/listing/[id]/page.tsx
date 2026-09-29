import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getListingById, getAllListingByIds } from "@/lib/get-listing";
import { Badge } from "@/components/ui/badge";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllListingByIds().map((id) => ({ id }));
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  return (
    <main className="mx-auto p-4 sm:p-6">
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Back to listings
      </Link>

      <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <Badge className="absolute left-3 top-3">{listing.type}</Badge>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold">{listing.title}</h1>
        <p className="text-muted-foreground">{listing.address}</p>
        <p className="text-2xl font-bold text-primary font-heading">
          ${listing.price.toLocaleString()}
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
          <span>{listing.sqft.toLocaleString()} sqft</span>
        </div>
        <p className="mt-4 leading-relaxed text-foreground">
          {listing.description}
        </p>
      </div>
    </main>
  );
}
