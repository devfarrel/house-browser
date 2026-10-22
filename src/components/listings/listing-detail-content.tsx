"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  Bed,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  DollarSign,
  Heart,
  Home,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Ruler,
  Share2,
  ShieldCheck,
} from "lucide-react";
import type { Listing } from "@/types/listing";
import type { Agent } from "@/types/listing";
import { formatAddress } from "@/lib/format-adress";
import { PhotoGallery } from "@/components/listings/photo-gallery";
import { ListingsMapClient } from "@/components/map/listings-map-client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/use-favorites";

/* -------------------------------------------------------------------------- */
/*  Mock data                                                                 */
/* -------------------------------------------------------------------------- */

type OpenHouseSlot = {
  day: string;
  date: string;
  start: string;
  end: string;
};

function getMockOpenHouses(id: string): OpenHouseSlot[] {
  const options: OpenHouseSlot[][] = [
    [{ day: "Sat", date: "Oct 18", start: "11:00 AM", end: "1:00 PM" }],
    [
      { day: "Sat", date: "Oct 18", start: "11:00 AM", end: "1:00 PM" },
      { day: "Sun", date: "Oct 19", start: "1:00 PM", end: "3:00 PM" },
    ],
  ];
  return options[Math.abs(Number(id) || 0) % options.length];
}

const FULL_DAY: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

/* -------------------------------------------------------------------------- */
/*  Shared styles                                                             */
/* -------------------------------------------------------------------------- */

const DESCRIPTION_LIMIT = 280;

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// Links styled as buttons. A plain <a> keeps the markup valid (no <button>
// nested inside <a>) and doesn't depend on Button's asChild/render API.
const primaryLinkClass = `inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 ${linkFocus}`;
const secondaryLinkClass = `inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent hover:text-accent-foreground ${linkFocus}`;

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

interface ListingDetailContentProps {
  listing: Listing;
  agent: Agent;
}

