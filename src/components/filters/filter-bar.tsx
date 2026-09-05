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
import { HouseType, ListingFilters } from "@/types/listing";

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
  return (
    <div className="flex flex-wrap gap-3 rounded-xl border p-4">
      <Input
        placeholder="Search by city"
        value={filters.city ?? ""}
        onChange={(e) => onChange({ ...filters, city: e.target.value })}
        className="flex-1 sm:max-w-xs"
      />

      <Select
        value={filters.type ?? "all"}
        onValueChange={(value) =>
          onChange({ ...filters, type: value as HouseType | "all" })
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
        value={String(filters.minBeds ?? 0)}
        onValueChange={(value) =>
          onChange({ ...filters, minBeds: Number(value) })
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
