"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddBeneficiaryDialog } from "@/components/admin/add-beneficiary-dialog"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"
import type { Beneficiary } from "@/lib/types/database"

export default function BeneficiariesPage() {
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const supabase = createClient()

  useEffect(() => {
    loadBeneficiaries()
  }, [])

  const loadBeneficiaries = async () => {
    try {
      const { data, error } = await supabase.from("beneficiaries").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setBeneficiaries(data || [])
    } catch (error) {
      console.error("Error loading beneficiaries:", error)
      toast({
        title: "خطأ في تحميل البيانات",
        description: "حدث خطأ أثناء تحميل قائمة المستفيدين",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const stats = useMemo(() => {
    const total = beneficiaries.length
    const approved = beneficiaries.filter((b) => b.status === "approved").length
    const pending = beneficiaries.filter((b) => b.status === "pending").length
    const thisMonth = beneficiaries.filter((b) => {
      const createdDate = new Date(b.created_at)
      const now = new Date()
      return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear()
    }).length

    return { total, approved, pending, thisMonth }
  }, [beneficiaries])

  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries.filter((beneficiary) => {
      const matchesSearch =
        beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        beneficiary.needs.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesFilter = filterStatus === "all" || beneficiary.status === filterStatus

      return matchesSearch && matchesFilter
    })
  }, [beneficiaries, searchTerm, filterStatus])

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`هل أنت متأكد من حذف المستفيد "${name}"؟`)) {
      try {
        const { error } = await supabase.from("beneficiaries").delete().eq("id", id)

        if (error) throw error

        setBeneficiaries((prev) => prev.filter((b) => b.id !== id))
        toast({
          title: "تم حذف المستفيد",
          description: `تم حذف ${name} بنجاح`,
        })
      } catch (error) {
        console.error("Error deleting beneficiary:", error)
        toast({
          title: "خطأ في الحذف",
          description: "حدث خطأ أثناء حذف المستفيد",
          variant: "destructive",
        })
      }
    }
  }

  const handleStatusChange = async (id: string, newStatus: "pending" | "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("beneficiaries")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id)

      if (error) throw error

      setBeneficiaries((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)))

      toast({
        title: "تم تحديث الحالة",
        description: "تم تحديث حالة المستفيد بنجاح",
      })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث حالة المستفيد",
        variant: "destructive",
      })
    }
  }

  const refreshBeneficiaries = () => {
    loadBeneficiaries()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">إدارة المستفيدين</h2>
          <p className="text-muted-foreground">إدارة قاعدة بيانات المستفيدين من خدمات الجمعية</p>
        </div>
        <AddBeneficiaryDialog onSuccess={refreshBeneficiaries} />
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
                <p className="text-sm font-medium text-muted-foreground">المستفيدين المعتمدين</p>
                <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
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
                  تصفية (
                  {filterStatus === "all"
                    ? "الكل"
                    : filterStatus === "approved"
                      ? "معتمد"
                      : filterStatus === "pending"
                        ? "معلق"
                        : "مرفوض"}
                  )
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>الكل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("approved")}>معتمد</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("pending")}>معلق</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>مرفوض</DropdownMenuItem>
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
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">العمر</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الموقع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">حجم الأسرة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الاحتياجات</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">تاريخ التسجيل</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredBeneficiaries.map((beneficiary) => (
                  <tr key={beneficiary.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{beneficiary.name}</div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.age} سنة</td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.location}</td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.family_size} أفراد</td>
                    <td className="py-3 px-4 text-muted-foreground">{beneficiary.needs}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          beneficiary.status === "approved"
                            ? "default"
                            : beneficiary.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {beneficiary.status === "approved"
                          ? "معتمد"
                          : beneficiary.status === "pending"
                            ? "معلق"
                            : "مرفوض"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(beneficiary.created_at).toLocaleDateString("ar-SA")}
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
                            <Eye className="w-4 h-4 ml-2" />
                            عرض التفاصيل
                          </DropdownMenuItem>
                          {beneficiary.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusChange(beneficiary.id, "approved")}>
                                <Edit className="w-4 h-4 ml-2" />
                                اعتماد
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(beneficiary.id, "rejected")}>
                                <Edit className="w-4 h-4 ml-2" />
                                رفض
                              </DropdownMenuItem>
                            </>
                          )}
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
