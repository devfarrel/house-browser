"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { HouseType, ListingFilters } from "@/types/listing";

interface FilterBarProps {
  filters: ListingFilters;
  onChange: (filters: ListingFilters) => void;
}

const houseTypes: { value: HouseType | "all"; label: string }[] = [
  { value: "all", label: "All types" },
  { value: "House", label: "House" },
  { value: "Apartment", label: "Apartment" },
  { value: "Condo", label: "Condo" },
  { value: "Townhouse", label: "Townhouse" },
];

const bedOptions = [
  { value: "0", label: "Any beds" },
  { value: "1", label: "1+ beds" },
  { value: "2", label: "2+ beds" },
  { value: "3", label: "3+ beds" },
  { value: "4", label: "4+ beds" },
  { value: "5", label: "5+ beds" },
];

export function FilterBar({ filters, onChange }: FilterBarProps) {
  // No active filter -> null, so the trigger shows its placeholder.
  const typeValue = filters.type ?? null;
  const bedsValue = filters.minBeds ? String(filters.minBeds) : null;

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Search by city"
        value={filters.city ?? ""}
        onChange={(e) => onChange({ ...filters, city: e.target.value })}
        className="min-w-40 flex-1"
      />

      <Select
        items={houseTypes}
        value={typeValue}
        onValueChange={(value) =>
          onChange({
            ...filters,
            type: value && value !== "all" ? (value as HouseType) : undefined,
          })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Property type</SelectLabel>
            {houseTypes.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        items={bedOptions}
        value={bedsValue}
        onValueChange={(value) =>
          onChange({
            ...filters,
            minBeds: value && value !== "0" ? Number(value) : undefined,
          })
        }
      >
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Beds" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Bedrooms</SelectLabel>
            {bedOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Min price"
        value={filters.minPrice ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            minPrice: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="w-32"
      />
      <Input
        type="number"
        placeholder="Max price"
        value={filters.maxPrice ?? ""}
        onChange={(e) =>
          onChange({
            ...filters,
            maxPrice: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="w-32"
      />
    </div>
  );
}