export function ListingDetailContent({
  listing,
  agent,
}: ListingDetailContentProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavorites();

  const openHouses = getMockOpenHouses(listing.id);
  const favorite = favoriteIds.has(listing.id);

  const pricePerSqft =
    listing.sqft > 0 ? Math.round(listing.price / listing.sqft) : null;

  const initials = agent.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const fullAddress = formatAddress(listing);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

  const agentTel = agent.phone.replace(/[^\d+]/g, "");
  const mailtoSubject = encodeURIComponent(
    `Inquiry regarding ${listing.title} (${listing.address})`,
  );
  const mailtoBody = encodeURIComponent(
    `Hi ${agent.name},\n\nI am interested in scheduling a viewing for ${listing.title} located at ${listing.address} listed at $${listing.price.toLocaleString()}.\n\nCould you please let me know your availability?\n\nThank you!`,
  );
  const mailtoHref = `mailto:${agent.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const isLongDescription = listing.description.length > DESCRIPTION_LIMIT;

  const stats = [
    { icon: Bed, label: "Bedrooms", value: String(listing.beds) },
    { icon: Bath, label: "Bathrooms", value: String(listing.baths) },
    {
      icon: Ruler,
      label: "Living area",
      value: listing.sqft > 0 ? `${listing.sqft.toLocaleString()} sqft` : "—",
    },
    pricePerSqft
      ? {
          icon: DollarSign,
          label: "Price per sqft",
          value: `$${pricePerSqft.toLocaleString()}`,
        }
      : { icon: Home, label: "Property type", value: listing.type },
  ];

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/browse");
    }
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Fallback if clipboard API is restricted
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-28 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        {/* Action row */}
        <div className="flex items-center justify-between pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="-ml-2 flex cursor-pointer items-center gap-2 rounded-full text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to listings</span>
          </Button>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              aria-label="Copy link to this listing"
              className="flex cursor-pointer items-center gap-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-primary" />
                  <span aria-live="polite">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleFavorite(listing.id)}
              aria-pressed={favorite}
              className={`flex cursor-pointer items-center gap-1.5 rounded-full text-xs font-medium ${
                favorite
                  ? "text-primary hover:text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart
                className={`h-3.5 w-3.5 ${
                  favorite ? "fill-primary text-primary" : ""
                }`}
              />
              <span>{favorite ? "Saved" : "Save"}</span>
            </Button>
          </div>
        </div>

        {/* Gallery */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
          <PhotoGallery images={listing.images} alt={listing.title} />
        </div>

        {/* Content layout */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* ------------------------------ Left column ------------------------------ */}
          {/* Sections are separated by divide-y rules rather than boxed cards */}
          <div className="divide-y divide-border lg:col-span-8">
            {/* Headline */}
            <header className="pb-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant="secondary"
                  className="rounded-full px-3 py-1 font-semibold capitalize"
                >
                  {listing.type}
                </Badge>
                {openHouses.length > 0 && (
                  <Badge
                    variant="outline"
                    className="rounded-full border-primary/30 px-3 py-1 font-semibold text-primary"
                  >
                    Open house {openHouses[0].day}
                  </Badge>
                )}
              </div>

              <h1 className="font-heading mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {listing.title}
              </h1>

              <p className="mt-2 flex items-center gap-1.5 text-base text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>{fullAddress}</span>
              </p>

              {/* Price is in the sidebar on desktop; surface it up top on mobile */}
              <p className="font-heading mt-4 text-3xl font-bold tracking-tight text-foreground lg:hidden">
                ${listing.price.toLocaleString()}
              </p>
            </header>

            {/* Key facts */}
            <dl className="grid grid-cols-2 gap-x-4 gap-y-6 py-6 sm:grid-cols-4 sm:gap-x-0">
              {stats.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="sm:border-l sm:border-border sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon
                      className="h-3.5 w-3.5 text-primary"
                      aria-hidden="true"
                    />
                    {label}
                  </dt>
                  <dd className="font-heading mt-1 text-xl font-bold capitalize text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            {/* About */}
            <section className="py-8">
              <h2 className="font-heading text-xl font-bold text-foreground">
                About this home
              </h2>
              <p
                className={`mt-3 text-base leading-relaxed text-muted-foreground ${
                  isLongDescription && !expanded ? "line-clamp-4" : ""
                }`}
              >
                {listing.description}
              </p>
              {isLongDescription && (
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className={`mt-3 inline-flex cursor-pointer items-center gap-1 rounded-sm text-sm font-semibold text-primary hover:underline ${linkFocus}`}
                >
                  {expanded ? "Show less" : "Read more"}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      expanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              )}
            </section>

            {/* Open house */}
            {openHouses.length > 0 && (
              <section className="py-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Open house
                  </h2>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  No appointment needed. Drop in during the viewing windows
                  below.
                </p>

                <ul className="mt-4 divide-y divide-border">
                  {openHouses.map((slot) => (
                    <li
                      key={`${slot.date}-${slot.start}`}
                      className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="font-heading text-sm font-semibold text-foreground">
                        {FULL_DAY[slot.day] ?? slot.day}, {slot.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {slot.start} – {slot.end}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Location */}
            <section className="pt-8">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-heading text-xl font-bold text-foreground">
                    Location
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {fullAddress}
                  </p>
                </div>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-semibold text-primary hover:underline ${linkFocus}`}
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Get directions
                </a>
              </div>

              <div className="mt-5 h-72 w-full overflow-hidden rounded-xl sm:h-96">
                <ListingsMapClient listings={[listing]} />
              </div>
            </section>
          </div>

          {/* ------------------------------ Right column ----------------------------- */}
          {/* Top rule on mobile (sidebar stacks below), left rule on desktop */}
          <aside className="border-t border-border pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="lg:sticky lg:top-20">
              {/* Price + actions */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Listing price
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <p className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    ${listing.price.toLocaleString()}
                  </p>
                  {pricePerSqft && (
                    <span className="shrink-0 text-xs font-medium text-muted-foreground">
                      ${pricePerSqft.toLocaleString()}/sqft
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-2.5">
                  <a href={mailtoHref} className={`${primaryLinkClass} w-full`}>
                    <Mail className="h-4 w-4" />
                    Contact listing agent
                  </a>
                  <a
                    href={`tel:${agentTel}`}
                    className={`${secondaryLinkClass} w-full`}
                  >
                    <Phone className="h-4 w-4" />
                    Call {agent.name.split(" ")[0]}
                  </a>
                </div>
              </div>

              {/* Agent */}
              <div className="mt-8 border-t border-border pt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Listing representation
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-primary/10 font-heading text-base font-bold text-primary">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-heading truncate text-base font-bold text-foreground">
                      {agent.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {agent.title}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm">
                  <li>
                    <a
                      href={`tel:${agentTel}`}
                      className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-primary" />
                      <span>{agent.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={mailtoHref}
                      className="flex items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-primary" />
                      <span className="truncate">{agent.email}</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span>{listing.city} Regional Office</span>
                  </li>
                </ul>
              </div>

              <p className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Verified sample property data for Hearth
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile sticky CTA (the sidebar sits at the bottom of the page on small screens) */}
      <div className="fixed inset-x-0 bottom-16 z-1000 border-t border-border bg-background/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:bottom-0 lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <div className="min-w-0">
            <p className="font-heading text-lg font-bold leading-tight text-foreground">
              ${listing.price.toLocaleString()}
            </p>
            {pricePerSqft && (
              <p className="text-[11px] text-muted-foreground">
                ${pricePerSqft.toLocaleString()}/sqft
              </p>
            )}
          </div>
          <a href={mailtoHref} className={`${primaryLinkClass} flex-1`}>
            <Mail className="h-4 w-4" />
            Contact agent
          </a>
        </div>
      </div>
    </div>
  );
}
