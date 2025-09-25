"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Settings, Save, User, Bell, Shield, Database } from "lucide-react"
import { useAdminStore } from "@/lib/store/admin-store"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { settings, updateSettings } = useAdminStore()
  const { toast } = useToast()
  const [formData, setFormData] = useState(settings)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)

    // Simulate saving delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    updateSettings(formData)

    toast({
      title: "تم حفظ التغييرات",
      description: "تم حفظ إعدادات النظام بنجاح",
    })

    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">إعدادات النظام</h2>
          <p className="text-muted-foreground">إدارة إعدادات الجمعية والنظام</p>
        </div>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          <Save className="w-4 h-4 ml-2" />
          {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Association Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              معلومات الجمعية
            </CardTitle>
            <CardDescription>البيانات الأساسية للجمعية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="associationName">اسم الجمعية</Label>
                <Input
                  id="associationName"
                  value={formData.associationName}
                  onChange={(e) => handleInputChange("associationName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="associationNameEn">الاسم بالإنجليزية</Label>
                <Input
                  id="associationNameEn"
                  value={formData.associationNameEn}
                  onChange={(e) => handleInputChange("associationNameEn", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف الجمعية</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              الإعدادات السريعة
            </CardTitle>
            <CardDescription>إعدادات النظام الأساسية</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications">الإشعارات</Label>
                <p className="text-sm text-muted-foreground">تفعيل إشعارات النظام</p>
              </div>
              <Switch
                id="notifications"
                checked={formData.notifications}
                onCheckedChange={(checked) => handleInputChange("notifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications">إشعارات البريد</Label>
                <p className="text-sm text-muted-foreground">إرسال إشعارات عبر البريد</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={formData.emailNotifications}
                onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoBackup">النسخ الاحتياطي</Label>
                <p className="text-sm text-muted-foreground">نسخ احتياطي تلقائي</p>
              </div>
              <Switch
                id="autoBackup"
                checked={formData.autoBackup}
                onCheckedChange={(checked) => handleInputChange("autoBackup", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">وضع الصيانة</Label>
                <p className="text-sm text-muted-foreground">تفعيل وضع الصيانة</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={formData.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bank Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>حسابات التبرع</CardTitle>
          <CardDescription>إدارة حسابات الجمعية المصرفية</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">الحساب البريدي الجاري (CCP)</h4>
              <div className="space-y-2">
                <Label htmlFor="ccpNumber">رقم الحساب</Label>
                <Input
                  id="ccpNumber"
                  value={formData.ccpNumber}
                  onChange={(e) => handleInputChange("ccpNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ccpBank">البنك</Label>
                <Input
                  id="ccpBank"
                  value={formData.ccpBank}
                  onChange={(e) => handleInputChange("ccpBank", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">الحساب المصرفي (CPA)</h4>
              <div className="space-y-2">
                <Label htmlFor="cpaNumber">رقم الحساب</Label>
                <Input
                  id="cpaNumber"
                  value={formData.cpaNumber}
                  onChange={(e) => handleInputChange("cpaNumber", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpaBank">البنك</Label>
                <Input
                  id="cpaBank"
                  value={formData.cpaBank}
                  onChange={(e) => handleInputChange("cpaBank", e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            إدارة المستخدمين
          </CardTitle>
          <CardDescription>إعدادات المستخدمين والصلاحيات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">المدير العام</h4>
                  <p className="text-sm text-muted-foreground">admin@elbaraka.org</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                تعديل الصلاحيات
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">مساعد إداري</h4>
                  <p className="text-sm text-muted-foreground">assistant@elbaraka.org</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                تعديل الصلاحيات
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              معلومات النظام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">إصدار النظام:</span>
              <span className="font-medium">v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">آخر تحديث:</span>
              <span className="font-medium">2024-12-08</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">حجم قاعدة البيانات:</span>
              <span className="font-medium">45.2 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">عدد المستخدمين:</span>
              <span className="font-medium">2</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              الأمان والحماية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="w-4 h-4 ml-2" />
              تغيير كلمة المرور
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Database className="w-4 h-4 ml-2" />
              إنشاء نسخة احتياطية
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Settings className="w-4 h-4 ml-2" />
              إعدادات الأمان
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
