-- Delete old testimonials
DELETE FROM public.testimonials;

-- Add new testimonials
INSERT INTO public.testimonials (name, role, content, rating, phone) VALUES
('Vikas Pal', 'Pal Enterprise', 'Excellent service! Very professional and helpful team.', 5, '+91-9876543210'),
('Shubham', 'Shubham Hardware Services', 'Great experience working with this team. Highly recommended!', 5, '+91-8390408423');

-- Verify the changes
SELECT * FROM public.testimonials;
