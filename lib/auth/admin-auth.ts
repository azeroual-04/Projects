"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin"
}

interface AdminAuthStore {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => boolean
}

// Admin credentials - في التطبيق الحقيقي يجب أن تكون في قاعدة البيانات
const ADMIN_CREDENTIALS = {
  email: "admin@elbaraka-souknaamane.org",
  password: "ElBaraka2024@Admin",
  name: "مدير الجمعية",
  id: "admin-001",
}

export const useAdminAuth = create<AdminAuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          const user: AdminUser = {
            id: ADMIN_CREDENTIALS.id,
            email: ADMIN_CREDENTIALS.email,
            name: ADMIN_CREDENTIALS.name,
            role: "admin",
          }

          set({ user, isAuthenticated: true })
          return true
        }

        return false
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      checkAuth: () => {
        return get().isAuthenticated
      },
    }),
    {
      name: "admin-auth-store",
    },
  ),
)
