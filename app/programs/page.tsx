import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, GraduationCap, Home, Utensils, Stethoscope, BookOpen, Handshake } from "lucide-react"
import Link from "next/link"

export default function ProgramsPage() {
  const programs = [
    {
      icon: Utensils,
      title: "برنامج الإغاثة الغذائية",
      description: "توزيع المواد الغذائية الأساسية على الأسر المحتاجة بشكل دوري، خاصة في شهر رمضان والمناسبات الدينية.",
      status: "نشط",
      beneficiaries: "150+ أسرة",
    },
    {
      icon: GraduationCap,
      title: "برنامج الدعم التعليمي",
      description: "تقديم المساعدات المدرسية للطلاب المحتاجين، شراء الكتب والأدوات المدرسية، ودعم التفوق الدراسي.",
      status: "نشط",
      beneficiaries: "200+ طالب",
    },
    {
      icon: Stethoscope,
      title: "برنامج الرعاية الصحية",
      description: "تنظيم قوافل طبية مجانية، توفير الأدوية للمرضى المحتاجين، والمساعدة في تكاليف العلاج.",
      status: "موسمي",
      beneficiaries: "300+ مستفيد",
    },
    {
      icon: Home,
      title: "برنامج الإسكان",
      description: "المساعدة في ترميم المنازل المتضررة وبناء مساكن للأسر الأكثر حاجة في المنطقة.",
      status: "حسب الحاجة",
      beneficiaries: "25+ أسرة",
    },
    {
      icon: BookOpen,
      title: "برنامج محو الأمية",
      description: "تنظيم دورات تعليمية لمحو الأمية وتعليم القراءة والكتابة للكبار، خاصة النساء.",
      status: "نشط",
      beneficiaries: "80+ متعلم",
    },
    {
      icon: Handshake,
      title: "برنامج التدريب المهني",
      description: "تنظيم ورش تدريبية لتعليم المهن والحرف اليدوية لمساعدة الشباب على إيجاد فرص عمل.",
      status: "نشط",
      beneficiaries: "60+ متدرب",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">جمعية البركة سوق نعمان</h1>
                <p className="text-sm text-muted-foreground">El Baraka Souknaamane</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">
                الرئيسية
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link href="/programs" className="text-primary font-semibold">
                برامجنا
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                اتصل بنا
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">برامجنا وخدماتنا</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            نقدم مجموعة متنوعة من البرامج والخدمات لخدمة المجتمع وتلبية احتياجات المستفيدين
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program, index) => {
              const IconComponent = program.icon
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <IconComponent className="w-12 h-12 text-primary" />
                      <Badge variant={program.status === "نشط" ? "default" : "secondary"}>{program.status}</Badge>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-4">{program.description}</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{program.beneficiaries}</span>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Impact Statistics */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">أثرنا في المجتمع</h3>
            <p className="text-lg text-muted-foreground">أرقام تعكس حجم الخدمات التي نقدمها للمجتمع</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">815+</div>
                <div className="text-lg font-semibold text-foreground mb-1">إجمالي المستفيدين</div>
                <div className="text-sm text-muted-foreground">من جميع البرامج</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">6</div>
                <div className="text-lg font-semibold text-foreground mb-1">برامج نشطة</div>
                <div className="text-sm text-muted-foreground">تخدم المجتمع</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-lg font-semibold text-foreground mb-1">أسرة مستفيدة</div>
                <div className="text-sm text-muted-foreground">من الإغاثة الغذائية</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-lg font-semibold text-foreground mb-1">طالب مدعوم</div>
                <div className="text-sm text-muted-foreground">في التعليم</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How to Apply */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">كيفية الاستفادة من خدماتنا</h3>
              <p className="text-lg text-muted-foreground">خطوات بسيطة للحصول على المساعدة والدعم</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">التقديم</h4>
                  <p className="text-muted-foreground">
                    قم بزيارة مقر الجمعية أو تواصل معنا لتقديم طلب الاستفادة من الخدمات
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">التقييم</h4>
                  <p className="text-muted-foreground">
                    سيقوم فريقنا بدراسة حالتك وتقييم احتياجاتك لتحديد البرنامج المناسب
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">الاستفادة</h4>
                  <p className="text-muted-foreground">بعد الموافقة، ستتمكن من الاستفادة من الخدمات والبرامج المتاحة</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">هل تحتاج للمساعدة؟</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            لا تتردد في التواصل معنا للحصول على المساعدة أو للاستفسار عن برامجنا وخدماتنا
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">تواصل معنا الآن</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">جمعية البركة سوق نعمان</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 جمعية البركة سوق نعمان. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}
