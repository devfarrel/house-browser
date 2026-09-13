"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useFavorites() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const loadFavorites = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("favorites")
        .select("listing_id")
        .eq("user_id", userId);

      if (error) {
        console.error("Failed to load favorites:", error.message);
        return;
      }

      setFavoriteIds(new Set(data.map((row) => row.listing_id)));
    },
    [supabase],
  );

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) loadFavorites(data.user.id);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          loadFavorites(session.user.id);
        } else {
          setFavoriteIds(new Set());
        }
      },
    );

    return () => listener.subscription.unsubscribe();
  }, [supabase, loadFavorites]);

  const toggleFavorite = useCallback(
    async (listingId: string) => {
      if (!user) return;

      const isFavorited = favoriteIds.has(listingId);

      if (isFavorited) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("listing_id", listingId);

        if (error) {
          console.error("Failed to remove favorite:", error.message);
          return;
        }

        setFavoriteIds((prev) => {
          const next = new Set(prev);
          next.delete(listingId);
          return next;
        });
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, listing_id: listingId });

        if (error) {
          console.error("Failed to add favorite:", error.message);
          return;
        }

        setFavoriteIds((prev) => new Set(prev).add(listingId));
      }
    },
    [supabase, user, favoriteIds],
  );

  const signInWithEmail = useCallback(
    async (email: string) => {
      return supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });
    },
    [supabase],
  );

  const signOut = useCallback(() => supabase.auth.signOut(), [supabase]);

  return {
    user,
    loading,
    favoriteIds,
    toggleFavorite,
    signInWithEmail,
    signOut,
  };
}
