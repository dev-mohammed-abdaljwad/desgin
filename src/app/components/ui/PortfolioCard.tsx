import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface PortfolioCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

export function PortfolioCard({ title, category, description, image, tags, link }: PortfolioCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="relative h-full bg-card/50 backdrop-blur-xl border border-border rounded-2xl overflow-hidden group cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
          {category}
        </div>

        {/* View Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 right-4 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all"
          >
            <ExternalLink className="w-5 h-5 text-primary" />
          </a>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[var(--font-display)] font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted/50 text-foreground/80 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
