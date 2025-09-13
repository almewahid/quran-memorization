"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Target, Zap, BookOpen, Calendar, Clock, Award } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "البداية القوية",
    description: "أكمل أول 10 أنشطة",
    icon: Star,
    earned: true,
    earnedDate: "2024-01-20",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    id: 2,
    title: "المثابر",
    description: "حافظ على سلسلة 7 أيام متتالية",
    icon: Zap,
    earned: true,
    earnedDate: "2024-02-05",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    id: 3,
    title: "حافظ القرآن المبتدئ",
    description: "احفظ 5 سور كاملة",
    icon: BookOpen,
    earned: true,
    earnedDate: "2024-03-15",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 4,
    title: "المراجع المتقن",
    description: "أكمل 50 نشاط مراجعة",
    icon: Target,
    earned: false,
    progress: 32,
    total: 50,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 5,
    title: "الملتزم الشهري",
    description: "أكمل الهدف الشهري 3 مرات متتالية",
    icon: Calendar,
    earned: false,
    progress: 2,
    total: 3,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: 6,
    title: "ماراثون الحفظ",
    description: "اقض 100 ساعة في الحفظ والمراجعة",
    icon: Clock,
    earned: false,
    progress: 87,
    total: 100,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
]

const levels = [
  { level: 1, title: "مبتدئ", minPoints: 0, maxPoints: 100, color: "bg-gray-500" },
  { level: 2, title: "متدرب", minPoints: 100, maxPoints: 300, color: "bg-green-500" },
  { level: 3, title: "متوسط", minPoints: 300, maxPoints: 600, color: "bg-blue-500" },
  { level: 4, title: "متقدم", minPoints: 600, maxPoints: 1000, color: "bg-purple-500" },
  { level: 5, title: "خبير", minPoints: 1000, maxPoints: 1500, color: "bg-orange-500" },
  { level: 6, title: "أستاذ", minPoints: 1500, maxPoints: 2500, color: "bg-red-500" },
]

const currentPoints = 450
const currentLevel =
  levels.find((level) => currentPoints >= level.minPoints && currentPoints < level.maxPoints) || levels[0]
const nextLevel = levels.find((level) => level.level === currentLevel.level + 1)

export function ProfileAchievements() {
  const earnedAchievements = achievements.filter((a) => a.earned)
  const inProgressAchievements = achievements.filter((a) => !a.earned)

  return (
    <div className="space-y-6">
      {/* المستوى الحالي */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            المستوى الحالي
          </CardTitle>
          <CardDescription>تقدمك في رحلة حفظ القرآن الكريم</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full ${currentLevel.color} flex items-center justify-center text-white font-bold`}
                >
                  {currentLevel.level}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{currentLevel.title}</h3>
                  <p className="text-sm text-muted-foreground">{currentPoints} نقطة</p>
                </div>
              </div>
              {nextLevel && (
                <Badge variant="outline" className="text-xs">
                  باقي {nextLevel.minPoints - currentPoints} نقطة للمستوى التالي
                </Badge>
              )}
            </div>
            {nextLevel && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{currentLevel.title}</span>
                  <span>{nextLevel.title}</span>
                </div>
                <Progress
                  value={
                    ((currentPoints - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
                  }
                  className="h-2"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* الإنجازات المكتسبة */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            الإنجازات المكتسبة ({earnedAchievements.length})
          </CardTitle>
          <CardDescription>الإنجازات التي حققتها في رحلتك</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {earnedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center gap-4 p-4 border rounded-lg bg-gradient-to-r from-green-50 to-transparent"
              >
                <div className={`p-3 rounded-lg ${achievement.bgColor}`}>
                  <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <p className="text-xs text-green-600 mt-1">حُقق في {achievement.earnedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* الإنجازات قيد التقدم */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            الإنجازات قيد التقدم ({inProgressAchievements.length})
          </CardTitle>
          <CardDescription>الإنجازات التي تعمل على تحقيقها حالياً</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inProgressAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className={`p-3 rounded-lg ${achievement.bgColor}`}>
                  <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <span className="text-sm text-muted-foreground">
                      {achievement.progress}/{achievement.total}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  <Progress value={(achievement.progress! / achievement.total!) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((achievement.progress! / achievement.total!) * 100)}% مكتمل
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
