"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types
export interface Beneficiary {
  id: number
  name: string
  familySize: number
  program: string
  status: "نشط" | "معلق" | "غير نشط"
  joinDate: string
  phone: string
  address?: string
  notes?: string
}

export interface Donation {
  id: number
  donor: string
  amount: number
  type: "نقدي" | "تحويل بنكي" | "شيك"
  program: string
  date: string
  status: "مؤكد" | "قيد المراجعة" | "مرفوض"
  notes?: string
}

export interface Program {
  id: number
  name: string
  description: string
  status: "نشط" | "موسمي" | "معلق" | "منتهي"
  beneficiaries: number
  budget: number
  startDate: string
  endDate?: string
  category: string
}

export interface Volunteer {
  id: number
  name: string
  role: string
  department: string
  joinDate: string
  status: "نشط" | "إجازة" | "غير نشط"
  phone: string
  hours: number
  email?: string
}

export interface Settings {
  associationName: string
  associationNameEn: string
  description: string
  address: string
  phone: string
  email: string
  notifications: boolean
  emailNotifications: boolean
  autoBackup: boolean
  maintenanceMode: boolean
  ccpNumber: string
  ccpBank: string
  cpaNumber: string
  cpaBank: string
}

interface AdminStore {
  // Data
  beneficiaries: Beneficiary[]
  donations: Donation[]
  programs: Program[]
  volunteers: Volunteer[]
  settings: Settings

  // Loading states
  isLoading: boolean

  // Beneficiaries actions
  addBeneficiary: (beneficiary: Omit<Beneficiary, "id">) => void
  updateBeneficiary: (id: number, beneficiary: Partial<Beneficiary>) => void
  deleteBeneficiary: (id: number) => void

  // Donations actions
  addDonation: (donation: Omit<Donation, "id">) => void
  updateDonation: (id: number, donation: Partial<Donation>) => void
  deleteDonation: (id: number) => void

  // Programs actions
  addProgram: (program: Omit<Program, "id">) => void
  updateProgram: (id: number, program: Partial<Program>) => void
  deleteProgram: (id: number) => void

  // Volunteers actions
  addVolunteer: (volunteer: Omit<Volunteer, "id">) => void
  updateVolunteer: (id: number, volunteer: Partial<Volunteer>) => void
  deleteVolunteer: (id: number) => void

  // Settings actions
  updateSettings: (settings: Partial<Settings>) => void

  // Utility actions
  setLoading: (loading: boolean) => void
  generateReport: (type: string) => Promise<string>
}

// Initial data
const initialBeneficiaries: Beneficiary[] = [
  {
    id: 1,
    name: "أحمد محمد علي",
    familySize: 5,
    program: "الإغاثة الغذائية",
    status: "نشط",
    joinDate: "2024-01-15",
    phone: "0555123456",
  },
  {
    id: 2,
    name: "فاطمة حسن",
    familySize: 3,
    program: "الدعم التعليمي",
    status: "نشط",
    joinDate: "2024-02-20",
    phone: "0555234567",
  },
  {
    id: 3,
    name: "محمد عبدالله",
    familySize: 7,
    program: "الرعاية الصحية",
    status: "معلق",
    joinDate: "2024-03-10",
    phone: "0555345678",
  },
  {
    id: 4,
    name: "عائشة أحمد",
    familySize: 4,
    program: "الإغاثة الغذائية",
    status: "نشط",
    joinDate: "2024-04-05",
    phone: "0555456789",
  },
]

const initialDonations: Donation[] = [
  {
    id: 1,
    donor: "أحمد محمد",
    amount: 5000,
    type: "نقدي",
    program: "الإغاثة الغذائية",
    date: "2024-12-08",
    status: "مؤكد",
  },
  {
    id: 2,
    donor: "شركة النور",
    amount: 15000,
    type: "تحويل بنكي",
    program: "الدعم التعليمي",
    date: "2024-12-07",
    status: "مؤكد",
  },
  {
    id: 3,
    donor: "فاطمة علي",
    amount: 2500,
    type: "نقدي",
    program: "الرعاية الصحية",
    date: "2024-12-06",
    status: "قيد المراجعة",
  },
  {
    id: 4,
    donor: "مؤسسة الخير",
    amount: 25000,
    type: "شيك",
    program: "عام",
    date: "2024-12-05",
    status: "مؤكد",
  },
]

const initialPrograms: Program[] = [
  {
    id: 1,
    name: "برنامج الإغاثة الغذائية",
    description: "توزيع المواد الغذائية على الأسر المحتاجة",
    status: "نشط",
    beneficiaries: 150,
    budget: 50000,
    startDate: "2024-01-01",
    category: "إغاثة",
  },
  {
    id: 2,
    name: "برنامج الدعم التعليمي",
    description: "دعم الطلاب بالكتب والأدوات المدرسية",
    status: "نشط",
    beneficiaries: 200,
    budget: 30000,
    startDate: "2024-02-01",
    category: "تعليم",
  },
  {
    id: 3,
    name: "برنامج الرعاية الصحية",
    description: "قوافل طبية وتوفير الأدوية",
    status: "موسمي",
    beneficiaries: 300,
    budget: 40000,
    startDate: "2024-03-01",
    category: "صحة",
  },
  {
    id: 4,
    name: "برنامج الإسكان",
    description: "ترميم وبناء المساكن للمحتاجين",
    status: "معلق",
    beneficiaries: 25,
    budget: 100000,
    startDate: "2024-04-01",
    category: "إسكان",
  },
]

