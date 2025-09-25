"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Heart, FileText, DollarSign, Settings, Home, UserCheck } from "lucide-react"

const sidebarItems = [
  {
    title: "لوحة التحكم",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "المستفيدين",
    href: "/admin/beneficiaries",
    icon: Users,
  },
  {
    title: "البرامج",
    href: "/admin/programs",
    icon: Heart,
  },
  {
    title: "التبرعات",
    href: "/admin/donations",
    icon: DollarSign,
  },
  {
    title: "التقارير",
    href: "/admin/reports",
    icon: FileText,
  },
  {
    title: "المتطوعين",
    href: "/admin/volunteers",
    icon: UserCheck,
  },
  {
    title: "الإعدادات",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-l border-sidebar-border h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">البركة سوق نعمان</h2>
            <p className="text-xs text-sidebar-foreground/70">لوحة الإدارة</p>
          </div>
        </Link>

        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="w-4 h-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-sidebar-border">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            العودة للموقع
          </Link>
        </div>
      </div>
    </div>
  )
}
