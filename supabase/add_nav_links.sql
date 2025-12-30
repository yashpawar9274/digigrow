-- First, delete existing nav links to avoid duplicates
DELETE FROM public.links WHERE type = 'nav';

-- Now insert all navigation links with proper routes
INSERT INTO public.links (label, url, type, "order") VALUES
('Home', '/', 'nav', 1),
('Services', '/services', 'nav', 2),
('Portfolio', '/portfolio', 'nav', 3),
('Pricing', '/pricing', 'nav', 4),
('Contact', '/contact', 'nav', 5);

-- Verify the links
SELECT * FROM public.links WHERE type = 'nav' ORDER BY "order";
