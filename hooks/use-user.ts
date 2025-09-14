"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  daily_goal: number
  created_at: string
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    // جلب المستخدم الحالي
    const getUser = async () => {
      try {
        console.log("[v0] جاري جلب بيانات المستخدم...")
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          console.log("[v0] خطأ في جلب المستخدم:", userError.message)
        }

        setUser(user)

        if (user) {
          try {
            console.log("[v0] جاري جلب الملف الشخصي للمستخدم:", user.id)
            const { data: profile, error: profileError } = await supabase
              .from("users")
              .select("*")
              .eq("id", user.id)
              .single()

            if (profileError) {
              console.log("[v0] خطأ في جلب الملف الشخصي:", profileError.message)
              const defaultProfile: UserProfile = {
                id: user.id,
                email: user.email || "",
                full_name: user.user_metadata?.full_name || null,
                avatar_url: user.user_metadata?.avatar_url || null,
                daily_goal: 30, // هدف افتراضي 30 دقيقة
                created_at: user.created_at,
              }
              setProfile(defaultProfile)
            } else {
              setProfile(profile)
            }
          } catch (error) {
            console.log("[v0] خطأ غير متوقع في جلب الملف الشخصي:", error)
            const defaultProfile: UserProfile = {
              id: user.id,
              email: user.email || "",
              full_name: user.user_metadata?.full_name || null,
              avatar_url: user.user_metadata?.avatar_url || null,
              daily_goal: 30,
              created_at: user.created_at,
            }
            setProfile(defaultProfile)
          }
        }
      } catch (error) {
        console.log("[v0] خطأ عام في getUser:", error)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // الاستماع لتغييرات المصادقة
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] تغيير حالة المصادقة:", event)
      setUser(session?.user ?? null)

      if (session?.user) {
        try {
          const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (profileError) {
            console.log("[v0] خطأ في جلب الملف الشخصي أثناء تغيير المصادقة:", profileError.message)
            const defaultProfile: UserProfile = {
              id: session.user.id,
              email: session.user.email || "",
              full_name: session.user.user_metadata?.full_name || null,
              avatar_url: session.user.user_metadata?.avatar_url || null,
              daily_goal: 30,
              created_at: session.user.created_at,
            }
            setProfile(defaultProfile)
          } else {
            setProfile(profile)
          }
        } catch (error) {
          console.log("[v0] خطأ غير متوقع في onAuthStateChange:", error)
          const defaultProfile: UserProfile = {
            id: session.user.id,
            email: session.user.email || "",
            full_name: session.user.user_metadata?.full_name || null,
            avatar_url: session.user.user_metadata?.avatar_url || null,
            daily_goal: 30,
            created_at: session.user.created_at,
          }
          setProfile(defaultProfile)
        }
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user, profile, loading }
}
