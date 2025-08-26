-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Create storage policies for article images
CREATE POLICY "Anyone can view article images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Only site owner can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images' AND is_site_owner());

CREATE POLICY "Only site owner can update article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images' AND is_site_owner());

CREATE POLICY "Only site owner can delete article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images' AND is_site_owner());