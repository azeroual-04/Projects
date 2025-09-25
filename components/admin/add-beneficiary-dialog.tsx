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

export function AddBeneficiaryDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    familySize: "",
    program: "",
    status: "نشط" as const,
    phone: "",
    address: "",
    notes: "",
  })

  const addBeneficiary = useAdminStore((state) => state.addBeneficiary)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.familySize || !formData.program || !formData.phone) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    addBeneficiary({
      name: formData.name,
      familySize: Number.parseInt(formData.familySize),
      program: formData.program,
      status: formData.status,
      joinDate: new Date().toISOString().split("T")[0],
      phone: formData.phone,
      address: formData.address,
      notes: formData.notes,
    })

    toast({
      title: "تم إضافة المستفيد",
      description: `تم إضافة ${formData.name} بنجاح`,
    })

    // Reset form
    setFormData({
      name: "",
      familySize: "",
      program: "",
      status: "نشط",
      phone: "",
      address: "",
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة مستفيد جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة مستفيد جديد</DialogTitle>
          <DialogDescription>أدخل بيانات المستفيد الجديد في النموذج أدناه</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                الاسم الكامل *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="familySize" className="text-right">
                حجم الأسرة *
              </Label>
              <Input
                id="familySize"
                type="number"
                min="1"
                value={formData.familySize}
                onChange={(e) => setFormData({ ...formData, familySize: e.target.value })}
                className="col-span-3"
                required
              />
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
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                رقم الهاتف *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="col-span-3"
                placeholder="0555123456"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                العنوان
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="col-span-3"
              />
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
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit">إضافة المستفيد</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
