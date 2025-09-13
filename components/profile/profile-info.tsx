"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Camera, Edit, Save, X } from "lucide-react"

export function ProfileInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    fullName: "أحمد محمد علي",
    email: "ahmed@example.com",
    bio: "طالب علم شرعي، أسعى لحفظ القرآن الكريم وتدبر معانيه",
    joinDate: "2024-01-15",
    location: "الرياض، المملكة العربية السعودية",
    age: "25",
  })

  const handleSave = () => {
    // حفظ البيانات في قاعدة البيانات
    console.log("Saving profile data:", profileData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // إعادة تحميل البيانات الأصلية
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>المعلومات الشخصية</CardTitle>
          <CardDescription>إدارة وتحديث معلوماتك الشخصية</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/arabic-man-profile.jpg" />
                <AvatarFallback className="text-lg font-amiri">أم</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-background"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{profileData.fullName}</h3>
              <p className="text-muted-foreground">{profileData.email}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">عضو منذ {new Date(profileData.joinDate).getFullYear()}</Badge>
                <Badge variant="outline">مستوى متوسط</Badge>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">الاسم الكامل</Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                />
              ) : (
                <div className="p-2 text-sm">{profileData.fullName}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
              ) : (
                <div className="p-2 text-sm">{profileData.email}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">الموقع</Label>
              {isEditing ? (
                <Input
                  id="location"
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                />
              ) : (
                <div className="p-2 text-sm">{profileData.location}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">العمر</Label>
              {isEditing ? (
                <Input
                  id="age"
                  value={profileData.age}
                  onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                />
              ) : (
                <div className="p-2 text-sm">{profileData.age} سنة</div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">نبذة شخصية</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                rows={3}
              />
            ) : (
              <div className="p-2 text-sm leading-relaxed">{profileData.bio}</div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  إلغاء
                </Button>
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  حفظ التغييرات
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="mr-2 h-4 w-4" />
                تعديل المعلومات
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
