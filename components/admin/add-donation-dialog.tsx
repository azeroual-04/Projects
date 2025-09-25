"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { useAdminStore } from "@/lib/store/admin-store"
import { toast } from "@/hooks/use-toast"

export function AddDonationDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    donor: "",
    amount: "",
    type: "نقدي" as const,
    program: "",
    status: "مؤكد" as const,
    notes: "",
  })

  const addDonation = useAdminStore((state) => state.addDonation)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.donor || !formData.amount || !formData.program) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "خطأ في المبلغ",
        description: "يرجى إدخال مبلغ صحيح",
        variant: "destructive",
      })
      return
    }

    addDonation({
      donor: formData.donor,
      amount: amount,
      type: formData.type,
      program: formData.program,
      status: formData.status,
      date: new Date().toISOString().split("T")[0],
      notes: formData.notes,
    })

    toast({
      title: "تم تسجيل التبرع",
      description: `تم تسجيل تبرع ${formData.donor} بمبلغ ${amount} دج بنجاح`,
    })

    // Reset form
    setFormData({
      donor: "",
      amount: "",
      type: "نقدي",
      program: "",
      status: "مؤكد",
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          تسجيل تبرع جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تسجيل تبرع جديد</DialogTitle>
          <DialogDescription>أدخل بيانات التبرع الجديد في النموذج أدناه</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="donor" className="text-right">
                اسم المتبرع *
              </Label>
              <Input
                id="donor"
                value={formData.donor}
                onChange={(e) => setFormData({ ...formData, donor: e.target.value })}
                className="col-span-3"
                placeholder="أحمد محمد أو شركة النور"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                المبلغ (دج) *
              </Label>
              <Input
                id="amount"
                type="number"
                min="1"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="col-span-3"
                placeholder="5000"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                نوع التبرع *
              </Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر نوع التبرع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="نقدي">نقدي</SelectItem>
                  <SelectItem value="تحويل بنكي">تحويل بنكي</SelectItem>
                  <SelectItem value="شيك">شيك</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="program" className="text-right">
                البرنامج *
              </Label>
              <Select value={formData.program} onValueChange={(value) => setFormData({ ...formData, program: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر البرنامج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="الإغاثة الغذائية">الإغاثة الغذائية</SelectItem>
                  <SelectItem value="الدعم التعليمي">الدعم التعليمي</SelectItem>
                  <SelectItem value="الرعاية الصحية">الرعاية الصحية</SelectItem>
                  <SelectItem value="الإسكان">الإسكان</SelectItem>
                  <SelectItem value="عام">عام</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                الحالة
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="مؤكد">مؤكد</SelectItem>
                  <SelectItem value="قيد المراجعة">قيد المراجعة</SelectItem>
                  <SelectItem value="مرفوض">مرفوض</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                ملاحظات
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="col-span-3"
                rows={3}
                placeholder="أي ملاحظات إضافية..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit">تسجيل التبرع</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
