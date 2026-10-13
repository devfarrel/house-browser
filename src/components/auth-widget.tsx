"use client";

import { LogIn, LogOut, Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/lib/use-favorites";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

interface AuthWidgetProps {
  variant?: "avatar" | "tab";
}

const tabClass =
  "flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 text-xs font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground";

export function AuthWidget({ variant = "avatar" }: AuthWidgetProps) {
  const { user, loading, signOut } = useFavorites();
  const isTab = variant === "tab";

  if (loading) {
    return isTab ? (
      <div className="flex flex-1 items-center justify-center">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    ) : (
      <Skeleton className="h-8 w-8 rounded-full" />
    );
  }

  if (!user) {
    return isTab ? (
      <Link href="/login" className={tabClass}>
        <LogIn className="h-5 w-5" />
        Sign in
      </Link>
    ) : (
      <Link href="/login" className="inline-block">
        <Button size="lg">Sign in</Button>
      </Link>
    );
  }

  const initials = user.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          isTab ? (
            <button className={tabClass}>
              <Avatar className="h-5 w-5">
                <AvatarFallback className="bg-primary text-[10px] text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              Account
            </button>
          ) : (
            <button className="flex cursor-pointer items-center gap-2 rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </button>
          )
        }
      />
      <DropdownMenuContent
        align="end"
        side={isTab ? "top" : "bottom"}
        className="w-56"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="truncate font-normal text-muted-foreground">
            {user.email}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={
              <Link href="/favorites">
                <Heart className="mr-2 h-4 w-4" />
                My Favorites
              </Link>
            }
          />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
