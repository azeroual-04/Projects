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
import { Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

interface AddBeneficiaryDialogProps {
  onSuccess?: () => void
}

export function AddBeneficiaryDialog({ onSuccess }: AddBeneficiaryDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    family_size: "",
    monthly_income: "",
    needs: "",
    status: "pending" as const,
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!formData.name || !formData.age || !formData.location || !formData.family_size || !formData.needs) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.from("beneficiaries").insert({
        name: formData.name,
        age: Number.parseInt(formData.age),
        location: formData.location,
        family_size: Number.parseInt(formData.family_size),
        monthly_income: formData.monthly_income ? Number.parseFloat(formData.monthly_income) : null,
        needs: formData.needs,
        status: formData.status,
      })

      if (error) throw error

      toast({
        title: "تم إضافة المستفيد",
        description: `تم إضافة ${formData.name} بنجاح`,
      })

      // Reset form
      setFormData({
        name: "",
        age: "",
        location: "",
        family_size: "",
        monthly_income: "",
        needs: "",
        status: "pending",
      })
      setOpen(false)

      // Call success callback to refresh the list
      if (onSuccess) {
        onSuccess()
      }
    } catch (error) {
      console.error("Error adding beneficiary:", error)
      toast({
        title: "خطأ في الإضافة",
        description: "حدث خطأ أثناء إضافة المستفيد",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
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
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                العمر *
              </Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="col-span-3"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                الموقع *
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="col-span-3"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="family_size" className="text-right">
                حجم الأسرة *
              </Label>
              <Input
                id="family_size"
                type="number"
                min="1"
                value={formData.family_size}
                onChange={(e) => setFormData({ ...formData, family_size: e.target.value })}
                className="col-span-3"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="monthly_income" className="text-right">
                الدخل الشهري (دج)
              </Label>
              <Input
                id="monthly_income"
                type="number"
                min="0"
                step="0.01"
                value={formData.monthly_income}
                onChange={(e) => setFormData({ ...formData, monthly_income: e.target.value })}
                className="col-span-3"
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="needs" className="text-right">
                الاحتياجات *
              </Label>
              <Textarea
                id="needs"
                value={formData.needs}
                onChange={(e) => setFormData({ ...formData, needs: e.target.value })}
                className="col-span-3"
                rows={3}
                required
                disabled={loading}
                placeholder="اذكر الاحتياجات المطلوبة..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "جاري الإضافة..." : "إضافة المستفيد"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
