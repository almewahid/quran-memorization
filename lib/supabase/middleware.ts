import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  // 🟢 نبدأ برد فارغ ونبني فوقه
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set(name, value, options)
        },
        remove(name: string, options: any) {
          response.cookies.set(name, "", { ...options, maxAge: 0 })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isAuthPage = pathname.startsWith("/auth")
  const isHomePage = pathname === "/"

  // ✅ لو المستخدم داخل /auth/* وهو مسجّل دخول → يحوّل للـ Dashboard
  if (user && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // 🔒 لو المستخدم مش مسجل دخول وحاول يفتح صفحة محمية (≠ "/" و ≠ /auth/*)
  if (!user && !isAuthPage && !isHomePage) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  return response
}
