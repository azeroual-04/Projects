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

export function AddProgramDialog() {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    budget: "",
    status: "نشط" as const,
    startDate: "",
  })

  const addProgram = useAdminStore((state) => state.addProgram)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.description || !formData.category || !formData.budget || !formData.startDate) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    const budget = Number.parseFloat(formData.budget)
    if (isNaN(budget) || budget <= 0) {
      toast({
        title: "خطأ في الميزانية",
        description: "يرجى إدخال ميزانية صحيحة",
        variant: "destructive",
      })
      return
    }

    addProgram({
      name: formData.name,
      description: formData.description,
      category: formData.category,
      budget: budget,
      status: formData.status,
      startDate: formData.startDate,
      beneficiaries: 0,
    })

    toast({
      title: "تم إضافة البرنامج",
      description: `تم إضافة برنامج "${formData.name}" بنجاح`,
    })

    // Reset form
    setFormData({
      name: "",
      description: "",
      category: "",
      budget: "",
      status: "نشط",
      startDate: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          إضافة برنامج جديد
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة برنامج جديد</DialogTitle>
          <DialogDescription>أدخل بيانات البرنامج الجديد في النموذج أدناه</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                اسم البرنامج *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder="برنامج الإغاثة الغذائية"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                الوصف *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                rows={3}
                placeholder="وصف مختصر عن البرنامج وأهدافه"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                الفئة *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="اختر فئة البرنامج" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="إغاثة">إغاثة</SelectItem>
                  <SelectItem value="تعليم">تعليم</SelectItem>
                  <SelectItem value="صحة">صحة</SelectItem>
                  <SelectItem value="إسكان">إسكان</SelectItem>
                  <SelectItem value="تنمية">تنمية</SelectItem>
                  <SelectItem value="أخرى">أخرى</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="budget" className="text-right">
                الميزانية (دج) *
              </Label>
              <Input
                id="budget"
                type="number"
                min="1"
                step="0.01"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="col-span-3"
                placeholder="50000"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startDate" className="text-right">
                تاريخ البداية *
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="col-span-3"
                required
              />
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
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="موسمي">موسمي</SelectItem>
                  <SelectItem value="معلق">معلق</SelectItem>
                  <SelectItem value="منتهي">منتهي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              إلغاء
            </Button>
            <Button type="submit">إضافة البرنامج</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
