import { motion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";

interface ArticleCardProps {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  readTime: string;
  index: number;
}

const hoverColors = [
  "hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/20",
  "hover:bg-gradient-to-br hover:from-highlight/10 hover:to-primary/20", 
  "hover:bg-gradient-to-br hover:from-secondary/10 hover:to-highlight/20"
];

const ArticleCard = ({ title, description, thumbnail, url, readTime, index }: ArticleCardProps) => {
  const hoverColorClass = hoverColors[index % hoverColors.length];

  return (
    <motion.div
      className={`group card-hover bg-card rounded-2xl overflow-hidden shadow-lg border border-border transition-all duration-300 ${hoverColorClass}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative overflow-hidden">
        <motion.img
          src="EOJLByHns3s"
          alt={title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            {readTime}
          </div>
        </div>
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
          Read Article
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
