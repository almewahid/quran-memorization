"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Target, TrendingUp, BookOpen, RefreshCw, Mic } from "lucide-react"

const stats = {
  totalActivities: 156,
  completedActivities: 142,
  totalHours: 87,
  currentStreak: 12,
  longestStreak: 28,
  averageDaily: 4.2,
  monthlyGoal: 150,
  monthlyCompleted: 89,
}

const activityBreakdown = [
  { type: "memorization", label: "حفظ جديد", count: 45, color: "bg-green-500", icon: BookOpen },
  { type: "review", label: "مراجعة", count: 67, color: "bg-blue-500", icon: RefreshCw },
  { type: "recitation", label: "تلاوة", count: 30, color: "bg-purple-500", icon: Mic },
]

const monthlyProgress = [
  { month: "يناير", completed: 32, target: 30 },
  { month: "فبراير", completed: 28, target: 30 },
  { month: "مارس", completed: 35, target: 30 },
  { month: "أبريل", completed: 29, target: 30 },
  { month: "مايو", completed: 18, target: 30 },
]

export function ProfileStats() {
  return (
    <div className="space-y-6">
      {/* الإحصائيات العامة */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الأنشطة</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalActivities}</div>
            <p className="text-xs text-muted-foreground">مكتمل {stats.completedActivities}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الساعات</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalHours}</div>
            <p className="text-xs text-muted-foreground">ساعة من الممارسة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">السلسلة الحالية</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <p className="text-xs text-muted-foreground">يوم متتالي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المعدل اليومي</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageDaily}</div>
            <p className="text-xs text-muted-foreground">نشاط في اليوم</p>
          </CardContent>
        </Card>
      </div>

      {/* تفصيل الأنشطة */}
      <Card>
        <CardHeader>
          <CardTitle>تفصيل الأنشطة</CardTitle>
          <CardDescription>توزيع الأنشطة حسب النوع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activityBreakdown.map((activity) => (
              <div key={activity.type} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${activity.color} bg-opacity-10`}>
                    <activity.icon className="h-4 w-4" style={{ color: activity.color.replace("bg-", "") }} />
                  </div>
                  <span className="font-medium">{activity.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{activity.count}</Badge>
                  <div className="w-24 text-right text-sm text-muted-foreground">
                    {Math.round((activity.count / stats.totalActivities) * 100)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* التقدم الشهري */}
      <Card>
        <CardHeader>
          <CardTitle>التقدم الشهري</CardTitle>
          <CardDescription>مقارنة الإنجاز الشهري مع الأهداف المحددة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyProgress.map((month) => (
              <div key={month.month} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{month.month}</span>
                  <span className="text-muted-foreground">
                    {month.completed}/{month.target}
                  </span>
                </div>
                <Progress value={(month.completed / month.target) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground text-left">
                  {Math.round((month.completed / month.target) * 100)}% من الهدف
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* الهدف الشهري الحالي */}
      <Card>
        <CardHeader>
          <CardTitle>الهدف الشهري الحالي</CardTitle>
          <CardDescription>تقدمك نحو هدف هذا الشهر</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{stats.monthlyCompleted}</span>
              <span className="text-muted-foreground">من {stats.monthlyGoal}</span>
            </div>
            <Progress value={(stats.monthlyCompleted / stats.monthlyGoal) * 100} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{Math.round((stats.monthlyCompleted / stats.monthlyGoal) * 100)}% مكتمل</span>
              <span>باقي {stats.monthlyGoal - stats.monthlyCompleted} نشاط</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
