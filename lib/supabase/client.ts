// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: true,        // ✅ يخزن الجلسة في localStorage
        autoRefreshToken: true,      // ✅ يجدد التوكين تلقائياً
        detectSessionInUrl: true,    // ✅ يلتقط التوكين من URL بعد OAuth
      },
    }
  )
}
