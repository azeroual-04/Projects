"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download } from "lucide-react"
import { useAdminStore } from "@/lib/store/admin-store"
import { toast } from "@/hooks/use-toast"

export function GenerateReportDialog() {
  const [open, setOpen] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    period: "",
    format: "PDF",
    notes: "",
  })

  const { beneficiaries, donations, programs } = useAdminStore()

  const generateReport = async () => {
    setGenerating(true)

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let reportData: any = {}
    let reportContent = ""

    switch (formData.type) {
      case "donations":
        const filteredDonations = filterByPeriod(donations, formData.period)
        const totalAmount = filteredDonations.reduce((sum, d) => sum + d.amount, 0)
        const avgDonation = filteredDonations.length > 0 ? totalAmount / filteredDonations.length : 0

        reportData = {
          title: "تقرير التبرعات",
          period: formData.period,
          totalDonations: filteredDonations.length,
          totalAmount,
          avgDonation: Math.round(avgDonation),
          topDonors: getTopDonors(filteredDonations),
        }

        reportContent = `
تقرير التبرعات - ${getPeriodLabel(formData.period)}

الملخص التنفيذي:
- إجمالي التبرعات: ${filteredDonations.length} تبرع
- إجمالي المبلغ: ${totalAmount.toLocaleString()} دج
- متوسط التبرع: ${Math.round(avgDonation).toLocaleString()} دج

أكبر المتبرعين:
${reportData.topDonors.map((donor: any, i: number) => `${i + 1}. ${donor.name}: ${donor.amount.toLocaleString()} دج`).join("\n")}

التوزيع حسب البرنامج:
${getProgramDistribution(filteredDonations)}
        `
        break

      case "beneficiaries":
        const filteredBeneficiaries = filterByPeriod(beneficiaries, formData.period)
        const programStats = getBeneficiaryProgramStats(filteredBeneficiaries)

        reportData = {
          title: "تقرير المستفيدين",
          period: formData.period,
          totalBeneficiaries: filteredBeneficiaries.length,
          activeCount: filteredBeneficiaries.filter((b) => b.status === "نشط").length,
          programStats,
        }

        reportContent = `
تقرير المستفيدين - ${getPeriodLabel(formData.period)}

الملخص التنفيذي:
- إجمالي المستفيدين: ${filteredBeneficiaries.length} مستفيد
- المستفيدين النشطين: ${reportData.activeCount} مستفيد
- نسبة النشاط: ${Math.round((reportData.activeCount / filteredBeneficiaries.length) * 100)}%

التوزيع حسب البرنامج:
${Object.entries(programStats)
  .map(([program, count]) => `- ${program}: ${count} مستفيد`)
  .join("\n")}
        `
        break

      case "programs":
        const activePrograms = programs.filter((p) => p.status === "نشط")
        const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0)
        const totalBeneficiaries = programs.reduce((sum, p) => sum + p.beneficiaries, 0)

        reportData = {
          title: "تقرير البرامج",
          period: formData.period,
          totalPrograms: programs.length,
          activePrograms: activePrograms.length,
          totalBudget,
          totalBeneficiaries,
        }

        reportContent = `
تقرير البرامج - ${getPeriodLabel(formData.period)}

الملخص التنفيذي:
- إجمالي البرامج: ${programs.length} برنامج
- البرامج النشطة: ${activePrograms.length} برنامج
- إجمالي الميزانية: ${totalBudget.toLocaleString()} دج
- إجمالي المستفيدين: ${totalBeneficiaries} مستفيد

البرامج النشطة:
${activePrograms.map((p) => `- ${p.name}: ${p.beneficiaries} مستفيد، ${p.budget.toLocaleString()} دج`).join("\n")}
        `
        break

      default:
        reportContent = "تقرير عام للجمعية"
    }

    // Create and download the report
    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${reportData.title || "تقرير"}-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setGenerating(false)
    toast({
      title: "تم إنشاء التقرير",
      description: `تم إنشاء وتحميل ${reportData.title || "التقرير"} بنجاح`,
    })

    setOpen(false)
    setFormData({ type: "", period: "", format: "PDF", notes: "" })
  }

  const filterByPeriod = (data: any[], period: string) => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    return data.filter((item) => {
      const itemDate = new Date(item.date || item.joinDate)

      switch (period) {
        case "current_month":
          return itemDate.getMonth() === currentMonth && itemDate.getFullYear() === currentYear
        case "last_month":
          const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear
          return itemDate.getMonth() === lastMonth && itemDate.getFullYear() === lastMonthYear
        case "current_year":
          return itemDate.getFullYear() === currentYear
        case "all_time":
        default:
          return true
      }
    })
  }

  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "current_month":
        return "الشهر الحالي"
      case "last_month":
        return "الشهر الماضي"
      case "current_year":
        return "العام الحالي"
      case "all_time":
        return "جميع الفترات"
      default:
        return "فترة مخصصة"
    }
  }

  const getTopDonors = (donations: any[]) => {
    const donorTotals: { [key: string]: number } = {}
    donations.forEach((d) => {
      donorTotals[d.donor] = (donorTotals[d.donor] || 0) + d.amount
    })

    return Object.entries(donorTotals)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5)
  }

  const getProgramDistribution = (donations: any[]) => {
    const programTotals: { [key: string]: number } = {}
    donations.forEach((d) => {
      programTotals[d.program] = (programTotals[d.program] || 0) + d.amount
    })

    return Object.entries(programTotals)
      .map(([program, amount]) => `- ${program}: ${amount.toLocaleString()} دج`)
      .join("\n")
  }

  const getBeneficiaryProgramStats = (beneficiaries: any[]) => {
    const programStats: { [key: string]: number } = {}
    beneficiaries.forEach((b) => {
      programStats[b.program] = (programStats[b.program] || 0) + 1
    })
    return programStats
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileText className="w-4 h-4 ml-2" />
          إنشاء تقرير جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إنشاء تقرير جديد</DialogTitle>
          <DialogDescription>اختر نوع التقرير والفترة الزمنية المطلوبة</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              نوع التقرير *
            </Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر نوع التقرير" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="donations">تقرير التبرعات</SelectItem>
                <SelectItem value="beneficiaries">تقرير المستفيدين</SelectItem>
                <SelectItem value="programs">تقرير البرامج</SelectItem>
                <SelectItem value="performance">تقرير الأداء</SelectItem>
                <SelectItem value="monthly">تقرير شهري شامل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="period" className="text-right">
              الفترة الزمنية *
            </Label>
            <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current_month">الشهر الحالي</SelectItem>
                <SelectItem value="last_month">الشهر الماضي</SelectItem>
                <SelectItem value="current_year">العام الحالي</SelectItem>
                <SelectItem value="all_time">جميع الفترات</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="format" className="text-right">
              تنسيق الملف
            </Label>
            <Select value={formData.format} onValueChange={(value) => setFormData({ ...formData, format: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="اختر تنسيق الملف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Excel">Excel</SelectItem>
                <SelectItem value="Word">Word</SelectItem>
                <SelectItem value="Text">نص عادي</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              ملاحظات
            </Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="col-span-3"
              rows={3}
              placeholder="أي ملاحظات إضافية للتقرير..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={generating}>
            إلغاء
          </Button>
          <Button onClick={generateReport} disabled={!formData.type || !formData.period || generating}>
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2" />
                جاري الإنشاء...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 ml-2" />
                إنشاء وتحميل
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
