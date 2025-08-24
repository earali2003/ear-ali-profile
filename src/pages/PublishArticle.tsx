import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleForm from "@/components/ArticleForm";
import { useArticles } from "@/hooks/useArticles";

const PublishArticle = () => {
  const { createArticle } = useArticles();

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
            Share Your Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create and publish articles to share your insights with the world.
          </p>
        </motion.div>

        <ArticleForm onSubmit={createArticle} />
      </main>

      <Footer />
    </div>
  );
};

export default PublishArticle;