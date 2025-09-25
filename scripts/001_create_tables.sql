-- Create beneficiaries table
CREATE TABLE IF NOT EXISTS public.beneficiaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  location TEXT NOT NULL,
  family_size INTEGER NOT NULL,
  monthly_income DECIMAL(10,2),
  needs TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create programs table
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('education', 'health', 'food', 'housing', 'emergency')),
  target_amount DECIMAL(12,2) NOT NULL,
  current_amount DECIMAL(12,2) DEFAULT 0,
  beneficiaries_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create donations table
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  donor_email TEXT,
  donor_phone TEXT,
  amount DECIMAL(10,2) NOT NULL,
  program_id UUID REFERENCES public.programs(id) ON DELETE SET NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cash', 'bank_transfer', 'online', 'check')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create volunteers table
CREATE TABLE IF NOT EXISTS public.volunteers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  skills TEXT[],
  availability TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('donations', 'beneficiaries', 'programs', 'volunteers', 'financial')),
  period_start DATE,
  period_end DATE,
  data JSONB,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL DEFAULT 'جمعية البركة',
  organization_email TEXT NOT NULL DEFAULT 'info@elbaraka.org',
  organization_phone TEXT NOT NULL DEFAULT '+213 123 456 789',
  organization_address TEXT NOT NULL DEFAULT 'سوق نعمان، الجزائر',
  bank_name TEXT NOT NULL DEFAULT 'بنك الجزائر',
  bank_account TEXT NOT NULL DEFAULT '1234567890',
  rib TEXT NOT NULL DEFAULT '123456789012345678901234',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings
INSERT INTO public.settings (organization_name, organization_email, organization_phone, organization_address, bank_name, bank_account, rib)
VALUES ('جمعية البركة', 'info@elbaraka.org', '+213 123 456 789', 'سوق نعمان، الجزائر', 'بنك الجزائر', '1234567890', '123456789012345678901234')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.beneficiaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is an admin-only system)
-- In a real-world scenario, you'd want more restrictive policies

-- Beneficiaries policies
CREATE POLICY "Allow all operations on beneficiaries" ON public.beneficiaries FOR ALL USING (true) WITH CHECK (true);

-- Programs policies
CREATE POLICY "Allow all operations on programs" ON public.programs FOR ALL USING (true) WITH CHECK (true);

-- Donations policies
CREATE POLICY "Allow all operations on donations" ON public.donations FOR ALL USING (true) WITH CHECK (true);

-- Volunteers policies
CREATE POLICY "Allow all operations on volunteers" ON public.volunteers FOR ALL USING (true) WITH CHECK (true);

-- Reports policies
CREATE POLICY "Allow all operations on reports" ON public.reports FOR ALL USING (true) WITH CHECK (true);

-- Settings policies
CREATE POLICY "Allow all operations on settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_beneficiaries_status ON public.beneficiaries(status);
CREATE INDEX IF NOT EXISTS idx_beneficiaries_created_at ON public.beneficiaries(created_at);
CREATE INDEX IF NOT EXISTS idx_programs_status ON public.programs(status);
CREATE INDEX IF NOT EXISTS idx_programs_category ON public.programs(category);
CREATE INDEX IF NOT EXISTS idx_donations_status ON public.donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON public.donations(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_program_id ON public.donations(program_id);
CREATE INDEX IF NOT EXISTS idx_volunteers_status ON public.volunteers(status);
