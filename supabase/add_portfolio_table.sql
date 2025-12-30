-- Add portfolio table to database
CREATE TABLE IF NOT EXISTS public.portfolio (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    results TEXT NOT NULL,
    link TEXT NOT NULL,
    icon TEXT NOT NULL,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert current portfolio items
INSERT INTO public.portfolio (title, category, description, results, link, icon, "order") VALUES
('Pal Enterprise', 'Business Services', 'Complete digital transformation with website and Google Business optimization', '3x online visibility', 'https://www.pal-enterprises.in/', 'Building2', 1),
('Shubham Systems', 'Hardware & Tools', 'E-commerce website with online catalog and WhatsApp ordering system', '50+ online orders', 'https://www.shubhamsystems.in/', 'Smartphone', 2),
('FitLife Gym Boisar', 'Fitness', 'Membership website with online booking and payment gateway', '40+ memberships', 'https://thefitnessgym.in/', 'Dumbbell', 3),
('Bright Academy', 'Education', 'Educational portal with online admission and course management', '2x admissions', 'https://www.brightacademys.com/', 'BookOpen', 4);

-- Enable RLS
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access" ON public.portfolio FOR SELECT USING (true);
CREATE POLICY "Admin all access" ON public.portfolio FOR ALL TO authenticated USING (true);

-- Verify
SELECT * FROM public.portfolio ORDER BY "order";
