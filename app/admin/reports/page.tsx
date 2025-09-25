"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar, Users, DollarSign, Heart, TrendingUp, BarChart3 } from "lucide-react"
import { GenerateReportDialog } from "@/components/admin/generate-report-dialog"
import { useAdminStore } from "@/lib/store/admin-store"

export default function ReportsPage() {
  const { beneficiaries, donations, programs } = useAdminStore()

  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const thisMonthDonations = donations.filter((d) => {
      const donationDate = new Date(d.date)
      return donationDate.getMonth() === currentMonth && donationDate.getFullYear() === currentYear
    })

    const thisMonthBeneficiaries = beneficiaries.filter((b) => {
      const joinDate = new Date(b.joinDate)
      return joinDate.getMonth() === currentMonth && joinDate.getFullYear() === currentYear
    })

    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0)
    const activePrograms = programs.filter((p) => p.status === "نشط").length

    return {
      totalDonations,
      newBeneficiaries: thisMonthBeneficiaries.length,
      activePrograms,
      thisMonthAmount: thisMonthDonations.reduce((sum, d) => sum + d.amount, 0),
    }
  }, [beneficiaries, donations, programs])

  const generateQuickReport = (type: string) => {
    let reportData = ""
    let filename = ""

    switch (type) {
      case "donations":
        const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0)
        const avgDonation = donations.length > 0 ? totalAmount / donations.length : 0
        reportData = `
تقرير التبرعات السريع

إجمالي التبرعات: ${donations.length} تبرع
إجمالي المبلغ: ${totalAmount.toLocaleString()} دج
متوسط التبرع: ${Math.round(avgDonation).toLocaleString()} دج

التبرعات الأخيرة:
${donations
  .slice(-5)
  .map((d) => `- ${d.donor}: ${d.amount.toLocaleString()} دج (${d.date})`)
  .join("\n")}
        `
        filename = "تقرير-التبرعات-سريع"
        break

      case "beneficiaries":
        const activeCount = beneficiaries.filter((b) => b.status === "نشط").length
        reportData = `
تقرير المستفيدين السريع

إجمالي المستفيدين: ${beneficiaries.length} مستفيد
المستفيدين النشطين: ${activeCount} مستفيد
نسبة النشاط: ${Math.round((activeCount / beneficiaries.length) * 100)}%

المستفيدين الجدد:
${beneficiaries
  .slice(-5)
  .map((b) => `- ${b.name}: ${b.program} (${b.joinDate})`)
  .join("\n")}
        `
        filename = "تقرير-المستفيدين-سريع"
        break

      case "programs":
        const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0)
        reportData = `
تقرير البرامج السريع

إجمالي البرامج: ${programs.length} برنامج
البرامج النشطة: ${programs.filter((p) => p.status === "نشط").length} برنامج
إجمالي الميزانية: ${totalBudget.toLocaleString()} دج

البرامج النشطة:
${programs
  .filter((p) => p.status === "نشط")
  .map((p) => `- ${p.name}: ${p.beneficiaries} مستفيد`)
  .join("\n")}
        `
        filename = "تقرير-البرامج-سريع"
        break

      default:
        reportData = "تقرير عام"
        filename = "تقرير-عام"
    }

    // Download the report
    const blob = new Blob([reportData], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const quickStats = [
    {
      title: "التقارير المنجزة",
      value: "24",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "التقارير الشهرية",
      value: "12",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "التقارير المالية",
      value: "8",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "تقارير البرامج",
      value: "6",
      icon: Heart,
      color: "text-purple-600",
    },
  ]

  const reports = [
    {
      id: 1,
      title: "تقرير التبرعات الشهري",
      description: "تقرير شامل عن التبرعات المستلمة خلال الشهر",
      type: "مالي",
      date: "2024-12-01",
      status: "جاهز",
      size: "2.3 MB",
    },
    {
      id: 2,
      title: "تقرير المستفيدين",
      description: "إحصائيات المستفيدين من برامج الجمعية",
      type: "إحصائي",
      date: "2024-11-30",
      status: "جاهز",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "تقرير أداء البرامج",
      description: "تقييم أداء البرامج والأنشطة المختلفة",
      type: "أداء",
      date: "2024-11-25",
      status: "قيد الإعداد",
      size: "-",
    },
    {
      id: 4,
      title: "التقرير السنوي 2024",
      description: "التقرير الشامل لأنشطة الجمعية خلال العام",
      type: "سنوي",
      date: "2024-12-31",
      status: "مجدول",
      size: "-",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">التقارير والإحصائيات</h2>
          <p className="text-muted-foreground">إنشاء وإدارة التقارير المختلفة للجمعية</p>
        </div>
        <GenerateReportDialog />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>قوالب التقارير السريعة</CardTitle>
          <CardDescription>إنشاء تقارير باستخدام القوالب الجاهزة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => generateQuickReport("donations")}
            >
              <DollarSign className="w-6 h-6" />
              تقرير التبرعات
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => generateQuickReport("beneficiaries")}
            >
              <Users className="w-6 h-6" />
              تقرير المستفيدين
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              onClick={() => generateQuickReport("programs")}
            >
              <Heart className="w-6 h-6" />
              تقرير البرامج
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <BarChart3 className="w-6 h-6" />
              تقرير الأداء
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Calendar className="w-6 h-6" />
              تقرير شهري
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <FileText className="w-6 h-6" />
              تقرير مخصص
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card>
        <CardHeader>
          <CardTitle>التقارير المتاحة</CardTitle>
          <CardDescription>جميع التقارير المنشأة والمجدولة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{report.title}</h4>
                    <p className="text-sm text-muted-foreground">{report.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="outline">{report.type}</Badge>
                      <span className="text-xs text-muted-foreground">{report.date}</span>
                      {report.size !== "-" && <span className="text-xs text-muted-foreground">{report.size}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      report.status === "جاهز" ? "default" : report.status === "قيد الإعداد" ? "secondary" : "outline"
                    }
                  >
                    {report.status}
                  </Badge>
                  {report.status === "جاهز" && (
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 ml-2" />
                      تحميل
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المؤشرات الرئيسية</CardTitle>
            <CardDescription>أهم المؤشرات لهذا الشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">إجمالي التبرعات</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-foreground">{stats.totalDonations.toLocaleString()} دج</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">المستفيدين الجدد</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-foreground">{stats.newBeneficiaries} مستفيد</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <span className="font-medium text-foreground">البرامج النشطة</span>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-600" />
                  <span className="font-semibold text-foreground">{stats.activePrograms} برامج</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>التقارير المجدولة</CardTitle>
            <CardDescription>التقارير القادمة والمواعيد المهمة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <h4 className="font-medium text-foreground">التقرير الشهري</h4>
                  <p className="text-sm text-muted-foreground">15 ديسمبر 2024</p>
                </div>
                <Badge variant="outline">مجدول</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <h4 className="font-medium text-foreground">تقرير البرامج</h4>
                  <p className="text-sm text-muted-foreground">20 ديسمبر 2024</p>
                </div>
                <Badge variant="outline">مجدول</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <h4 className="font-medium text-foreground">التقرير السنوي</h4>
                  <p className="text-sm text-muted-foreground">31 ديسمبر 2024</p>
                </div>
                <Badge variant="outline">مجدول</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
