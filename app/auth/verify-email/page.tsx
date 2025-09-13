import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <Mail className="h-6 w-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-800">تحقق من بريدك الإلكتروني</CardTitle>
          <CardDescription className="text-emerald-600">تم إرسال رابط التفعيل إلى بريدك الإلكتروني</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            يرجى فتح بريدك الإلكتروني والنقر على رابط التفعيل لإكمال إنشاء حسابك.
          </p>
          <p className="text-xs text-gray-500">إذا لم تجد الرسالة، تحقق من مجلد الرسائل غير المرغوب فيها.</p>
        </CardContent>
      </Card>
    </div>
  )
}
