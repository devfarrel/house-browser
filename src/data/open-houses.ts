import type { OpenHouseRule } from "@/types/listing";

const SAT_MORNING: OpenHouseRule = {
  day: "Sat",
  start: "11:00 AM",
  end: "1:00 PM",
};
const SUN_AFTERNOON: OpenHouseRule = {
  day: "Sun",
  start: "1:00 PM",
  end: "3:00 PM",
};
const WED_EVENING: OpenHouseRule = {
  day: "Wed",
  start: "5:30 PM",
  end: "7:00 PM",
};

// Keyed by listing id. Listings without an entry have no open house.
export const openHouseRules: Record<string, OpenHouseRule[]> = {
  "1": [SAT_MORNING],
  "2": [SAT_MORNING, SUN_AFTERNOON],
  "3": [SUN_AFTERNOON],
  "4": [WED_EVENING],
  "6": [SAT_MORNING, SUN_AFTERNOON],
  "7": [SAT_MORNING],
  "9": [SUN_AFTERNOON],
  "11": [SAT_MORNING],
  "12": [SAT_MORNING, SUN_AFTERNOON],
  "14": [SUN_AFTERNOON],
  "16": [SAT_MORNING],
  "17": [WED_EVENING],
  "18": [SAT_MORNING, SUN_AFTERNOON],
  "21": [SAT_MORNING],
  "23": [SUN_AFTERNOON],
};
