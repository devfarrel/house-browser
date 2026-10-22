import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ListingStatus } from "@/types/listing";

const config: Record<
  Exclude<ListingStatus, "for-sale">,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-primary text-primary-foreground",
  },
  sold: { label: "Sold", className: "bg-foreground text-background" },
};

export function StatusBadge({
  status,
  className,
}: {
  status: ListingStatus;
  className?: string;
}) {
  if (status === "for-sale") return null;
  const { label, className: tone } = config[status];
  return <Badge className={cn(tone, className)}>{label}</Badge>;
}
