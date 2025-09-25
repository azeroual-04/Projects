import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Heart, Target, Award, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
              <Link href="/about" className="text-primary font-semibold">
                من نحن
              </Link>
              <Link href="/programs" className="text-foreground hover:text-primary transition-colors">
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
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">من نحن</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            تعرف على رسالتنا ورؤيتنا وقيمنا في خدمة المجتمع
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="h-full">
              <CardHeader>
                <Target className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">رسالتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  نسعى لتقديم الدعم والمساعدة للأسر المحتاجة في منطقة سوق نعمان من خلال برامج متنوعة تشمل المساعدات
                  الاجتماعية، التعليم، والرعاية الصحية، بهدف تحسين جودة الحياة وبناء مجتمع متماسك ومتضامن.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <Award className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-lg leading-relaxed">
                  أن نكون الجمعية الرائدة في العمل الخيري والتنموي بمنطقة سوق نعمان، ونساهم في بناء مجتمع قوي ومتماسك
                  يتمتع فيه كل فرد بحياة كريمة ومستقرة، من خلال العمل المؤسسي المتميز والشراكات الفعالة.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">قيمنا</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              نؤمن بمجموعة من القيم الأساسية التي توجه عملنا وتحدد هويتنا
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Heart className="w-10 h-10 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">التضامن</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>نؤمن بأهمية التكافل الاجتماعي والوقوف مع المحتاجين</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">الشفافية</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>نلتزم بالشفافية في جميع أعمالنا ومعاملاتنا المالية</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="w-10 h-10 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">الفعالية</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>نسعى لتحقيق أقصى استفادة من الموارد المتاحة</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Award className="w-10 h-10 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">الجودة</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>نلتزم بتقديم خدمات عالية الجودة لمستفيدينا</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">تاريخنا</h3>
              <p className="text-lg text-muted-foreground">مسيرة من العطاء والخدمة المجتمعية</p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-2">التأسيس</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        تأسست جمعية البركة سوق نعمان بهدف خدمة المجتمع المحلي وتقديم الدعم للأسر المحتاجة في المنطقة.
                        بدأت الجمعية بمجموعة من المتطوعين المتحمسين الذين آمنوا بأهمية العمل الخيري والتضامن الاجتماعي.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-2">الموقع</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        تقع الجمعية في طريق السياني قرب صيدلية ابن سينا بأدرار، في موقع استراتيجي يسهل الوصول إليها من
                        قبل المستفيدين والمتطوعين. هذا الموقع يمكننا من تقديم خدماتنا بفعالية أكبر للمجتمع المحلي.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">انضم إلى مسيرتنا</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            كن جزءاً من التغيير الإيجابي في مجتمعنا وساهم في بناء مستقبل أفضل للجميع
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">تواصل معنا</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/programs">تعرف على برامجنا</Link>
            </Button>
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
