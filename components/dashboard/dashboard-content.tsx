"use client"

import { StatsCards } from "@/components/dashboard/stats-cards"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useActivities } from "@/hooks/use-activities"
import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/skeleton"

export function DashboardContent() {
  const { stats, loading: activitiesLoading } = useActivities()
  const { profile, loading: userLoading } = useUser()

  if (activitiesLoading || userLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-16 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    )
  }

  const dailyGoal = profile?.daily_goal || 10
  const completedToday = stats.completedToday
  const progressPercentage = Math.min((completedToday / dailyGoal) * 100, 100)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-amiri">لوحة التحكم</h1>
          <p className="text-muted-foreground">مرحباً {profile?.full_name || "بك"}، تابع تقدمك في حفظ القرآن الكريم</p>
        </div>
        <div className="text-left">
          <p className="text-sm text-muted-foreground">اليوم</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString("ar-SA")}</p>
        </div>
      </div>

      {/* بطاقات الإحصائيات */}
      <StatsCards {...stats} />

      {/* الرسوم البيانية والأنشطة */}
      <div className="grid gap-6 md:grid-cols-4">
        <ActivityChart />
        <ProgressOverview />
      </div>

      {/* الأنشطة الأخيرة */}
      <div className="grid gap-6 md:grid-cols-4">
        <RecentActivities />
        <div className="col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">الهدف اليومي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold text-primary">
                  {completedToday}/{dailyGoal}
                </div>
                <p className="text-sm text-muted-foreground">أنشطة مكتملة اليوم</p>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">{Math.round(progressPercentage)}% من الهدف اليومي</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
