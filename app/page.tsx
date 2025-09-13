import { Sidebar } from "@/components/layout/sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { ProgressOverview } from "@/components/dashboard/progress-overview"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function HomePage() {
  // بيانات تجريبية - سيتم استبدالها بالبيانات الحقيقية من قاعدة البيانات
  const statsData = {
    totalActivities: 156,
    completedToday: 8,
    totalDuration: 245, // بالدقائق
    weeklyProgress: 78,
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-amiri">لوحة التحكم</h1>
              <p className="text-muted-foreground">مرحباً بك، تابع تقدمك في حفظ القرآن الكريم</p>
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">اليوم</p>
              <p className="text-lg font-semibold">{new Date().toLocaleDateString("ar-SA")}</p>
            </div>
          </div>

          {/* بطاقات الإحصائيات */}
          <StatsCards {...statsData} />

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
                    <div className="text-4xl font-bold text-primary">8/10</div>
                    <p className="text-sm text-muted-foreground">أنشطة مكتملة اليوم</p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">80% من الهدف اليومي</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
