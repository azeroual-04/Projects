"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Users, DollarSign, TrendingUp, Edit, Eye, MoreHorizontal, Search, Filter, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AddProgramDialog } from "@/components/admin/add-program-dialog"
import { useAdminStore } from "@/lib/store/admin-store"
import { toast } from "@/hooks/use-toast"

export default function ProgramsPage() {
  const { programs, deleteProgram, updateProgram } = useAdminStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")

  const stats = useMemo(() => {
    const total = programs.length
    const active = programs.filter((p) => p.status === "نشط").length
    const totalBeneficiaries = programs.reduce((sum, p) => sum + p.beneficiaries, 0)
    const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0)

    return { total, active, totalBeneficiaries, totalBudget }
  }, [programs])

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const matchesSearch =
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "all" || program.status === filterStatus
      const matchesCategory = filterCategory === "all" || program.category === filterCategory

      return matchesSearch && matchesStatus && matchesCategory
    })
  }, [programs, searchTerm, filterStatus, filterCategory])

  const handleDelete = (id: number, name: string) => {
    if (confirm(`هل أنت متأكد من حذف برنامج "${name}"؟`)) {
      deleteProgram(id)
      toast({
        title: "تم حذف البرنامج",
        description: `تم حذف ${name} بنجاح`,
      })
    }
  }

  const handleStatusUpdate = (id: number, newStatus: string) => {
    updateProgram(id, { status: newStatus as any })
    toast({
      title: "تم تحديث الحالة",
      description: `تم تحديث حالة البرنامج إلى ${newStatus}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">إدارة البرامج</h2>
          <p className="text-muted-foreground">إدارة وتتبع برامج الجمعية وأنشطتها</p>
        </div>
        <AddProgramDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي البرامج</p>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              </div>
              <Heart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">البرامج النشطة</p>
                <p className="text-2xl font-bold text-foreground">{stats.active}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المستفيدين</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalBeneficiaries}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الميزانية</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalBudget.toLocaleString()} دج</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث عن برنامج..."
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
                <DropdownMenuItem onClick={() => setFilterStatus("نشط")}>نشط</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("موسمي")}>موسمي</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("معلق")}>معلق</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("منتهي")}>منتهي</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">الفئة ({filterCategory === "all" ? "الكل" : filterCategory})</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterCategory("all")}>الكل</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("إغاثة")}>إغاثة</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("تعليم")}>تعليم</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("صحة")}>صحة</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("إسكان")}>إسكان</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("تنمية")}>تنمية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterCategory("أخرى")}>أخرى</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={program.status === "نشط" ? "default" : program.status === "موسمي" ? "secondary" : "outline"}
                >
                  {program.status}
                </Badge>
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
                      تعديل البرنامج
                    </DropdownMenuItem>
                    {program.status !== "نشط" && (
                      <DropdownMenuItem onClick={() => handleStatusUpdate(program.id, "نشط")}>
                        تفعيل البرنامج
                      </DropdownMenuItem>
                    )}
                    {program.status !== "معلق" && (
                      <DropdownMenuItem onClick={() => handleStatusUpdate(program.id, "معلق")}>
                        تعليق البرنامج
                      </DropdownMenuItem>
                    )}
                    {program.status !== "منتهي" && (
                      <DropdownMenuItem onClick={() => handleStatusUpdate(program.id, "منتهي")}>
                        إنهاء البرنامج
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(program.id, program.name)}
                    >
                      <Trash2 className="w-4 h-4 ml-2" />
                      حذف البرنامج
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="text-lg">{program.name}</CardTitle>
              <CardDescription>{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">المستفيدين:</span>
                  <span className="font-medium">{program.beneficiaries}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">الميزانية:</span>
                  <span className="font-medium">{program.budget.toLocaleString()} دج</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">تاريخ البداية:</span>
                  <span className="font-medium">{program.startDate}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">الفئة:</span>
                  <Badge variant="outline" className="text-xs">
                    {program.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center text-muted-foreground">
              {searchTerm || filterStatus !== "all" || filterCategory !== "all"
                ? "لا توجد برامج تطابق البحث أو التصفية"
                : "لا توجد برامج مسجلة بعد"}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Program Performance */}
      {filteredPrograms.filter((p) => p.status === "نشط").length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>أداء البرامج النشطة</CardTitle>
            <CardDescription>إحصائيات البرامج النشطة حاليًا</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPrograms
                .filter((p) => p.status === "نشط")
                .map((program) => (
                  <div key={program.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div>
                      <h4 className="font-medium text-foreground">{program.name}</h4>
                      <p className="text-sm text-muted-foreground">{program.beneficiaries} مستفيد</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-foreground">{program.budget.toLocaleString()} دج</p>
                      <p className="text-xs text-muted-foreground">الميزانية المخصصة</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
