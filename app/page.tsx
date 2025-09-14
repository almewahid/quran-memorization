import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Target, BarChart3, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-emerald-800 font-amiri">حفظ القرآن</h1>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-emerald-700 hover:text-emerald-800">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">إنشاء حساب</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-emerald-800 mb-6 font-amiri leading-tight">
            رحلتك في حفظ القرآن الكريم
          </h2>
          <p className="text-xl text-emerald-600 mb-8 leading-relaxed">
            نظام شامل لإدارة وتتبع حفظ القرآن الكريم مع إحصائيات مفصلة وأهداف يومية
          </p>
          <div className="flex items-center justify-center space-x-4 space-x-reverse">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 text-lg">
                ابدأ رحلتك الآن
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-700 px-8 py-3 text-lg bg-transparent"
              >
                لدي حساب بالفعل
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-emerald-800 mb-4 font-amiri">ميزات التطبيق</h3>
          <p className="text-emerald-600 text-lg">كل ما تحتاجه لإدارة رحلة حفظ القرآن الكريم</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-emerald-800">إدارة الحصون</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-emerald-600">
                تنظيم وإدارة حفظ الحصون المختلفة مع تتبع التقدم
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-emerald-800">أهداف يومية</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-emerald-600">تحديد أهداف يومية وتتبع إنجازها بشكل مستمر</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-emerald-800">إحصائيات مفصلة</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-emerald-600">رسوم بيانية وإحصائيات شاملة لتتبع التقدم</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-emerald-800">ملف شخصي</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-emerald-600">إدارة الملف الشخصي والإعدادات والإنجازات</CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-emerald-600">© 2024 تطبيق حفظ القرآن الكريم. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  )
}
