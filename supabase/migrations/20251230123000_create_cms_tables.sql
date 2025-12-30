-- CMS Tables

-- 1. Site Settings (Key-Value store for global content)
CREATE TABLE public.site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO public.site_settings (key, value, description) VALUES
('hero_title', 'Helping Local Businesses Get More Calls, Customers & Trust Online', 'Main heading on the homepage'),
('hero_subtitle', 'Affordable websites, Google reviews & social media growth for small businesses. Simple. Honest. Result-focused.', 'Subtitle below the main heading'),
('contact_whatsapp', '+919876543210', 'WhatsApp number for the floating button and contact links'),
('contact_email', 'hello@localgrowth.hub', 'Contact email address');

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin update access" ON public.site_settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admin insert access" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (true);


-- 2. Services (Dynamic services list)
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL, -- Name of the Lucide icon
    price TEXT,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO public.services (title, description, icon, price, "order") VALUES
('Google Business Profile', 'We optimize your profile to rank higher on Google Maps.', 'MapPin', '₹2,999', 1),
('Website Development', 'Fast, mobile-friendly websites that convert visitors.', 'Globe', '₹4,999', 2),
('Social Media Growth', 'Instagram & Facebook management to build your brand.', 'Instagram', '₹3,999/mo', 3);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admin all access" ON public.services FOR ALL TO authenticated USING (true);


-- 3. Testimonials (Client reviews)
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    avatar_url TEXT,
    phone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO public.testimonials (name, role, content, rating, phone) VALUES
('Vikas Pal', 'Pal Enterprise', 'Excellent service! Very professional and helpful team.', 5, '+91-9876543210'),
('Shubham', 'Shubham Hardware Services', 'Great experience working with this team. Highly recommended!', 5, '+91-8390408423');

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admin all access" ON public.testimonials FOR ALL TO authenticated USING (true);


-- 4. Links (Navigation and Socials)
CREATE TABLE public.links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT CHECK (type IN ('nav', 'social', 'footer')),
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

INSERT INTO public.links (label, url, type, "order") VALUES
('Home', '/', 'nav', 1),
('Services', '/services', 'nav', 2),
('Portfolio', '/portfolio', 'nav', 3),
('Pricing', '/pricing', 'nav', 4),
('Contact', '/contact', 'nav', 5),
('Instagram', 'https://instagram.com', 'social', 1),
('Facebook', 'https://facebook.com', 'social', 2);

ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON public.links FOR SELECT USING (true);
CREATE POLICY "Admin all access" ON public.links FOR ALL TO authenticated USING (true);
