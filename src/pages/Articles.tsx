import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
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

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('id, title, content, image_url, created_at, author_id, is_published')
          .eq('is_published', true)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching articles:', error);
        } else {
          setArticles(data || []);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gradient mb-6">
            Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Deep dives into productivity, personal development, and the science 
            of building a better life.
          </p>
        </motion.div>

        {loading ? (
          // Loading skeletons for hero section
          <>
            <motion.div
              className="grid md:grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </motion.div>
            
            <div className="border-t border-border pt-16">
              <h2 className="text-3xl font-bold mb-8 text-center">More Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : articles.length > 0 ? (
          <>
            {/* Hero Section - Latest 3 Articles */}
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
                Latest Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {articles.slice(0, 3).map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <ArticleCard
                      id={article.id}
                      title={article.title}
                      description={article.content.substring(0, 120) + '...'}
                      thumbnail={article.image_url}
                      readTime={`${Math.ceil(article.content.split(' ').length / 200)} min read`}
                      index={index}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* All Articles Section */}
            <motion.div
              className="border-t border-border pt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8 text-center">All Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  >
                    <ArticleCard
                      id={article.id}
                      title={article.title}
                      description={article.content.substring(0, 150) + '...'}
                      thumbnail={article.image_url}
                      readTime={`${Math.ceil(article.content.split(' ').length / 200)} min read`}
                      index={index}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-4">No Articles Found</h3>
            <p className="text-muted-foreground">
              No published articles are available at the moment. Check back later!
            </p>
          </div>
        )}

        {/* Coming Soon Section */}
        {!loading && articles.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">More Articles Coming Soon</h2>
              <p className="text-muted-foreground">
                I'm constantly writing new content. Subscribe to the newsletter to be 
                the first to know when new articles are published.
              </p>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Articles;