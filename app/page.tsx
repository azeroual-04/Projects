import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Heart, Target } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">جمعية البركة سوق نعمان</h1>
                <p className="text-sm text-muted-foreground">El Baraka Souknaamane</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                من نحن
              </Link>
              <Link href="/programs" className="text-foreground hover:text-primary transition-colors">
                برامجنا
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
                اتصل بنا
              </Link>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">لوحة الإدارة</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">معاً نبني مستقبلاً أفضل</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            جمعية البركة سوق نعمان تعمل على خدمة المجتمع وتقديم المساعدة للمحتاجين من خلال برامج متنوعة وفعالة
          </p>
          <Button size="lg" className="text-lg px-8 py-3">
            انضم إلينا
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">من نحن</h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
              جمعية البركة سوق نعمان هي منظمة خيرية تهدف إلى خدمة المجتمع المحلي وتقديم الدعم للأسر المحتاجة
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>خدمة المجتمع</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  نعمل على تقديم الخدمات المتنوعة لأفراد المجتمع وتلبية احتياجاتهم الأساسية
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>العمل الخيري</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  نقوم بتنظيم حملات خيرية وجمع التبرعات لمساعدة الأسر المحتاجة والفقيرة
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Target className="w-12 h-12 text-primary mx-auto mb-4" />
                <CardTitle>التنمية المستدامة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  نسعى لتحقيق التنمية المستدامة من خلال برامج التدريب والتأهيل المهني
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">للتبرع عبر حساباتنا</h3>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">CCP</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">الحساب البريدي الجاري</p>
                      <p className="text-lg font-mono text-muted-foreground">210 243 29 CLE 40</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">CPA</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">الحساب المصرفي</p>
                      <p className="text-lg font-mono text-muted-foreground">004 001 854 100 009 720 30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <h4 className="text-xl font-bold text-foreground mb-4">العنوان</h4>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <p>طريق السياني قرب صيدلية ابن سينا أدرار</p>
              </div>
            </div>
          </div>
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
