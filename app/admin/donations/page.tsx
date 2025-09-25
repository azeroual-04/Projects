"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  Search,
  Filter,
  TrendingUp,
  Calendar,
  Users,
  MoreHorizontal,
  Edit,
  Trash2,
  Receipt,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddDonationDialog } from "@/components/admin/add-donation-dialog"
import { useAdminStore } from "@/lib/store/admin-store"
import { toast } from "@/hooks/use-toast"

export default function DonationsPage() {
  const { donations, deleteDonation, updateDonation } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterType, setFilterType] = useState<string>("all")

  const stats = useMemo(() => {
    const total = donations.reduce((sum, d) => sum + d.amount, 0)
    const thisMonth = donations
      .filter((d) => {
        const donationDate = new Date(d.date)
        const now = new Date()
        return donationDate.getMonth() === now.getMonth() && donationDate.getFullYear() === now.getFullYear()
      })
      .reduce((sum, d) => sum + d.amount, 0)

    const uniqueDonors = new Set(donations.map((d) => d.donor)).size
    const average = donations.length > 0 ? Math.round(total / donations.length) : 0

    return { total, thisMonth, uniqueDonors, average }
  }, [donations])

  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.amount.toString().includes(searchTerm)

      const matchesStatus = filterStatus === "all" || donation.status === filterStatus
      const matchesType = filterType === "all" || donation.type === filterType

      return matchesSearch && matchesStatus && matchesType
    })
  }, [donations, searchTerm, filterStatus, filterType])

  const handleDelete = (id: number, donor: string) => {
    if (confirm(`هل أنت متأكد من حذف تبرع "${donor}"؟`)) {
      deleteDonation(id)
      toast({
        title: "تم حذف التبرع",
        description: `تم حذف تبرع ${donor} بنجاح`,
      })
    }
  }

  const handleStatusUpdate = (id: number, newStatus: string) => {
    updateDonation(id, { status: newStatus as any })
    toast({
      title: "تم تحديث الحالة",
      description: `تم تحديث حالة التبرع إلى ${newStatus}`,
    })
  }

  const monthlyStats = useMemo(() => {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ]
    const currentYear = new Date().getFullYear()

    return months
      .map((month, index) => {
        const monthDonations = donations.filter((d) => {
          const donationDate = new Date(d.date)
          return donationDate.getMonth() === index && donationDate.getFullYear() === currentYear
        })
        const amount = monthDonations.reduce((sum, d) => sum + d.amount, 0)
        return { month, amount }
      })
      .filter((stat) => stat.amount > 0)
  }, [donations])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">إدارة التبرعات</h2>
          <p className="text-muted-foreground">تتبع وإدارة التبرعات الواردة للجمعية</p>
        </div>
        <AddDonationDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي التبرعات</p>
                <p className="text-2xl font-bold text-foreground">{stats.total.toLocaleString()} دج</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  {donations.length} تبرع
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">تبرعات هذا الشهر</p>
                <p className="text-2xl font-bold text-foreground">{stats.thisMonth.toLocaleString()} دج</p>
                <p className="text-xs text-blue-600 flex items-center gap-1 mt-1">
                  <Calendar className="w-3 h-3" />
                  ديسمبر 2024
                </p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">عدد المتبرعين</p>
                <p className="text-2xl font-bold text-foreground">{stats.uniqueDonors}</p>
                <p className="text-xs text-purple-600 flex items-center gap-1 mt-1">
                  <Users className="w-3 h-3" />
                  متبرع فريد
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط التبرع</p>
                <p className="text-2xl font-bold text-foreground">{stats.average.toLocaleString()} دج</p>
                <p className="text-xs text-yellow-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  متوسط عام
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث عن تبرع أو متبرع..."
                  className="pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 ml-2" />
                  الحالة ({filterStatus === "all" ? "الكل" : filterStatus})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>الكل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("مؤكد")}>مؤكد</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("قيد المراجعة")}>قيد المراجعة</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("مرفوض")}>مرفوض</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">النوع ({filterType === "all" ? "الكل" : filterType})</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterType("all")}>الكل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("نقدي")}>نقدي</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("تحويل بنكي")}>تحويل بنكي</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType("شيك")}>شيك</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        <CardHeader>
          <CardTitle>سجل التبرعات</CardTitle>
          <CardDescription>
            {filteredDonations.length} من {donations.length} تبرع
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المتبرع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">المبلغ</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">النوع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">البرنامج</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">التاريخ</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{donation.donor}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-green-600">{donation.amount.toLocaleString()} دج</div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{donation.type}</td>
                    <td className="py-3 px-4 text-muted-foreground">{donation.program}</td>
                    <td className="py-3 px-4 text-muted-foreground">{donation.date}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          donation.status === "مؤكد"
                            ? "default"
                            : donation.status === "قيد المراجعة"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {donation.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Receipt className="w-4 h-4 ml-2" />
                            طباعة إيصال
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          {donation.status !== "مؤكد" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(donation.id, "مؤكد")}>
                              تأكيد التبرع
                            </DropdownMenuItem>
                          )}
                          {donation.status !== "قيد المراجعة" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(donation.id, "قيد المراجعة")}>
                              وضع قيد المراجعة
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(donation.id, donation.donor)}
                          >
                            <Trash2 className="w-4 h-4 ml-2" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDonations.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || filterStatus !== "all" || filterType !== "all"
                ? "لا توجد نتائج تطابق البحث أو التصفية"
                : "لا توجد تبرعات مسجلة بعد"}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Donations Chart */}
      {monthlyStats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>إحصائيات التبرعات الشهرية</CardTitle>
            <CardDescription>تطور التبرعات خلال الأشهر الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.map((stat, index) => {
                const maxAmount = Math.max(...monthlyStats.map((s) => s.amount))
                return (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="font-medium text-foreground">{stat.month}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(stat.amount / maxAmount) * 100}%` }}
                        />
                      </div>
                      <span className="font-semibold text-foreground min-w-[80px] text-left">
                        {stat.amount.toLocaleString()} دج
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
