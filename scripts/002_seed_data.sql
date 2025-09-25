-- Insert sample beneficiaries
INSERT INTO public.beneficiaries (name, age, location, family_size, monthly_income, needs, status) VALUES
('أحمد محمد علي', 45, 'سوق نعمان', 6, 25000.00, 'مساعدة غذائية شهرية', 'approved'),
('فاطمة حسن', 38, 'حي النصر', 4, 18000.00, 'مساعدة طبية للأطفال', 'approved'),
('عبد الرحمن قاسم', 52, 'المدينة القديمة', 8, 22000.00, 'مساعدة سكن', 'pending'),
('خديجة عبد الله', 29, 'حي السلام', 3, 15000.00, 'مساعدة تعليمية', 'approved'),
('محمد الطاهر', 41, 'سوق نعمان', 5, 20000.00, 'مساعدة غذائية', 'pending');

-- Insert sample programs
INSERT INTO public.programs (name, description, category, target_amount, current_amount, beneficiaries_count, status, start_date, end_date) VALUES
('برنامج الإفطار الرمضاني', 'توزيع وجبات إفطار للصائمين في شهر رمضان المبارك', 'food', 500000.00, 125000.00, 200, 'active', '2024-03-01', '2024-04-30'),
('برنامج كسوة العيد', 'توزيع ملابس العيد للأطفال المحتاجين', 'emergency', 200000.00, 75000.00, 150, 'active', '2024-04-01', '2024-04-15'),
('برنامج الدعم التعليمي', 'توفير الأدوات المدرسية والكتب للطلاب', 'education', 300000.00, 180000.00, 100, 'active', '2024-09-01', '2024-06-30'),
('برنامج الرعاية الصحية', 'توفير الأدوية والعلاج للمرضى المحتاجين', 'health', 400000.00, 320000.00, 80, 'active', '2024-01-01', '2024-12-31'),
('برنامج إعادة التأهيل', 'مساعدة الأسر في إعادة بناء منازلهم', 'housing', 800000.00, 200000.00, 25, 'active', '2024-01-01', '2024-12-31');

-- Insert sample donations
INSERT INTO public.donations (donor_name, donor_email, donor_phone, amount, program_id, payment_method, status, notes) VALUES
('عبد الله محمد', 'abdullah@email.com', '+213 555 123 456', 50000.00, (SELECT id FROM public.programs WHERE name = 'برنامج الإفطار الرمضاني' LIMIT 1), 'bank_transfer', 'completed', 'تبرع شهري'),
('سارة أحمد', 'sara@email.com', '+213 555 234 567', 25000.00, (SELECT id FROM public.programs WHERE name = 'برنامج كسوة العيد' LIMIT 1), 'cash', 'completed', 'تبرع لمرة واحدة'),
('محمد علي', 'mohamed@email.com', '+213 555 345 678', 75000.00, (SELECT id FROM public.programs WHERE name = 'برنامج الدعم التعليمي' LIMIT 1), 'online', 'completed', 'تبرع سنوي'),
('أمينة حسن', 'amina@email.com', '+213 555 456 789', 100000.00, (SELECT id FROM public.programs WHERE name = 'برنامج الرعاية الصحية' LIMIT 1), 'bank_transfer', 'completed', 'تبرع كبير'),
('يوسف قاسم', 'youssef@email.com', '+213 555 567 890', 30000.00, (SELECT id FROM public.programs WHERE name = 'برنامج إعادة التأهيل' LIMIT 1), 'cash', 'pending', 'في انتظار التأكيد');

-- Insert sample volunteers
INSERT INTO public.volunteers (name, email, phone, skills, availability, status) VALUES
('أحمد الصالح', 'ahmed.saleh@email.com', '+213 555 111 222', ARRAY['تدريس', 'ترجمة'], 'عطلة نهاية الأسبوع', 'active'),
('فاطمة الزهراء', 'fatima@email.com', '+213 555 222 333', ARRAY['طبخ', 'تنظيم'], 'مساءً', 'active'),
('عبد الرحمن محمد', 'abderrahman@email.com', '+213 555 333 444', ARRAY['قيادة', 'نقل'], 'صباحاً', 'active'),
('خديجة علي', 'khadija@email.com', '+213 555 444 555', ARRAY['محاسبة', 'إدارة'], 'مرن', 'active'),
('محمد الأمين', 'mohamed.amine@email.com', '+213 555 555 666', ARRAY['تصوير', 'تصميم'], 'عطلة نهاية الأسبوع', 'inactive');
