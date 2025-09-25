"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { useAdminAuth } from "@/lib/auth/admin-auth"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, checkAuth } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    // Check authentication on mount
    if (!checkAuth()) {
      router.push("/admin/login")
    }
  }, [checkAuth, router])

  // Don't render admin content if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">{children}</main>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
