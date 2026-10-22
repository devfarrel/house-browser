import { notFound } from "next/navigation";
import { getListingById, getAllListingIds } from "@/lib/get-listing";
import { ListingDetailContent } from "@/components/listings/listing-detail-content";
import { getAgentById } from "@/lib/get-agent";
import { Metadata } from "next";

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllListingIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    return { title: "Listing not found" };
  }

  const price = `$${listing.price.toLocaleString("en-US")}`;
  const summary = `${listing.beds} bed, ${listing.baths} bath ${listing.type.toLowerCase()} in ${listing.city}`;
  const description = `${price} · ${summary}. ${listing.description}`.slice(
    0,
    160,
  );

  return {
    title: `${listing.title} · ${price}`,
    description,
    openGraph: {
      title: `${listing.title} · ${price}`,
      description,
      images: [{ url: listing.images[0], alt: listing.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${listing.title} · ${price}`,
      description,
      images: [listing.images[0]],
    },
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListingById(id);

  if (!listing) {
    notFound();
  }

  const agent = getAgentById(listing.agentId);

  if (!agent) {
    throw new Error(
      `Listing ${listing.id} references unknown agent ${listing.agentId}`,
    );
  }

  return (
    <div className="mx-auto p-4 sm:p-6">
      <ListingDetailContent listing={listing} agent={agent} />
    </div>
  );
}
