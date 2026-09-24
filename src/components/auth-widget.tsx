"use client";

import { useState } from "react";
import { LogOut, Heart } from "lucide-react";
import Link from "next/link";
import { useFavorites } from "@/lib/use-favorites";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function AuthWidget() {
  const { user, loading, signUpWithPassword, signInWithPassword, signOut } =
    useFavorites();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) return null;

  if (!user) {
    if (sent) {
      return <p className="text-sm text-muted-foreground">Check your email.</p>;
    }

    return (
      <Button size="sm">
        <Link href="/login">Sign in</Link>
      </Button>
    );
  }

  const initials = user.email?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="flex items-center gap-2 rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="truncate font-normal text-muted-foreground">
          {user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/favorites">
            <Heart className="mr-2 h-4 w-4" />
            My Favorites
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
