import { createClient } from "@supabase/supabase-js";

// External Supabase project (not Lovable Cloud).
// The publishable/anon key is safe to expose to the browser.
// Security must be enforced via RLS policies in the Supabase dashboard.
const SUPABASE_URL = "https://kpvswztlcocvmxwuuuip.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_UttWEK3QtoGxNIuUy2xEKA_v3rEaNTX";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
