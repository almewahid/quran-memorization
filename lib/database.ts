import { createClient } from "@/lib/supabase/server"
import { createClient as createBrowserClient } from "@/lib/supabase/client"

// وظائف قاعدة البيانات للخادم
export async function getUserActivities(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("activities")
    .select(`
      *,
      fortresses (
        name,
        color,
        icon
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

export async function getUserStats(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(30)

  if (error) throw error
  return data
}

export async function getFortresses() {
  const supabase = await createClient()

  const { data, error } = await supabase.from("fortresses").select("*").order("name")

  if (error) throw error
  return data
}

export async function getUserSettings(userId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId).single()

  if (error) throw error
  return data
}

// وظائف العميل للتفاعل المباشر
export function createActivity(activity: any) {
  const supabase = createBrowserClient()

  return supabase.from("activities").insert(activity)
}

export function updateActivity(id: string, updates: any) {
  const supabase = createBrowserClient()

  return supabase.from("activities").update(updates).eq("id", id)
}

export function deleteActivity(id: string) {
  const supabase = createBrowserClient()

  return supabase.from("activities").delete().eq("id", id)
}

export function updateUserSettings(userId: string, settings: any) {
  const supabase = createBrowserClient()

  return supabase.from("user_settings").update(settings).eq("user_id", userId)
}

export function markNotificationAsRead(id: string) {
  const supabase = createBrowserClient()

  return supabase.from("notifications").update({ is_read: true }).eq("id", id)
}
