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
      <div className="relative w-full max-w-xl mx-auto aspect-video">
      {play ? (
        <iframe
          className="w-full h-full rounded-2xl"
          src="https://www.youtube.com/embed/EOJLByHns3s?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div
          className="relative w-full h-full cursor-pointer group"
          onClick={() => setPlay(true)}
        >
          {/* Thumbnail Image */}
          <img
            src="https://img.youtube.com/vi/EOJLByHns3s/hqdefault.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
            {/* Play Button */}
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-black"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.5 5.5v9l8-4.5-8-4.5z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
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
