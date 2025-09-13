"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    day: "السبت",
    memorization: 4,
    review: 6,
    recitation: 2,
  },
  {
    day: "الأحد",
    memorization: 3,
    review: 8,
    recitation: 3,
  },
  {
    day: "الاثنين",
    memorization: 5,
    review: 4,
    recitation: 4,
  },
  {
    day: "الثلاثاء",
    memorization: 2,
    review: 7,
    recitation: 1,
  },
  {
    day: "الأربعاء",
    memorization: 6,
    review: 5,
    recitation: 3,
  },
  {
    day: "الخميس",
    memorization: 4,
    review: 9,
    recitation: 2,
  },
  {
    day: "الجمعة",
    memorization: 7,
    review: 6,
    recitation: 5,
  },
]

export function ActivityChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>إحصائيات الأنشطة الأسبوعية</CardTitle>
        <CardDescription>عرض تفصيلي لأنشطة الحفظ والمراجعة والتلاوة خلال الأسبوع</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="memorization" name="حفظ جديد" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="review" name="مراجعة" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="recitation" name="تلاوة" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
