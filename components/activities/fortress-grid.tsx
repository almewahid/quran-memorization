"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, RefreshCw, Mic, Heart, Volume2 } from "lucide-react"

const icons: any = {
  "book-open": BookOpen,
  "refresh-cw": RefreshCw,
  "mic": Mic,
  "heart": Heart,
  "volume-2": Volume2,
}

interface FortressGridProps {
  onSelectFortress: (fortressId: string) => void
}

export function FortressGrid({ onSelectFortress }: FortressGridProps) {
  const [fortresses, setFortresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const { data, error } = await supabase.from("fortresses").select("*").order("created_at")
      if (error) {
        console.error("خطأ في جلب البيانات:", error.message)
      } else {
        setFortresses(data || [])
      }
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  if (loading) {
    return <div className="text-center py-10 text-muted-foreground">جارٍ تحميل الحصون...</div>
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {fortresses.map((fortress) => {
        const Icon = icons[fortress.icon] || BookOpen
        return (
          <Card
            key={fortress.id}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => onSelectFortress(fortress.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg" style={{ backgroundColor: fortress.color + "20" }}>
                  <Icon className="h-6 w-6" style={{ color: fortress.color }} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  0 نشاط
                </Badge>
              </div>
              <CardTitle className="text-xl font-amiri group-hover:text-primary transition-colors">
                {fortress.name}
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">{fortress.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">التقدم</span>
                <span className="font-medium">0/0</span>
              </div>
              <Progress value={0} className="h-2" />
              <div className="text-xs text-muted-foreground text-left">0% مكتمل</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