const initialVolunteers: Volunteer[] = [
  {
    id: 1,
    name: "محمد أحمد",
    role: "منسق البرامج",
    department: "الإغاثة الغذائية",
    joinDate: "2024-01-15",
    status: "نشط",
    phone: "0555123456",
    hours: 120,
  },
  {
    id: 2,
    name: "فاطمة علي",
    role: "مساعدة إدارية",
    department: "الإدارة",
    joinDate: "2024-02-20",
    status: "نشط",
    phone: "0555234567",
    hours: 95,
  },
  {
    id: 3,
    name: "عبدالله حسن",
    role: "مشرف ميداني",
    department: "الرعاية الصحية",
    joinDate: "2024-03-10",
    status: "إجازة",
    phone: "0555345678",
    hours: 80,
  },
  {
    id: 4,
    name: "عائشة محمد",
    role: "منسقة التعليم",
    department: "الدعم التعليمي",
    joinDate: "2024-04-05",
    status: "نشط",
    phone: "0555456789",
    hours: 110,
  },
]

const initialSettings: Settings = {
  associationName: "جمعية البركة سوق نعمان",
  associationNameEn: "El Baraka Souknaamane",
  description: "جمعية البركة سوق نعمان تعمل على خدمة المجتمع وتقديم المساعدة للمحتاجين من خلال برامج متنوعة وفعالة",
  address: "طريق السياني قرب صيدلية ابن سينا أدرار",
  phone: "0555123456",
  email: "info@elbaraka-souknaamane.org",
  notifications: true,
  emailNotifications: true,
  autoBackup: true,
  maintenanceMode: false,
  ccpNumber: "210 243 29 CLE 40",
  ccpBank: "بريد الجزائر",
  cpaNumber: "004 001 854 100 009 720 30",
  cpaBank: "القرض الشعبي الجزائري",
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      // Initial state
      beneficiaries: initialBeneficiaries,
      donations: initialDonations,
      programs: initialPrograms,
      volunteers: initialVolunteers,
      settings: initialSettings,
      isLoading: false,

      // Beneficiaries actions
      addBeneficiary: (beneficiary) => {
        const newId = Math.max(...get().beneficiaries.map((b) => b.id)) + 1
        set((state) => ({
          beneficiaries: [...state.beneficiaries, { ...beneficiary, id: newId }],
        }))
      },

      updateBeneficiary: (id, beneficiary) => {
        set((state) => ({
          beneficiaries: state.beneficiaries.map((b) => (b.id === id ? { ...b, ...beneficiary } : b)),
        }))
      },

      deleteBeneficiary: (id) => {
        set((state) => ({
          beneficiaries: state.beneficiaries.filter((b) => b.id !== id),
        }))
      },

      // Donations actions
      addDonation: (donation) => {
        const newId = Math.max(...get().donations.map((d) => d.id)) + 1
        set((state) => ({
          donations: [...state.donations, { ...donation, id: newId }],
        }))
      },

      updateDonation: (id, donation) => {
        set((state) => ({
          donations: state.donations.map((d) => (d.id === id ? { ...d, ...donation } : d)),
        }))
      },

      deleteDonation: (id) => {
        set((state) => ({
          donations: state.donations.filter((d) => d.id !== id),
        }))
      },

      // Programs actions
      addProgram: (program) => {
        const newId = Math.max(...get().programs.map((p) => p.id)) + 1
        set((state) => ({
          programs: [...state.programs, { ...program, id: newId }],
        }))
      },

      updateProgram: (id, program) => {
        set((state) => ({
          programs: state.programs.map((p) => (p.id === id ? { ...p, ...program } : p)),
        }))
      },

      deleteProgram: (id) => {
        set((state) => ({
          programs: state.programs.filter((p) => p.id !== id),
        }))
      },

      // Volunteers actions
      addVolunteer: (volunteer) => {
        const newId = Math.max(...get().volunteers.map((v) => v.id)) + 1
        set((state) => ({
          volunteers: [...state.volunteers, { ...volunteer, id: newId }],
        }))
      },

      updateVolunteer: (id, volunteer) => {
        set((state) => ({
          volunteers: state.volunteers.map((v) => (v.id === id ? { ...v, ...volunteer } : v)),
        }))
      },

      deleteVolunteer: (id) => {
        set((state) => ({
          volunteers: state.volunteers.filter((v) => v.id !== id),
        }))
      },

      // Settings actions
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }))
      },

      // Utility actions
      setLoading: (loading) => set({ isLoading: loading }),

      generateReport: async (type) => {
        set({ isLoading: true })

        // Simulate report generation
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const timestamp = new Date().toISOString().split("T")[0]
        const reportId = `${type}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`

        set({ isLoading: false })
        return reportId
      },
    }),
    {
      name: "admin-store",
    },
  ),
)
