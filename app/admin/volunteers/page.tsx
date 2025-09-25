import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Search, Plus, Filter, Users, Calendar, Award, MoreHorizontal, Eye, Edit, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function VolunteersPage() {
  const volunteers = [
    {
      id: 1,
      name: "محمد أحمد",
      role: "منسق البرامج",
      department: "الإغاثة الغذائية",
      joinDate: "2024-01-15",
      status: "نشط",
      phone: "0555123456",
      hours: 120,
    },
    {
      id: 2,
      name: "فاطمة علي",
      role: "مساعدة إدارية",
      department: "الإدارة",
      joinDate: "2024-02-20",
      status: "نشط",
      phone: "0555234567",
      hours: 95,
    },
    {
      id: 3,
      name: "عبدالله حسن",
      role: "مشرف ميداني",
      department: "الرعاية الصحية",
      joinDate: "2024-03-10",
      status: "إجازة",
      phone: "0555345678",
      hours: 80,
    },
    {
      id: 4,
      name: "عائشة محمد",
      role: "منسقة التعليم",
      department: "الدعم التعليمي",
      joinDate: "2024-04-05",
      status: "نشط",
      phone: "0555456789",
      hours: 110,
    },
  ]

  const departments = [
    { name: "الإغاثة الغذائية", volunteers: 8, color: "bg-blue-100 text-blue-800" },
    { name: "الدعم التعليمي", volunteers: 6, color: "bg-green-100 text-green-800" },
    { name: "الرعاية الصحية", volunteers: 5, color: "bg-purple-100 text-purple-800" },
    { name: "الإدارة", volunteers: 3, color: "bg-yellow-100 text-yellow-800" },
    { name: "العلاقات العامة", volunteers: 2, color: "bg-pink-100 text-pink-800" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">إدارة المتطوعين</h2>
          <p className="text-muted-foreground">إدارة فريق المتطوعين وتتبع مساهماتهم</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة متطوع جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المتطوعين</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المتطوعين النشطين</p>
                <p className="text-2xl font-bold text-foreground">21</p>
              </div>
              <UserCheck className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ساعات التطوع الشهرية</p>
                <p className="text-2xl font-bold text-foreground">405</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متطوعين جدد هذا الشهر</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments */}
      <Card>
        <CardHeader>
          <CardTitle>الأقسام والمتطوعين</CardTitle>
          <CardDescription>توزيع المتطوعين على الأقسام المختلفة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {departments.map((dept, index) => (
              <div key={index} className="p-4 rounded-lg border border-border text-center">
                <h4 className="font-medium text-foreground mb-2">{dept.name}</h4>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${dept.color}`}>
                  {dept.volunteers} متطوع
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="البحث عن متطوع..." className="pr-10" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 ml-2" />
              تصفية
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Volunteers Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المتطوعين</CardTitle>
          <CardDescription>جميع المتطوعين المسجلين في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الاسم</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الدور</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">القسم</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">تاريخ الانضمام</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الحالة</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">ساعات التطوع</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.map((volunteer) => (
                  <tr key={volunteer.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{volunteer.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {volunteer.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{volunteer.role}</td>
                    <td className="py-3 px-4 text-muted-foreground">{volunteer.department}</td>
                    <td className="py-3 px-4 text-muted-foreground">{volunteer.joinDate}</td>
                    <td className="py-3 px-4">
                      <Badge variant={volunteer.status === "نشط" ? "default" : "secondary"}>{volunteer.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{volunteer.hours}</span>
                        <span className="text-sm text-muted-foreground">ساعة</span>
                      </div>
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
                            عرض الملف
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 ml-2" />
                            تعديل البيانات
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 ml-2" />
                            تسجيل ساعات
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Top Volunteers */}
      <Card>
        <CardHeader>
          <CardTitle>أفضل المتطوعين هذا الشهر</CardTitle>
          <CardDescription>المتطوعين الأكثر نشاطاً ومساهمة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {volunteers
              .sort((a, b) => b.hours - a.hours)
              .slice(0, 3)
              .map((volunteer, index) => (
                <div key={volunteer.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{volunteer.name}</h4>
                      <p className="text-sm text-muted-foreground">{volunteer.department}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{volunteer.hours} ساعة</p>
                    <p className="text-sm text-muted-foreground">{volunteer.role}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
