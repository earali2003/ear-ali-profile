import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import profilePhoto from "@/assets/profile-photo.jpg";

const About = () => {
  const images = [
    profilePhoto,
    profilePhoto, // In a real app, these would be different images
    profilePhoto,
    profilePhoto,
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gradient mb-8 text-center">
            About Me
          </h1>
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
              I believe that small, consistent changes can lead to remarkable transformations in how we 
              work and live.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My mission is to make complex concepts accessible and actionable, helping you build 
              systems that actually work for your unique situation and goals.
            </p>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="aspect-square overflow-hidden rounded-2xl shadow-lg"
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                transition={{ duration: 0.3 }}
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

        {/* Stats or Achievements */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { number: "50+", label: "Articles Written" },
            { number: "25+", label: "Videos Created" },
            { number: "10K+", label: "Newsletter Subscribers" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default About;