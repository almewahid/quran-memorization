"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function GeneralSettings() {
  const [settings, setSettings] = useState({
    language: "ar",
    dailyGoal: "5",
    autoSave: true,
    soundEffects: true,
    vibration: false,
  })

  const handleSave = () => {
    // حفظ الإعدادات في قاعدة البيانات
    console.log("Saving settings:", settings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>الإعدادات العامة</CardTitle>
          <CardDescription>إعدادات أساسية للتطبيق والتفضيلات الشخصية</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="language">لغة التطبيق</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => setSettings({ ...settings, language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyGoal">الهدف اليومي (عدد الأنشطة)</Label>
              <Select
                value={settings.dailyGoal}
                onValueChange={(value) => setSettings({ ...settings, dailyGoal: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 أنشطة</SelectItem>
                  <SelectItem value="5">5 أنشطة</SelectItem>
                  <SelectItem value="7">7 أنشطة</SelectItem>
                  <SelectItem value="10">10 أنشطة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تفضيلات التطبيق</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>الحفظ التلقائي</Label>
                <p className="text-sm text-muted-foreground">حفظ التقدم تلقائياً أثناء الاستخدام</p>
              </div>
              <Switch
                checked={settings.autoSave}
                onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>المؤثرات الصوتية</Label>
                <p className="text-sm text-muted-foreground">تشغيل الأصوات عند إكمال الأنشطة</p>
              </div>
              <Switch
                checked={settings.soundEffects}
                onCheckedChange={(checked) => setSettings({ ...settings, soundEffects: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>الاهتزاز</Label>
                <p className="text-sm text-muted-foreground">اهتزاز الجهاز عند الإشعارات</p>
              </div>
              <Switch
                checked={settings.vibration}
                onCheckedChange={(checked) => setSettings({ ...settings, vibration: checked })}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>حفظ التغييرات</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
