"use client"

import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Filter, Search } from "lucide-react"
import { ActivityList } from "@/components/activities/activity-list"
import { ActivityForm } from "@/components/activities/activity-form"
import { FortressGrid } from "@/components/activities/fortress-grid"

export default function ActivitiesPage() {
  const [showForm, setShowForm] = useState(false)
  const [selectedFortress, setSelectedFortress] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground font-amiri">إدارة الأنشطة</h1>
              <p className="text-muted-foreground">تنظيم وتتبع أنشطة الحفظ والمراجعة والتلاوة</p>
            </div>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              نشاط جديد
            </Button>
          </div>

          <Tabs defaultValue="fortresses" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="fortresses">الحصون</TabsTrigger>
              <TabsTrigger value="activities">قائمة الأنشطة</TabsTrigger>
              <TabsTrigger value="calendar">التقويم</TabsTrigger>
            </TabsList>

            <TabsContent value="fortresses" className="space-y-6">
              <FortressGrid onSelectFortress={setSelectedFortress} />
            </TabsContent>

            <TabsContent value="activities" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="البحث في الأنشطة..."
                    className="w-full pl-4 pr-10 py-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  تصفية
                </Button>
              </div>
              <ActivityList />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>تقويم الأنشطة</CardTitle>
                  <CardDescription>عرض الأنشطة المجدولة والمكتملة في التقويم</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">سيتم إضافة التقويم التفاعلي قريباً</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {showForm && <ActivityForm onClose={() => setShowForm(false)} />}
        </div>
      </main>
    </div>
  )
}
