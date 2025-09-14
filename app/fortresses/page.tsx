"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Card, CardContent } from "@/components/ui/card"

// 🔑 بيانات Supabase
const supabaseUrl = "https://xokguyylhonhlqimlffi.supabase.co"
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhva2d1eXlsaG9uaGxxaW1sZmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NjEwMDQsImV4cCI6MjA3MzQzNzAwNH0.cLK25YSEEntzVGnVCXrKMKFzbRKuAEw2eII6D_5Z1-E"

const supabase = createClient(supabaseUrl, supabaseKey)

export default function FortressesList() {
  const [fortresses, setFortresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFortresses = async () => {
      const { data, error } = await supabase.from("fortresses").select("*")
      if (error) {
        console.error("Error fetching fortresses:", error.message)
      } else {
        setFortresses(data || [])
      }
      setLoading(false)
    }

    fetchFortresses()
  }, [])

  if (loading) return <p className="text-center">⏳ جاري التحميل...</p>

  if (fortresses.length === 0) {
    return <p className="text-center">لا توجد حصون مسجلة بعد</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {fortresses.map((f) => (
        <Card
          key={f.id}
          className="rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition"
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: f.color || "#10B981" }}
              >
                {f.icon?.[0] || "📖"}
              </div>
              <h2 className="text-lg font-semibold">{f.name}</h2>
            </div>
            <p className="text-sm text-gray-600 mt-2">{f.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
