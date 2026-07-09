// External Supabase project (not Lovable Cloud).
// URL + publishable key are safe to expose to the browser.
// Security is enforced via RLS policies in the Supabase dashboard.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const SUPABASE_URL = "https://kpvswztlcocvmxwuuuip.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_UttWEK3QtoGxNIuUy2xEKA_v3rEaNTX";

function createSupabaseClient() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? window.localStorage : undefined,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

let _supabase: ReturnType<typeof createSupabaseClient> | undefined;

export const supabase = new Proxy({} as ReturnType<typeof createSupabaseClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
