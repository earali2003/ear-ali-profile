import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.jpg";
import NewsletterForm from "./NewsletterForm";

const Hero = () => {
  return (
    <section className="py-20 px-4 min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Profile Images with colorful background and animations */}
          <motion.div
            className="flex-shrink-0"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
          >
            <div className="relative">
              {/* Colorful circular background with pulse animation */}
              <motion.div 
                className="absolute inset-0 profile-background rounded-full transform scale-110 blur-sm opacity-60"
                animate={{ 
                  scale: [1.1, 1.2, 1.1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              ></motion.div>
              
              {/* Main profile image with hover animations */}
              <motion.div 
                className="relative w-80 h-80 lg:w-96 lg:h-96"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.img
                  src="https://shrturl.app/o2dGVT"
                  alt="Ear Ali - Content Creator and Productivity Expert"
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full opacity-80"
                animate={{ 
                  y: [0, -15, 0],
                  x: [0, 5, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-highlight rounded-full opacity-70"
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, -8, 0]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="flex-1 text-left max-w-3xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Friendly Greeting with underline */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl lg:text-3xl font-medium text-muted-foreground mb-3">
                Hey, I'm
              </h2>
              <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight relative">
                <span className="relative">
                  Ear Ali
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-highlight rounded-full"></div>
                </span>
              </h1>
            </motion.div>

            {/* Extended About Me */}
            <motion.div
              className="space-y-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                Since 2020, I've been documenting my personal, professional and entrepreneurial journey online, 
                sharing the books, strategies, ideas and tools that I've found most helpful over the years to help us be more 
                productive, live more intentionally, and build a life we love.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                This seems to have resonated with people, to the point that our online community has grown to millions 
                of followers on social media (mostly on YouTube and Instagram, although we're also growing on X/Twitter, 
                LinkedIn and TikTok too).
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                It's been a pretty wild ride – from a regular person to building a meaningful online presence, 
                and I hope to continue building and sharing useful stuff online, for free, forever 🙂
              </p>
              
              <motion.a 
                href="/about"
                className="inline-flex items-center text-lg text-foreground font-medium hover:text-primary transition-colors duration-200"
                whileHover={{ x: 5 }}
              >
                Read my full story →
              </motion.a>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.a
                href="/videos"
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch My Videos
              </motion.a>
              <motion.a
                href="/articles"
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read My Articles
              </motion.a>
              <motion.a
                href="/book-notes"
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/80 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read My Book Notes
              </motion.a>
            </motion.div>

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
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
