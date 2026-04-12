import { createClient } from "@supabase/supabase-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _supabaseAdmin: ReturnType<typeof createClient<any>> | null = null;

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _supabaseAdmin = createClient<any>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_DEFAULT_KEY!
    );
  }
  return _supabaseAdmin;
}
