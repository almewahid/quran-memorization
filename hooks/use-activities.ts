"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

interface Activity {
  id: string
  user_id: string
  fortress_id: string
  activity_type: "memorization" | "review" | "recitation"
  status: "pending" | "in_progress" | "completed" | "paused"
  start_time: string | null
  end_time: string | null
  duration_minutes: number | null
  notes: string | null
  created_at: string
  fortress: {
    name: string
    description: string
  }
}

interface Stats {
  totalActivities: number
  completedToday: number
  totalDuration: number
  weeklyProgress: number
}

export function useActivities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [stats, setStats] = useState<Stats>({
    totalActivities: 0,
    completedToday: 0,
    totalDuration: 0,
    weeklyProgress: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    const fetchData = async () => {
      try {
        console.log("[v0] جاري جلب بيانات الأنشطة...")
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          console.log("[v0] خطأ في جلب المستخدم للأنشطة:", userError.message)
          setLoading(false)
          return
        }

        if (!user) {
          console.log("[v0] لا يوجد مستخدم مسجل")
          setLoading(false)
          return
        }

        try {
          console.log("[v0] جاري جلب الأنشطة للمستخدم:", user.id)
          const { data: activities, error: activitiesError } = await supabase
            .from("activities")
            .select(`
              *,
              fortress:fortresses(name, description)
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(10)

          if (activitiesError) {
            console.log("[v0] خطأ في جلب الأنشطة:", activitiesError.message)
            setActivities([])
          } else {
            setActivities(activities || [])
          }

          try {
            console.log("[v0] جاري حساب الإحصائيات...")
            const { data: allActivities, error: statsError } = await supabase
              .from("activities")
              .select("*")
              .eq("user_id", user.id)

            if (statsError) {
              console.log("[v0] خطأ في جلب بيانات الإحصائيات:", statsError.message)
              setStats({
                totalActivities: 0,
                completedToday: 0,
                totalDuration: 0,
                weeklyProgress: 0,
              })
            } else if (allActivities) {
              const today = new Date().toISOString().split("T")[0]
              const completedToday = allActivities.filter(
                (activity) => activity.status === "completed" && activity.created_at.startsWith(today),
              ).length

              const totalDuration = allActivities
                .filter((activity) => activity.duration_minutes)
                .reduce((sum, activity) => sum + (activity.duration_minutes || 0), 0)

              // حساب التقدم الأسبوعي (مبسط)
              const weekStart = new Date()
              weekStart.setDate(weekStart.getDate() - 7)
              const weeklyActivities = allActivities.filter((activity) => new Date(activity.created_at) >= weekStart)

              setStats({
                totalActivities: allActivities.length,
                completedToday,
                totalDuration,
                weeklyProgress: Math.min((weeklyActivities.length / 7) * 100, 100),
              })
            }
          } catch (error) {
            console.log("[v0] خطأ غير متوقع في حساب الإحصائيات:", error)
            setStats({
              totalActivities: 0,
              completedToday: 0,
              totalDuration: 0,
              weeklyProgress: 0,
            })
          }
        } catch (error) {
          console.log("[v0] خطأ غير متوقع في جلب الأنشطة:", error)
          setActivities([])
          setStats({
            totalActivities: 0,
            completedToday: 0,
            totalDuration: 0,
            weeklyProgress: 0,
          })
        }
      } catch (error) {
        console.log("[v0] خطأ عام في fetchData:", error)
        setActivities([])
        setStats({
          totalActivities: 0,
          completedToday: 0,
          totalDuration: 0,
          weeklyProgress: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { activities, stats, loading }
}
