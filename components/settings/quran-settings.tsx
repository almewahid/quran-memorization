"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

export function QuranSettings() {
  const [settings, setSettings] = useState({
    mushafType: "uthmani",
    reciter: "mishary",
    playbackSpeed: [1],
    autoPlay: true,
    repeatVerse: false,
    showTranslation: true,
    translationLanguage: "ar",
    showTafseer: false,
  })

  const reciters = [
    { value: "mishary", label: "مشاري بن راشد العفاسي" },
    { value: "sudais", label: "عبد الرحمن السديس" },
    { value: "shuraim", label: "سعود الشريم" },
    { value: "maher", label: "ماهر المعيقلي" },
    { value: "ajmi", label: "أحمد بن علي العجمي" },
  ]

  const mushafTypes = [
    { value: "uthmani", label: "المصحف العثماني" },
    { value: "indopak", label: "المصحف الهندي الباكستاني" },
    { value: "qaloon", label: "مصحف قالون" },
    { value: "warsh", label: "مصحف ورش" },
  ]

  const handleSave = () => {
    console.log("Saving Quran settings:", settings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات القرآن الكريم</CardTitle>
          <CardDescription>تخصيص عرض وتلاوة القرآن الكريم</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mushafType">نوع المصحف</Label>
              <Select
                value={settings.mushafType}
                onValueChange={(value) => setSettings({ ...settings, mushafType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mushafTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reciter">القارئ المفضل</Label>
              <Select value={settings.reciter} onValueChange={(value) => setSettings({ ...settings, reciter: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reciters.map((reciter) => (
                    <SelectItem key={reciter.value} value={reciter.value}>
                      {reciter.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">إعدادات التشغيل</h3>

            <div className="space-y-3">
              <Label>سرعة التشغيل: {settings.playbackSpeed[0]}x</Label>
              <Slider
                value={settings.playbackSpeed}
                onValueChange={(value) => setSettings({ ...settings, playbackSpeed: value })}
                max={2}
                min={0.5}
                step={0.25}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0.5x</span>
                <span>1x</span>
                <span>1.5x</span>
                <span>2x</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>التشغيل التلقائي</Label>
                <p className="text-sm text-muted-foreground">تشغيل الآية التالية تلقائياً</p>
              </div>
              <Switch
                checked={settings.autoPlay}
                onCheckedChange={(checked) => setSettings({ ...settings, autoPlay: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>تكرار الآية</Label>
                <p className="text-sm text-muted-foreground">تكرار تشغيل الآية الحالية</p>
              </div>
              <Switch
                checked={settings.repeatVerse}
                onCheckedChange={(checked) => setSettings({ ...settings, repeatVerse: checked })}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">إعدادات العرض</h3>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>عرض الترجمة</Label>
                <p className="text-sm text-muted-foreground">إظهار ترجمة معاني الآيات</p>
              </div>
              <Switch
                checked={settings.showTranslation}
                onCheckedChange={(checked) => setSettings({ ...settings, showTranslation: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>عرض التفسير</Label>
                <p className="text-sm text-muted-foreground">إظهار تفسير الآيات</p>
              </div>
              <Switch
                checked={settings.showTafseer}
                onCheckedChange={(checked) => setSettings({ ...settings, showTafseer: checked })}
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
