"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Download, Upload, Trash2, RefreshCw } from "lucide-react"

export function DataSettings() {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)

  const handleExportData = async () => {
    setIsExporting(true)
    // محاكاة تصدير البيانات
    setTimeout(() => {
      setIsExporting(false)
      console.log("Data exported successfully")
    }, 2000)
  }

  const handleImportData = async () => {
    setIsImporting(true)
    // محاكاة استيراد البيانات
    setTimeout(() => {
      setIsImporting(false)
      console.log("Data imported successfully")
    }, 2000)
  }

  const handleResetData = () => {
    console.log("Resetting all data...")
  }

  const handleClearCache = () => {
    console.log("Clearing cache...")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إدارة البيانات</CardTitle>
          <CardDescription>نسخ احتياطي واستعادة وإدارة بيانات التطبيق</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">النسخ الاحتياطي والاستعادة</h3>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">تصدير البيانات</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    تصدير جميع بياناتك (الأنشطة، الإحصائيات، الإعدادات) إلى ملف
                  </p>
                  <Button onClick={handleExportData} disabled={isExporting} className="w-full">
                    {isExporting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        جاري التصدير...
                      </>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        تصدير البيانات
                      </>
                    )}
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">استيراد البيانات</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">استيراد البيانات من ملف نسخة احتياطية سابقة</p>
                  <Button
                    onClick={handleImportData}
                    disabled={isImporting}
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    {isImporting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        جاري الاستيراد...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        استيراد البيانات
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">إدارة التخزين</h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">مسح ذاكرة التخزين المؤقت</h4>
                  <p className="text-sm text-muted-foreground">حذف الملفات المؤقتة لتحرير مساحة التخزين</p>
                </div>
                <Button onClick={handleClearCache} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  مسح الذاكرة
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20">
                <div>
                  <h4 className="font-medium text-destructive">إعادة تعيين جميع البيانات</h4>
                  <p className="text-sm text-muted-foreground">حذف جميع البيانات والعودة إلى الإعدادات الافتراضية</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      إعادة تعيين
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                      <AlertDialogDescription>
                        هذا الإجراء سيحذف جميع بياناتك نهائياً ولا يمكن التراجع عنه. سيتم حذف جميع الأنشطة والإحصائيات
                        والإعدادات.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleResetData}
                        className="bg-destructive text-destructive-foreground"
                      >
                        نعم، احذف جميع البيانات
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">معلومات التخزين</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">إجمالي الأنشطة</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">2.3 MB</div>
                <div className="text-sm text-muted-foreground">حجم البيانات</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-primary">45 يوم</div>
                <div className="text-sm text-muted-foreground">مدة الاستخدام</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
