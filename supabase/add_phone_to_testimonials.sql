-- Add phone column to testimonials table
ALTER TABLE public.testimonials 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Update existing testimonials with phone numbers
UPDATE public.testimonials 
SET phone = '+91-9876543210' 
WHERE name = 'Rajesh Kumar';

UPDATE public.testimonials 
SET phone = '+91-9876543211' 
WHERE name = 'Priya Singh';

-- Verify the changes
SELECT id, name, role, phone, rating FROM public.testimonials;
