import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Article {
  id: string;
  title: string;
  content: string;
  author_id: string;
  created_at: string;
  updated_at: string;
  image?: string;
  published: boolean;
}

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch articles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: {
    title: string;
    content: string;
    image?: string;
    published?: boolean;
  }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please log in to create articles",
          variant: "destructive",
        });
        return null;
      }

      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            ...articleData,
            author_id: user.id,
            published: articleData.published || false,
          }
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: articleData.published ? "Article published successfully!" : "Article saved as draft",
      });

      if (articleData.published) {
        await fetchArticles();
      }

      return data;
    } catch (error) {
      console.error('Error creating article:', error);
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      });
      return null;
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return {
    articles,
    loading,
    createArticle,
    refetch: fetchArticles,
  };
};