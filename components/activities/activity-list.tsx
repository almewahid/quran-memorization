"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, RefreshCw, Mic, Clock, Edit, Trash2, Play, CheckCircle } from "lucide-react"

const activities = [
  {
    id: "1",
    title: "حفظ سورة الفاتحة",
    description: "حفظ سورة الفاتحة كاملة مع التجويد",
    type: "memorization",
    surah: "الفاتحة",
    ayahFrom: 1,
    ayahTo: 7,
    status: "completed",
    difficulty: 2,
    estimatedDuration: 30,
    actualDuration: 25,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "مراجعة آية الكرسي",
    description: "مراجعة حفظ آية الكرسي",
    type: "review",
    surah: "البقرة",
    ayahFrom: 255,
    ayahTo: 255,
    status: "in_progress",
    difficulty: 3,
    estimatedDuration: 20,
    createdAt: "2024-01-16",
  },
  {
    id: "3",
    title: "تلاوة سورة يس",
    description: "تلاوة سورة يس مع التدبر",
    type: "recitation",
    surah: "يس",
    ayahFrom: 1,
    ayahTo: 83,
    status: "pending",
    difficulty: 4,
    estimatedDuration: 45,
    createdAt: "2024-01-17",
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
      return "bg-green-100 text-green-800 border-green-200"
    case "review":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "recitation":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
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

export function ActivityList() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`p-2 rounded-lg border ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{activity.title}</h3>
                    <Badge variant="secondary" className={getStatusColor(activity.status)}>
                      {getStatusText(activity.status)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">{activity.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>سورة {activity.surah}</span>
                    {activity.ayahFrom && activity.ayahTo && (
                      <span>
                        الآيات {activity.ayahFrom}
                        {activity.ayahFrom !== activity.ayahTo && ` - ${activity.ayahTo}`}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{activity.estimatedDuration} دقيقة</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getTypeText(activity.type)}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activity.status === "pending" && (
                  <Button size="sm" variant="default" className="gap-1">
                    <Play className="h-3 w-3" />
                    بدء
                  </Button>
                )}
                {activity.status === "in_progress" && (
                  <Button size="sm" variant="default" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    إنهاء
                  </Button>
                )}
                <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                  <Edit className="h-3 w-3" />
                  تعديل
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1 text-destructive hover:text-destructive bg-transparent"
                >
                  <Trash2 className="h-3 w-3" />
                  حذف
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
