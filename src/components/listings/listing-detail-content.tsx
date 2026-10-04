import { Listing } from "@/types/listing";
import { PhotoGallery } from "@/components/listings/photo-gallery";
import { ListingsMapClient } from "@/components/map/listings-map-client";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Home, Ruler, Bath, Bed, Calendar, X } from "lucide-react";

const mockAgents = [
  { name: "Jordan Reyes", title: "Hearth Listing Agent" },
  { name: "Priya Patel", title: "Hearth Listing Agent" },
  { name: "Sam Okafor", title: "Hearth Listing Agent" },
];

function getMockAgent(id: string) {
  const index = Number(id) % mockAgents.length;
  return mockAgents[index];
}

function getMockOpenHouses(id: string) {
  const options = [
    [{ day: "Sat", date: "Oct 4", start: "11:00 AM", end: "1:00 PM" }],
    [
      { day: "Sat", date: "Oct 4", start: "11:00 AM", end: "1:00 PM" },
      { day: "Sun", date: "Oct 5", start: "1:00 PM", end: "3:00 PM" },
    ],
  ];
  return options[Number(id) % options.length];
}

interface ListingDetailContentProps {
  listing: Listing;
  onClose?: () => void;
}

export function ListingDetailContent({
  listing,
  onClose,
}: ListingDetailContentProps) {
  const agent = getMockAgent(listing.id);
  const openHouses = getMockOpenHouses(listing.id);
  const initials = agent.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div>
      <div className="relative">
        <PhotoGallery images={listing.images} alt={listing.title} />

        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="p-6">
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="flex flex-col gap-4 lg:col-span-3">
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Open house
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                {openHouses.map((slot, i) => (
                  <div
                    key={i}
                    className="flex h-20 w-32 flex-col items-center justify-center gap-0.5 rounded-lg border bg-muted text-center"
                  >
                    <span className="font-heading text-sm font-semibold">
                      {slot.day}, {slot.date}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {slot.start} - {slot.end}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-sm font-medium text-muted-foreground">
                Listed by
              </p>
              <div className="mt-3 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-sm text-muted-foreground">{agent.title}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
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
            <button className="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
              Contact agent
            </button>
          </div>
        </div>

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
              <span className="text-sm font-medium">{listing.baths} baths</span>
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
          <h2 className="font-heading mb-3 text-lg font-semibold">Location</h2>
          <div className="h-80 w-full">
            <ListingsMapClient listings={[listing]} />
          </div>
        </div>
      </div>
    </div>
  );
}
