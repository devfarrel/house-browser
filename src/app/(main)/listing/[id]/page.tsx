import { notFound } from "next/navigation";
import { getListingById, getAllListingIds } from "@/lib/get-listing";
import { ListingDetailOverlay } from "@/components/listings/listing-detail-overlay";

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

  return <ListingDetailOverlay listing={listing} />;
}
