-- Create articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_published BOOLEAN NOT NULL DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (insert, update, delete)
-- Note: You'll need to replace 'YOUR_ADMIN_USER_ID' with your actual Supabase user ID
CREATE POLICY "Only admin can insert articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Only admin can update articles" 
ON public.articles 
FOR UPDATE 
USING (auth.uid() = author_id);

CREATE POLICY "Only admin can delete articles" 
ON public.articles 
FOR DELETE 
USING (auth.uid() = author_id);

-- Create policy for public read access to published articles
CREATE POLICY "Anyone can view published articles" 
ON public.articles 
FOR SELECT 
USING (is_published = true);

-- Create policy for admin to view all their articles
CREATE POLICY "Admin can view all their articles" 
ON public.articles 
FOR SELECT 
USING (auth.uid() = author_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Create storage policies for article images
CREATE POLICY "Anyone can view article images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Admin can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can update article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');

CREATE POLICY "Admin can delete article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images' AND auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX idx_articles_published ON public.articles(is_published, created_at DESC);
CREATE INDEX idx_articles_author ON public.articles(author_id);