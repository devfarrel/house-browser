"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Listing } from "@/types/listing";
import { BrowseView } from "@/components/browse-view";
import { ListingDetailContent } from "@/components/listings/listing-detail-content";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ListingDetailOverlay({ listing }: { listing: Listing }) {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <BrowseView />

      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!next) handleClose();
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="w-full p-0 sm:max-w-3xl lg:max-w-5xl"
        >
          <DialogTitle className="sr-only">{listing.title}</DialogTitle>
          <div className="max-h-[90vh] overflow-y-auto">
            <ListingDetailContent listing={listing} onClose={handleClose} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
