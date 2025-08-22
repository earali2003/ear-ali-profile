import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";
import NewsletterForm from "./NewsletterForm";

const Hero = () => {
  return (
    <section className="py-20 px-4 min-h-[80vh] flex items-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Profile Image with colorful background */}
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="relative">
              {/* Colorful circular background */}
              <div className="absolute inset-0 profile-background rounded-full transform scale-110 blur-sm opacity-60"></div>
              <div className="relative w-72 h-72 lg:w-80 lg:h-80">
                <img
                  src="https://shrturl.app/o2dGVT"
                  alt="Ear Ali - Content Creator and Productivity Expert"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                />
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1 text-center lg:text-left max-w-2xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Friendly Greeting */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground mb-2">
                Hey Friends 👋
              </h2>
              <h1 className="text-5xl lg:text-7xl font-display font-bold text-foreground leading-tight">
                I'm <span className="text-gradient">Ear Ali</span>
              </h1>
            </motion.div>

            {/* About Me - Ali Abdaal Style */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg lg:text-xl text-muted-foreground mb-6 leading-relaxed">
                Since 2020, I've been documenting my personal, professional and entrepreneurial journey on YouTube, sharing the books, strategies, ideas and tools that I've found most helpful over the years to help us be more productive, live more intentionally, and build a life we love.
              </p>
              
              <p className="text-lg lg:text-xl text-muted-foreground mb-6 leading-relaxed">
                This seems to have resonated with people, to the point that our online community has grown to over 500k followers on social media (mostly on YouTube and Instagram, although we're also growing on X/Twitter, LinkedIn and TikTok too).
              </p>
              
              <p className="text-lg lg:text-xl text-muted-foreground mb-6 leading-relaxed">
                It's been a pretty wild ride – from starting content creation as a student, to building a personal brand while working, to now focusing full-time on creating content and building a business around what I feel much more passionate about.
              </p>
              
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed">
                If you've supported any part of the journey, for any length of time – thank you so much. None of this could've happened without you, and I hope to continue building and sharing useful stuff online, for free, forever 😊
              </p>
              
              <a 
                href="/about" 
                className="text-primary hover:text-primary/80 underline underline-offset-4 font-medium text-lg"
              >
                Read my full story →
              </a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="/videos"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Watch My Videos
              </a>
              <a
                href="/articles"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Read My Articles
              </a>
              <a
                href="/book-notes"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Read My Book
              </a>
            </motion.div>

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <NewsletterForm />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
