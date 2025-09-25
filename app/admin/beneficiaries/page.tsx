"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddBeneficiaryDialog } from "@/components/admin/add-beneficiary-dialog"
import { useAdminStore } from "@/lib/store/admin-store"
import { toast } from "@/hooks/use-toast"

export default function BeneficiariesPage() {
  const { beneficiaries, deleteBeneficiary } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const stats = useMemo(() => {
    const total = beneficiaries.length
    const active = beneficiaries.filter((b) => b.status === "نشط").length
    const pending = beneficiaries.filter((b) => b.status === "معلق").length
    const thisMonth = beneficiaries.filter((b) => {
      const joinDate = new Date(b.joinDate)
      const now = new Date()
      return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
    }).length

    return { total, active, pending, thisMonth }
  }, [beneficiaries])

  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries.filter((beneficiary) => {
      const matchesSearch =
        beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.phone.includes(searchTerm) ||
        beneficiary.program.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter = filterStatus === "all" || beneficiary.status === filterStatus

      return matchesSearch && matchesFilter
    })
  }, [beneficiaries, searchTerm, filterStatus])

  const handleDelete = (id: number, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المستفيد "${name}"؟`)) {
      deleteBeneficiary(id)
      toast({
        title: "تم حذف المستفيد",
        description: `تم حذف ${name} بنجاح`,
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">إدارة المستفيدين</h2>
          <p className="text-muted-foreground">إدارة قاعدة بيانات المستفيدين من خدمات الجمعية</p>
        </div>
        <AddBeneficiaryDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المستفيدين</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المستفيدين النشطين</p>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الحالات المعلقة</p>
                <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              </div>
              <Users className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">مستفيدين جدد هذا الشهر</p>
                <p className="text-2xl font-bold text-foreground">{stats.thisMonth}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
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
                  placeholder="البحث عن مستفيد..."
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
                  تصفية ({filterStatus === "all" ? "الكل" : filterStatus})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>الكل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("نشط")}>نشط</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("معلق")}>معلق</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("غير نشط")}>غير نشط</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Beneficiaries Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المستفيدين</CardTitle>
          <CardDescription>
            {filteredBeneficiaries.length} من {beneficiaries.length} مستفيد
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الاسم</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">حجم الأسرة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">البرنامج</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">تاريخ الانضمام</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">رقم الهاتف</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{beneficiary.name}</div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.familySize} أفراد</td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.program}</td>
                    <td className="py-3 px-4">
                      <Badge variant={beneficiary.status === "نشط" ? "default" : "secondary"}>
                        {beneficiary.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.joinDate}</td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.phone}</td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(beneficiary.id, beneficiary.name)}
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
          {filteredBeneficiaries.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || filterStatus !== "all"
                ? "لا توجد نتائج تطابق البحث أو التصفية"
                : "لا توجد مستفيدين مسجلين بعد"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
