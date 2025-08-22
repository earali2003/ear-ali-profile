import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  index: number;
}

const VideoCard = ({ title, description, thumbnail, url, index }: VideoCardProps) => {
  return (
    <motion.div
      className="group card-hover bg-card rounded-2xl overflow-hidden shadow-lg border border-border"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-primary/90 p-3 rounded-full shadow-lg group-hover:bg-primary transition-colors duration-300">
            <Play className="h-6 w-6 text-primary-foreground fill-current" />
          </div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <a
          href="https://www.youtube.com/watch?v=EOJLByHns3s"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-medium transition-colors duration-300"
        >
          Watch Video
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default VideoCard;
