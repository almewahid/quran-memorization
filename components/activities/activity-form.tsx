"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface ActivityFormProps {
  onClose: () => void
}

export function ActivityForm({ onClose }: ActivityFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    surah: "",
    ayahFrom: "",
    ayahTo: "",
    difficulty: "1",
    estimatedDuration: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا سيتم إرسال البيانات إلى قاعدة البيانات
    console.log("Activity data:", formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>إضافة نشاط جديد</CardTitle>
            <CardDescription>أنشئ نشاطاً جديداً للحفظ أو المراجعة أو التلاوة</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان النشاط *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="مثال: حفظ سورة الفاتحة"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">نوع النشاط *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع النشاط" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="memorization">حفظ جديد</SelectItem>
                    <SelectItem value="review">مراجعة</SelectItem>
                    <SelectItem value="recitation">تلاوة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="وصف مفصل للنشاط..."
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="surah">اسم السورة</Label>
                <Input
                  id="surah"
                  value={formData.surah}
                  onChange={(e) => setFormData({ ...formData, surah: e.target.value })}
                  placeholder="مثال: الفاتحة"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ayahFrom">من الآية</Label>
                <Input
                  id="ayahFrom"
                  type="number"
                  value={formData.ayahFrom}
                  onChange={(e) => setFormData({ ...formData, ayahFrom: e.target.value })}
                  placeholder="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ayahTo">إلى الآية</Label>
                <Input
                  id="ayahTo"
                  type="number"
                  value={formData.ayahTo}
                  onChange={(e) => setFormData({ ...formData, ayahTo: e.target.value })}
                  placeholder="7"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="difficulty">مستوى الصعوبة</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">سهل جداً</SelectItem>
                    <SelectItem value="2">سهل</SelectItem>
                    <SelectItem value="3">متوسط</SelectItem>
                    <SelectItem value="4">صعب</SelectItem>
                    <SelectItem value="5">صعب جداً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">الوقت المتوقع (بالدقائق)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({ ...formData, estimatedDuration: e.target.value })}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit">إضافة النشاط</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
