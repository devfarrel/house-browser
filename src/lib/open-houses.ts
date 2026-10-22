import { openHouseRules } from "@/data/open-houses";
import type { Listing, OpenHouseSlot, Weekday } from "@/types/listing";

const WEEKDAYS: Weekday[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_MS = 86_400_000;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

/** Next occurrence of each weekly rule, soonest first. Sold and pending homes have none. */
export function getOpenHouses(
  listing: Pick<Listing, "id" | "status">,
  today: Date = new Date(),
): OpenHouseSlot[] {
  if (listing.status !== "for-sale") return [];

  const rules = openHouseRules[listing.id] ?? [];
  const start = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  const todayIndex = new Date(start).getUTCDay();

  return rules
    .map((rule) => {
      const daysAhead = (WEEKDAYS.indexOf(rule.day) - todayIndex + 7) % 7;
      const time = start + daysAhead * DAY_MS;
      return { time, slot: { ...rule, date: dateFormatter.format(time) } };
    })
    .sort((a, b) => a.time - b.time)
    .map(({ slot }) => slot);
}
