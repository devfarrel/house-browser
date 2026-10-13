"use client";

import { useState, type ReactNode } from "react";
import { List, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileView = "list" | "map";

interface SplitViewProps {
  list: ReactNode;
  map: ReactNode;
}

export function SplitView({ list, map }: SplitViewProps) {
  const [view, setView] = useState<MobileView>("list");

  return (
    <div className="flex h-[calc(100dvh-8rem)] md:h-[calc(100dvh-4rem)]">
      <div
        className={cn(
          "min-h-0 w-full flex-col lg:flex lg:w-1/2",
          view === "list" ? "flex" : "hidden",
        )}
      >
        {list}
      </div>

      <div
        className={cn(
          "h-full w-full lg:block lg:w-1/2 lg:p-4 lg:pl-0",
          view === "map" ? "block" : "hidden",
        )}
      >
        <div
          key={view}
          className="isolate h-full w-full overflow-hidden lg:rounded-xl lg:border lg:border-border"
        >
          {map}
        </div>
      </div>

      <div
        role="group"
        aria-label="View mode"
        className="fixed bottom-20 left-1/2 z-30 flex -translate-x-1/2 gap-1 rounded-full border border-border bg-background/95 p-1 shadow-lg backdrop-blur md:bottom-6 lg:hidden"
      >
        {(
          [
            { value: "list", label: "List", icon: List },
            { value: "map", label: "Map", icon: MapIcon },
          ] as const
        ).map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            aria-pressed={view === value}
            onClick={() => setView(value)}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              view === value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
