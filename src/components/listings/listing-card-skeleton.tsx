import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ListingCardSkeleton() {
  return (
    <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0">
      <Skeleton className="aspect-video w-full rounded-none" />
      <CardHeader className="flex-1 gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
      <CardFooter className="pt-2">
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}
