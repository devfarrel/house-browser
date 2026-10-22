import { formatAddress } from "@/lib/format-address";
import type { Agent, Listing } from "@/types/listing";

export function getInquiryMailto(listing: Listing, agent: Agent) {
  const address = formatAddress(listing);
  const price = listing.price.toLocaleString("en-US");
  const subject = `Inquiry regarding ${listing.title} (${address})`;
  const body = `Hi ${agent.name},\n\nI am interested in scheduling a viewing for ${listing.title} located at ${address} listed at $${price}.\n\nCould you please let me know your availability?\n\nThank you!`;

  return `mailto:${agent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
