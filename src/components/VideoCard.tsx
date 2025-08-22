import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface VideoCardProps {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  index: number;
}

const VideoCard = ({ title, description, thumbnail, url, index }: VideoCardProps) => {
  const [play, setPlay] = useState(false);

  // Extract video ID from the URL (works for standard YouTube links)
  const getVideoId = (youtubeUrl: string) => {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.*|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\n>]+)/;
    const match = youtubeUrl.match(regExp);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(url);
  const thumbnailUrl = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "");

  return (
    <motion.div
      className="group card-hover bg-card rounded-2xl overflow-hidden shadow-lg border border-border"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative w-full max-w-xl mx-auto aspect-video">
        {play && videoId ? (
          <iframe
            className="w-full h-full rounded-2xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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
            {/* Thumbnail */}
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt="Video thumbnail"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-2xl">
                <span className="text-gray-600">No Thumbnail</span>
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300 rounded-2xl flex items-center justify-center">
              {/* Play Button */}
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
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

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <a
          href={url}
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
