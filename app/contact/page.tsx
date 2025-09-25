import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Heart, MapPin, Phone, Mail, Clock, Users } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
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
              <Link href="/programs" className="text-foreground hover:text-primary transition-colors">
                برامجنا
              </Link>
              <Link href="/contact" className="text-primary font-semibold">
                اتصل بنا
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">تواصل معنا</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            نحن هنا لمساعدتك والإجابة على استفساراتك
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
                <CardDescription>املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input id="firstName" placeholder="أدخل اسمك الأول" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">اسم العائلة</Label>
                    <Input id="lastName" placeholder="أدخل اسم العائلة" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="example@email.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input id="phone" type="tel" placeholder="0123456789" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">الموضوع</Label>
                  <Input id="subject" placeholder="موضوع الرسالة" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea id="message" placeholder="اكتب رسالتك هنا..." className="min-h-[120px]" />
                </div>

                <Button className="w-full" size="lg">
                  إرسال الرسالة
                </Button>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">معلومات الاتصال</CardTitle>
                  <CardDescription>يمكنك التواصل معنا من خلال الطرق التالية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">العنوان</h4>
                      <p className="text-muted-foreground">طريق السياني قرب صيدلية ابن سينا أدرار</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">الهاتف</h4>
                      <p className="text-muted-foreground">متاح قريباً</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">البريد الإلكتروني</h4>
                      <p className="text-muted-foreground">متاح قريباً</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">ساعات العمل</h4>
                      <div className="text-muted-foreground space-y-1">
                        <p>السبت - الخميس: 8:00 ص - 4:00 م</p>
                        <p>الجمعة: مغلق</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donation Accounts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">حسابات التبرع</CardTitle>
                  <CardDescription>للتبرع عبر حساباتنا المصرفية</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">CCP</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">الحساب البريدي الجاري</p>
                      <p className="text-lg font-mono text-muted-foreground">210 243 29 CLE 40</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">CPA</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">الحساب المصرفي</p>
                      <p className="text-lg font-mono text-muted-foreground">004 001 854 100 009 720 30</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">زورونا في مقرنا</h3>
            <p className="text-lg text-muted-foreground mb-8">
              نرحب بزيارتكم لمقر الجمعية للتعرف على أنشطتنا وبرامجنا عن كثب
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">استشارة مجانية</h4>
                  <p className="text-sm text-muted-foreground">احصل على استشارة مجانية حول الخدمات المتاحة</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">انضم كمتطوع</h4>
                  <p className="text-sm text-muted-foreground">كن جزءاً من فريق المتطوعين وساهم في خدمة المجتمع</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">موقع مميز</h4>
                  <p className="text-sm text-muted-foreground">موقع سهل الوصول في قلب المدينة</p>
                </CardContent>
              </Card>
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
