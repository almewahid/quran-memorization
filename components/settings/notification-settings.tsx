"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    enabled: true,
    dailyReminder: true,
    reminderTime: "09:00",
    weeklyReport: true,
    achievementNotifications: true,
    soundEnabled: true,
    vibrationEnabled: false,
  })

  const handleSave = () => {
    console.log("Saving notification settings:", settings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الإشعارات</CardTitle>
          <CardDescription>إدارة الإشعارات والتذكيرات</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>تفعيل الإشعارات</Label>
              <p className="text-sm text-muted-foreground">تفعيل أو إلغاء جميع الإشعارات</p>
            </div>
            <Switch
              checked={settings.enabled}
              onCheckedChange={(checked) => setSettings({ ...settings, enabled: checked })}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">أنواع الإشعارات</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>التذكير اليومي</Label>
                <p className="text-sm text-muted-foreground">تذكير يومي لممارسة الأنشطة</p>
              </div>
              <Switch
                checked={settings.dailyReminder}
                onCheckedChange={(checked) => setSettings({ ...settings, dailyReminder: checked })}
                disabled={!settings.enabled}
              />
            </div>

            {settings.dailyReminder && (
              <div className="mr-6 space-y-2">
                <Label htmlFor="reminderTime">وقت التذكير</Label>
                <Input
                  id="reminderTime"
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => setSettings({ ...settings, reminderTime: e.target.value })}
                  className="w-32"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>التقرير الأسبوعي</Label>
                <p className="text-sm text-muted-foreground">ملخص أسبوعي للتقدم والإنجازات</p>
              </div>
              <Switch
                checked={settings.weeklyReport}
                onCheckedChange={(checked) => setSettings({ ...settings, weeklyReport: checked })}
                disabled={!settings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>إشعارات الإنجازات</Label>
                <p className="text-sm text-muted-foreground">إشعار عند تحقيق إنجاز أو هدف</p>
              </div>
              <Switch
                checked={settings.achievementNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, achievementNotifications: checked })}
                disabled={!settings.enabled}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">تفضيلات الإشعار</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>الصوت</Label>
                <p className="text-sm text-muted-foreground">تشغيل صوت مع الإشعارات</p>
              </div>
              <Switch
                checked={settings.soundEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, soundEnabled: checked })}
                disabled={!settings.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>الاهتزاز</Label>
                <p className="text-sm text-muted-foreground">اهتزاز الجهاز مع الإشعارات</p>
              </div>
              <Switch
                checked={settings.vibrationEnabled}
                onCheckedChange={(checked) => setSettings({ ...settings, vibrationEnabled: checked })}
                disabled={!settings.enabled}
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
