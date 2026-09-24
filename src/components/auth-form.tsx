"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFavorites } from "@/lib/use-favorites";

interface AuthFormProps extends React.ComponentProps<"form"> {
  mode: "login" | "signup";
}

export function AuthForm({ mode, className, ...props }: AuthFormProps) {
  const router = useRouter();
  const { signInWithPassword, signUpWithPassword } = useFavorites();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = isLogin
      ? await signInWithPassword(email, password)
      : await signUpWithPassword(email, password);

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="font-heading text-2xl font-bold">
            {isLogin ? "Login to your account" : "Create an account"}
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            {isLogin
              ? "Enter your email below to login to your account"
              : "Enter your email below to create your account"}
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Field>
          <Button type="submit" disabled={loading}>
            {loading ? "Please wait…" : isLogin ? "Login" : "Sign up"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <a href="/signup" className="underline underline-offset-4">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </>
          )}
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
