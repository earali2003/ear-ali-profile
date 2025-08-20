import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoCard from "@/components/VideoCard";
import video1 from "@/assets/video-1.jpg";
import video2 from "@/assets/video-2.jpg";
import video3 from "@/assets/video-3.jpg";

const Videos = () => {
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
            Videos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Practical video content to help you build better systems, 
            develop new skills, and optimize your life.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              {...video}
              index={index}
            />
          ))}
        </div>

        {/* Subscribe Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-primary/10 to-secondary/20 p-8 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Subscribe for More</h2>
            <p className="text-muted-foreground mb-6">
              New videos every week covering productivity, personal development, 
              and the tools that help you build a better life.
            </p>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer" 
              className="inline-flex items-center bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-colors duration-300"
            >
              Subscribe on YouTube
            </a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Videos;