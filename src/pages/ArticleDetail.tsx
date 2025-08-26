import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Article {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  author_id: string;
  is_published: boolean;
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('id', id)
          .eq('is_published', true)
          .maybeSingle();

        if (error) {
          console.error('Error fetching article:', error);
          setNotFound(true);
        } else if (!data) {
          setNotFound(true);
        } else {
          setArticle(data);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/articles"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const readTime = Math.ceil(article.content.split(' ').length / 200);
  const publishDate = new Date(article.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Articles
          </Link>

          <article className="prose prose-lg max-w-none">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {publishDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </div>
              </div>
            </header>

            {article.image_url && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={article.image_url}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
              </motion.div>
            )}

            <motion.div
              className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-blockquote:text-muted-foreground prose-code:text-foreground prose-li:text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;