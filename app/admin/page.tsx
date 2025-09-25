import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, DollarSign, TrendingUp, Calendar, UserCheck, FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      title: "إجمالي المستفيدين",
      value: "815",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "البرامج النشطة",
      value: "6",
      change: "+1",
      icon: Heart,
      color: "text-green-600",
    },
    {
      title: "التبرعات هذا الشهر",
      value: "45,000 دج",
      change: "+8%",
      icon: DollarSign,
      color: "text-yellow-600",
    },
    {
      title: "المتطوعين النشطين",
      value: "24",
      change: "+3",
      icon: UserCheck,
      color: "text-purple-600",
    },
  ]

  const recentActivities = [
    {
      type: "donation",
      message: "تبرع جديد بقيمة 5,000 دج",
      time: "منذ ساعتين",
      icon: DollarSign,
    },
    {
      type: "beneficiary",
      message: "إضافة مستفيد جديد - أحمد محمد",
      time: "منذ 4 ساعات",
      icon: Users,
    },
    {
      type: "program",
      message: "بدء برنامج الإغاثة الغذائية الشهرية",
      time: "أمس",
      icon: Heart,
    },
    {
      type: "volunteer",
      message: "انضمام متطوع جديد - فاطمة علي",
      time: "أمس",
      icon: UserCheck,
    },
  ]

  const upcomingEvents = [
    {
      title: "توزيع المساعدات الغذائية",
      date: "15 ديسمبر 2024",
      type: "برنامج",
    },
    {
      title: "اجتماع مجلس الإدارة",
      date: "20 ديسمبر 2024",
      type: "اجتماع",
    },
    {
      title: "حملة التبرعات الشتوية",
      date: "25 ديسمبر 2024",
      type: "حملة",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">مرحباً بك في لوحة الإدارة</h2>
        <p className="text-muted-foreground">نظرة عامة على أنشطة الجمعية وإحصائياتها</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-secondary ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              الأنشطة الأخيرة
            </CardTitle>
            <CardDescription>آخر الأنشطة والتحديثات في النظام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon
                return (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              الأحداث القادمة
            </CardTitle>
            <CardDescription>الأنشطة والفعاليات المجدولة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 rounded-lg border border-border">
                  <h4 className="font-medium text-foreground text-sm">{event.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
          <CardDescription>الإجراءات الأكثر استخداماً</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild className="h-20 flex-col gap-2">
              <Link href="/admin/beneficiaries">
                <Users className="w-6 h-6" />
                إضافة مستفيد
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Link href="/admin/donations">
                <DollarSign className="w-6 h-6" />
                تسجيل تبرع
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Link href="/admin/programs">
                <Heart className="w-6 h-6" />
                إدارة البرامج
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Link href="/admin/reports">
                <FileText className="w-6 h-6" />
                إنشاء تقرير
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <div>
              <h4 className="font-medium text-yellow-800">تذكير مهم</h4>
              <p className="text-sm text-yellow-700">
                موعد اجتماع مجلس الإدارة القادم في 20 ديسمبر 2024. تأكد من إعداد التقارير المطلوبة.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
