"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileInfo } from "@/components/profile/profile-info"
import { ProfileStats } from "@/components/profile/profile-stats"
import { ProfileAchievements } from "@/components/profile/profile-achievements"
import { ProfileActivity } from "@/components/profile/profile-activity"

export default function ProfilePage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground font-amiri">الملف الشخصي</h1>
            <p className="text-muted-foreground">إدارة معلوماتك الشخصية ومتابعة إنجازاتك</p>
          </div>

          <Tabs defaultValue="info" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">المعلومات</TabsTrigger>
              <TabsTrigger value="stats">الإحصائيات</TabsTrigger>
              <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
              <TabsTrigger value="activity">النشاط</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <ProfileInfo />
            </TabsContent>

            <TabsContent value="stats">
              <ProfileStats />
            </TabsContent>

            <TabsContent value="achievements">
              <ProfileAchievements />
            </TabsContent>

            <TabsContent value="activity">
              <ProfileActivity />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
