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
                  src={https://shrturl.app/o2dGVT}
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

            {/* Introduction */}
            <motion.p
              className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              I help people build productive lives through evidence-based content, 
              practical advice, and actionable strategies. Welcome to my corner of the internet.
            </motion.p>

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
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
