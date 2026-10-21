const EXTERIOR_COUNT = 23;

// Set these to your real file counts (they should add up to 21).
const ROOM_COUNTS = { living: 8, kitchen: 9, bathroom: 4 } as const;

const pad = (n: number) => String(n).padStart(2, "0");

const pickRoom = (
  prefix: keyof typeof ROOM_COUNTS,
  listingIndex: number,
  shift: number,
) =>
  `/listings/${prefix}-${pad(((listingIndex + shift) % ROOM_COUNTS[prefix]) + 1)}.jpg`;

/**
 * Deterministic gallery for the listing at `listingIndex`:
 * its own exterior (wraps around, so listing 24 reuses exterior 1)
 * plus one photo from each room pool.
 */
export function buildListingImages(listingIndex: number): string[] {
  return [
    `/listings/exterior-${pad((listingIndex % EXTERIOR_COUNT) + 1)}.jpg`,
    pickRoom("living", listingIndex, 0),
    pickRoom("kitchen", listingIndex, 2),
    pickRoom("bathroom", listingIndex, 4),
  ];
}
