import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import { useArticles } from "@/hooks/useArticles";
import { Button } from "@/components/ui/button";
import { Plus, Loader } from "lucide-react";

const Articles = () => {
  const { articles, loading } = useArticles();

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
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl font-bold text-gradient mb-6">
              Articles
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep dives into productivity, personal development, and the science 
              of building a better life.
            </p>
            <Button asChild className="mt-4">
              <Link to="/publish">
                <Plus className="mr-2 h-4 w-4" />
                Write New Article
              </Link>
            </Button>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.id}
                title={article.title}
                description={article.content.substring(0, 150) + '...'}
                thumbnail={article.image || "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400"}
                url={`/article/${article.id}`}
                readTime={`${Math.ceil(article.content.split(' ').length / 200)} min read`}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No articles yet</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to publish an article!
            </p>
            <Button asChild>
              <Link to="/publish">
                <Plus className="mr-2 h-4 w-4" />
                Write First Article
              </Link>
            </Button>
          </div>
        )}

        {articles.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Share Your Knowledge</h2>
              <p className="text-muted-foreground mb-6">
                Have insights to share? Join our community of writers and publish your own articles.
              </p>
              <Button asChild variant="outline">
                <Link to="/publish">
                  <Plus className="mr-2 h-4 w-4" />
                  Publish Your Article
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Articles;