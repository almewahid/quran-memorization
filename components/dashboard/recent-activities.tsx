"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, BookOpen, RefreshCw, Mic } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    title: "حفظ سورة الفاتحة",
    type: "memorization",
    surah: "الفاتحة",
    duration: 25,
    status: "completed",
    time: "منذ ساعتين",
  },
  {
    id: 2,
    title: "مراجعة آية الكرسي",
    type: "review",
    surah: "البقرة",
    duration: 15,
    status: "completed",
    time: "منذ 4 ساعات",
  },
  {
    id: 3,
    title: "تلاوة سورة يس",
    type: "recitation",
    surah: "يس",
    duration: 30,
    status: "in_progress",
    time: "جاري الآن",
  },
  {
    id: 4,
    title: "حفظ الآيات 1-5 من سورة البقرة",
    type: "memorization",
    surah: "البقرة",
    duration: 45,
    status: "completed",
    time: "أمس",
  },
]

const getActivityIcon = (type: string) => {
  switch (type) {
    case "memorization":
      return <BookOpen className="h-4 w-4" />
    case "review":
      return <RefreshCw className="h-4 w-4" />
    case "recitation":
      return <Mic className="h-4 w-4" />
    default:
      return <BookOpen className="h-4 w-4" />
  }
}

const getActivityColor = (type: string) => {
  switch (type) {
    case "memorization":
      return "bg-green-100 text-green-800"
    case "review":
      return "bg-blue-100 text-blue-800"
    case "recitation":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "in_progress":
      return "bg-yellow-100 text-yellow-800"
    case "pending":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "مكتمل"
    case "in_progress":
      return "جاري"
    case "pending":
      return "معلق"
    default:
      return "غير محدد"
  }
}

export function RecentActivities() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>الأنشطة الأخيرة</CardTitle>
        <CardDescription>آخر الأنشطة التي تم تنفيذها أو جاري تنفيذها</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>سورة {activity.surah}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{activity.duration} دقيقة</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className={getStatusColor(activity.status)}>
                  {getStatusText(activity.status)}
                </Badge>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
