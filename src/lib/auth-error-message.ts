import { isAuthRetryableFetchError } from "@supabase/supabase-js";

export function getAuthErrorMessage(error: { message: string }) {
  if (isAuthRetryableFetchError(error)) {
    return "Can't reach the server right now. Please try again in a moment.";
  }
  return error.message;
}
