// Set these to the real number of files per category.
const COUNTS = { living: 8, kitchen: 7, bathroom: 6 } as const;

const pad = (n: number) => String(n).padStart(2, "0");

const pick = (
  prefix: keyof typeof COUNTS,
  listingIndex: number,
  shift: number,
) =>
  `/listings/${prefix}-${pad(((listingIndex + shift) % COUNTS[prefix]) + 1)}.jpg`;

/** Deterministic gallery: own exterior + one photo from each room pool. */
export function buildListingImages(listingIndex: number): string[] {
  return [
    `/listings/exterior-${pad(listingIndex + 1)}.jpg`,
    pick("living", listingIndex, 0),
    pick("kitchen", listingIndex, 2),
    pick("bathroom", listingIndex, 4),
  ];
}
