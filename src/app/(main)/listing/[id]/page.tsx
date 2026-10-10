import { notFound } from "next/navigation";
import { getListingById, getAllListingIds } from "@/lib/get-listing";
import { ListingDetailContent } from "@/components/listings/listing-detail-content";

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
    <main className="mx-auto max-w-5xl p-4 sm:p-6">
      <ListingDetailContent listing={listing} />
    </main>
  );
}
