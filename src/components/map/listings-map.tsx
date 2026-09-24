"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { useRef } from "react";
import Link from "next/link";
import { Listing } from "@/types/listing";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";

// Leaflet's default marker icons reference image paths that break under
// bundlers like Webpack/Turbopack. Rebuilding the icon from a CDN avoids
// broken/missing marker images.
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitBounds({ listings }: { listings: Listing[] }) {
  const map = useMap();

  useEffect(() => {
    if (listings.length === 0) return;
    const bounds = L.latLngBounds(listings.map((l) => [l.lat, l.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [listings, map]);

  return null;
}

function FlyToSelected({
  listings,
  selectedListingId,
  markerRefs,
}: {
  listings: Listing[];
  selectedListingId?: string | null;
  markerRefs: React.RefObject<Record<string, L.Marker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!selectedListingId) return;
    const listing = listings.find((l) => l.id === selectedListingId);
    if (!listing) return;

    map.flyTo([listing.lat, listing.lng], 14, { duration: 0.8 });

    const handleMoveEnd = () => {
      markerRefs.current[selectedListingId]?.openPopup();
      map.off("moveend", handleMoveEnd);
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [selectedListingId, listings, map]);

  return null;
}

interface ListingsMapProps {
  listings: Listing[];
  activeListingId?: string | null;
  selectedListingId?: string | null;
  onMarkerHover?: (id: string | null) => void;
}

export function ListingsMap({
  listings,
  activeListingId,
  selectedListingId,
  onMarkerHover,
}: ListingsMapProps) {
  const center: [number, number] =
    listings.length > 0 ? [listings[0].lat, listings[0].lng] : [39.5, -98.35];

  const markerRefs = useRef<Record<string, L.Marker | null>>({});

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom
      className="h-full w-full rounded-xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds listings={listings} />
      <FlyToSelected
        listings={listings}
        selectedListingId={selectedListingId}
        markerRefs={markerRefs}
      />
      {listings.map((listing) => (
        <Marker
          key={listing.id}
          position={[listing.lat, listing.lng]}
          icon={defaultIcon}
          ref={(instance) => {
            markerRefs.current[listing.id] = instance;
          }}
          opacity={activeListingId && activeListingId !== listing.id ? 0.5 : 1}
          eventHandlers={{
            mouseover: () => onMarkerHover?.(listing.id),
            mouseout: () => onMarkerHover?.(null),
          }}
        >
          <Popup>
            <Link
              href={`/listing/${listing.id}`}
              className="block no-underline"
            >
              <div className="relative h-28 w-full overflow-hidden rounded-t-[inherit]">
                <Image
                  src={listing.imageUrl}
                  alt={listing.title}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
                <Badge
                  className="absolute left-1.5 top-1.5"
                  variant="secondary"
                >
                  {listing.type}
                </Badge>
              </div>
              <div className="space-y-1 p-3">
                <p className="m-0 font-heading text-base font-semibold text-foreground">
                  ${listing.price.toLocaleString()}
                </p>
                <p className="m-0 truncate text-xs text-muted-foreground">
                  {listing.title}
                </p>
                <p className="m-0 text-xs text-muted-foreground">
                  {listing.beds} bd · {listing.baths} ba · {listing.city}
                </p>
              </div>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
