import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoCard from "@/components/VideoCard";
import ArticleCard from "@/components/ArticleCard";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

// Import images
import video1 from "@/assets/video-1.jpg";
import video2 from "@/assets/video-2.jpg";
import video3 from "@/assets/video-3.jpg";
import article1 from "@/assets/article-1.jpg";
import article2 from "@/assets/article-2.jpg";
import article3 from "@/assets/article-3.jpg";
import profilePhoto from "@/assets/profile-photo.jpg";

const Index = () => {
  const videos = [
    {
      title: "Morning Routine That Changed My Life",
      description: "The exact morning routine I've used for 3+ years to boost productivity, energy, and focus throughout the day.",
      thumbnail: video1,
      url: "https://youtube.com",
    },
    {
      title: "How I Learn Anything 10x Faster",
      description: "Science-backed learning techniques that help you master new skills quickly and retain information longer.",
      thumbnail: video2,
      url: "https://youtube.com",
    },
    {
      title: "Building a $100K Side Business",
      description: "The complete blueprint for building a profitable side business while working full-time. Real strategies, real results.",
      thumbnail: video3,
      url: "https://youtube.com",
    },
  ];

  const articles = [
    {
      id: "demo-1",
      title: "The Ultimate Guide to Time Blocking",
      description: "Learn how to implement time blocking effectively to boost your productivity and focus. Discover the strategies that top performers use.",
      thumbnail: article1,
      readTime: "8 min read",
    },
    {
      id: "demo-2",
      title: "Building Sustainable Habits That Actually Stick",
      description: "Why most habits fail and how to build ones that last. Evidence-based strategies for lasting behavior change.",
      thumbnail: article2,
      readTime: "12 min read",
    },
    {
      id: "demo-3",
      title: "The Science of Deep Work in a Distracted World",
      description: "How to maintain focus and produce high-quality work in an age of constant interruption and digital distraction.",
      thumbnail: article3,
      readTime: "15 min read",
    },
  ];

  const aboutImages = [
    profilePhoto,
    profilePhoto, // In a real app, these would be different images
    profilePhoto,
    profilePhoto,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Videos Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Watch Video To Learn
            </h2>
            <p className="text-xl text-muted-foreground">
              Practical video content to help you build better systems and optimize your life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {videos.map((video, index) => (
              <VideoCard
                key={index}
                {...video}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/videos"
              className="inline-flex items-center bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 rounded-2xl font-semibold transition-colors duration-300"
            >
              View All Videos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Read My Articles
            </h2>
            <p className="text-xl text-muted-foreground">
              Deep dives into productivity, personal development, and the science of building a better life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {articles.map((article, index) => (
              <ArticleCard
                key={index}
                id={article.id}
                title={article.title}
                description={article.description}
                thumbnail={article.thumbnail}
                readTime={article.readTime}
                index={index}
              />
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/articles"
              className="inline-flex items-center bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 rounded-2xl font-semibold transition-colors duration-300"
            >
              Read All Articles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">
              About Me
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a content creator, productivity enthusiast, and lifelong learner passionate about 
                helping people build more intentional and productive lives. Through my content, I share 
                evidence-based strategies, practical advice, and insights from the books and research 
                that have shaped my thinking.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not creating content, you'll find me reading, experimenting with new 
                productivity systems, or exploring the latest research in psychology and behavioral science.
              </p>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center text-primary hover:text-primary-hover font-semibold underline-effect"
                >
                  Learn More About Me
                </Link>
              </div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {aboutImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="aspect-square overflow-hidden rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + index * 0.1
                  }}
                >
                  <img
                    src={image}
                    alt={`About me ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;