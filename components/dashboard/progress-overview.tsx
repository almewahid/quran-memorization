"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const progressData = [
  {
    fortress: "حفظ جديد",
    progress: 75,
    total: 20,
    completed: 15,
    color: "bg-green-500",
  },
  {
    fortress: "مراجعة",
    progress: 60,
    total: 25,
    completed: 15,
    color: "bg-blue-500",
  },
  {
    fortress: "تلاوة",
    progress: 40,
    total: 15,
    completed: 6,
    color: "bg-purple-500",
  },
  {
    fortress: "تدبر",
    progress: 85,
    total: 10,
    completed: 8,
    color: "bg-orange-500",
  },
]

export function ProgressOverview() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>نظرة عامة على التقدم</CardTitle>
        <CardDescription>تقدمك في كل حصن من الحصون</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {progressData.map((item) => (
          <div key={item.fortress} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.fortress}</span>
              <span className="text-muted-foreground">
                {item.completed}/{item.total}
              </span>
            </div>
            <Progress value={item.progress} className="h-2" />
            <div className="text-xs text-muted-foreground text-left">{item.progress}% مكتمل</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
