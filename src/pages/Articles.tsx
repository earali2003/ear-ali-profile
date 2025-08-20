import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArticleCard from "@/components/ArticleCard";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";

const Articles = () => {
  const articles = [
    {
      title: "The Ultimate Guide to Time Blocking",
      description: "Learn how to implement time blocking effectively to boost your productivity and focus. Discover the strategies that top performers use.",
      thumbnail: article1,
      url: "#",
      readTime: "8 min read",
    },
    {
      title: "Building Sustainable Habits That Actually Stick",
      description: "Why most habits fail and how to build ones that last. Evidence-based strategies for lasting behavior change.",
      thumbnail: article2,
      url: "#",
      readTime: "12 min read",
    },
    {
      title: "The Science of Deep Work in a Distracted World",
      description: "How to maintain focus and produce high-quality work in an age of constant interruption and digital distraction.",
      thumbnail: article3,
      url: "#",
      readTime: "15 min read",
    },
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              {...article}
              index={index}
            />
          ))}
        </div>

        {/* Coming Soon Section */}
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
      </main>

      <Footer />
    </div>
  );
};

export default Articles;