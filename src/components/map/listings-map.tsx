"use client";

import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import Image from "next/image";
import type { Listing } from "@/types/listing";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "../listings/status-badge";

/** Below this zoom level markers are small dots; at or above it they show the price. */
const PRICE_TAG_MIN_ZOOM = 12;

const compactPrice = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

function createMarkerIcon(
  label: string,
  showPrice: boolean,
  active: boolean,
  sold: boolean,
) {
  const base = showPrice ? "price-marker__tag" : "price-marker__dot";
  const modifiers = `${sold ? ` ${base}--sold` : ""}${active ? ` ${base}--active` : ""}`;
  return L.divIcon({
    className: "price-marker",
    html: `<span class="${base}${modifiers}">${showPrice ? label : ""}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, showPrice ? -16 : -10],
  });
}

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

    // The map is display:none on mobile list view, so it has no size and flyTo yields NaN.
    const { x, y } = map.getSize();
    if (x === 0 || y === 0) return;

    map.flyTo([listing.lat, listing.lng], 14, { duration: 0.8 });

    const handleMoveEnd = () => {
      markerRefs.current[selectedListingId]?.openPopup();
      map.off("moveend", handleMoveEnd);
    };

    map.on("moveend", handleMoveEnd);

    return () => {
      map.off("moveend", handleMoveEnd);
    };
  }, [selectedListingId, listings, map, markerRefs]);

  return null;
}

interface ListingMarkerProps {
  listing: Listing;
  showPrice: boolean;
  isActive: boolean;
  isDimmed: boolean;
  registerMarker: (id: string, marker: L.Marker | null) => void;
  onHover?: (id: string | null) => void;
}

function ListingMarker({
  listing,
  showPrice,
  isActive,
  isDimmed,
  registerMarker,
  onHover,
}: ListingMarkerProps) {
  const label = compactPrice.format(listing.price);

  const icon = useMemo(
    () =>
      createMarkerIcon(label, showPrice, isActive, listing.status === "sold"),
    [label, showPrice, isActive, listing.status],
  );

  return (
    <Marker
      position={[listing.lat, listing.lng]}
      icon={icon}
      title={`${listing.title}, ${label}`}
      zIndexOffset={isActive ? 1000 : 0}
      opacity={isDimmed ? 0.5 : 1}
      ref={(instance) => registerMarker(listing.id, instance)}
      eventHandlers={{
        mouseover: () => onHover?.(listing.id),
        mouseout: () => onHover?.(null),
      }}
    >
      <Popup>
        <Link href={`/listing/${listing.id}`} className="block no-underline">
          <div className="relative h-28 w-full overflow-hidden rounded-t-[inherit]">
            <Image
              src={listing.images[0]}
              alt={listing.title}
              fill
              sizes="220px"
              className="object-cover"
            />
            <div className="absolute left-1.5 top-1.5 flex gap-1">
              <Badge variant="secondary">{listing.type}</Badge>
              <StatusBadge status={listing.status} />
            </div>
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
  );
}

interface ListingMarkersProps {
  listings: Listing[];
  activeListingId?: string | null;
  selectedListingId?: string | null;
  registerMarker: (id: string, marker: L.Marker | null) => void;
  onMarkerHover?: (id: string | null) => void;
}

/** Lives inside <MapContainer> so it can follow the zoom level. */
function ListingMarkers({
  listings,
  activeListingId,
  selectedListingId,
  registerMarker,
  onMarkerHover,
}: ListingMarkersProps) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());

  useMapEvents({
    zoomend: () => setZoom(map.getZoom()),
  });

  const showPrice = zoom >= PRICE_TAG_MIN_ZOOM;

  return (
    <>
      {listings.map((listing) => (
        <ListingMarker
          key={listing.id}
          listing={listing}
          showPrice={showPrice}
          isActive={
            listing.id === activeListingId || listing.id === selectedListingId
          }
          isDimmed={Boolean(activeListingId) && activeListingId !== listing.id}
          registerMarker={registerMarker}
          onHover={onMarkerHover}
        />
      ))}
    </>
  );
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

  const registerMarker = useCallback((id: string, marker: L.Marker | null) => {
    markerRefs.current[id] = marker;
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom
      className="h-full w-full"
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
      <ListingMarkers
        listings={listings}
        activeListingId={activeListingId}
        selectedListingId={selectedListingId}
        registerMarker={registerMarker}
        onMarkerHover={onMarkerHover}
      />
    </MapContainer>
  );
}
