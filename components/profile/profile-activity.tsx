"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BookOpen, RefreshCw, Mic, CheckCircle } from "lucide-react"

const recentActivity = [
  {
    id: 1,
    type: "memorization",
    title: "حفظ سورة الإخلاص",
    date: "2024-05-15",
    time: "09:30",
    duration: 25,
    status: "completed",
  },
  {
    id: 2,
    type: "review",
    title: "مراجعة سورة الفاتحة",
    date: "2024-05-15",
    time: "14:15",
    duration: 15,
    status: "completed",
  },
  {
    id: 3,
    type: "recitation",
    title: "تلاوة سورة البقرة (1-20)",
    date: "2024-05-14",
    time: "20:00",
    duration: 35,
    status: "completed",
  },
  {
    id: 4,
    type: "memorization",
    title: "حفظ آية الكرسي",
    date: "2024-05-14",
    time: "16:45",
    duration: 40,
    status: "completed",
  },
  {
    id: 5,
    type: "review",
    title: "مراجعة سورة الناس",
    date: "2024-05-13",
    time: "08:20",
    duration: 10,
    status: "completed",
  },
]

const weeklyActivity = [
  { day: "السبت", activities: 3, duration: 75 },
  { day: "الأحد", activities: 4, duration: 90 },
  { day: "الاثنين", activities: 2, duration: 45 },
  { day: "الثلاثاء", activities: 5, duration: 120 },
  { day: "الأربعاء", activities: 3, duration: 80 },
  { day: "الخميس", activities: 4, duration: 95 },
  { day: "الجمعة", activities: 2, duration: 50 },
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
      return "bg-green-100 text-green-800 border-green-200"
    case "review":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "recitation":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getTypeText = (type: string) => {
  switch (type) {
    case "memorization":
      return "حفظ جديد"
    case "review":
      return "مراجعة"
    case "recitation":
      return "تلاوة"
    default:
      return "غير محدد"
  }
}

export function ProfileActivity() {
  return (
    <div className="space-y-6">
      {/* النشاط الأسبوعي */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأسبوعي</CardTitle>
          <CardDescription>ملخص أنشطتك خلال الأسبوع الحالي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyActivity.map((day) => (
              <div key={day.day} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{day.day}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{day.activities} أنشطة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{day.duration} دقيقة</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* النشاط الأخير */}
      <Card>
        <CardHeader>
          <CardTitle>النشاط الأخير</CardTitle>
          <CardDescription>آخر الأنشطة التي قمت بها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg border ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {getTypeText(activity.type)}
                      </Badge>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.duration} دقيقة</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-left text-sm text-muted-foreground">
                  <div>{activity.date}</div>
                  <div>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
