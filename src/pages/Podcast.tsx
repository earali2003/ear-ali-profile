import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Play, ExternalLink } from "lucide-react";

const Podcast = () => {
  const episodes = [
    {
      number: "Episode 1",
      title: "The Science of Productivity",
      description: "Exploring the research behind what makes us truly productive and how to apply it in daily life.",
      duration: "45 min",
      url: "#",
    },
    {
      number: "Episode 2", 
      title: "Building Systems That Work",
      description: "Why systems beat goals every time and how to design systems that stick.",
      duration: "38 min",
      url: "#",
    },
    {
      number: "Episode 3",
      title: "The Art of Deep Work",
      description: "Strategies for maintaining focus in a distracted world with author Cal Newport.",
      duration: "52 min",
      url: "#",
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
            Podcast
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Long-form conversations about productivity, personal development, 
            and the systems that help us build better lives.
          </p>
        </motion.div>

        <div className="space-y-6">
          {episodes.map((episode, index) => (
            <motion.div
              key={index}
              className="bg-card p-6 rounded-2xl shadow-lg border border-border hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group hover:bg-primary/20 transition-colors duration-300">
                    <Play className="h-6 w-6 text-primary fill-current" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-primary">
                      {episode.number}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {episode.duration}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-2 text-foreground">
                    {episode.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4">
                    {episode.description}
                  </p>
                  
                  <a
                    href={episode.url}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors duration-300"
                  >
                    Listen Now
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscribe Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-highlight/10 to-primary/20 p-8 rounded-2xl shadow-lg border border-border max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground mb-6">
              The podcast is currently in development. Subscribe to the newsletter 
              to be the first to know when episodes go live.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-card px-4 py-2 rounded-lg font-medium">Apple Podcasts</span>
              <span className="bg-card px-4 py-2 rounded-lg font-medium">Spotify</span>
              <span className="bg-card px-4 py-2 rounded-lg font-medium">Google Podcasts</span>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Podcast;