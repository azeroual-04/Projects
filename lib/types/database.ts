export interface Beneficiary {
  id: string
  name: string
  age: number
  location: string
  family_size: number
  monthly_income: number
  needs: string
  status: "pending" | "approved" | "rejected"
  created_at: string
  updated_at: string
}

export interface Program {
  id: string
  name: string
  description: string
  category: "education" | "health" | "food" | "housing" | "emergency"
  target_amount: number
  current_amount: number
  beneficiaries_count: number
  status: "active" | "completed" | "paused"
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface Donation {
  id: string
  donor_name: string
  donor_email?: string
  donor_phone?: string
  amount: number
  program_id?: string
  payment_method: "cash" | "bank_transfer" | "online" | "check"
  status: "pending" | "completed" | "failed"
  notes?: string
  created_at: string
  updated_at: string
  programs?: Program
}

export interface Volunteer {
  id: string
  name: string
  email: string
  phone?: string
  skills: string[]
  availability: string
  status: "active" | "inactive"
  created_at: string
  updated_at: string
}

export interface Report {
  id: string
  title: string
  type: "donations" | "beneficiaries" | "programs" | "volunteers" | "financial"
  period_start?: string
  period_end?: string
  data: any
  generated_at: string
}

export interface Settings {
  id: string
  organization_name: string
  organization_email: string
  organization_phone: string
  organization_address: string
  bank_name: string
  bank_account: string
  rib: string
  updated_at: string
}
