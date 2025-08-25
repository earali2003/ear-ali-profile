-- Update RLS policies to allow anonymous users to read published articles
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Admin can view all their articles" ON public.articles;

-- Create policy for anyone (including anonymous users) to view published articles
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (is_published = true);

-- Create policy for admin to view all their articles (both published and unpublished)
CREATE POLICY "Admin can view all their articles" 
ON public.articles 
FOR SELECT 
USING (auth.uid() = author_id);