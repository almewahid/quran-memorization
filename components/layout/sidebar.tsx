"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, BookOpen, Settings, User, Menu, X } from "lucide-react"

const navigation = [
  {
    name: "الملخص",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "الأنشطة",
    href: "/activities",
    icon: BookOpen,
  },
  {
    name: "الإعدادات",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "الملف الشخصي",
    href: "/profile",
    icon: User,
  },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* زر القائمة للشاشات الصغيرة */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* الخلفية المظلمة للشاشات الصغيرة */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}

      {/* الشريط الجانبي */}
      <div
        className={cn(
          "fixed right-0 top-0 z-40 h-full w-64 transform bg-card border-l border-border transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* الرأس */}
          <div className="flex h-16 items-center justify-center border-b border-border px-6">
            <h1 className="text-xl font-bold text-primary font-amiri">حفظ القرآن الكريم</h1>
          </div>

          {/* القائمة */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* التذييل */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">مستخدم تجريبي</p>
                <p className="text-xs text-muted-foreground truncate">demo@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
