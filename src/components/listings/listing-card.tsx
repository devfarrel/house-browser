import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Listing } from "@/types/listing";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        </div>

        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{listing.type}</Badge>
          </CardAction>
          <CardTitle>${listing.price.toLocaleString()}</CardTitle>
          <CardDescription>
            {listing.title} · {listing.city} · {listing.beds} bd /{" "}
            {listing.baths} ba
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button className="w-full">View Details</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
