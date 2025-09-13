import { createBrowserClient } from "@supabase/ssr"

// عميل Supabase للمتصفح
export function createClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// أنواع البيانات
export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Fortress {
  id: string
  name: string
  description?: string
  color: string
  icon: string
  created_at: string
}

export interface Activity {
  id: string
  user_id: string
  fortress_id: string
  title: string
  description?: string
  surah_name?: string
  ayah_from?: number
  ayah_to?: number
  activity_type: "memorization" | "review" | "recitation"
  status: "pending" | "in_progress" | "completed"
  difficulty_level: number
  estimated_duration?: number
  actual_duration?: number
  notes?: string
  completed_at?: string
  created_at: string
  updated_at: string
}

export interface DailyStat {
  id: string
  user_id: string
  date: string
  total_activities: number
  completed_activities: number
  total_duration: number
  memorization_count: number
  review_count: number
  recitation_count: number
  created_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  theme: "light" | "dark" | "auto"
  language: "ar" | "en"
  font_size: "small" | "medium" | "large"
  notifications_enabled: boolean
  daily_goal: number
  preferred_reciter?: string
  mushaf_type: string
  created_at: string
  updated_at: string
}
