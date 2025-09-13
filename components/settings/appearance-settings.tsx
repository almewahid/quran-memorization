"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Sun, Moon, Monitor } from "lucide-react"

export function AppearanceSettings() {
  const [settings, setSettings] = useState({
    theme: "light",
    fontSize: "medium",
    colorScheme: "default",
    compactMode: false,
  })

  const themes = [
    { value: "light", label: "فاتح", icon: Sun },
    { value: "dark", label: "داكن", icon: Moon },
    { value: "system", label: "تلقائي", icon: Monitor },
  ]

  const colorSchemes = [
    { value: "default", label: "افتراضي", color: "bg-green-500" },
    { value: "blue", label: "أزرق", color: "bg-blue-500" },
    { value: "purple", label: "بنفسجي", color: "bg-purple-500" },
    { value: "orange", label: "برتقالي", color: "bg-orange-500" },
  ]

  const handleSave = () => {
    console.log("Saving appearance settings:", settings)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات المظهر</CardTitle>
          <CardDescription>تخصيص شكل ومظهر التطبيق</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <Label>المظهر</Label>
              <RadioGroup
                value={settings.theme}
                onValueChange={(value) => setSettings({ ...settings, theme: value })}
                className="grid grid-cols-3 gap-4"
              >
                {themes.map((theme) => (
                  <div key={theme.value}>
                    <RadioGroupItem value={theme.value} id={theme.value} className="peer sr-only" />
                    <Label
                      htmlFor={theme.value}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <theme.icon className="mb-3 h-6 w-6" />
                      {theme.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>حجم الخط</Label>
              <Select
                value={settings.fontSize}
                onValueChange={(value) => setSettings({ ...settings, fontSize: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">صغير</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="large">كبير</SelectItem>
                  <SelectItem value="extra-large">كبير جداً</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>نظام الألوان</Label>
              <RadioGroup
                value={settings.colorScheme}
                onValueChange={(value) => setSettings({ ...settings, colorScheme: value })}
                className="grid grid-cols-2 gap-4"
              >
                {colorSchemes.map((scheme) => (
                  <div key={scheme.value}>
                    <RadioGroupItem value={scheme.value} id={scheme.value} className="peer sr-only" />
                    <Label
                      htmlFor={scheme.value}
                      className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span>{scheme.label}</span>
                      <div className={`w-4 h-4 rounded-full ${scheme.color}`}></div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
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
