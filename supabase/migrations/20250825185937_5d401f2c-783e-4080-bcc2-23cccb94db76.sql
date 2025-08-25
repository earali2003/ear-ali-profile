DO $$ BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='public' AND table_name='articles' AND column_name='published'
  ) THEN
    ALTER TABLE public.articles RENAME COLUMN published TO is_published;
  END IF;
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema='public' AND table_name='articles' AND column_name='image'
  ) THEN
    ALTER TABLE public.articles RENAME COLUMN image TO image_url;
  END IF;
END $$;

-- Ensure RLS is enabled
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Users can create their own articles" ON public.articles;
DROP POLICY IF EXISTS "Users can delete their own articles" ON public.articles;
DROP POLICY IF EXISTS "Users can update their own articles" ON public.articles;
DROP POLICY IF EXISTS "Users can view their own articles" ON public.articles;
DROP POLICY IF EXISTS "Public can read published articles" ON public.articles;
DROP POLICY IF EXISTS "Owner can read all articles" ON public.articles;
DROP POLICY IF EXISTS "Only owner can insert articles" ON public.articles;
DROP POLICY IF EXISTS "Only owner can update articles" ON public.articles;
DROP POLICY IF EXISTS "Only owner can delete articles" ON public.articles;

-- Table to store site owner id
CREATE TABLE IF NOT EXISTS public.site_owner (
  owner_id uuid PRIMARY KEY
);

ALTER TABLE public.site_owner ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is the site owner
CREATE OR REPLACE FUNCTION public.is_site_owner()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  select exists (select 1 from public.site_owner where owner_id = auth.uid());
$$;

-- RLS: Public can read only published articles
CREATE POLICY "Public can read published articles"
ON public.articles
FOR SELECT
USING (is_published = true);

-- RLS: Owner can read all articles
CREATE POLICY "Owner can read all articles"
ON public.articles
FOR SELECT
USING (public.is_site_owner());

-- RLS: Only owner can insert
CREATE POLICY "Only owner can insert articles"
ON public.articles
FOR INSERT
WITH CHECK (public.is_site_owner() AND author_id = auth.uid());

-- RLS: Only owner can update
CREATE POLICY "Only owner can update articles"
ON public.articles
FOR UPDATE
USING (public.is_site_owner());

-- RLS: Only owner can delete
CREATE POLICY "Only owner can delete articles"
ON public.articles
FOR DELETE
USING (public.is_site_owner());

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(is_published, created_at DESC);